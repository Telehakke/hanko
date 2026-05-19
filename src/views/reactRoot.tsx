import { getDefaultStore } from "jotai";
import type { Plugin } from "obsidian";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Config } from "../models/config";
import { App } from "./App";
import { favoriteManagerAtom, selectedIdAtom } from "./atoms";

const defaultStore = getDefaultStore();

export const ReactRoot = (el: HTMLElement, plugin: Plugin): void => {
    defaultStore.set(favoriteManagerAtom, Config.favoriteManager);
    defaultStore.set(selectedIdAtom, undefined);

    createRoot(el).render(
        <StrictMode>
            <App plugin={plugin} />
        </StrictMode>,
    );
};
