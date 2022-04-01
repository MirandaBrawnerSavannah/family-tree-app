import { useRouter } from 'next/router'
import LanguageList from '../../../../../components/LanguageList';
import Title from '../../../../../components/Title';
import Tree from '../../../../../components/Tree';
import PersonProfile from '../../../../../components/PersonProfile';

const PersonPage = () => {
  const router = useRouter();
  const { locale, personNumber } = router.query;

  return (
    <div>
      <LanguageList />
      <main>
        <Title />
        <Tree />
        <PersonProfile />
      </main>
    </div>
  );
};

export default PersonPage;