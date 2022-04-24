import {
  createContext, useState, useMemo, useContext,
} from 'react';
import PropTypes from 'prop-types';
import initialData from '../pages/API/data.json';

export const TreeContext = createContext({});

const TreeContextProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const contextValue = useMemo(() => {
    return [data, setData];
  }, [data, setData]);
  return (
    <TreeContext.Provider value={contextValue}>
      {children}
    </TreeContext.Provider>
  );
};
TreeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => {
  return useContext(TreeContext);
};

export default TreeContextProvider;
