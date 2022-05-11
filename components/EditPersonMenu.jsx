import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import menuStyles from './AddPersonMenu.module.css';
import Localizer from '../utils/Localizer';
import lookupPerson from '../utils/lookupPerson';
import updatePerson from '../utils/updatePerson';
import { updateQueryParam } from '../utils/updateQueryParam';

const EditPersonMenu = ({ personNumber, listOfPeople, setListOfPeople }) => {
  const router = useRouter();
  const { locale, year: currentYear } = router.query;
  const intl = new Localizer(locale);
  const person = lookupPerson({ personNumber, data: listOfPeople });
  const [fullName, setFullName] = useState(person ? person.fullName : undefined);
  const [born, setBorn] = useState(
    person && person.born ? person.born : { year: 1900, month: 1, day: 1 }
  );
  const [isAlive, setIsAlive] = useState(person ? !person.died : true);
  const [died, setDied] = useState(
    person && person.died ? person.died : { year: 2000, month: 1, day: 1 }
  );
  const [parents, setParents] = useState(person ? person.parents : undefined);
  const [marriedTo, setMarriedTo] = useState(person ? person.marriedTo: undefined);
  const [children, setChildren] = useState(person ? person.children: undefined);
  const temporalize = (basePath) => (
    updateQueryParam({
      path: basePath,
      paramName: 'year',
      paramValue: currentYear,
    })
  );
  useEffect(() => {
    setFullName(person ? person.fullName: undefined);
    setIsAlive(person ? !person.died : true);
    setBorn(
      person && person.born ? person.born : { year: 1900, month: 1, day: 1 }
    );
    setDied(
      person && person.died ? person.died : { year: 2000, month: 1, day: 1 }
    );
    setParents(person && person.parents ? person.parents : []);
    setMarriedTo(person && person.marriedTo ? person.marriedTo: []);
    setChildren(person && person.children ? person.children: []);
  }, [person, personNumber, listOfPeople]);
  if (person === undefined) return null;
  const monthNames = intl.formatMessage({ id: 'monthNames' }).split(',');
  return (
    <div className={menuStyles.menu} id="addPersonMenu">
      <h2 className={menuStyles.title}>
        {fullName || intl.formatMessage({ id: 'newPerson' })}
      </h2>
      <p>
        <label htmlFor="fullNameInput" className={menuStyles.textFieldLabel}>
          {intl.formatMessage({ id: 'fullName' })}
        </label>
        <input
          type="text"
          id="fullNameInput"
          className={menuStyles.textField}
          value={fullName} 
          onChange={(event) => setFullName(event.target.value)}
        />
      </p>
      <div className={menuStyles.inputSection}>
        <h3 className={menuStyles.smallTitle}>
          {intl.formatMessage({ id: 'dateOfBirth' })}
        </h3>
        <p>
          <label htmlFor="birthYearInput" className={menuStyles.textFieldLabel}>
            {intl.formatMessage({ id: 'year' })}
          </label>
          <input
            type="text"
            id="birthYearInput"
            value={born.year}
            className={menuStyles.textField}
            onChange={(event) => setBorn({...born, year: event.target.value})}
          />
        </p>
        <p>
          <label htmlFor="birthMonthInput" className={menuStyles.textFieldLabel}>
            {intl.formatMessage({ id: 'month' })}
          </label>
          <select
            id="birthMonthInput"
            value={born.month}
            className={menuStyles.dropDownMenu}
            onChange={(event) => setBorn({...born, month: event.target.value})}
          >
            {monthNames.map((monthName, index) => (
              <option
                value={index + 1}
                key={monthName}
              >
                {monthName}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label htmlFor="birthDayInput" className={menuStyles.textFieldLabel}>
            {intl.formatMessage({ id: 'day' })}
          </label>
          <input
            type="number"
            min={1}
            max={31}
            value={born.day}
            id="birthDayInput"
            className={menuStyles.textField}
            onChange={(event) => setBorn({...born, day: event.target.value})}
          />
        </p>
      </div>
      <div className={menuStyles.inputSection}>
        <h3 className={menuStyles.smallTitle}>
          {intl.formatMessage({ id: 'dateOfDeath' })}
        </h3>
        <p>
          <label htmlFor="stillAliveInput" className={menuStyles.checkboxLabel}>
              {intl.formatMessage({ id: 'alive' })}
          </label>
          <input
            type="checkbox"
            id="stillAliveInput"
            checked={isAlive}
            className={menuStyles.checkbox}
            onChange={() => setIsAlive(!isAlive)} />
        </p>
        <p>
          <label htmlFor="deathYearInput" className={menuStyles.textFieldLabel}>
            {intl.formatMessage({ id: 'year' })}
          </label>
          <input
            type="text"
            id="deathYearInput"
            value={died.year}
            className={menuStyles.textField}
            disabled={isAlive}
            onChange={(event) => setDied({...died, year: event.target.value})}
          />
        </p>
        <p>
          <label htmlFor="deathMonthInput" className={menuStyles.textFieldLabel}>
            {intl.formatMessage({ id: 'month' })}
          </label>
          <select
            id="deathMonthInput"
            value={died.month}
            className={menuStyles.dropDownMenu}
            disabled={isAlive}
            onChange={(event) => setDied({...died, month: event.target.value})}
          >
            {monthNames.map((monthName, index) => (
              <option
                value={index + 1}
                key={monthName}
              >
                {monthName}
              </option>
            ))}
          </select>
        </p>
        <p>
          <label htmlFor="deathDayInput" className={menuStyles.textFieldLabel}>
            {intl.formatMessage({ id: 'day' })}
          </label>
          <input
            type="number"
            min={1}
            max={31}
            value={died.day}
            id="deathDayInput"
            className={menuStyles.textField}
            disabled={isAlive}
            onChange={(event) => setDied({...died, day: event.target.value})}
          />
        </p>
      </div>
      <div className={menuStyles.inputSection}>
        <h3 className={menuStyles.smallTitle}>
          {intl.formatMessage({ id: 'relatives' })}
        </h3>
        <p>{intl.formatMessage({ id: 'parents' })}</p>
        <div className={menuStyles.scrollableSection}>
          {listOfPeople.map((person) => (
            <p className={menuStyles.personCheckboxLine} key={person.id}>
              <label
                htmlFor={`parentCheckbox${person.id}`}
                className={menuStyles.checkboxLabel}
              >
                {person.fullName}
              </label>
              <input
                type="checkbox"
                id={`parentCheckbox${person.id}`}
                checked={parents && parents.includes(person.id)}
                className={menuStyles.checkbox}
                onChange={(event) => {
                  if (event.target.checked) {
                    setParents([...parents, person.id]);
                  } else {
                    setParents(parents.filter(
                      (currentId) => currentId !== person.id
                    ));
                  }
                }}
              />
            </p>
          ))}
        </div>
        <p>{intl.formatMessage({ id: 'marriedTo' })}</p>
        <div className={menuStyles.scrollableSection}>
          {listOfPeople.map((person) => (
            <p className={menuStyles.personCheckboxLine} key={person.id}>
              <label
                htmlFor={`spouseCheckbox${person.id}`}
                className={menuStyles.checkboxLabel}
              >
                {person.fullName}
              </label>
              <input
                type="checkbox"
                id={`spouseCheckbox${person.id}`}
                checked={marriedTo && marriedTo.map(
                  (marriage) => marriage.spouse
                ).includes(person.id)}
                className={menuStyles.checkbox}
                onChange={(event) => {
                  if (event.target.checked) {
                    setMarriedTo([...marriedTo, { spouse: person.id }]);
                  } else {
                    setMarriedTo(marriedTo.filter(
                      (marriage) => marriage.spouse !== person.id
                    ));
                  }
                }}
              />
            </p>
          ))}
        </div>
        <p>{intl.formatMessage({ id: 'children' })}</p>
        <div className={menuStyles.scrollableSection}>
          {listOfPeople.map((person) => (
            <p className={menuStyles.personCheckboxLine} key={person.id}>
              <label
                htmlFor={`childrenCheckbox${person.id}`}
                className={menuStyles.checkboxLabel}
              >
                {person.fullName}
              </label>
              <input
                type="checkbox"
                id={`childrenCheckbox${person.id}`}
                checked={children && children.includes(person.id)}
                className={menuStyles.checkbox}
                onChange={(event) => {
                  if (event.target.checked) {
                    setChildren([...children, person.id]);
                  } else {
                    setChildren(children.filter(
                      (currentId) => currentId !== person.id
                    ));
                  }
                }}
              />
            </p>
          ))}
        </div>
      </div>
      <p>
        <button
          type="button"
          className={menuStyles.button}
          onClick={() => {
            const basePath = `/locale/${locale}/person/${personNumber}`
            const pathWithQueryParams = temporalize(basePath);
            router.push(pathWithQueryParams);
          }}
        >
          {intl.formatMessage({ id: 'cancel' })}
        </button>
        <button
          type="button"
          className={menuStyles.button}
          onClick={() => {
            const updatedPerson = {
              ...person,
              fullName,
              born,
              died: isAlive ? undefined : died,
              parents,
              marriedTo,
              children,
            }
            const newList = updatePerson(
              { person: updatedPerson, data: listOfPeople }
            );
            setListOfPeople(newList);
            const basePath = `/locale/${locale}/person/${personNumber}`;
            const pathWithQueryParams = temporalize(basePath);
            router.push(pathWithQueryParams);
          }}
        >
          {intl.formatMessage({ id: 'updateTree' })}
        </button>
      </p>
    </div>
  );
};
export default EditPersonMenu;
