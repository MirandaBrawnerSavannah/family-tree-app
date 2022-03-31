import { useRouter } from 'next/router';
import Localizer from '../utils/Localizer';
import titleStyles from './Title.module.css';

const Title = () => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);
  return (
    <h1 className={titleStyles.title}>
      {intl.formatMessage({ id: 'createFamilyTree' })}
    </h1>
  );
};
export default Title;