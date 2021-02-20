import superagent from 'superagent';
import axios from 'axios';

// STATE
const initialState = {
  shippingAddress: {},
  paymentMethod: {},
  orderItems: [{}],
  itemsPrice: '',
  shippingPrice: '',
  taxPrice: '',
  totalPrice: '',
};

// REDUCER
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'CART_SAVE_SHIPPING_ADDRESS':
      console.log('payload in CART_SAVE_SHIPPING_ADDRESS', payload);
      return { ...state, shippingAddress: payload };

    case 'CART_SAVE_PAYMENT_METHOD':
      console.log('payload in CART_SAVE_PAYMENT_METHOD', payload);
      return { ...state, paymentMethod: payload };

    case 'SAVE_MAIN_ORDER':
      console.log('payload in SAVE_MAIN_ORDER', payload);
      return { ...state, state: payload };

    default:
      // console.log('state in defult',state)
      return state;
  }
};

//

export const createOrder = order => dispatch => {
  console.log('product in add new shipping', order);
  //   let shippingAddress=[product];
  // let result = { shippingAddress: product };
  // console.log('result in add new shipping', result);

  const api = 'https://main-server-hammad.herokuapp.com/shipping';
  // const options = {
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  //   cache: 'no-cache',
  // };

  // console.log('product in new',product)
  axios.post(api, order).then(data => {
    console.log('order in res newShipping', data);
    dispatch(saveMainOrder(data.data));
  });
};

export const saveMainOrder = payload => {
  console.log('payload in saveShippingAddress', payload);

  return {
    type: 'SAVE_MAIN_ORDER',
    payload: payload,
  };
};

export const saveShippingAddress = payload => {
  console.log('payload in saveShippingAddress', payload);

  return {
    type: 'CART_SAVE_SHIPPING_ADDRESS',
    payload: payload,
  };
};

export const savePaymentMethod = payload => {
  console.log('payload in saveShippingAddress', payload);

  return {
    type: 'CART_SAVE_PAYMENT_METHOD',
    payload: payload,
  };
};
