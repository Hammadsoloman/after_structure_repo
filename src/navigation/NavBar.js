import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/Auth/auth';
import Show from '../components/Show';
import Particles from 'react-particles-js';
import particlesConfig from '../config/configParticles';

function Header(props) {
  // console.log('props.cartState.cartItem in header',props.cartState.cartItem.length)
  console.log('state in login', !props.loggedIn);
  return (
    <nav
      className="navbar container"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <b className="navbar-item is-size-4 ">E-Commerce</b>
        <div className="navbar-brand">
          {/* <Show condition={props.loggedIn}> */}
          <Link to="/" className="navbar-item">
            Products
          </Link>
          {/* </Show> */}

          {/* <Show condition={props.loggedIn}> */}
          <Link to="/order" className="navbar-item">
            Order
          </Link>
          {/* </Show> */}

          {/* <Show condition={props.token}> */}
          <Link to="/adminScreen" className="navbar-item">
            Admin
          </Link>
          {/* </Show> */}

          {/* <Show condition={props.loggedIn}> */}
          <Link to="/cart" className="navbar-item">
            Cart
            <span className="tag is-primary" style={{ marginLeft: '5px' }}>
              {props.newCartState.addedItems.length}
            </span>
          </Link>
          {/* </Show> */}

          {/* <Show condition={!props.loggedIn}> */}
          <Link to="/login" className="navbar-item">
            Login
          </Link>
          {/* </Show> */}

          {/* <Show condition={props.loggedIn}> */}
          <Link
            onClick={() => {
              props.logout();
            }}
            className="navbar-item"
          >
            {' '}
            Logout
          </Link>
          {/* </Show> */}
        </div>
      </div>
    </nav>
  );
}

// we only care about the totalVotes to be displayed

const mapStateToProps = state => {
  console.log('loggedIn in header', state.auth.loggedIn);
  return {
    // cartState: state.cart,
    // cart:state.cart
    loggedIn: state.auth.loggedIn,
    token: state.auth.token,
    newCartState: state.products,
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
});

// connecting my component with the mapState to props to be able to use the store.
export default connect(mapStateToProps, mapDispatchToProps)(Header);
