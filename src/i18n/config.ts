import i18n from 'i18next';
import en from './locales/en/translation.json';
import hr from './locales/hr/translation.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
    en: {
        common: en
    },
    hr: {
        common: hr
    }
} as const;

i18n.use(initReactI18next).init({
    lng: 'en',
    interpolation: {
        escapeValue: false
    },
    resources
});
