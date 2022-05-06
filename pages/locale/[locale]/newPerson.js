import LanguageList from '../../../components/LanguageList';
import MainMenu from '../../../components/MainMenu';
import Title from '../../../components/Title';
import Tree from '../../../components/Tree';
import AddPersonMenu from '../../../components/AddPersonMenu';
import ClearTreeButton from '../../../components/ClearTreeButton';
import DateMenu from '../../../components/DateMenu';

const NewPerson = () => {
  return (
    <div>
      <LanguageList />
      <MainMenu />
      <main>
        <Title />
        <DateMenu />
        <Tree />
        <AddPersonMenu />
        <ClearTreeButton />
      </main>
    </div>
  );
};
export default NewPerson;