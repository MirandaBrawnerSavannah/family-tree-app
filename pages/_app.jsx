import fs from 'fs';
import TreeContextProvider from '../components/TreeContext';

export async function getStaticProps() {
  autoSave({ data: initialData, fileSystem: fs })
  tree
  return { props: { treeState } };
}

const AppWrapper = ({ Component, pageProps = {}, treeState }) => {
  return (
    <TreeContextProvider treeState={treeState}>
      <Component {...pageProps} />
    </TreeContextProvider>
  );
}
export default AppWrapper;