import LanguageList from '../../../components/LanguageList'
import Title from '../../../components/Title';
import Tree from '../../../components/Tree';
import AddPersonButton from '../../../components/AddPersonButton';

const MainMenu = () => {
  return (
    <div>
      <LanguageList />
      <main>
        <Title />
        <Tree />
        <AddPersonButton />
      </main>
    </div>
  );
};
export default MainMenu;
