import { useRouter } from 'next/router'
import LanguageList from '../../../components/LanguageList'
import Title from '../../../components/Title';
import Tree from '../../../components/Tree';

const MainMenu = () => {
  return (
    <div>
      <LanguageList />
      <main>
        <Title />
        <Tree />
      </main>
    </div>
  );
};

export default MainMenu;
