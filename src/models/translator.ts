export type Translation = Readonly<{
    hankoRegister: string;
    hankoPaste: string;
    register: string;
    paste: string;
    textWasRegistered: string;
    textIsNotSelected: string;
    textIsUnregistered: string;
    delete: string;
}>;

const translationEN: Translation = {
    hankoRegister: "Hanko: Register",
    hankoPaste: "Hanko: Paste",
    register: "Register",
    paste: "Paste",
    textWasRegistered: "Text was registered.",
    textIsNotSelected: "Text isn't selected.",
    textIsUnregistered: "Text is unregistered.",
    delete: "Delete",
};

const translationJA: Translation = {
    hankoRegister: "Hanko: 登録",
    hankoPaste: "Hanko: 貼り付け",
    register: "登録",
    paste: "貼り付け",
    textWasRegistered: "テキストを登録しました",
    textIsNotSelected: "テキストが選択されていません",
    textIsUnregistered: "テキストが登録されていません",
    delete: "削除",
};

export const getTranslation = (lang: string): Translation => {
    if (lang.startsWith("ja")) return translationJA;
    return translationEN;
};
