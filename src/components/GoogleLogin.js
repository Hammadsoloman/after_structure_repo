import React from 'react';
import GoogleLogin from 'react-google-login';
// import loginGoogle from '../store/Auth';
import { connect } from 'react-redux';
import * as actions from '../store/Auth/auth';
// import './googleLogin.css';

const GoogleLoginO = props => {
  const responseGoogle = async authResult => {
    try {
      if (authResult['code']) {
        const result = await props.loginGoogle(authResult['code']);
        console.log(authResult);
        props.loginGoogle(result);
      } else {
        throw new Error(authResult);
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  return (
    <div className="login-page">

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
    </div>
  );
};

const mapStateToProps = state => {
  console.log('loggedIn in Login', state.auth.loggedIn);
  return {
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  loginGoogle: code => dispatch(actions.loginGoogle(code)),
  //   logout: () => dispatch(actions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLoginO);
