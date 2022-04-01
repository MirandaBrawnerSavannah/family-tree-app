import LanguageList from '../../../components/LanguageList';
import Title from '../../../components/Title';
import Tree from '../../../components/Tree';
import AddPersonMenu from '../../../components/AddPersonMenu';

const NewPerson = () => {
  return (
    <div>
      <LanguageList />
      <main>
        <Title />
        <Tree />
        <AddPersonMenu />
      </main>
    </div>
  );
};
export default NewPerson;