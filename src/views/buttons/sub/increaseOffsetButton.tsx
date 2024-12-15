import { useSetAtom } from "jotai";
import { favoriteListAtom } from "../../atoms";
import { ChevronLeft } from "lucide-react";
import PluginStateRepository from "../../../models/pluginStateRepository";
import PluginContext from "../../../models/pluginContext";
import React from "react";
import Timer from "../../../models/timer";

/**
 * offset数を増加する
 */
const IncreaseOffsetButton = ({
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

                const newList = v.increaseOffset(index);
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
            <ChevronLeft />
        </button>
    );
};

export default IncreaseOffsetButton;
