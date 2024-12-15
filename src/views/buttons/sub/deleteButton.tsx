import { useSetAtom } from "jotai";
import PluginContext from "../../../models/pluginContext";
import PluginStateRepository from "../../../models/pluginStateRepository";
import { favoriteListAtom } from "../../atoms";
import React from "react";

/**
 * チェックが付いている要素を削除する
 */
const DeleteButton = ({
    pluginStateRepository,
}: {
    pluginStateRepository: PluginStateRepository;
}): React.JSX.Element => {
    const setFavoriteList = useSetAtom(favoriteListAtom);

    const handleClick = (): void => {
        setFavoriteList((v) => {
            const newList = v.removedAllCheckedItems();
            PluginContext.favoriteList = newList;
            pluginStateRepository.save(newList.getFavorites());
            return newList;
        });
    };

    return (
        <button className="hanko-flex-1 mod-warning" onClick={handleClick}>
            {PluginContext.translation.delete}
        </button>
    );
};

export default DeleteButton;
