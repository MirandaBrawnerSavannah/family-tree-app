import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { format } from 'date-fns';
import profileStyles from './PersonProfile.module.css';
import getUncertainDate from '../utils/getUncertainDate';
import Localizer, { getDateInfo } from '../utils/Localizer';
import lookupPerson from '../utils/lookupPerson';
import CommaSeparatedList from '../components/CommaSeparatedList';
import { TreeContext } from './TreeContext';
import removeFromTree from '../utils/removeFromTree';

const PersonProfile = () => {
  const router = useRouter();
  return (
    <TreeContext.Consumer>
      { contextValue => {
        const [listOfPeople, setListOfPeople] = contextValue;
        const { locale, personNumber } = router.query;
        const intl = new Localizer(locale);
        const person = lookupPerson({ personNumber, data: listOfPeople });
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
            {person.parents && person.parents.length > 0 && (
              <p>
                <span className={profileStyles.infoLabel}>
                  {intl.formatMessage({ id: 'parents' })}
                </span>
                <CommaSeparatedList list={
                  person.parents.map((parentId) => {
                    const parent = lookupPerson(
                      { personNumber: parentId, data: listOfPeople }
                    );
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
            {person.marriedTo && person.marriedTo.length > 0 && (
              <p>
                <span className={profileStyles.infoLabel}>
                  {intl.formatMessage({ id: 'marriedTo' })}
                </span>
                <CommaSeparatedList list={
                  person.marriedTo.map((marriage) => {
                    const spouseId = marriage.spouse;
                    const spouse = lookupPerson(
                      { personNumber: spouseId, data: listOfPeople }
                    );
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
            {person.children && person.children.length > 0 && (
              <p>
                <span className={profileStyles.infoLabel}>
                  {intl.formatMessage({ id: 'children' })}
                </span>
                <CommaSeparatedList list={
                  person.children.map((childId) => {
                    const child = lookupPerson(
                      { personNumber: childId, data: listOfPeople }
                    );
                    if (child === undefined) return undefined;
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
                  }).filter((element) => element !== undefined)
                } />
              </p>
            )}
            <p>
              <button className={profileStyles.button} onClick={() => {
                const newList = removeFromTree({ personId: 4, data: listOfPeople });
                setListOfPeople(newList);
              }}>
                {intl.formatMessage({ id: 'removeFromTree' })}
              </button>
            </p>
          </div>
        );
      }}
    </TreeContext.Consumer>
  );
};
export default PersonProfile;
