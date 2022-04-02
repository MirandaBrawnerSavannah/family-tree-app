import { useState } from 'react';
import { useRouter } from 'next/router';
import { TreeContext } from './TreeContext';
import menuStyles from './AddPersonMenu.module.css';
import Localizer from '../utils/Localizer';
import getNextAvailableID from '../utils/getNextAvailableID';
import addPerson from '../utils/addPerson';

const AddPersonMenu = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  return (
    <TreeContext.Consumer>
      { contextValue => {
        const [listOfPeople, setListOfPeople] = contextValue;
        const { locale } = router.query;
        const intl = new Localizer(locale);
        const nextId = getNextAvailableID(listOfPeople);
        return (
          <div className={menuStyles.menu} id="addPersonMenu">
            <h2 className={menuStyles.title}>
              {intl.formatMessage({ id: 'newPerson' })}
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
            <p>
              <button
                type="button"
                className={menuStyles.button}
                onClick={() => {
                  router.push(`/locale/${locale}`);
                }}
              >
                {intl.formatMessage({ id: 'cancel' })}
              </button>
              <button
                type="button"
                className={menuStyles.button}
                onClick={() => {
                  const newPerson = {
                    id: nextId,
                    fullName,
                    born: {
                      year: 1922,
                      month: 12,
                      day: 5
                    },
                    died: {
                      year: 2000,
                      month: 1,
                      day: 7
                    },
                    parents: [10, 11],
                    children: [5],
                    marriedTo: [{
                      spouse: 7,
                    }],
                  }
                  const newList = addPerson({ newPerson, data: listOfPeople });
                  setListOfPeople(newList);
                  router.push(`/locale/${locale}`);
                }}
              >
                {intl.formatMessage({ id: 'updateTree' })}
              </button>
            </p>
          </div>
        );
      }}
    </TreeContext.Consumer>
  );
};
export default AddPersonMenu;
