import { useRouter } from 'next/router'
import Link from 'next/link'; 
import data from '../pages/API/data.json';
import treeStyles from './Tree.module.css';
import sortPeople from '../utils/sortPeople';

const Tree = () => {
  const router = useRouter();
  const { locale } = router.query;
  const sortedList = sortPeople({ list: data, sortBy: 'age' });
  return (
    <div>
      <div>
        {sortedList.map((person) => (
          <p key={person.id} className={treeStyles.personBox}>
            <span className={treeStyles.personLink}>
              <Link href={`/locale/${locale}/person/${person.id}`}>
                {person.fullName}
              </Link>
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};
export default Tree;