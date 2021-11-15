import React from 'react';
import generateStore from './redux/store'
import { Provider } from 'react-redux';
import { AppRouter } from './routes/AppRouter';

function App() {
  const store = generateStore()
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
