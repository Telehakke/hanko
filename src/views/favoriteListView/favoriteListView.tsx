import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { useAtomValue, useSetAtom } from "jotai";
import { Plugin } from "obsidian";
import { useRef, type JSX } from "react";
import { Config } from "../../models/config";
import { favoriteManagerAtom } from "../atoms";
import { FavoriteListItem } from "./sub/FavoriteListItem";

export const FavoriteListView = (props: { plugin: Plugin }): JSX.Element => {
    const setFavoriteManager = useSetAtom(favoriteManagerAtom);

    return (
        <DragDropProvider
            onDragEnd={(event) => {
                if (event.canceled) return;

                const { source } = event.operation;
                if (!isSortable(source)) return;

                const { initialIndex, index } = source;
                if (initialIndex === index) return;

                setFavoriteManager((f) => {
                    const newValue = f.reorder(initialIndex, index);
                    Config.syncFavoriteManager(props.plugin, newValue);
                    return newValue;
                });
            }}
        >
            <ListItems />
        </DragDropProvider>
    );
};

const ListItems = (): JSX.Element => {
    const favoriteManager = useAtomValue(favoriteManagerAtom);
    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={containerRef}>
            {favoriteManager.favorites.map((f, i) => (
                <FavoriteListItem
                    key={f.id}
                    favorite={f}
                    index={i}
                    containerRef={containerRef}
                />
            ))}
        </div>
    );
};
