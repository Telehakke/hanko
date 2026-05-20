import { useSetAtom } from "jotai";
import { ChevronLeft } from "lucide-react";
import type { Plugin } from "obsidian";
import { useRef, type JSX } from "react";
import { Config } from "../../../models/config";
import { favoriteManagerAtom } from "../../atoms";
import { AutoClickIconButton } from "./AutoClickIconButton";

export const IncreaseOffsetButton = (props: {
    plugin: Plugin;
    selectedId: number;
}): JSX.Element => {
    const setFavoriteManager = useSetAtom(favoriteManagerAtom);
    const timerId = useRef<number | undefined>(undefined);

    const handleClick = (): void => {
        setFavoriteManager((f) => {
            const newValue = f.incrementOffset(props.selectedId);
            window.clearTimeout(timerId.current);
            timerId.current = window.setTimeout(() => {
                Config.syncFavoriteManager(props.plugin, newValue);
            }, 500);
            return newValue;
        });
    };

    return (
        <AutoClickIconButton className="hanko-flex-1" onClick={handleClick}>
            <ChevronLeft />
        </AutoClickIconButton>
    );
};
