import { describe, expect, it } from "vitest";
import { createPluginState, type PluginState } from "../pluginState";

describe("createPluginState", () => {
    it("正常値が渡された場合、同じ値を返す", () => {
        const obj: PluginState = {
            favorites: [{ id: 0, text: "", intlOffset: 0, strOffset: 0 }],
        };
        const result = createPluginState(obj);
        expect(result).toEqual(obj);
    });

    it("不正値が渡された場合、デフォルト値を返す1", () => {
        const obj = {
            favorites: [{ id: 0 }],
        };
        const result = createPluginState(obj);
        expect(result).toEqual({ favorites: [] });
    });

    it("不正値が渡された場合、デフォルト値を返す2", () => {
        const result = createPluginState({});
        expect(result).toEqual({ favorites: [] });
    });

    it("不正値が渡された場合、デフォルト値を返す3", () => {
        const result = createPluginState(null);
        expect(result).toEqual({ favorites: [] });
    });
});
