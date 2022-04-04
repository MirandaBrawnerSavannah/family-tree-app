import LanguageList from '../../../components/LanguageList'
import Title from '../../../components/Title';
import Tree from '../../../components/Tree';
import AddPersonButton from '../../../components/AddPersonButton';
import ClearTreeButton from '../../../components/ClearTreeButton';

const MainMenu = () => {
  return (
    <div>
      <LanguageList />
      <main>
        <Title />
        <Tree />
        <AddPersonButton />
        <ClearTreeButton />
      </main>
    </div>
  );
};
export default MainMenu;
