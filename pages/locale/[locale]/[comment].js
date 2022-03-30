import { useRouter } from 'next/router'
import Header from '../../../components/header'

const Comment = () => {
  const router = useRouter();
  const { locale, comment } = router.query;

  return (
    <>
      <Header />
      <h1>Locale: {locale}</h1>
      <h1>Comment: {comment}</h1>
    </>
  );
};

export default Comment;
