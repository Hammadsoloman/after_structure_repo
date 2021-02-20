import React, { useState } from 'react';
import CheckoutSteps from '../CheckoutSteps';
import { connect } from 'react-redux';
import * as actions from '../../store/Cart/index';
import { Link } from 'react-router-dom';
// import { createHashHistory } from 'history';

// export const history = createHashHistory();
function ShippingPayment(props) {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const handleChange = e => {
    // console.log('[e.target.name ', e.target.name);
    // console.log('[e.target.value ', e.target.value);
    // console.log('[shipping ', shipping);

    setPaymentMethod({ ...paymentMethod, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    console.log('shipping in handleSubmit', paymentMethod, e);
    e.preventDefault();
    // i will add the token here when i use auth
    // ,props.token
    await props.savePaymentMethod(paymentMethod);
    // history.push('/placeorder');
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={handleChange}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        {/* <div>
        <div>
          <input
            type="radio"
            id="stripe"
            value="Stripe"
            name="paymentMethod"
            required
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></input>
          <label htmlFor="stripe">Stripe</label>
        </div>
      </div> */}
        <div>
          <label />
          <button className="primary" type="submit">
            Save
          </button>

          <br />
          <br />
          <button className="primary" type="submit">
            <Link to="./placeorder">Continue To Next step</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch, getState) => ({
  // ,token
  savePaymentMethod: paymentMethod =>
    dispatch(actions.savePaymentMethod(paymentMethod)),
});

export default connect(null, mapDispatchToProps)(ShippingPayment);
