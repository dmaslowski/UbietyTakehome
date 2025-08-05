import { i18nLocale } from "@/assets/localization/i18n/i18nConfig";
import { StringKeys } from "../../assets/localization/StringKeys";

type DotNotation<T, Prev extends string = ""> = {
    [K in keyof T]: T[K] extends object
    ? DotNotation<T[K], `${Prev}${Extract<K, string>}.`>
    : `${Prev}${Extract<K, string>}`
}[keyof T];

// This will produce: "HomeScreen.title" | "SettingsScreen.title"
export type TranslationKey = DotNotation<StringKeys>;

export const useLocalization = () => {

    const translate = (key: TranslationKey): string => {
        return i18nLocale.t(key);
    }

    return { translate }
};