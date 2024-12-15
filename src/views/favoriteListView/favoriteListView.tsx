import PluginStateRepository from "../../models/pluginStateRepository";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import PluginContext from "../../models/pluginContext";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useAtom } from "jotai";
import { favoriteListAtom } from "../atoms";
import FavoriteListItem from "./sub/favoriteListItem";
import React from "react";

/**
 * お気に入りの一覧を表示するためのソート可能なリストビュー
 */
const FavoriteListView = ({
    pluginStateRepository,
}: {
    pluginStateRepository: PluginStateRepository;
}): React.JSX.Element => {
    const [favoriteList, setFavoriteList] = useAtom(favoriteListAtom);

    // ドラッグ操作をポインター、またはキーボードで行えるようにする
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // ドラッグ中の項目と、その真下にある項目を入れ替える
    const handleDragEnd = (event: DragEndEvent): void => {
        const { active, over } = event;
        if (over == null) return;
        if (active.id === over.id) return;

        const activeID = active.id.valueOf();
        const overID = over.id.valueOf();
        if (typeof activeID !== "number") return;
        if (typeof overID !== "number") return;

        const oldIndex = favoriteList.findIndexByID(activeID);
        const newIndex = favoriteList.findIndexByID(overID);
        if (oldIndex == null) return;
        if (newIndex == null) return;

        const newList = favoriteList.reordered(oldIndex, newIndex);
        setFavoriteList(newList);
        PluginContext.favoriteList = newList;
        pluginStateRepository.save(newList.getFavorites());
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={favoriteList.values.map((v) => v.favorite.id)}
                strategy={verticalListSortingStrategy}
            >
                {favoriteList.values.map((v) => (
                    <FavoriteListItem key={v.favorite.id} listData={v} />
                ))}
            </SortableContext>
        </DndContext>
    );
};

export default FavoriteListView;
