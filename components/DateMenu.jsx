import { useRouter } from 'next/router';
import menuStyles from './AddPersonMenu.module.css';
import Localizer from '../utils/Localizer';
import { updateQueryParam } from '../utils/updateQueryParam';

const DateMenu = () => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);
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
          const destination = updateQueryParam({
            path: router.asPath, paramName: 'year', paramValue: year
          });
          router.push(destination);
        }}
      />
    </p>
  );
};
export default DateMenu;