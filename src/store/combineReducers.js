import { combineReducers, createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import products from './Product/products';
// import cart from './cartAfterEffect';
import oneItem from './Detailes/detailes';
import admin from './Admin/admin';
import auth from './Auth/auth';
import categories from './category/index';
import detailes from './Detailes/detailes';
import cart from './Cart/index';

let reducers = combineReducers({
  auth,
  products,
  oneItem,
  admin,
  categories,
  detailes,
  cart,
});

const store = () =>
  createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store();
