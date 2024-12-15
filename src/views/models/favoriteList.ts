import { Favorite } from "../../models/types";

export type FavoriteListData = {
    favorite: Favorite;
    checked: boolean;
};

export class FavoriteList {
    private readonly _values: FavoriteListData[];
    private readonly segmenter: Intl.Segmenter;

    private constructor(values: FavoriteListData[]) {
        this._values = values;
        this.segmenter = new Intl.Segmenter("ja-JP", {
            granularity: "grapheme",
        });
    }

    get values(): FavoriteListData[] {
        return this.copied();
    }

    // プロパティのコピーを返す
    private copied = (): FavoriteListData[] => {
        return this._values.map((v) => {
            const value: FavoriteListData = {
                favorite: { ...v.favorite },
                checked: v.checked,
            };
            return value;
        });
    };

    /**
     * Favoriteの配列をもとにインスタンスを作成する
     */
    static create = (favorites: Favorite[] = []) => {
        const values = favorites.map((v) => {
            const value: FavoriteListData = {
                favorite: { ...v },
                checked: false,
            };
            return value;
        });
        return new FavoriteList(values);
    };

    /**
     * Favoriteの配列を返す
     */
    getFavorites = (): Favorite[] => {
        return this.copied().map((v) => v.favorite);
    };

    /**
     * idに一致する要素のチェック状態を変更した新しいインスタンスを返す\
     * 他の要素のチェック状態はfalseになる
     */
    changed = (id: number, checked: boolean): FavoriteList => {
        const result = this.copied().map((v) => {
            if (v.favorite.id !== id)
                return {
                    ...v,
                    checked: false,
                };

            return { ...v, checked: checked };
        });
        return new FavoriteList(result);
    };

    /**
     * 全てのチェック状態を解除した新しいインスタンスを返す
     */
    uncheckedAll = (): FavoriteList => {
        const result = this.copied().map((v) => ({ ...v, checked: false }));
        return new FavoriteList(result);
    };

    /**
     * チェックされている要素が存在するかどうかを返す
     */
    hasChecked = (): boolean => {
        return this._values.some((v) => v.checked);
    };

    /**
     * 指定したFavoriteをリストに追加した新しいインスタンスを返す
     */
    appended = (favorite: Favorite): FavoriteList => {
        const value: FavoriteListData = {
            favorite: { ...favorite },
            checked: false,
        };
        const copied = this.copied();
        copied.push(value);
        return new FavoriteList(copied);
    };

    /**
     * チェック済みの要素を全て削除した新しいインスタンスを返す
     */
    removedAllCheckedItems = (): FavoriteList => {
        const result = this.copied().filter((v) => !v.checked);
        return new FavoriteList(result);
    };

    /**
     * idに一致するfavoritesを探索し、最初に見つかったインデックスを返す
     */
    findIndexByID = (id: number): number | null => {
        const index = this._values.findIndex((v) => v.favorite.id === id);
        return index < 0 ? null : index;
    };

    /**
     * リストの要素を入れ替えた新しいインスタンスを返す
     */
    reordered = (oldIndex: number, newIndex: number): FavoriteList => {
        if (oldIndex < 0 || oldIndex >= this._values.length) return this;
        if (newIndex < 0 || newIndex >= this._values.length) return this;

        const copied = this.copied();
        const value = copied[oldIndex];
        copied.splice(oldIndex, 1);
        copied.splice(newIndex, 0, value);
        return new FavoriteList(copied);
    };

    /**
     * チェックされている要素を探索し、最初に見つかったインデックスを返す
     */
    findIndexByChecked = (): number | null => {
        const index = this._values.findIndex((v) => v.checked);
        return index < 0 ? null : index;
    };

    /**
     * 指定したインデックスのoffsetを1増やした新しいインスタンスを返す
     */
    increaseOffset = (index: number): FavoriteList => {
        const result = this._values.map((v, i) => {
            if (i !== index) return v;

            const text = v.favorite.text;
            const segments = [...this.segmenter.segment(text)];
            const intlLength = segments.length;

            let newIntlOffset = v.favorite.intlOffset + 1;
            if (newIntlOffset > intlLength) {
                newIntlOffset = intlLength;
            }

            const splitEndStr = segments
                .slice(intlLength - newIntlOffset)
                .map((v) => v.segment)
                .reduce((previous, current) => previous + current, "");

            const strLength = text.length;
            let newStrOffset = splitEndStr.length;
            if (newStrOffset > strLength) {
                newStrOffset = strLength;
            }

            const value: FavoriteListData = {
                favorite: {
                    id: v.favorite.id,
                    text: v.favorite.text,
                    intlOffset: newIntlOffset,
                    strOffset: newStrOffset,
                },
                checked: v.checked,
            };
            return value;
        });
        return new FavoriteList(result);
    };

    /**
     * 指定したインデックスのoffsetを1減らした新しいインスタンスを返す
     */
    decreaseOffset = (index: number): FavoriteList => {
        const result = this._values.map((v, i) => {
            if (i !== index) return v;

            const text = v.favorite.text;
            const segments = [...this.segmenter.segment(text)];
            const intlLength = segments.length;

            let newIntlOffset = v.favorite.intlOffset - 1;
            if (newIntlOffset < 0) {
                newIntlOffset = 0;
            }

            const splitEndStr = segments
                .slice(intlLength - newIntlOffset)
                .map((v) => v.segment)
                .reduce((previous, current) => previous + current, "");

            let newStrOffset = splitEndStr.length;
            if (newStrOffset < 0) {
                newStrOffset = 0;
            }

            const value: FavoriteListData = {
                favorite: {
                    id: v.favorite.id,
                    text: v.favorite.text,
                    intlOffset: newIntlOffset,
                    strOffset: newStrOffset,
                },
                checked: v.checked,
            };
            return value;
        });
        return new FavoriteList(result);
    };
}
