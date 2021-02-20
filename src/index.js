import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './style/Index.css';
import App from './app';
import store from './store/combineReducers';
import 'bulma/css/bulma.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

function Main() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
