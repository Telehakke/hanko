import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { GripVertical } from "lucide-react";
import { useSetAtom } from "jotai";
import { favoriteListAtom } from "../../atoms";
import { FavoriteListData } from "../../models/favoriteList";

/**
 * ソート可能なリストの項目
 */
const FavoriteListItem = ({
    listData,
}: {
    listData: FavoriteListData;
}): React.JSX.Element => {
    const setFavoriteList = useSetAtom(favoriteListAtom);

    const {
        active,
        attributes,
        listeners,
        setActivatorNodeRef,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: listData.favorite.id });

    // ドラッグ操作に合わせて要素を移動させるためのCSSスタイル
    const style: { style: React.CSSProperties } = {
        style: {
            transform: CSS.Transform.toString(transform),
            transition: transition,
            opacity: active?.id === listData.favorite.id ? 0.5 : 1.0,
        },
    };

    // チェック状態を記録する
    const handleClick = () => {
        setFavoriteList((v) =>
            v.changed(listData.favorite.id, !listData.checked)
        );
    };

    const text = listData.favorite.text;

    // prettier-ignore
    return (
        <div
            className={`hanko-sortable-item ${listData.checked ? "hanko-selected" : ""}`}
            ref={setNodeRef}
            {...style}
        >
            <div className="hanko-flex-1" onClick={handleClick}>
                <p className="hanko-m-auto">
                    {text.substring(0, text.length - listData.favorite.strOffset)}
                    <span className="hanko-border-left">
                        {text.substring(text.length - listData.favorite.strOffset)}
                    </span>
                </p>
            </div>
            <button
                className="clickable-icon hanko-touch-none"
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
            >
                <GripVertical />
            </button>
        </div>
    );
};

export default FavoriteListItem;
