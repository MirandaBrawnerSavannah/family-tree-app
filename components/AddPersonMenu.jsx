import { useRouter } from 'next/router';
import { TreeContext } from './TreeContext';
import menuStyles from './AddPersonMenu.module.css';
import Localizer from '../utils/Localizer';

const AddPersonMenu = () => {
  const router = useRouter();
  return (
    <TreeContext.Consumer>
      { contextValue => {
        const [listOfPeople, setListOfPeople] = contextValue;
        const { locale } = router.query;
        const intl = new Localizer(locale);
        return (
          <div className={menuStyles.menu} id="addPersonMenu">
            <h2 className={menuStyles.title}>
              {intl.formatMessage({ id: 'newPerson' })}
            </h2>
          </div>
        );
      }}
    </TreeContext.Consumer>
  );
};
export default AddPersonMenu;
