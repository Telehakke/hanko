import { App, Plugin, PluginSettingTab } from "obsidian";
import PluginStateRepository from "../models/pluginStateRepository";
import ReactRoot from "./reactRoot";

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

        const div = createDiv();
        ReactRoot(div, this.pluginStateRepository);
        containerEl.append(div);
    }
}
