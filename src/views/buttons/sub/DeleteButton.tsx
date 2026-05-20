import { useSetAtom } from "jotai";
import type { Plugin } from "obsidian";
import type { JSX } from "react";
import { Config } from "../../../models/config";
import { favoriteManagerAtom, selectedIdAtom } from "../../atoms";

export const DeleteButton = (props: {
    plugin: Plugin;
    selectedId: number;
}): JSX.Element => {
    const setFavoriteManager = useSetAtom(favoriteManagerAtom);
    const setSelectedId = useSetAtom(selectedIdAtom);

    const handleClick = (): void => {
        setFavoriteManager((f) => {
            const newValue = f.remove(props.selectedId);
            Config.syncFavoriteManager(props.plugin, newValue);
            return newValue;
        });
        setSelectedId(undefined);
    };

    return (
        <button className="hanko-flex-1 mod-warning" onClick={handleClick}>
            {Config.translation.delete}
        </button>
    );
};
