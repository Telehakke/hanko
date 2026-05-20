import { useSetAtom } from "jotai";
import { ChevronRight } from "lucide-react";
import type { Plugin } from "obsidian";
import { useRef, type JSX } from "react";
import { Config } from "../../../models/config";
import { favoriteManagerAtom } from "../../atoms";
import { AutoClickIconButton } from "./AutoClickIconButton";

export const DecrementOffsetButton = (props: {
    plugin: Plugin;
    selectedId: number;
}): JSX.Element => {
    const setFavoriteManager = useSetAtom(favoriteManagerAtom);
    const timerId = useRef<number | undefined>(undefined);

    const handleClick = (): void => {
        setFavoriteManager((f) => {
            const newValue = f.decrementOffset(props.selectedId);
            window.clearTimeout(timerId.current);
            timerId.current = window.setTimeout(() => {
                Config.syncFavoriteManager(props.plugin, newValue);
            }, 500);
            return newValue;
        });
    };

    return (
        <AutoClickIconButton className="hanko-flex-1" onClick={handleClick}>
            <ChevronRight />
        </AutoClickIconButton>
    );
};
