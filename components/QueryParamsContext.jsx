import React, { useState } from 'react';
import PropTypes from 'prop-types';

const QueryParamsContext = React.createContext();

export const QueryParamsProvider = ({ router, children }) => {
  const [state, setState] = useState({ ...router.query });
  const setQueries = (params) => setState({
    ...router.query,
    ...params,
  })
  return (
    <QueryParamsContext.Provider value={[state, setQueries]}>
      {children}
    </QueryParamsContext.Provider>
  );
};

QueryParamsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default QueryParamsContext;