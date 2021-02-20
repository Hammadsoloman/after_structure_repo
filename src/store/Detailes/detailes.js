import superagent from 'superagent';

// STATE
const initialState = {
  oneItem: {},
};

// REDUCER
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SELECTED':
      console.log('state in SELECTED', payload);

      return { ...state, oneItem: payload };

    default:
      // console.log('state in defult',state)
      return state;
  }
};

// ACTIONS
export const getOneItem = (id, token) => dispatch => {
  let api = `https://main-server-hammad.herokuapp.com/product/${id}`;
  const options = {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-cache',
  };
  return superagent
    .get(api, options)
    .set('Content-Type', 'application/json')
    .then(data => {
      console.log('data.body in getOneItem function ', data.body);
      dispatch(getItem(data.body));
    });
};

export const getItem = payload => {
  console.log('payload[0] in getItem action', payload[0]);

  return {
    type: 'SELECTED',
    payload: payload[0],
  };
};
