import React, { Fragment } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { connect } from 'react-redux';
import Show from '../components/Show';
import { toast } from 'react-toastify';

toast.configure();

const stripeBtn = props => {
  const publishableKey =
    'pk_test_51I6GFrAAyiIKrt7bIif0gqWYFldPEwjyMVgZU91jfks16TNwVVR8by6TJxKQO7E4Dbt6l6Cjx612VYMd5ZGxXiPQ00P6HRPHct';

  const onToken = token => {
    console.log('token in stripBtn', token);
    const body = {
      amount: props.items.total,
      token: token,
    };
    console.log('token body in stripBtn', body);

    axios
      .post('https://localhost:3000/checkout', body)
      .then(response => {
        console.log('response in stripBtn', response);
        alert('Payment Success');
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        alert('Payment Error');
      });
  };

  return (
    <Show condition={props.loggedIn}>
      <StripeCheckout
        label="Go Premium" //Component button text
        name="Inspire LLC" //Modal Header
        description="Upgrade to a premium account today."
        panelLabel="Go Premium" //Submit button in modal
        amount={props.items.total * 100}
        token={onToken}
        stripeKey={publishableKey}
        billingAddress
        hippingAddress
      />
    </Show>
  );
};

const mapStateToProps = state => {
  console.log('items in stripBtn', state.products);
  return {
    items: state.products,
    loggedIn: state.auth.loggedIn,
  };
};

// export default stripeBtn;
export default connect(mapStateToProps)(stripeBtn);
