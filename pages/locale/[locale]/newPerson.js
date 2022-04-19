import LanguageList from '../../../components/LanguageList';
import MainMenu from '../../../components/MainMenu';
import Title from '../../../components/Title';
import Tree from '../../../components/Tree';
import AddPersonMenu from '../../../components/AddPersonMenu';
import ClearTreeButton from '../../../components/ClearTreeButton';

const NewPerson = () => {
  return (
    <div>
      <LanguageList />
      <MainMenu />
      <main>
        <Title />
        <Tree />
        <AddPersonMenu />
        <ClearTreeButton />
      </main>
    </div>
  );
};
export default NewPerson;