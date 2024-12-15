import { atom } from "jotai";
import { FavoriteList } from "./models/favoriteList";

export const favoriteListAtom = atom(FavoriteList.create());
