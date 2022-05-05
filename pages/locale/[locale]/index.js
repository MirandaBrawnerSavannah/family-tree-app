import { useRouter } from 'next/router';
import { QueryParamsProvider } from '../../../components/QueryParamsContext';
import LanguageList from '../../../components/LanguageList'
import MainMenu from '../../../components/MainMenu';
import Title from '../../../components/Title';
import Tree from '../../../components/Tree';
import AddPersonButton from '../../../components/AddPersonButton';
import ClearTreeButton from '../../../components/ClearTreeButton';
import DateMenu from '../../../components/DateMenu';

const FamilyTreeApp = () => {
  const router = useRouter();
  return (
    <QueryParamsProvider router={router}>
      <div>
        <LanguageList />
        <MainMenu />
        <main>
          <Title />
          <DateMenu />
          <Tree />
          <AddPersonButton />
          <ClearTreeButton />
        </main>
      </div>
    </QueryParamsProvider>
  );
};
export default FamilyTreeApp;
