import { EditorView } from "@codemirror/view";
import { Editor, Menu, Notice, Plugin } from "obsidian";
import { Config } from "./config";
import type { Favorite } from "./types";

const Icon = {
    clipboardPaste: "clipboard-paste",
    database: "database",
} as const;

/** コマンドへの登録 */
export const registerCommand = (plugin: Plugin): void => {
    plugin.addCommand({
        id: "register",
        name: Config.translation.register,
        icon: Icon.database,
        editorCallback(editor) {
            registerSelectedText(plugin, editor);
        },
    });

    plugin.addCommand({
        id: "paste",
        name: Config.translation.paste,
        icon: Icon.clipboardPaste,
        editorCallback(editor) {
            const favorites = Config.favoriteManager.favorites;
            if (favorites.length === 0) {
                new Notice(Config.translation.textIsUnregistered);
                return;
            }

            const menu = new Menu();
            favorites.forEach((f) => {
                menu.addItem((item) => {
                    item.setTitle(f.text).onClick(() =>
                        pasteFavoriteText(editor, f),
                    );
                });
            });

            // メニューをテキストカーソル位置に表示
            // @ts-expect-error: 型情報なし
            const editorView = editor.cm as EditorView;
            const position = editor.posToOffset(editor.getCursor());
            const cursorCoordinates = editorView.coordsAtPos(position);
            const x = cursorCoordinates?.left ?? 0;
            const y = cursorCoordinates?.top ?? 0;
            menu.showAtPosition({ x, y });
        },
    });
};

/** 編集モードの右クリックメニューへの登録 */
export const registerEditorMenu = (plugin: Plugin): void => {
    plugin.registerEvent(
        plugin.app.workspace.on("editor-menu", (menu, editor) => {
            menu.addItem((item) => {
                item.setTitle(Config.translation.hankoRegister)
                    .setIcon(Icon.database)
                    .onClick(() => registerSelectedText(plugin, editor));
            });

            menu.addItem((item) => {
                item.setTitle(Config.translation.hankoPaste).setIcon(
                    Icon.clipboardPaste,
                );

                // @ts-expect-error: 型情報なし
                const submenu = (item.setSubmenu as () => Menu)();
                Config.favoriteManager.favorites.forEach((f) => {
                    submenu.addItem((item) => {
                        item.setTitle(f.text).onClick(() =>
                            pasteFavoriteText(editor, f),
                        );
                    });
                });
            });
        }),
    );
};

/** リボンアクションへの登録 */
export const registerRibbonAction = (plugin: Plugin): void => {
    plugin.addRibbonIcon(
        Icon.database,
        Config.translation.hankoRegister,
        () => {
            const editor = plugin.app.workspace.activeEditor?.editor;
            if (editor == null) return;

            registerSelectedText(plugin, editor);
        },
    );

    plugin.addRibbonIcon(
        Icon.clipboardPaste,
        Config.translation.hankoPaste,
        (event) => {
            const favorites = Config.favoriteManager.favorites;
            if (favorites.length === 0) {
                new Notice(Config.translation.textIsUnregistered);
                return;
            }

            const editor = plugin.app.workspace.activeEditor?.editor;
            if (editor == null) return;

            const menu = new Menu();
            favorites.forEach((f) => {
                menu.addItem((item) => {
                    item.setTitle(f.text).onClick(() =>
                        pasteFavoriteText(editor, f),
                    );
                });
            });
            menu.showAtMouseEvent(event);
        },
    );
};

/* -------------------------------------------------------------------------- */

/** 選択されているテキストをお気に入りに登録 */
const registerSelectedText = (plugin: Plugin, editor: Editor): void => {
    const selection = editor.getSelection();
    if (selection.length === 0) {
        new Notice(Config.translation.textIsNotSelected);
        return;
    }

    const favorite: Favorite = {
        id: new Date().getTime(),
        text: selection,
        intlOffset: 0,
        strOffset: 0,
    };
    const newValue = Config.favoriteManager.add(favorite);
    Config.syncFavoriteManager(plugin, newValue);
    new Notice(Config.translation.textWasRegistered);
};

/** テキストカーソル位置にお気に入りテキストを貼り付ける */
const pasteFavoriteText = (editor: Editor, favorite: Favorite) => {
    const cursor = editor.getCursor();
    editor.replaceRange(favorite.text, cursor);

    // テキストカーソルの移動
    const position = editor.posToOffset(cursor);
    const length = favorite.text.length;
    editor.setCursor(
        editor.offsetToPos(position + length - favorite.strOffset),
    );
};
