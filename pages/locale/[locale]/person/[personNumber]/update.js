import LanguageList from '../../../../../components/LanguageList';
import Title from '../../../../../components/Title';
import Tree from '../../../../../components/Tree';
import EditMenuWrapper from '../../../../../components/EditMenuWrapper';
import ClearTreeButton from '../../../../../components/ClearTreeButton';

const PersonPage = () => {
  return (
    <div>
      <LanguageList />
      <main>
        <Title />
        <Tree />
        <EditMenuWrapper />
        <ClearTreeButton />
      </main>
    </div>
  );
};

export default PersonPage;