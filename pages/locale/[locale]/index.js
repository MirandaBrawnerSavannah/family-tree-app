import { useRouter } from 'next/router'
import LanguageList from '../../../components/LanguageList'
import Localizer from '../../../utils/Localizer';
import Tree from '../../../components/Tree';
import menuStyles from './MainMenu.module.css';

const MainMenu = () => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);

  return (
    <div>
      <LanguageList />
      <main>
        <h1 className={menuStyles.title}>
          {intl.formatMessage({ id: 'createFamilyTree' })}
        </h1>
        <Tree />
      </main>
    </div>
  );
};

export default MainMenu;
