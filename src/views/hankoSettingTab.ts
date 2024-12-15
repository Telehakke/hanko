import { App, Plugin, PluginSettingTab, Setting } from "obsidian";
import PluginStateRepository from "../models/pluginStateRepository";
import ReactRoot from "./reactRoot";
import PluginContext from "../models/pluginContext";

export default class HankoSettingTab extends PluginSettingTab {
    private readonly pluginStateRepository: PluginStateRepository;

    constructor(
        app: App,
        plugin: Plugin,
        pluginStateRepository: PluginStateRepository
    ) {
        super(app, plugin);
        this.pluginStateRepository = pluginStateRepository;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        new Setting(containerEl)
            .setName(PluginContext.translation.registeredTextList)
            .setHeading();

        const div = createDiv();
        ReactRoot(div, this.pluginStateRepository);
        containerEl.append(div);
    }
}
