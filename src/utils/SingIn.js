import React, { useState } from 'react';
import * as actions from '../store/Auth/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link, useHistory } from 'react-router-dom';
import Show from '../components/Show';
import { Form, Button } from 'react-bootstrap';
import Signup from '../utils/SignUp';
import Swal from 'sweetalert2';
import cookie from 'react-cookies';
import Spinner from 'react-bootstrap/Spinner';
import GoogleLogin from 'react-google-login';

const Login = props => {
  const history = useHistory();

  const state = {
    username: '',
    password: '',
  };

  const [signup, setSignup] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const responseGoogle = authResult => {
    console.log('in responseGoogle function', authResult['code']);
    // try {
    if (authResult['code']) {
      const result = props.loginGoogle(authResult['code']);
      console.log('result for oauth in signin', result);
      console.log(authResult);
      props.loginGoogle(result);
    } else {
      throw new Error(authResult);
    }
    // }
    // catch (e) {
    //   console.log(e);
    // }
  };

  const handleChange = e => {
    state[e.target.name] = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.login(state.username, state.password);
    setRedirect(true);
    alertSign();
  };

  function alertSign() {
    const cookieToken = cookie.load('auth');
    console.log('cookieToken', cookieToken);

    if (cookieToken !== 'null') {
      console.log('cookie null', cookieToken);

      Swal.fire({
        icon: 'success',
        title: 'Successfully Signed in',
      }).then(function () {
        history.push('/');
      });
    } else {
      // dont forget the error here
      console.log('cookie in else');
      Swal.fire({
        icon: 'error',
        title: 'Wrong username or password',
      });
    }
  }

  return (
    <>
      <Show condition={props.loggedIn}>
        {redirect === true
          ? <Redirect to="/" /> || <Spinner animation="border" />
          : null}
      </Show>

      <div className="back">
        <div className="sign">
          <Show condition={!props.loggedIn && !signup}>
            <div className="hero is-primary ">
              <div className="hero-body container">
                <h4 className="title">Login</h4>
              </div>
            </div>
            <br />
            <br />
            <div className="columns is-mobile is-centered">
              <div className="column is-one-third">
                <div className="field">
                  <label className="label">User Name: </label>
                  <input
                    className="input"
                    type="text"
                    name="username"
                    onChange={handleChange}
                  />
                </div>
                <div className="field">
                  <label className="label">Password: </label>
                  <input
                    className="input"
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                {/* {this.state.error && (
              <div className="has-text-danger">{this.state.error}</div>
            )} */}
                <div className="field is-clearfix">
                  <button
                    className="button is-primary is-outlined is-pulled-right"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <GoogleLogin
                    // use your client id here
                    clientId={
                      '858745528998-k25f4loe94h6do3urm348113um884es2.apps.googleusercontent.com'
                    }
                    buttonText="Login with google"
                    responseType="code"
                    /**
                     * To get access_token and refresh_token in server side,
                     * the data for redirect_uri should be postmessage.
                     * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
                     */
                    redirectUri="postmessage"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                  <p className="newUser pFonts">
                    New User ?{' '}
                    <Link
                      onClick={() => {
                        setSignup(true);
                      }}
                    >
                      Register{' '}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Show>

          <Show condition={!props.loggedIn && signup}>
            <Signup />
            <Link
              style={{ marginLeft: '20px' }}
              id="goBackBtn "
              className="btn pulse backsize"
              onClick={() => {
                setSignup(false);
              }}
            >
              {' '}
              Go Back{' '}
            </Link>
          </Show>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = state => {
  console.log('loggedIn in Login', state.auth.loggedIn);
  return {
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  login: (username, password) => dispatch(actions.login(username, password)),
  logout: () => dispatch(actions.logout()),
  loginGoogle: code => dispatch(actions.loginGoogle(code)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
