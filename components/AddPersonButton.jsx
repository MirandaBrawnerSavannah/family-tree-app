import { useRouter } from 'next/router';
import Localizer from '../utils/Localizer';
import buttonStyles from './Button.module.css';
import { updateQueryParam } from '../utils/updateQueryParam';

const AddPersonButton = () => {
  const router = useRouter();
  const { locale, year: currentYear } = router.query;
  const intl = new Localizer(locale);
  return (
    <div className={buttonStyles.component}>
      <button
        type="button"
        className={buttonStyles.button}
        onClick={() => {
          const path = `/locale/${locale}/newPerson#addPersonMenu`;
          router.push(updateQueryParam({
            path,
            paramName: 'year',
            paramValue: currentYear,
          }));
        }}
      >
        {intl.formatMessage({ id: 'addPerson' })}
      </button>
    </div>
  );
};
export default AddPersonButton;
