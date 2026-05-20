import { isNotNull, isNumber, isString } from "./typeGuard";

export type Favorite = Readonly<{
    id: number;
    text: string;
    /** 表示される文字単位のオフセット量 */
    intlOffset: number; // strOffsetの算出に使用する
    /** string.length単位のオフセット量 */
    strOffset: number; // カーソル移動で使用する値
}>;

export const isFavorite = (value: unknown): value is Favorite => {
    if (!isNotNull(value)) return false;
    if (!isNumber(value.id)) return false;
    if (!isString(value.text)) return false;
    if (!isNumber(value.intlOffset)) return false;
    if (!isNumber(value.strOffset)) return false;
    return true;
};

export const isFavorites = (value: unknown): value is Favorite[] => {
    if (!Array.isArray(value)) return false;
    return value.every((v) => isFavorite(v));
};
