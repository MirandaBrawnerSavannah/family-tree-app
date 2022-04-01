const AppWrapper = ({ Component, pageProps = {} }) => {
  return (
    <Component {...pageProps} />
  );
}
export default AppWrapper;