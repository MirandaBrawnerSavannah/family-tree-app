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

export default Localizer;