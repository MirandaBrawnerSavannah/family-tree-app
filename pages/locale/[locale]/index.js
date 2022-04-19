import LanguageList from '../../../components/LanguageList'
import MainMenu from '../../../components/MainMenu';
import Title from '../../../components/Title';
import Tree from '../../../components/Tree';
import AddPersonButton from '../../../components/AddPersonButton';
import ClearTreeButton from '../../../components/ClearTreeButton';

const FamilyTreeApp = () => {
  return (
    <div>
      <LanguageList />
      <MainMenu />
      <main>
        <Title />
        <Tree />
        <AddPersonButton />
        <ClearTreeButton />
      </main>
    </div>
  );
};
export default FamilyTreeApp;
