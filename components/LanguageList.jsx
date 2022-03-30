import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import Localizer, { localeList } from '../utils/Localizer';

const LanguageList = ({ locale, onChangeLocale }) => {
  return (
    <header>
      <select
        value={locale}
        onChange={(event) => onChangeLocale(event.target.value)}
      >
        {localeList.map((newLocale) => {
          const localizer = new Localizer(newLocale);
          return (
            <option value={newLocale} key={newLocale}>
              {localizer.formatMessage({ id: 'languageName' })}
            </option>
          );
        })}
      </select>
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link href="/locale/first">
            <a>First Locale</a>
          </Link>
        </li>
        <li>
          <Link href="/locale/second">
            <a>Second Locale</a>
          </Link>
        </li>
      </ul>
    </header>
  );
};
LanguageList.propTypes = {
  locale: PropTypes.string.isRequired,
  onChangeLocale: PropTypes.func.isRequired,
}
export default LanguageList;