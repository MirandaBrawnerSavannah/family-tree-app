import { useRouter } from 'next/router'
import Link from 'next/link'
import LanguageList from '../../../components/LanguageList'
import Localizer from '../../../utils/Localizer';

const MainMenu = () => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);

  return (
    <div>
      <LanguageList />
      <h1>{intl.formatMessage({ id: 'createFamilyTree' })}</h1>
      <ul>
      </ul>
    </div>
  );
};

export default MainMenu;
