import { useSetAtom } from "jotai";
import { favoriteListAtom } from "../../atoms";
import { ChevronRight } from "lucide-react";
import PluginContext from "../../../models/pluginContext";
import PluginStateRepository from "../../../models/pluginStateRepository";
import React from "react";
import Timer from "../../../models/timer";

/**
 * offset数を減少する
 */
const DecreaseOffsetButton = ({
    pluginStateRepository,
}: {
    pluginStateRepository: PluginStateRepository;
}): React.JSX.Element => {
    const setFavoriteList = useSetAtom(favoriteListAtom);

    const handleMouseDown = (): void => {
        Timer.run(() => {
            setFavoriteList((v) => {
                const index = v.findIndexByChecked();
                if (index == null) return v;

                const newList = v.decreaseOffset(index);
                PluginContext.favoriteList = newList;
                pluginStateRepository.save(newList.getFavorites());
                return newList;
            });
        });
    };

    const handleMouseUp = (): void => {
        Timer.reset();
    };

    const handleTouchEnd: React.TouchEventHandler<HTMLButtonElement> = (
        event
    ) => {
        event.preventDefault();
        Timer.reset();
    };

    return (
        <button
            className="hanko-flex-1"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchEnd={handleTouchEnd}
        >
            <ChevronRight />
        </button>
    );
};

export default DecreaseOffsetButton;
