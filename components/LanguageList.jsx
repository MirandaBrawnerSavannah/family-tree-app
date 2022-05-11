import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import Localizer, { localeList } from '../utils/Localizer';
import languageStyles from './LanguageList.module.css';
import { updateQueryParam } from '../utils/updateQueryParam';

const LanguageList = () => {
  const router = useRouter();
  const { personNumber, year: currentYear } = router.query;
  const temporalize = (basePath) => (
    updateQueryParam({
      path: basePath,
      paramName: 'year',
      paramValue: currentYear,
    })
  );
  return (
    <header>
      <ul>
        {localeList.map((newLocale) => {
          const localizer = new Localizer(newLocale);
          const baseLocale = `/locale/${newLocale}`;
          let href = baseLocale;
          if (personNumber !== undefined) {
            href = `${baseLocale}/person/${personNumber}`;
          }
          href = temporalize(href);
          return (
            <li key={newLocale} className={languageStyles.languageName}>
              <span className={languageStyles.languageLink}>
                <Link href={href}>
                  {localizer.formatMessage({ id: 'languageName' })}
                </Link>
              </span>
            </li>
          );
        })}
      </ul>
    </header>
  );
};
export default LanguageList;