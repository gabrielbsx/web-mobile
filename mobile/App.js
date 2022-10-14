import React from 'react';
import {StyleSheet, View} from 'react-native';
import Navigator from './src/routes';
import SignIn from './src/screens/signin';
import SignUp from './src/screens/signup';
import Guest from './src/routes/guest';

const App = () => {
  return <Guest />;
  // return <SignUp />;
};

export default App;
