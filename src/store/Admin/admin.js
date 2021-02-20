import axios from 'axios';
import superagent from 'superagent';
const API = 'https://main-server-hammad.herokuapp.com';

// STATE
const initState = {
  adminPage: [],
};

// REDUCERS
export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    // the role here admin
    case 'GET All FOR ADMIN':
      // console.log('adminPage payload',payload,...state)
      return { ...state, adminPage: payload, role: 'admin' };

    case 'EDIT ADMIN':
      let adminPage = state.adminPage.map(product =>
        product._id === payload._id ? payload : product,
      );
      // console.log('payload for selected item' , payload)
      return { ...state, adminPage: adminPage };

    case 'DELETEAdmin':
      console.log('adminPage in delete');
      return {
        adminPage: [
          ...state.adminPage.filter(product => product !== action.payload),
        ],
      };

    default:
      return state;
  }
};

// ACTIONS

// i will ad the token as parameter for the admin
export const getAllAdmin = () => dispatch => {
  // const options = {
  //   mode: 'cors',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  //   cache: 'no-cache',
  // };

  // console.log('options');
  // console.log('token', token);

  // options
  axios
    .get(`${API}/selectAll`)
    .then(res => {
      console.log(' res.data in get all for admin', res.data);
      dispatch(getAllAdminAction(res.data));
    })
    .catch(e => {
      console.error();
    });
};

export const getAllAdminAction = payload => {
  console.log('payload in getallAdminAction', payload);
  return {
    type: 'GET All FOR ADMIN',
    payload: payload,
  };
};

// i will add the token as a third parameter

export const editAdmin = (id, newProduct, token) => dispatch => {
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  };

  console.log('options', options);
  console.log('headers', token);

  axios
    .put(`${API}/select/${id}`, newProduct, options)
    .then(res => {
      console.log('res.data in edit admin', res.data);

      dispatch(editAdminAction(res.data));
    })
    .catch(e => {
      console.error();
    });
};

export const editAdminAction = payload => {
  console.log('payload in edit admin', payload);

  return {
    type: 'EDIT ADMIN',
    payload: payload,
  };
};

/*********************************************************DELETE***************************************************/

export const deleteRemoteData = (product, token) => async dispatch => {
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  };

  console.log('options', options);
  console.log('headers', token);

  console.log('payload in admindelete', product);
  await await superagent.delete(`${API}/product/${product._id}`, options);
  dispatch(deleteAction(product));
};

export const deleteAction = payload => {
  console.log('payload in admindelete', payload);

  return {
    type: 'DELETEAdmin',
    payload: payload,
  };
};
