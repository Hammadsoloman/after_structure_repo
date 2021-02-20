import cookie from 'react-cookies';
import axios from 'axios';
const API = 'https://main-server-hammad.herokuapp.com';

// STATE
const initialState = {
  loggedIn: false,
  user: {},
  token: '',
};

// REDUCERS
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'setUserIn':
      return {
        ...state,
        user: payload.user,
        loggedIn: true,
        token: payload.token,
      };

    case 'logout':
      cookie.save('auth', 'token', { path: '/' });
      return initialState;

    default:
      return state;
  }
};

// ACTIONS
export const signup = (username, password) => {
  console.log('username in signup', username);

  return async dispatch => {
    const options = {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-cache',
    };
    let response = await axios.post(
      `${API}/signup`,
      { username, password },
      options,
    );
    console.log('response in signup', response);

    await cookie.save('auth', response.data.token, { path: '/' });
    await dispatch(setUserIn({ user: username, token: response.data.token }));
  };
};

export const login = (username, password) => {
  console.log('username signin in auth', username);
  console.log('password signin in auth', password);

  return async dispatch => {
    const options = {
      mode: 'cors',
      // here i can just change 'Authorization' to body without incode it, but to make it more secure
      // we use this way
      // check by postman
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
      cache: 'no-cache',
    };
    let response = await axios.post(`${API}/signin`, {}, options);
    console.log('response in login', response);
    console.log('response data in login', response.data);

    await cookie.save('auth', response.data.token, { path: '/' });
    await dispatch(setUserIn({ user: username, token: response.data.token }));
  };
};

// export const loginGoogle = code => {
//   console.log('code signin in auth', code);

//   return async dispatch => {
//     const options = {
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       cache: 'no-cache',
//     };
//     let response = await axios.post(`${API}/signin`, {}, options);
//     console.log('response in login', response);
//     console.log('response data in login', response.data);

//     await cookie.save('auth', response.data.token, { path: '/' });
//     await dispatch(setUserIn({ token: response.data.token }));
//   };
// };

export const loginGoogle = async code => dispatch=>{
  console.log('code in logingoogle', code);
  return fetch('https://main-server-hammad.herokuapp.com/OAuth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  })
    .then(function (response) {
      console.log('res in logingoogle', response);
      return response.text();
    })
    .then(function (data) {
      // console.log('data in response', JSON.parse(data));
      let parsedData = JSON.parse(data);
      console.log('parsedData', parsedData.token);
      cookie.save('auth', parsedData.token, { path: '/' });
      dispatch(setUserIn({ token: parsedData.token }));
    });
};

export const logout = () => {
  return {
    type: 'logout',
    payload: 'payload',
  };
};

export const setUserIn = obj => {
  return {
    type: 'setUserIn',
    payload: obj,
  };
};
