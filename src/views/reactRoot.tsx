import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PluginStateRepository from "../models/pluginStateRepository";
import App from "./app";

const ReactRoot = (
    element: HTMLElement,
    pluginStateRepository: PluginStateRepository
): void => {
    createRoot(element).render(
        <StrictMode>
            <App pluginStateRepository={pluginStateRepository} />
        </StrictMode>
    );
};

export default ReactRoot;
