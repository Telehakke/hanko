const isNotNull = (value: unknown): value is Record<string, unknown> => {
    return value != null;
};

/* -------------------------------------------------------------------------- */
export const FavoriteKey = {
    id: "id",
    text: "text",
    intlOffset: "intlOffset",
    strOffset: "strOffset",
} as const;

export type Favorite = {
    readonly id: number;
    readonly text: string;
    readonly intlOffset: number; // 表示される文字数単位のオフセット量
    readonly strOffset: number; // 文字列のlength単位のオフセット量
};

export const isFavorite = (value: unknown): value is Favorite => {
    if (!isNotNull(value)) return false;
    if (typeof value[FavoriteKey.id] !== "number") return false;
    if (typeof value[FavoriteKey.text] !== "string") return false;
    if (typeof value[FavoriteKey.intlOffset] !== "number") return false;
    if (typeof value[FavoriteKey.strOffset] !== "number") return false;
    return true;
};

export const isFavorites = (value: unknown): value is Favorite[] => {
    if (!Array.isArray(value)) return false;
    return value.every((v) => isFavorite(v));
};

/* -------------------------------------------------------------------------- */

export const PluginStateKey = {
    favorites: "favorites",
} as const;

export type PluginState = {
    readonly favorites: Favorite[];
};

export const isPluginState = (value: unknown): value is PluginState => {
    if (!isNotNull(value)) return false;
    if (!isFavorites(value[PluginStateKey.favorites])) return false;
    return true;
};
