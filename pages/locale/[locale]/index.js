import React, { useState } from 'react';
import { useRouter } from 'next/router'
import LanguageList from '../../../components/LanguageList'
import Localizer from '../../../utils/Localizer';
import data from '../../API/data.json';
import PersonProfile from '../../../components/PersonProfile';

const MainMenu = () => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);
  const [ selectedPerson, setSelectedPerson ] = useState('undefined');

  return (
    <div>
      <LanguageList />
      <main>
      <h1>{intl.formatMessage({ id: 'createFamilyTree' })}</h1>
        <div>
          <div>
            {data.map((person) => (
              <p key={person.id}>
                {person.fullName}
                <button onClick={() => setSelectedPerson(person)}>
                  {intl.formatMessage({ id: 'viewVerb' })}
                </button>
              </p>
            ))}
          </div>
          { selectedPerson && (
            <PersonProfile person={selectedPerson} />
          )}
        </div>
      </main>
    </div>
  );
};

export default MainMenu;
