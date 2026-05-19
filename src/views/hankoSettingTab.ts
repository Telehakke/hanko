import { Plugin, PluginSettingTab } from "obsidian";
import { ReactRoot } from "./reactRoot";

export default class HankoSettingTab extends PluginSettingTab {
    private readonly plugin: Plugin;

    constructor(plugin: Plugin) {
        super(plugin.app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        const div = createDiv();
        ReactRoot(div, this.plugin);
        containerEl.append(div);
    }
}
