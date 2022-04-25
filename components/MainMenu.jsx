import { useRouter } from 'next/router';
import { TreeContext } from './TreeContext';
import Localizer from '../utils/Localizer';
import saveAs from '../utils/saveAs';
import buttonStyles from './Button.module.css';

const MainMenu = () => {
  const router = useRouter();
  return (
    <TreeContext.Consumer>
      {contextValue => {
        const [treeState, setTreeState] = contextValue;
        const { locale } = router.query;
        const intl = new Localizer(locale);
        return (
          <div>
            <button
              type="button"
              className={buttonStyles.button}
              onClick={() => saveAs(treeState)}
            >
              {intl.formatMessage({ id: 'save' })}
            </button>
            <input
              id="file-selector"
              type="file"
              className={buttonStyles.button}
              onChange={(event) => {
                event.target.files[0].text().then(
                  (fileContents) => setTreeState(JSON.parse(fileContents))
                );
              }}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className={buttonStyles.button}
              onClick={() => {
                const fileSelector = document.getElementById('file-selector');
                fileSelector.click();
              }}
            >
              {intl.formatMessage({ id: 'load' })}
            </button>
          </div>
        );
      }}
    </TreeContext.Consumer>
  );
};
export default MainMenu;
