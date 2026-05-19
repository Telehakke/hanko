import { isNotNull } from "./typeGuard";
import { isFavorites, type Favorite } from "./types";

export type PluginState = Readonly<{
    favorites: readonly Favorite[];
}>;

export const createPluginState = (value: unknown): PluginState => {
    if (!isNotNull(value)) return { favorites: [] };

    const v = value as PluginState;
    return {
        favorites: ensureFavorites(v.favorites),
    };
};

const ensureFavorites = (value: unknown): Favorite[] => {
    return isFavorites(value) ? value : [];
};
