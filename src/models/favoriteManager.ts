import type { Favorite } from "./types";

const segmenter = new Intl.Segmenter();

export class FavoriteManager {
    readonly favorites: readonly Favorite[];

    constructor(favorites?: readonly Favorite[]) {
        this.favorites = favorites ?? [];
    }

    /** アイテムを追加する */
    add = (favorite: Favorite): FavoriteManager => {
        return new FavoriteManager([...this.favorites, favorite]);
    };

    /** idに一致するアイテムを削除する */
    remove = (id: number): FavoriteManager => {
        return new FavoriteManager(this.favorites.filter((f) => f.id !== id));
    };

    /** oldIndexに位置するアイテムをnewIndexの位置に移動させる */
    reorder = (oldIndex: number, newIndex: number): FavoriteManager => {
        const length = this.favorites.length;
        if (oldIndex < 0 || newIndex < 0) return this;
        if (oldIndex >= length || newIndex >= length) return this;

        const copied = [...this.favorites];
        const [item] = copied.splice(oldIndex, 1);
        copied.splice(newIndex, 0, item);
        return new FavoriteManager(copied);
    };

    /** idに一致するアイテムのoffsetを1増やす */
    incrementOffset = (id: number): FavoriteManager => {
        const newFavorites = this.favorites.map((f) => {
            if (f.id !== id) return f;

            const text = f.text;
            const segments = [...segmenter.segment(text)];
            const intlLength = segments.length;

            let newIntlOffset = f.intlOffset + 1;
            if (newIntlOffset > intlLength) newIntlOffset = intlLength;

            const splitEndStr = segments
                .slice(intlLength - newIntlOffset)
                .map((s) => s.segment)
                .join("");

            const strLength = text.length;
            let newStrOffset = splitEndStr.length;
            if (newStrOffset > strLength) newStrOffset = strLength;

            const item: Favorite = {
                ...f,
                intlOffset: newIntlOffset,
                strOffset: newStrOffset,
            };
            return item;
        });
        return new FavoriteManager(newFavorites);
    };

    /** idに一致するアイテムのoffsetを1減らす */
    decrementOffset = (id: number): FavoriteManager => {
        const newFavorites = this.favorites.map((f) => {
            if (f.id !== id) return f;

            const text = f.text;
            const segments = [...segmenter.segment(text)];
            const intlLength = segments.length;

            let newIntlOffset = f.intlOffset - 1;
            if (newIntlOffset < 0) newIntlOffset = 0;

            const splitEndStr = segments
                .slice(intlLength - newIntlOffset)
                .map((s) => s.segment)
                .join("");

            let newStrOffset = splitEndStr.length;
            if (newStrOffset < 0) newStrOffset = 0;

            const item: Favorite = {
                ...f,
                intlOffset: newIntlOffset,
                strOffset: newStrOffset,
            };
            return item;
        });
        return new FavoriteManager(newFavorites);
    };
}
