import LanguageList from '../../../../../components/LanguageList';
import Title from '../../../../../components/Title';
import Tree from '../../../../../components/Tree';
import AddPersonButton from '../../../../../components/AddPersonButton';
import PersonProfile from '../../../../../components/PersonProfile';

const PersonPage = () => {
  return (
    <div>
      <LanguageList />
      <main>
        <Title />
        <Tree />
        <AddPersonButton />
        <PersonProfile />
      </main>
    </div>
  );
};

export default PersonPage;