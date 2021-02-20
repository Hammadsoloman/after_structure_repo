/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as actions from '../store/category/index';
import Show from './Show';
import Particles from 'react-particles-js';
import particlesConfig from '../config/configParticles';

const AdminUpdate = props => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [category, setCategory] = useState({});

  const handleChange = e => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    console.log('product in handleSubmit', category);
    e.preventDefault();
    // i will add the token here when i use auth
    // ,props.token
    await props.newCategory(category);
  };
  return (
    <>
      <div
        className="hero is-primary"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div className="hero-body container">
          <Particles height="15vh" width="15vw" params={particlesConfig} />
          <h4 className="title">Add new Category</h4>
          <Particles height="15vh" width="15vw" params={particlesConfig} />
        </div>
      </div>
      {/* <Show condition={props.loggedIn}> */}
      <div style={{ margin: '100px' }}>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <fieldset style={{ margin: '100px' }}>
            {/* <legend>Add New Item</legend> */}

            <div className="field">
              <label className="label" for="displayName">
                Category{' '}
              </label>
              <div className="control">
                <input
                  id="ADD category"
                  name="displayName"
                  type="text"
                  placeholder="displayName"
                  className="input "
                  required=""
                  onChange={handleChange}
                  value={category.displayName}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" for="subName">
                Sub-Category{' '}
              </label>
              <div className="control">
                <input
                  id="textinput-1"
                  name="subName"
                  type="text"
                  placeholder="subName"
                  className="input is-large"
                  required=""
                  onChange={handleChange}
                  value={category.sub}
                  // value={category.sub.map(home => (
                  //   <div>{home.subName}</div>
                  // ))}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" for="singlebutton-0"></label>
              <div className="control">
                <button
                  id="singlebutton-0"
                  name="singlebutton-0"
                  className="button is-success"
                  style={{ marginLeft: '650px' }}
                >
                  Save
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      {/* </Show> */}
    </>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loggedIn: state.auth.loggedIn,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  // ,token
  newCategory: category => dispatch(actions.newCategory(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUpdate);
