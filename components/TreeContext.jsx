import {
  createContext, useState, useMemo, useContext,
} from 'react';
import PropTypes from 'prop-types';
import fs from 'fs';
import initialData from '../savedFamilyTrees/autoSave.json';

export const TreeContext = createContext({});

export async function getStaticProps() {
  autoSave({ data: initialData, fileSystem: fs })
  return { props: { treeState: initialData } };
}

const TreeContextProvider = ({ treeState, children }) => {
  const [data, setData] = useState(treeState);
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
