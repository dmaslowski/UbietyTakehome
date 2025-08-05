import { getLocales } from "expo-localization";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './languageTranslations/en.json';
import es from './languageTranslations/es.json';


const getDeviceLanguage = (): string => {
    const locales = getLocales();
    return locales[0]?.languageTag || 'en';
};

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        es: { translation: es }
    },
    lng: getDeviceLanguage(),
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export const i18nLocale = i18n;