import React, { useState } from 'react';
import LanguageList from '../components/LanguageList'

const Home = () => {
  const [locale, setLocale] = useState('en');
  return (
    <div>
      <LanguageList locale={locale} onChangeLocale={setLocale} />
      <h1>Hello World!</h1>
    </div>
  );
};
export default Home;