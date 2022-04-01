import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { format } from 'date-fns';
import profileStyles from './PersonProfile.module.css';
import getUncertainDate from '../utils/getUncertainDate';
import Localizer, { getDateInfo } from '../utils/Localizer';
import lookupPerson from '../utils/lookupPerson';
import CommaSeparatedList from '../components/CommaSeparatedList';

const PersonProfile = () => {
  const router = useRouter();
  const { locale, personNumber } = router.query;
  const intl = new Localizer(locale);
  const person = lookupPerson(personNumber);
  if (person === undefined) {
    return null;
  }
  const dateLocaleInfo = getDateInfo(locale);
  const birthDate = getUncertainDate(person.born);
  const deathDate = getUncertainDate(person.died);
  return (
    <div className={profileStyles.profile} id="profile">
      <h2 className={profileStyles.nameHeading}>{person.fullName}</h2>
      {birthDate && (
        <p>
          <span className={profileStyles.infoLabel}>
            {intl.formatMessage({ id: 'born' })}
          </span>
          {format(birthDate, 'PPP', { locale: dateLocaleInfo })}
        </p>
      )}
      {deathDate && (
        <p>
          <span className={profileStyles.infoLabel}>
            {intl.formatMessage({ id: 'died' })}
          </span>
          {format(deathDate, 'PPP', { locale: dateLocaleInfo })}
        </p>
      )}
      {person.parents && (
        <p>
          <span className={profileStyles.infoLabel}>
            {intl.formatMessage({ id: 'parents' })}
          </span>
          <CommaSeparatedList list={
            person.parents.map((parentId) => {
              const parent = lookupPerson(parentId);
              return (
                <span
                  key={parentId}
                  className={profileStyles.personLink}
                >
                  <Link href={`/locale/${locale}/person/${parentId}#profile`}>
                    {parent.fullName}
                  </Link>
                </span>
              );
            })
          } />
        </p>
      )}
      {person.marriedTo && (
        <p>
          <span className={profileStyles.infoLabel}>
            {intl.formatMessage({ id: 'marriedTo' })}
          </span>
          <CommaSeparatedList list={
            person.marriedTo.map((marriage) => {
              const spouseId = marriage.spouse;
              const spouse = lookupPerson(spouseId);
              return (
                <span
                  key={spouseId}
                  className={profileStyles.personLink}
                >
                  <Link href={`/locale/${locale}/person/${spouseId}#profile`}>
                    {spouse.fullName}
                  </Link>
                </span>
              );
            })
          } />
        </p>
      )}
      {person.children && (
        <p>
          <span className={profileStyles.infoLabel}>
            {intl.formatMessage({ id: 'children' })}
          </span>
          <CommaSeparatedList list={
            person.children.map((childId) => {
              const child = lookupPerson(childId);
              return (
                <span
                  key={childId}
                  className={profileStyles.personLink}
                >
                  <Link href={`/locale/${locale}/person/${childId}#profile`}>
                    {child.fullName}
                  </Link>
                </span>
              );
            })
          } />
        </p>
      )}
    </div>
  );
};
export default PersonProfile;
