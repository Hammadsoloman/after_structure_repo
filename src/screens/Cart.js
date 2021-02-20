/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Show from '../components/Show';
// import * as actions from '../store/cartAfterEffect'
import * as actionsProd from '../store/Product/products';
import Particles from 'react-particles-js';
import particlesConfig from '../config/configParticles';
import '../style/Cart.css';

function Cart(props) {
  useEffect(() => {}, []);

  return (
    <>
      <div
        className="hero is-primary"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div className="hero-body container">
          <Particles height="15vh" width="15vw" params={particlesConfig} />
          <h4 className="title">Cart</h4>
          <Particles height="15vh" width="15vw" params={particlesConfig} />
        </div>
      </div>

      {/* <Show condition={props.loggedIn}> */}
      <div
        className=" column is-half  heightCart"
        style={{ marginLeft: '376px' }}
      >
        {props.items.addedItems.map(item => {
          console.log('props.item', item);

          return (
            <div className="boxItem">
              <div
                className="media"
                style={{ border: '1px solid #00D1B2', padding: '20px' }}
              >
                <div className="media-left">
                  <figure className="image is-64x64">
                    <img
                      className={'sizeImage'}
                      src={item.image}
                      alt="product"
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <b style={{ textTransform: 'capitalize' }}>{item.title} </b>
                  <span className="tag is-primary">${item.price}</span>
                  <br />

                  <div>Quantity: {item.quantity}</div>
                  <br />

                  <div>{item.desc}</div>
                </div>

                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <span className="btn btn-light">{item.quantity}</span>
                </div>
                <div
                  className="media-right"
                  onClick={e => props.removeItem(item._id)}
                >
                  <span className="delete is-large"></span>
                </div>
              </div>
            </div>
          );
        })}
        <div className="setCart">
          {/* <div
              className="is-clearfix"
              style={{ marginRight: '350px', marginTop: '100px' }}
            >
              <button className="button is-small is-outlined is-primary   is-pulled-right">
                <Link to={'/order'}>Order Now</Link>
              </button>
            </div> */}

          <div className="is-clearfix">
            <button
              style={{ width: '100px', margin: '6px' }}
              className="button is-small is-outlined is-primary   is-pulled-right"
              onClick={() => props.orderRemoteData(props.items.addedItems)}
            >
              <Link to={'/order'}>Order Now</Link>
            </button>
          </div>

          <div className="is-clearfix">
            <button
              style={{ width: '120px', margin: '6px' }}
              className="button is-small is-outlined is-primary   is-pulled-right"
            >
              <Link to={'/shipping'}>Procced to checkout</Link>
            </button>
          </div>

          <div className="container">
            <p className="collection-item" style={{ marginRight: '70px' }}>
              <b>Total: {props.items.total} $</b>
            </p>
          </div>
        </div>
      </div>
      {/* </Show> */}
    </>
  );
}

const mapStateToProps = state => {
  return {
    items: state.products,

    loggedIn: state.auth.loggedIn,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeItem: id => {
      dispatch(actionsProd.removeItem(id));
    },
    orderRemoteData: element => dispatch(actionsProd.orderRemoteData(element)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
