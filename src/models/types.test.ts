import { expect, test } from "vitest";
import {
    Favorite,
    isFavorite,
    isFavorites,
    isPluginState,
    PluginState,
} from "./types";

test("isFavorite()のテスト", () => {
    const value: Favorite = {
        id: 0,
        text: "",
        intlOffset: 0,
        strOffset: 0,
    };
    expect(isFavorite(value)).toBeTruthy();
});

test("isFavorites()のテスト", () => {
    const values: Favorite[] = [];
    expect(isFavorites(values)).toBeTruthy();
});

test("isPluginState()のテスト", () => {
    const value: PluginState = {
        favorites: [],
    };
    expect(isPluginState(value)).toBeTruthy();
});
