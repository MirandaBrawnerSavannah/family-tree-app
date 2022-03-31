import PropTypes from 'prop-types';
import commaListStyles from './CommaSeparatedList.module.css';

const CommaSeparatedList = ({ list }) => {
  return (
    <span>
      <span>{list[0]}</span>
      {list.slice(1).map((element) => (
        <span key={element.key}>,
          <span className={commaListStyles.afterComma}>{element}</span>
        </span>
      ))}
    </span>
  );
};
CommaSeparatedList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.node).isRequired,
};
export default CommaSeparatedList;
