import { Plugin } from "obsidian";
import PluginStateRepository from "./models/pluginStateRepository";
import PluginContext from "./models/pluginContext";
import HankoSettingTab from "./views/hankoSettingTab";
import { Command, EditorMenu, RibbonAction } from "./models/pluginAction";
import { FavoriteList } from "./views/models/favoriteList";

export default class Hanko extends Plugin {
    private readonly pluginStateRepository = new PluginStateRepository(this);

    async onload(): Promise<void> {
        const state = await this.pluginStateRepository.load();
        PluginContext.favoriteList = FavoriteList.create(state.favorites);

        const command = new Command(this.pluginStateRepository, this);
        const editorMenu = new EditorMenu(this.pluginStateRepository, this);
        const ribbonAction = new RibbonAction(this.pluginStateRepository, this);
        command.add();
        editorMenu.add();
        ribbonAction.add();

        this.addSettingTab(
            new HankoSettingTab(this.app, this, this.pluginStateRepository)
        );
    }
}
