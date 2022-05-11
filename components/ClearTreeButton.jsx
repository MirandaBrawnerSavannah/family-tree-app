import { useRouter } from 'next/router';
import Localizer from '../utils/Localizer';
import { TreeContext } from './TreeContext';
import buttonStyles from './Button.module.css';
import { updateQueryParam } from '../utils/updateQueryParam';

const ClearTreeButton = () => {
  const router = useRouter();
  const { locale, year: currentYear } = router.query;
  const intl = new Localizer(locale);
  const temporalize = (basePath) => (
    updateQueryParam({
      path: basePath,
      paramName: 'year',
      paramValue: currentYear,
    })
  );
  return (
    <TreeContext.Consumer>
      { contextValue => {
        const [treeState, setTreeState] = contextValue;
        return (
          <div className={buttonStyles.component}>
            <button
              type="button"
              className={buttonStyles.button}
              onClick={() => {
                const emptyListOfPeople = [];
                const newTreeState = {...treeState, listOfPeople: emptyListOfPeople };
                setTreeState(newTreeState);
                const destination = temporalize(`/locale/${locale}`)
                router.push(destination);
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
