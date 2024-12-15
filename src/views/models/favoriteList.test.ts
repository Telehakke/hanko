import { describe, expect, test } from "vitest";
import { Favorite } from "../../models/types";
import { FavoriteList, FavoriteListData } from "./favoriteList";

const favorites: Favorite[] = [
    { id: 0, text: "zero", intlOffset: 0, strOffset: 0 },
    { id: 1, text: "one", intlOffset: 0, strOffset: 0 },
];

test("changed()のテスト", () => {
    let list = FavoriteList.create(favorites);
    list = list.changed(0, true);
    const expected: FavoriteListData[] = [
        { favorite: favorites[0], checked: true },
        { favorite: favorites[1], checked: false },
    ];
    expect(list.values).toEqual(expected);
});

test("uncheckedAll()のテスト", () => {
    let list = FavoriteList.create(favorites);
    list = list.changed(0, true);
    list = list.uncheckedAll();
    const expected: FavoriteListData[] = [
        { favorite: favorites[0], checked: false },
        { favorite: favorites[1], checked: false },
    ];
    expect(list.values).toEqual(expected);
});

describe("hasChecked()のテスト", () => {
    test("チェック有り", () => {
        let list = FavoriteList.create(favorites);
        list = list.changed(0, true);
        expect(list.hasChecked()).toBeTruthy();
    });

    test("チェック無し", () => {
        const list = FavoriteList.create(favorites);
        expect(list.hasChecked()).toBeFalsy();
    });
});

test("appended()のテスト", () => {
    let list = FavoriteList.create();
    const favorite: Favorite = {
        id: 0,
        text: "zero",
        intlOffset: 0,
        strOffset: 0,
    };
    list = list.appended(favorite);
    const expected: FavoriteListData[] = [
        { favorite: favorite, checked: false },
    ];
    expect(list.values).toEqual(expected);
});

test("removedAllCheckedItems()のテスト", () => {
    let list = FavoriteList.create(favorites);
    list = list.changed(0, true);
    list = list.removedAllCheckedItems();
    const expected: FavoriteListData[] = [
        { favorite: favorites[1], checked: false },
    ];
    expect(list.values).toEqual(expected);
});

describe("findIndexByID()のテスト", () => {
    test("存在するidを検索", () => {
        const list = FavoriteList.create(favorites);
        expect(list.findIndexByID(0)).toBe(0);
    });

    test("存在しないidを検索", () => {
        const list = FavoriteList.create(favorites);
        expect(list.findIndexByID(2)).toBeNull();
    });
});

test("reordered()のテスト", () => {
    let list = FavoriteList.create(favorites);
    list = list.reordered(1, 0);
    const expected: FavoriteListData[] = [
        { favorite: favorites[1], checked: false },
        { favorite: favorites[0], checked: false },
    ];
    expect(list.values).toEqual(expected);
});

describe("findIndexByChecked()のテスト", () => {
    test("チェック有り", () => {
        let list = FavoriteList.create(favorites);
        list = list.changed(0, true);
        expect(list.findIndexByChecked()).toBe(0);
    });

    test("チェック無し", () => {
        const list = FavoriteList.create(favorites);
        expect(list.findIndexByChecked()).toBeNull();
    });
});

describe("increaseOffset()のテスト", () => {
    test("一般的な文字に対する操作", () => {
        const favorite: Favorite[] = [
            {
                id: 0,
                text: "a",
                intlOffset: 0,
                strOffset: 0,
            },
        ];
        let list = FavoriteList.create(favorite);
        list = list.increaseOffset(0);
        const expected: Favorite[] = [
            {
                id: 0,
                text: "a",
                intlOffset: 1,
                strOffset: 1,
            },
        ];
        expect(list.getFavorites()).toEqual(expected);
    });

    test("2回メソッドを呼び出す", () => {
        const favorite: Favorite[] = [
            {
                id: 0,
                text: "a",
                intlOffset: 0,
                strOffset: 0,
            },
        ];
        let list = FavoriteList.create(favorite);
        list = list.increaseOffset(0);
        list = list.increaseOffset(0);
        const expected: Favorite[] = [
            {
                id: 0,
                text: "a",
                intlOffset: 1,
                strOffset: 1,
            },
        ];
        expect(list.getFavorites()).toEqual(expected);
    });

    test("特殊文字に対する操作", () => {
        const favorite: Favorite[] = [
            {
                id: 0,
                text: "😊",
                intlOffset: 0,
                strOffset: 0,
            },
        ];
        let list = FavoriteList.create(favorite);
        list = list.increaseOffset(0);
        const expected: Favorite[] = [
            {
                id: 0,
                text: "😊",
                intlOffset: 1,
                strOffset: 2,
            },
        ];
        expect(list.getFavorites()).toEqual(expected);
    });
});

describe("decreaseOffset()のテスト", () => {
    test("一般的な文字に対する操作", () => {
        const favorite: Favorite[] = [
            {
                id: 0,
                text: "a",
                intlOffset: 1,
                strOffset: 1,
            },
        ];
        let list = FavoriteList.create(favorite);
        list = list.decreaseOffset(0);
        const expected: Favorite[] = [
            {
                id: 0,
                text: "a",
                intlOffset: 0,
                strOffset: 0,
            },
        ];
        expect(list.getFavorites()).toEqual(expected);
    });

    test("2回メソッドを呼び出す", () => {
        const favorite: Favorite[] = [
            {
                id: 0,
                text: "a",
                intlOffset: 1,
                strOffset: 1,
            },
        ];
        let list = FavoriteList.create(favorite);
        list = list.decreaseOffset(0);
        list = list.decreaseOffset(0);
        const expected: Favorite[] = [
            {
                id: 0,
                text: "a",
                intlOffset: 0,
                strOffset: 0,
            },
        ];
        expect(list.getFavorites()).toEqual(expected);
    });

    test("特殊文字に対する操作", () => {
        const favorite: Favorite[] = [
            {
                id: 0,
                text: "😊",
                intlOffset: 1,
                strOffset: 2,
            },
        ];
        let list = FavoriteList.create(favorite);
        list = list.decreaseOffset(0);
        const expected: Favorite[] = [
            {
                id: 0,
                text: "😊",
                intlOffset: 0,
                strOffset: 0,
            },
        ];
        expect(list.getFavorites()).toEqual(expected);
    });
});
