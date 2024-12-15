import { useSetAtom } from "jotai";
import React from "react";
import { favoriteListAtom } from "./atoms";
import PluginStateRepository from "../models/pluginStateRepository";
import FavoriteListView from "./favoriteListView/favoriteListView";
import Buttons from "./buttons/buttons";
import PluginContext from "../models/pluginContext";

const App = ({
    pluginStateRepository,
}: {
    pluginStateRepository: PluginStateRepository;
}): React.JSX.Element => {
    const setFavoriteList = useSetAtom(favoriteListAtom);
    setFavoriteList(PluginContext.favoriteList.uncheckedAll());

    return (
        <>
            <FavoriteListView pluginStateRepository={pluginStateRepository} />
            <Buttons pluginStateRepository={pluginStateRepository} />
        </>
    );
};

export default App;
