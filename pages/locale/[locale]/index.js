import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../../../components/header'

const MainMenu = () => {
  const router = useRouter();
  const { locale } = router.query;

  return (
    <>
      <Header />
      <h1>Locale: {locale}</h1>
      <ul>
        <li>
          <Link href="/locale/[locale]/[comment]" as={`/locale/${locale}/first-comment`}>
            <a>First comment</a>
          </Link>
        </li>
        <li>
          <Link href="/locale/[locale]/[comment]" as={`/locale/${locale}/second-comment`}>
            <a>Second comment</a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MainMenu;
