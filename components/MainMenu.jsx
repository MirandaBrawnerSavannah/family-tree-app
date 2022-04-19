import { useRouter } from 'next/router';
import { TreeContext } from './TreeContext';
import Localizer from '../utils/Localizer';
import saveTree from '../utils/saveTree';
import buttonStyles from './Button.module.css';

const MainMenu = () => {
  const router = useRouter();
  return (
    <TreeContext.Consumer>
      {contextValue => {
        const [listOfPeople, setListOfPeople] = contextValue;
        const { locale } = router.query;
        const intl = new Localizer(locale);
        return (
          <div>
            <button
              type="button"
              className={buttonStyles.button}
              onClick={() => saveTree(listOfPeople)}
            >
              {intl.formatMessage({ id: 'save' })}
            </button>
            <input
              type="file"
              className={buttonStyles.button}
              onChange={(event) => {
                event.target.files[0].text().then(
                  (fileContents) => setListOfPeople(JSON.parse(fileContents))
                );
              }}
              
            />
          </div>
        );
      }}
    </TreeContext.Consumer>
  );
};
export default MainMenu;
