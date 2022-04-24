import { useRouter } from 'next/router';
import { TreeContext } from './TreeContext';
import EditPersonMenu from './EditPersonMenu';

const EditMenuWrapper = () => {
  const router = useRouter();
  const { personNumber } = router.query;
  return (
    <TreeContext.Consumer>
      { contextValue => {
        const [treeState, setTreeState] = contextValue;
        const { listOfPeople } = treeState;
        const setListOfPeople = (newListOfPeople) => {
          const newTreeState = {...treeState, listOfPeople: newListOfPeople };
          setTreeState(newTreeState);
        };
        return (
          <EditPersonMenu
            personNumber={personNumber}
            listOfPeople={listOfPeople}
            setListOfPeople={setListOfPeople}
          />
        );
      }}
    </TreeContext.Consumer>
  );
};
export default EditMenuWrapper;
