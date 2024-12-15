import { Editor, Menu, Notice, Plugin } from "obsidian";
import PluginStateRepository from "./pluginStateRepository";
import PluginContext from "./pluginContext";
import { EditorView } from "@codemirror/view";
import { Favorite } from "./types";

abstract class PluginAction {
    private pluginStateRepository: PluginStateRepository;

    constructor(pluginStateRepository: PluginStateRepository) {
        this.pluginStateRepository = pluginStateRepository;
    }

    /**
     * 選択されているテキストをお気に入りに登録する
     */
    protected handleRegisterClick = (editor: Editor): void => {
        const selection = editor.getSelection();

        if (selection.length === 0) {
            new Notice(PluginContext.translation.textIsNotSelected);
            return;
        }

        const favorite: Favorite = {
            id: new Date().getTime(),
            text: selection,
            intlOffset: 0,
            strOffset: 0,
        };
        const newList = PluginContext.favoriteList.appended(favorite);
        PluginContext.favoriteList = newList;
        this.pluginStateRepository.save(newList.getFavorites());
        new Notice(PluginContext.translation.testWasRegistered);
    };

    /**
     * 選択したお気に入りテキストをテキストカーソル位置に挿入する
     */
    protected handlePasteClick = (editor: Editor, favorite: Favorite) => {
        const cursor = editor.getCursor();
        editor.replaceRange(favorite.text, cursor);

        // テキストカーソルを移動する
        const position = editor.posToOffset(cursor);
        const length = favorite.text.length;
        editor.setCursor(
            editor.offsetToPos(position + length - favorite.strOffset)
        );
    };
}

export class Command extends PluginAction {
    private plugin: Plugin;

    constructor(pluginStateRepository: PluginStateRepository, plugin: Plugin) {
        super(pluginStateRepository);
        this.plugin = plugin;
    }

    /**
     * コマンドの登録
     */
    add = (): void => {
        this.plugin.addCommand({
            id: "register",
            name: PluginContext.translation.register,
            icon: "database",
            editorCallback: (editor) => {
                this.handleRegisterClick(editor);
            },
        });

        this.plugin.addCommand({
            id: "paste",
            name: PluginContext.translation.paste,
            icon: "clipboard-paste",
            editorCallback: (editor) => {
                const favorites = PluginContext.favoriteList.getFavorites();
                if (favorites.length === 0) {
                    new Notice(PluginContext.translation.textIsUnregistered);
                    return;
                }

                // お気に入り一覧のメニューを生成する
                const menu = new Menu();
                favorites.forEach((favorite) => {
                    menu.addItem((item) => {
                        item.setTitle(favorite.text);
                        item.onClick(() => {
                            this.handlePasteClick(editor, favorite);
                        });
                    });
                });

                // お気に入り一覧のメニューをテキストカーソルの位置に表示する
                // @ts-expect-error, not typed
                const editorView = editor.cm as EditorView;
                const cursor = editor.getCursor();
                const position = editor.posToOffset(cursor);
                const cursorCoordinates = editorView.coordsAtPos(position);
                menu.showAtPosition({
                    x: cursorCoordinates?.left ?? 0,
                    y: cursorCoordinates?.top ?? 0,
                });
            },
        });
    };
}

export class EditorMenu extends PluginAction {
    private plugin: Plugin;

    constructor(pluginStateRepository: PluginStateRepository, plugin: Plugin) {
        super(pluginStateRepository);
        this.plugin = plugin;
    }

    /**
     * 編集モードにおける、右クリックで開くメニューへの登録
     */
    // prettier-ignore
    add = (): void => {
        this.plugin.registerEvent(
            this.plugin.app.workspace.on("editor-menu", (menu, editor) => {
                menu.addItem((item) => {
                    item.setTitle(PluginContext.translation.hankoRegister)
                        .setIcon("database")
                        .onClick(() => {
                            this.handleRegisterClick(editor);
                        });
                });

                menu.addItem((item) => {
                    item.setTitle(PluginContext.translation.hankoPaste)
                        .setIcon("clipboard-paste");

                    // @ts-expect-error, not typed
                    const submenu = item.setSubmenu() as Menu;
                    const favorites = PluginContext.favoriteList.getFavorites();
                    favorites.forEach((favorite) => {
                        submenu.addItem((item) => {
                            item.setTitle(favorite.text);
                            item.onClick(() => {
                                this.handlePasteClick(editor, favorite);
                            });
                        });
                    });
                });
            })
        );
    };
}

export class RibbonAction extends PluginAction {
    private plugin: Plugin;

    constructor(pluginStateRepository: PluginStateRepository, plugin: Plugin) {
        super(pluginStateRepository);
        this.plugin = plugin;
    }

    /**
     * リボンアクションを登録
     */
    add = (): void => {
        this.plugin.addRibbonIcon(
            "database",
            PluginContext.translation.hankoRegister,
            () => {
                const editor = this.plugin.app.workspace.activeEditor?.editor;
                if (editor == null) return;

                this.handleRegisterClick(editor);
            }
        );

        this.plugin.addRibbonIcon(
            "clipboard-paste",
            PluginContext.translation.hankoPaste,
            (event) => {
                const favorites = PluginContext.favoriteList.getFavorites();
                if (favorites.length === 0) {
                    new Notice(PluginContext.translation.textIsUnregistered);
                    return;
                }

                const editor = this.plugin.app.workspace.activeEditor?.editor;
                if (editor == null) return;

                // お気に入り一覧のメニューを生成する
                const menu = new Menu();
                favorites.forEach((favorite) => {
                    menu.addItem((item) => {
                        item.setTitle(favorite.text);
                        item.onClick(() => {
                            this.handlePasteClick(editor, favorite);
                        });
                    });
                });

                menu.showAtMouseEvent(event);
            }
        );
    };
}
