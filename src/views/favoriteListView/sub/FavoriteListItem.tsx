import { RestrictToVerticalAxis } from "@dnd-kit/abstract/modifiers";
import { RestrictToElement } from "@dnd-kit/dom/modifiers";
import { useSortable } from "@dnd-kit/react/sortable";
import { useAtom } from "jotai";
import { GripVertical } from "lucide-react";
import { useEffect, useState, type JSX, type RefObject } from "react";
import type { Favorite } from "../../../models/types";
import { selectedIdAtom } from "../../atoms";

export const FavoriteListItem = ({
    favorite,
    index,
    containerRef,
}: {
    favorite: Favorite;
    index: number;
    containerRef: RefObject<HTMLDivElement | null>;
}): JSX.Element => {
    const [selectedId, setSelectedId] = useAtom(selectedIdAtom);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const { ref, handleRef } = useSortable({
        id: favorite.id,
        index,
        modifiers: [
            RestrictToVerticalAxis, // ソートの軸を垂直に制限
            RestrictToElement.configure({
                element: container, // container要素の範囲内でのみ移動可能にする
            }),
        ],
    });

    useEffect(() => {
        setContainer(containerRef.current);
    }, [containerRef]);

    const handleClick = (): void => {
        setSelectedId((id) => (id === favorite.id ? undefined : favorite.id));
    };

    return (
        <div
            className={`hanko-sortable-item ${selectedId === favorite.id ? "hanko-selected" : ""}`}
            ref={ref}
            onClick={handleClick}
        >
            <Text favorite={favorite} />
            <button className="clickable-icon hanko-touch-none" ref={handleRef}>
                <GripVertical />
            </button>
        </div>
    );
};

const Text = ({ favorite }: { favorite: Favorite }): JSX.Element => {
    const text = favorite.text;
    const str1 = text.substring(0, text.length - favorite.strOffset);
    const str2 = text.substring(text.length - favorite.strOffset);
    return (
        <div className="hanko-flex-1">
            <p className="hanko-m-auto">
                {str1}
                <span className="hanko-border-left">{str2}</span>
            </p>
        </div>
    );
};
