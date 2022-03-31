import { useRouter } from 'next/router'
import Link from 'next/link'; 
import Localizer from '../utils/Localizer';
import data from '../pages/API/data.json';
import treeStyles from './Tree.module.css';

const Tree = () => {
  const router = useRouter();
  const { locale } = router.query;
  return (
    <div>
      <div>
        {data.map((person) => (
          <p key={person.id} className={treeStyles.personName}>
            <Link href={`/locale/${locale}/person/${person.id}`}>
              {person.fullName}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};
export default Tree;