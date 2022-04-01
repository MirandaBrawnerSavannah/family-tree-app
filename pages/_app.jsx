import TreeContextProvider from '../components/TreeContext';

const AppWrapper = ({ Component, pageProps = {} }) => {
  return (
    <TreeContextProvider>
      <Component {...pageProps} />
    </TreeContextProvider>
  );
}
export default AppWrapper;