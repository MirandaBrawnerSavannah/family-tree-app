import { useRouter } from 'next/router'
import LanguageList from '../../../components/LanguageList'
import Localizer from '../../../utils/Localizer';
import data from '../../API/data.json';

const MainMenu = () => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);

  return (
    <div>
      <LanguageList />
      <h1>{intl.formatMessage({ id: 'createFamilyTree' })}</h1>
      <ul>
        {data.map((person) => (
          <li key={person.id}>{person.fullName}</li>
        ))}
      </ul>
    </div>
  );
};

export default MainMenu;
