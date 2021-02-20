import React from 'react';
import StripeForm from './stripeForm';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripe = loadStripe(
  'pk_test_51I6GFrAAyiIKrt7bIif0gqWYFldPEwjyMVgZU91jfks16TNwVVR8by6TJxKQO7E4Dbt6l6Cjx612VYMd5ZGxXiPQ00P6HRPHct',
);

const PaymentPage = () => {
  return (
    <div>
      {/* <h1>Payment</h1> */}
      <div
        className="hero is-primary"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div className="hero-body container">
          <h4 className="title">Payment</h4>
        </div>
      </div>
      <Elements stripe={stripe}>
        <StripeForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;

// style={{
//   base: {
//       iconColor: '#666EE8',
//       color: '#31325F',
//       lineHeight: '40px',
//       fontWeight: 300,
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSize: '12px',

//       '::placeholder': {
//           color: '#CFD7E0',
//       }
//   }
