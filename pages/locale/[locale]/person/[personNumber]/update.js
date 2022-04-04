import LanguageList from '../../../../../components/LanguageList';
import Title from '../../../../../components/Title';
import Tree from '../../../../../components/Tree';
import EditMenuWrapper from '../../../../../components/EditMenuWrapper';

const PersonPage = () => {
  return (
    <div>
      <LanguageList />
      <main>
        <Title />
        <Tree />
        <EditMenuWrapper />
      </main>
    </div>
  );
};

export default PersonPage;