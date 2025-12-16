import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import RepoListScreen from './screens/RepoListScreen';

const App = () => {
  return (
    <Provider store={store}>
      <RepoListScreen />
    </Provider>
  );
};

export default App;
