import { Plugin } from "obsidian";
import { Config } from "./models/config";
import { FavoriteManager } from "./models/favoriteManager";
import { LocalStorage } from "./models/localStorage";
import {
    registerCommand,
    registerEditorMenu,
    registerRibbonAction,
} from "./models/pluginAction";
import "./styles.css";
import HankoSettingTab from "./views/hankoSettingTab";

export default class HankoPlugin extends Plugin {
    async onload(): Promise<void> {
        const pluginState = await LocalStorage.load(this);
        Config.favoriteManager = new FavoriteManager(pluginState.favorites);

        registerCommand(this);
        registerEditorMenu(this);
        registerRibbonAction(this);

        this.addSettingTab(new HankoSettingTab(this));
    }
}
