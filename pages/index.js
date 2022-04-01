import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LanguageList from '../components/LanguageList'

const Home = () => {
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
