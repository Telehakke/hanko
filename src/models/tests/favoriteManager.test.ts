import { describe, expect, it } from "vitest";
import { FavoriteManager } from "../favoriteManager";
import type { Favorite } from "../types";

const favorites: Favorite[] = [
    { id: 12, text: "a", intlOffset: 0, strOffset: 0 },
    { id: 34, text: "b", intlOffset: 0, strOffset: 0 },
    { id: 56, text: "c", intlOffset: 0, strOffset: 0 },
];

describe("add", () => {
    it("渡したアイテムが追加される", () => {
        const favorite: Favorite = {
            id: 78,
            text: "d",
            intlOffset: 0,
            strOffset: 0,
        };
        const fm = new FavoriteManager(favorites).add(favorite);
        expect(fm.favorites).toEqual([...favorites, favorite]);
    });
});

describe("remove", () => {
    it("idに一致するアイテムが削除される", () => {
        const fm = new FavoriteManager(favorites).remove(12);
        expect(fm.favorites).toEqual([favorites[1], favorites[2]]);
    });

    it("idが存在しない場合、元の値を返す", () => {
        const fm = new FavoriteManager(favorites).remove(0);
        expect(fm.favorites).toEqual(favorites);
    });
});

describe("reorder", () => {
    it("インデックス0のアイテムがインデックス2へ移動する", () => {
        const fm = new FavoriteManager(favorites).reorder(0, 2);
        expect(fm.favorites).toEqual([
            favorites[1],
            favorites[2],
            favorites[0],
        ]);
    });

    it("インデックス2のアイテムがインデックス0へ移動する", () => {
        const fm = new FavoriteManager(favorites).reorder(2, 0);
        expect(fm.favorites).toEqual([
            favorites[2],
            favorites[0],
            favorites[1],
        ]);
    });

    it("インデックス外の値を指定した場合、元の値を返す1", () => {
        const fm = new FavoriteManager(favorites).reorder(-1, 0);
        expect(fm.favorites).toEqual(favorites);
    });

    it("インデックス外の値を指定した場合、元の値を返す2", () => {
        const fm = new FavoriteManager(favorites).reorder(0, -1);
        expect(fm.favorites).toEqual(favorites);
    });

    it("インデックス外の値を指定した場合、元の値を返す3", () => {
        const fm = new FavoriteManager(favorites).reorder(favorites.length, 0);
        expect(fm.favorites).toEqual(favorites);
    });

    it("インデックス外の値を指定した場合、元の値を返す4", () => {
        const fm = new FavoriteManager(favorites).reorder(0, favorites.length);
        expect(fm.favorites).toEqual(favorites);
    });
});

describe("incrementOffset", () => {
    it("一般的な文字に対する操作", () => {
        const favorite: Favorite = {
            id: 0,
            text: "a",
            intlOffset: 0,
            strOffset: 0,
        };
        const fm = new FavoriteManager([favorite]).incrementOffset(0);
        expect(fm.favorites).toEqual([
            { ...favorite, intlOffset: 1, strOffset: 1 },
        ]);
    });

    it("offsetの値が文字数を超えない", () => {
        const favorite: Favorite = {
            id: 0,
            text: "a",
            intlOffset: 1,
            strOffset: 1,
        };
        const fm = new FavoriteManager([favorite]).incrementOffset(0);
        expect(fm.favorites).toEqual([favorite]);
    });

    it("特殊文字に対する操作", () => {
        const favorite: Favorite = {
            id: 0,
            text: "😊",
            intlOffset: 0,
            strOffset: 0,
        };
        const fm = new FavoriteManager([favorite]).incrementOffset(0);
        expect(fm.favorites).toEqual([
            { ...favorite, intlOffset: 1, strOffset: 2 },
        ]);
    });
});

describe("decrementOffset", () => {
    it("一般的な文字に対する操作", () => {
        const favorite: Favorite = {
            id: 0,
            text: "a",
            intlOffset: 1,
            strOffset: 1,
        };
        const fm = new FavoriteManager([favorite]).decrementOffset(0);
        expect(fm.favorites).toEqual([
            { ...favorite, intlOffset: 0, strOffset: 0 },
        ]);
    });

    it("offsetの値が0より小さくならない", () => {
        const favorite: Favorite = {
            id: 0,
            text: "a",
            intlOffset: 0,
            strOffset: 0,
        };
        const fm = new FavoriteManager([favorite]).decrementOffset(0);
        expect(fm.favorites).toEqual([favorite]);
    });

    it("特殊文字に対する操作", () => {
        const favorite: Favorite = {
            id: 0,
            text: "😊",
            intlOffset: 1,
            strOffset: 2,
        };
        const fm = new FavoriteManager([favorite]).decrementOffset(0);
        expect(fm.favorites).toEqual([
            { ...favorite, intlOffset: 0, strOffset: 0 },
        ]);
    });
});
