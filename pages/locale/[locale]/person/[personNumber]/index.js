import LanguageList from '../../../../../components/LanguageList';
import MainMenu from '../../../../../components/MainMenu';
import Title from '../../../../../components/Title';
import Tree from '../../../../../components/Tree';
import AddPersonButton from '../../../../../components/AddPersonButton';
import PersonProfile from '../../../../../components/PersonProfile';
import ClearTreeButton from '../../../../../components/ClearTreeButton';
import DateMenu from '../../../../../components/DateMenu';

const PersonPage = () => {
  return (
    <div>
      <LanguageList />
      <MainMenu />
      <main>
        <Title />
        <DateMenu />
        <Tree />
        <AddPersonButton />
        <PersonProfile />
        <ClearTreeButton />
      </main>
    </div>
  );
};

export default PersonPage;