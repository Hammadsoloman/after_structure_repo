import React from 'react';
import { connect } from 'react-redux';

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
// import { sendPaymentMethod } from '../PaymentUtiles/paymentAuth';

const StripeForm = () => {
  const [error, setError] = React.useState();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();
    const card = elements.getElement('card');
    // console.log('getElement', getElement);

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      card,
      type: 'card',
    });
    if (error) {
      setError(error.message);
    } else {
      setError(null);
      console.log('paymentMethod', paymentMethod);
      // sendPaymentMethod({ id: paymentMethod.id });
      // .then(data => console.log(data))
      // .catch(err => console.log(err));
    }
  };

  const handleChange = event => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#71afd8',
        width: '620px',
        marginLeft: '450px',
        marginTop: '100px',
        marginBottom: '120px',
        borderRadius: '25px',
        border: '2px solid #73AD21',
      }}
    >
      {error ? <div>{error}</div> : null}
      <form
        onSubmit={handleSubmit}
        style={{ height: '50px', margin: '75px', marginTop: '50px' }}
      >
        <CardElement onChange={handleChange} style={{}} />
        {/* <button style={{ margin: '50px' }}>Submit</button> */}
      </form>
      <button
        class="button is-link"
        style={{ marginLeft: '250px', marginBottom: '20px ' }}
      >
        Submit
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,

    // token: state.auth.token,
    // loggedIn: state.auth.loggedIn,
  };
};

// const mapDispatchToProps = (dispatch, getState) => ({
//   // ,token
//   newProduct: (product, token) => dispatch(actions.newProduct(product, token)),
// });

export default connect(mapStateToProps)(StripeForm);
