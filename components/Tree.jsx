import { useState } from 'react';
import { useRouter } from 'next/router'
import Localizer from '../utils/Localizer';
import data from '../pages/API/data.json';
import PersonProfile from './PersonProfile';
import treeStyles from './Tree.module.css';

const Tree = () => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);
  const [ selectedPerson, setSelectedPerson ] = useState(undefined);
  return (
    <div>
      <div>
        {data.map((person) => (
          <p key={person.id} className={treeStyles.personName}>
            {person.fullName}
            <button
              className={treeStyles.inspectButton}
              onClick={() => setSelectedPerson(person)}
            >
              {intl.formatMessage({ id: 'viewVerb' })}
            </button>
          </p>
        ))}
      </div>
      { selectedPerson && (
        <PersonProfile person={selectedPerson} />
      )}
    </div>
  );
};
export default Tree;