import { atom } from "jotai";
import { FavoriteManager } from "../models/favoriteManager";

export const favoriteManagerAtom = atom(new FavoriteManager());
export const selectedIdAtom = atom<number | undefined>(undefined);
