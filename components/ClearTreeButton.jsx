import { useRouter } from 'next/router';
import Localizer from '../utils/Localizer';
import { TreeContext } from './TreeContext';
import buttonStyles from './Button.module.css';

const ClearTreeButton = () => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);
  return (
    <TreeContext.Consumer>
      { contextValue => {
        const [listOfPeople, setListOfPeople] = contextValue;
        return (
          <div className={buttonStyles.component}>
            <button
              type="button"
              className={buttonStyles.button}
              onClick={() => {
                setListOfPeople([]);
                router.push(`/locale/${locale}`);
              }}
            >
              {intl.formatMessage({ id: 'newEmptyTree' })}
            </button>
          </div>
        );
      }}
    </TreeContext.Consumer>
  )
}
export default ClearTreeButton;
