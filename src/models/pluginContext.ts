import { moment } from "obsidian";
import Translator from "./translator";
import { FavoriteList } from "../views/models/favoriteList";

export default class PluginContext {
    static readonly translation = Translator.getTranslation(moment.locale());
    static favoriteList = FavoriteList.create();
}
