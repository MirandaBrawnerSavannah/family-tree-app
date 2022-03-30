import React from 'react';
import Link from 'next/link'
import Localizer, { localeList } from '../utils/Localizer';
import languageStyles from './LanguageList.module.css';

const LanguageList = () => {
  return (
    <header>
      <ul>
        {localeList.map((newLocale) => {
          const localizer = new Localizer(newLocale);
          return (
            <li key={newLocale} className={languageStyles.languageName}>
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
export default LanguageList;