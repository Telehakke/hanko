import { useAtomValue } from "jotai";
import type { Plugin } from "obsidian";
import type { JSX } from "react";
import { selectedIdAtom } from "../atoms";
import { DecrementOffsetButton } from "./sub/DecrementOffsetButton";
import { DeleteButton } from "./sub/DeleteButton";
import { IncreaseOffsetButton } from "./sub/IncrementOffsetButton";

export const Buttons = (props: { plugin: Plugin }): JSX.Element => {
    const selectedId = useAtomValue(selectedIdAtom);
    if (selectedId == null) return <></>;

    const obj = { selectedId };
    return (
        <div className="hanko-row-buttons">
            <IncreaseOffsetButton {...props} {...obj} />
            <DecrementOffsetButton {...props} {...obj} />
            <DeleteButton {...props} {...obj} />
        </div>
    );
};
