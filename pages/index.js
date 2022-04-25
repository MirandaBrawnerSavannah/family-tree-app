import { useEffect } from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import LanguageList from '../components/LanguageList'
import autoSave from '../utils/autoSave';
import initialData from '../savedFamilyTrees/exampleTree.json';

export async function getStaticProps() {
  autoSave({ data: initialData, fileSystem: fs })
  return { props: { treeState: initialData } };
}

const Home = ({ treeState }) => {
  const router = useRouter();
  useEffect(() => {
    router.push('/locale/en');
  });
  return (
    <div>
      <LanguageList />
    </div>
  );
};
export default Home;
