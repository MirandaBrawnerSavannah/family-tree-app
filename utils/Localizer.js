import * as dateLocales from 'date-fns/locale';
import english from '../locales/en.json';
import french from '../locales/fr.json';

const getTranslations = (locale) => {
  switch(locale) {
    case 'en': return english;
    case 'fr': return french;
    default: return english;
  }
};

class Localizer {
  constructor(locale) {
    this.locale = locale;
    this.translations = getTranslations(locale);
  }
  formatMessage({ id }) {
    return this.translations[id];
  }
};

export const localeList = [
  'en', 'fr',
];

export const defaultCountries = {
  en: 'US',
  fr: 'FR',
};

export const getDateInfo = (locale) => {
  const generalLocaleInfo = dateLocales[locale];
  if (generalLocaleInfo !== undefined) {
    return generalLocaleInfo;
  }
  const country = defaultCountries[locale]
  if (country !== undefined) {
    const localeWithCountry = `${locale}${country}`; // example: enUS
    const localeWithCountryInfo = dateLocales[localeWithCountry];
    if (localeWithCountryInfo !== undefined) {
      return localeWithCountryInfo;
    }
  }
  return dateLocales.enUS;
}

export default Localizer;