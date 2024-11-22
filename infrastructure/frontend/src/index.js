import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />  {/* Solo renderiza App sin envolver con ApolloProvider aquí */}
  </Provider>,
  document.getElementById('root')
);