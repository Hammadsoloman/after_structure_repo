/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import Show from '../components/Show';
// import StripeBtn from '../api/StripeBtn';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';
import particlesConfig from '../config/configParticles';
import Payment from '../components/payment';
// import * as actions from '../store/cartAfterEffect'
// import * as actionsProd from '../store/productsReducer.js'
import '../style/Cart.css';

function Order(props) {
  useEffect(() => {
    // props.token
    // props.getCartAPI();
    // console.log('props getCartAPI in order',props)
    // props.createCart();
  }, []);

  // const updateFunctions =useCallback (element => {
  //   // props.decrementelement)
  //   // props.updateRemoteCart(props.cartState.cartItem)
  //   // props.incrementInQuantity(element);
  //   props.deleteRemoteData(element)

  // })

  return (
    <>
      <div
        className="hero is-primary"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div className="hero-body container">
          <Particles height="15vh" width="15vw" params={particlesConfig} />
          <h4 className="title">Order</h4>
          <Particles height="15vh" width="15vw" params={particlesConfig} />
        </div>
      </div>

      {/* <Show condition={props.loggedIn}> */}
      <div
        className=" column is-half heightCart"
        style={{ marginLeft: '376px' }}
      >
        {props.items.addedItems.map(item => {
          console.log(
            'props.items.addedItems in order',
            props.items.addedItems,
          );

          return (
            <div className="boxItem">
              <div
                className="media"
                style={{ border: '1px solid #00D1B2', padding: '10px' }}
              >
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img src={item.image} alt="product" />
                  </figure>
                </div>
                <div className="media-content">
                  <b style={{ textTransform: 'capitalize' }}>{item.title} </b>
                  <span className="tag is-primary">${item.price}</span>
                  <br />

                  <br />

                  <div>{item.desc}</div>
                  <br />
                  <br />
                  <br />
                </div>
              </div>
            </div>
          );
        })}

        <div className="container">
          <p className="collection-item" style={{ marginLeft: '325px' }}>
            <b>Total: {props.items.total} $</b>
          </p>
          {/* <Payment /> */}
          {/* <StripeBtn style={{ marginLeft: '376px' }} /> */}

          <button>
            <Link to={'/payment'}>Payment</Link>
          </button>
        </div>
      </div>
      {/* </Show> */}
    </>
  );
}

const mapStateToProps = state => ({
  items: state.products,
  loggedIn: state.auth.loggedIn,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch, getState) => ({
  // token
  // getCartAPI: () => dispatch(actions.getCartAPI())
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
