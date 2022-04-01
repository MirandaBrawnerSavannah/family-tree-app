import React from 'react';
import PropTypes from 'prop-types';
import data from '../pages/API/data.json';

export const TreeContext = React.createContext([]);

const TreeContextProvider = ({ children }) => {
  return (
    <TreeContext.Provider value={[data]}>
      {children}
    </TreeContext.Provider>
  );
};
TreeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TreeContextProvider;
