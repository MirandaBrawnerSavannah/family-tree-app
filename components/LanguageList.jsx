import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import Localizer, { localeList } from '../utils/Localizer';

const LanguageList = ({ locale, onChangeLocale }) => {
  return (
    <header>
      <ul>
        {localeList.map((newLocale) => {
          const localizer = new Localizer(newLocale);
          return (
            <li key={newLocale}>
              <Link href={`/locale/${newLocale}`}>
                <a>{localizer.formatMessage({ id: 'languageName' })}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};
LanguageList.propTypes = {
  locale: PropTypes.string.isRequired,
  onChangeLocale: PropTypes.func.isRequired,
}
export default LanguageList;