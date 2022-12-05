import React from 'react';
import Navigator from './src/routes';
import {Provider} from 'react-redux';
import {store} from './src/hooks/store';

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
