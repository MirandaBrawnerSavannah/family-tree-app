import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Localizer from '../utils/Localizer';
import treeStyles from './Tree.module.css';

const BirthDeathDates = ({ person }) => {
  const router = useRouter();
  const { locale } = router.query;
  const intl = new Localizer(locale);
  let text = undefined;
  if (person.born && person.born.year !== undefined) {
    if (person.died && person.died.year !== undefined) {
      text = `${person.born.year} - ${person.died.year}`;
    } else {
      text = `${intl.formatMessage({ id: 'born'})} ${person.born.year}`;
    }
  } else if (person.died && person.died.year !== undefined) {
    text = `${intl.formatMessage({ id: 'died'})} ${person.died.year}`;
  } else {
    return null;
  }
  return (
    <span className={treeStyles.birthDeathDates}>{text}</span>
  );
};
BirthDeathDates.propTypes = {
  person: PropTypes.shape({}),
}
export default BirthDeathDates;
