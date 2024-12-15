import PluginStateRepository from "../../models/pluginStateRepository";
import { useAtomValue } from "jotai";
import { favoriteListAtom } from "../atoms";
import React from "react";
import DeleteButton from "./sub/deleteButton";
import DecreaseOffsetButton from "./sub/decreaseOffsetButton";
import IncreaseOffsetButton from "./sub/increaseOffsetButton";

const Buttons = ({
    pluginStateRepository,
}: {
    pluginStateRepository: PluginStateRepository;
}): React.JSX.Element => {
    const favoriteList = useAtomValue(favoriteListAtom);

    return (
        <>
            {favoriteList.hasChecked() && (
                <div className="hanko-row-buttons">
                    <IncreaseOffsetButton
                        pluginStateRepository={pluginStateRepository}
                    />
                    <DecreaseOffsetButton
                        pluginStateRepository={pluginStateRepository}
                    />
                    <DeleteButton
                        pluginStateRepository={pluginStateRepository}
                    />
                </div>
            )}
        </>
    );
};

export default Buttons;
