import React, { useState } from 'react';
import CheckoutSteps from '../CheckoutSteps';
import { connect } from 'react-redux';
import * as actions from '../../store/Cart/index';
import { Link } from 'react-router-dom';
import { createHashHistory } from 'history';

export const history = createHashHistory();

function Shipping(props) {
  const [shipping, setShipping] = useState({});

  const handleChange = e => {
    // console.log('[e.target.name ', e.target.name);
    // console.log('[e.target.value ', e.target.value);
    // console.log('[shipping ', shipping);

    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    console.log('shipping in handleSubmit', shipping, e);
    e.preventDefault();
    // i will add the token here when i use auth
    // ,props.token
    await props.saveShippingAddress(shipping);
    // props.history.push('/shippingPayment');
    history.push('/shippingPayment');
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div>
          <label className="label" htmlFor="fullName">
            Full Name{' '}
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter full name"
            value={shipping.fullName || ''}
            onChange={handleChange}
            required=""
          />
        </div>
        <div>
          {/* <label htmlFor="address">Address</label> */}
          <label className="label" htmlFor="address">
            Address{' '}
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter address"
            value={shipping.address || ''}
            onChange={handleChange}
            required=""
          />
        </div>
        <div>
          {/* <label htmlFor="city">City</label>
           */}
          <label className="label" htmlFor="city">
            City{' '}
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter city"
            value={shipping.city || ''}
            onChange={handleChange}
            required=""
          />
        </div>
        <div>
          {/* <label htmlFor="postalCode">Postal Code</label> */}
          <label className="label" htmlFor="postalCode">
            Postal Code{' '}
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            placeholder="Enter postal code"
            value={shipping.postalCode || ''}
            onChange={handleChange}
            required=""
          />
        </div>
        <div>
          {/* <label htmlFor="country">Country</label> */}
          <label className="label" htmlFor="country">
            Country{' '}
          </label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="Enter country"
            value={shipping.country || ''}
            onChange={handleChange}
            required=""
          />
        </div>
        <div>
          {/* <label htmlFor="location">Location</label> */}
          <label className="label" htmlFor="location">
            location{' '}
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={shipping.location || ''}
            onChange={handleChange}
            required=""
          />
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Save
          </button>
          <br />
          <br />
          <button className="primary" type="submit">
            <Link to="./shippingPayment">Continue To Next step</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

const mapDispatchToProps = (dispatch, getState) => ({
  // ,token
  //   newShipping: shipping => dispatch(actions.newShipping(shipping)),
  saveShippingAddress: shipping =>
    dispatch(actions.saveShippingAddress(shipping)),
});

export default connect(null, mapDispatchToProps)(Shipping);
