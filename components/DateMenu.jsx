import { useRouter } from 'next/router';
import QueryParamsContext from './QueryParamsContext';
import menuStyles from './AddPersonMenu.module.css';
import Localizer from '../utils/Localizer';

const DateMenu = () => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);
  console.log('Router:');
  console.log(router);
  const { query } = router;
  return (
    <p>
      <label htmlFor="currentYearInput" className={menuStyles.textFieldLabel}>
        {intl.formatMessage({ id: 'year' })}
      </label>
      <input
        type="text"
        id="currentYearInput"
        value={query.year}
        className={menuStyles.textField}
        onChange={(event) => {
          const year = event.target.value;
          router.push(`/locale/${locale}?year=${year}`);
        }}
      />
    </p>
  );
};
export default DateMenu;