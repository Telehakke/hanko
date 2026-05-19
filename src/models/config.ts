import { moment, Plugin } from "obsidian";
import { FavoriteManager } from "./favoriteManager";
import { LocalStorage } from "./localStorage";
import { getTranslation } from "./translator";

export class Config {
    /** 翻訳データ */
    static readonly translation = getTranslation(moment.locale());

    /** お気に入りリスト */
    static favoriteManager = new FavoriteManager();

    /** お気に入りリストの更新と保存 */
    static syncFavoriteManager = (
        plugin: Plugin,
        value: FavoriteManager,
    ): void => {
        this.favoriteManager = value;
        LocalStorage.save(plugin, { favorites: value.favorites });
    };
}
