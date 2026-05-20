import type { Plugin } from "obsidian";
import type { JSX } from "react";
import { Buttons } from "./buttons/Buttons";
import { FavoriteListView } from "./favoriteListView/FavoriteListView";

export const App = (props: { plugin: Plugin }): JSX.Element => {
    return (
        <>
            <FavoriteListView {...props} />
            <Buttons {...props} />
        </>
    );
};
