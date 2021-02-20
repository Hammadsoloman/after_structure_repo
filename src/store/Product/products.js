import superagent from 'superagent';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import ReactPaginate from 'react-paginate';

let initialState = {
  products: [],
  newProduct: [],
  addedItems: [],
  newOrder: [],
  newReview: [],
  isComplete: false,
  total: 0,
};


// reducer : switch case
export default (state = initialState, action) => {
  let { type, payload } = action;
  console.log('action', action);

  switch (type) {
    case 'GETPRODUCTS':
      state.products = payload;
      // console.log('state.products',state.products)
      return { ...state };

    case 'NEW PRODUCT':
      return { ...state, newProduct: payload || {} };

    case 'NEW REVIEW':
      console.log('payload in newReview reducer', payload);

      return { ...state, newReview: payload || {} ,isComplete: true };

    // case 'REVIEW_SUCCESS':
    //   return { loading: false, success: true, review: action.payload };

    case 'ADD_TO_CART':
      console.log('initial state', JSON.stringify(state));
      //INSIDE HOME COMPONENT
      let addedItem = state.products.find(item => item._id === action.id);
      console.log('  state in  addToCart', state.products);
      console.log('  state.products in  addToCart', addedItem);
      console.log('item._id in product', action.id);
      console.log('addedItem in product', addedItem);
      /*||state.createItem.find(item=> item.id === action.id) ;*/
      //check if the action id exists in the addedItems
      let existed_item = state.addedItems.find(item => action.id === item._id);
      console.log('existed_itemin product ', existed_item);

      if (existed_item) {
        addedItem.quantity += 1;
        return {
          ...state,
          total: state.total + addedItem.price,
        };
      } else {
        addedItem.quantity = 1;
        console.log(
          'addedItem.quantity in product in else',
          addedItem.quantity,
        );
        //calculating the total
        let newTotal = state.total + addedItem.price;
        console.log('newTotal in product', newTotal);
        console.log(' state.total  in product', state.total);

        return {
          ...state,
          addedItems: [...state.addedItems, addedItem],
          total: newTotal,
        };
      }

    case 'REMOVE_FROM_CART':
      let itemToRemove = state.addedItems.find(item => action.id === item._id);
      console.log('itemToRemove', itemToRemove);
      let new_items = state.addedItems.filter(item => action.id !== item._id);
      console.log('new_items', new_items);

      //calculating the total
      let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
      console.log(itemToRemove);
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };

    case 'SET_ORDER':
      console.log('payload in SET_ORDER', payload);
      return { ...state, newOrder: payload || {} };

    default:
      return state;
  }
};
let api = 'https://main-server-hammad.herokuapp.com/product';

/*********************************************GET**********************************/

export const getRemoteProducts = token => dispatch => {
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  };
  return superagent.get(api, options).then(data => {
    // console.log('data.body',data.body)
    dispatch(getProductsAction(data.body));
  });
};

export const getProductsAction = dataFromApi => {
  return {
    type: 'GETPRODUCTS',
    payload: dataFromApi,
  };
};

/*************************************************ADD new product****************************************/

export const newProduct = (product, token) => dispatch => {
  console.log('product in add new', product);
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  };

  // console.log('product in new',product)
  axios.post(api, product, options).then(data => {
    console.log('data in res add new', data);
    dispatch(newProductAction(data.data));
  });
};

export const newProductAction = payload => {
  return {
    type: 'NEW PRODUCT',
    payload: payload,
  };
};

/************************************************ADD ORDER*******************************************/
const apiOder =
  'https://main-server-hammad.herokuapp.com/order/5ff478ca0aed3f15a6c16f2a';
export const orderRemoteData = data => async dispatch => {
  // const options = {
  //   mode: 'cors',
  //   headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
  //   cache: 'no-cache',
  // };

  console.log('data in orderRemoteData data', data);
  return superagent
    .post(apiOder)
    .send(data[0])
    .set('X-API-Key', 'foobar')
    .set('Accept', 'application/json')
    .then(response => {
      console.log('response in post order', response);

      dispatch(orderAction(response.body));
    });

  // axios.post(apiOder)
  // .then(data => {
  //   console.log('data.data in orederRemote',data)
  //   dispatch(orderAction( data ));
  // });
};

export const orderAction = payload => {
  console.log('payload in addOrder', payload);
  return {
    type: 'SET_ORDER',
    payload: payload,
  };
};

/*****************************************************ADD TO CART and remove****************************************/

export const addToCart = id => {
  console.log('  id in  addToCart', addToCart);
  return {
    type: 'ADD_TO_CART',
    id,
  };
};

export const removeItem = id => {
  console.log('  REMOVE_FROM_CART in  addToCart', id);

  return {
    type: 'REMOVE_FROM_CART',
    id,
  };
};

/******************************************************Review************************************************/
export const saveProductReview = (id, product) => dispatch => {
  console.log('id + product in saveProductReview action', id, product);

  let api = `https://main-server-hammad.herokuapp.com/${id}/reviews`;
  // console.log('product in new',product)
  axios.post(api, product).then(data => {
    console.log('data in res saveProductReview response', data);
    dispatch(saveProductReviewAction(data.data));
  });
};

export const saveProductReviewAction = payload => {
  console.log('payload in saveProductReview action', payload);
  return {
    type: 'NEW REVIEW',
    payload: payload,
  };
};
