import { describe, expect, it } from "vitest";
import { type Favorite, isFavorite, isFavorites } from "../types";

describe("isFavorite", () => {
    it("全ての項目の型が一致する場合、trueを返す", () => {
        const obj: Favorite = {
            id: 0,
            text: "",
            intlOffset: 0,
            strOffset: 0,
        };
        expect(isFavorite(obj)).toBeTruthy();
    });

    it("一部の項目の型が違う場合、falseを返す1", () => {
        const obj = {
            id: "",
            text: "",
            intlOffset: 0,
            strOffset: 0,
        };
        expect(isFavorite(obj)).toBeFalsy();
    });

    it("一部の項目の型が違う場合、falseを返す2", () => {
        const obj = {
            id: 0,
            text: 0,
            intlOffset: 0,
            strOffset: 0,
        };
        expect(isFavorite(obj)).toBeFalsy();
    });

    it("一部の項目の型が違う場合、falseを返す3", () => {
        const obj = {
            id: 0,
            text: "",
            intlOffset: "",
            strOffset: 0,
        };
        expect(isFavorite(obj)).toBeFalsy();
    });

    it("一部の項目の型が違う場合、falseを返す4", () => {
        const obj = {
            id: 0,
            text: "",
            intlOffset: 0,
            strOffset: "",
        };
        expect(isFavorite(obj)).toBeFalsy();
    });

    it("不正値が渡された場合、falseを返す1", () => {
        expect(isFavorite(null)).toBeFalsy();
    });
});

describe("isFavorites", () => {
    it("Favoriteの配列が渡された場合、trueを返す", () => {
        const items: Favorite[] = [
            {
                id: 0,
                text: "",
                intlOffset: 0,
                strOffset: 0,
            },
        ];
        expect(isFavorites(items)).toBeTruthy();
    });

    it("不正な要素を持つ配列が渡された場合、falseを返す", () => {
        const items = [
            {
                id: 0,
                text: "",
                intlOffset: 0,
                strOffset: 0,
            },
            {},
        ];
        expect(isFavorites(items)).toBeFalsy();
    });
});
