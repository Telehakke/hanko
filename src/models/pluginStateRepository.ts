import { Plugin } from "obsidian";
import { Favorite, PluginState, PluginStateKey } from "./types";

export default class PluginStateRepository {
    private readonly plugin: Plugin;

    constructor(plugin: Plugin) {
        this.plugin = plugin;
    }

    /**
     * ローカルストレージからプラグインの状態を取得
     */
    load = async (): Promise<PluginState> => {
        const data = await this.plugin.loadData();

        if (data == null) {
            const state: PluginState = {
                favorites: [],
            };
            return state;
        }

        const state: PluginState = {
            favorites: data[PluginStateKey.favorites] ?? [],
        };
        return state;
    };

    /**
     * ローカルストレージからプラグインの状態を書き込む
     */
    save = async (favorites: Favorite[]): Promise<void> => {
        const state: PluginState = { favorites: favorites };
        this.plugin.saveData(state);
    };
}
