import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Show from '../components/Show';
import * as actions from '../store/Auth/auth';
import { Form, Button } from 'react-bootstrap';

const SignUP = props => {
  const state = {
    username: '',
    password: '',
    role: '',
  };

  const [redirect, setRedirect] = useState(false);

  const handleChange = e => {
    state[e.target.name] = e.target.value;
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.signup(state.username, state.password);
    setRedirect(true);
  };

  return (
    <>
      <Show condition={props.loggedIn}>
        {redirect === true ? <Redirect to="/" /> : null}
      </Show>

      <Show condition={!props.loggedIn}>
        <div className="back">
          <div className="sign">
            {/* <Show condition={!props.loggedIn }> */}
            <div className="hero is-primary ">
              <div className="hero-body container">
                <h4 className="title">Sign Up</h4>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
};

const mapStateToProps = state => {
  
  return {
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  signup: (username, password) => dispatch(actions.signup(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUP);
