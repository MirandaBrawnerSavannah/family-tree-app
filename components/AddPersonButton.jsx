import { useRouter } from 'next/router';
import Localizer from '../utils/Localizer';
import buttonStyles from './AddPersonButton.module.css';

const AddPersonButton = () => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);
  return (
    <div className={buttonStyles.component}>
      <button
        type="button"
        className={buttonStyles.addButton}
        onClick={() => {
          router.push(`/locale/${locale}/newPerson#addPersonMenu`);
        }}
      >
        {intl.formatMessage({ id: 'addPerson' })}
      </button>
    </div>
  );
};
export default AddPersonButton;
