/* eslint-disable no-lone-blocks */
import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as actions from '../store/category/index';
import Show from './Show';
import Particles from 'react-particles-js';
import particlesConfig from '../config/configParticles';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import '../style/categoryForm.css';
import axios from 'axios';

const FormCategory = props => {
  // console.log('props.categories in FormCategory', props.categories);

  useEffect(() => {
    //  props.token
    props.getCat();
  }, []);

  // const [textToggle, textToggleState] = useState(false);

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
              <label className="label" for="singlebutton-0"></label>
              <div className="control">
                <button
                  name="singlebutton-0"
                  className="button is-success"
                  // onClick={refreshPage}
                  // onClick={() => textToggleState(!textToggle)}
                >
                  Save
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>

      {/* <p>{props.categories.newCategory.displayName}</p> */}

      <div id="table">
        <table id="customers">
          <thead>
            <tr>
              <th>Category</th>
              <th>Add</th>
            </tr>
          </thead>

          <tbody>
            {props.categories.categories.map(element => {
              // console.log('props.categories', props.categories);
              return (
                <Fragment>
                  <tr>
                    <td>{element.displayName}</td>
                    {/* <td>{props.categories.newCategory.displayName}</td> */}
                    <td>
                      <Link to={`/categories/${element._id}`}>subCategory</Link>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
            {/* <tr>
              <td>{props.categories.newCategory.displayName}</td>
              {!props.categories.newCategory ? (
                <td>
                  <Link to={`/categories/${props.categories.newCategory._id}`}>
                    subCategory
                  </Link>
                </td>
              ) : (
                <span></span>
              )}
            </tr> */}

            {props.categories.newCategory ? (
              <tr>
                <td>{props.categories.newCategory.displayName}</td>
                <td>
                  <Link to={`/categories/${props.categories.newCategory._id}`}>
                    subCategory
                  </Link>
                </td>
              </tr>
            ) : (
              <div></div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const mapStateToProps = state => {
  console.log('newCategory in formcategory', state.categories);
  return {
    token: state.auth.token,
    loggedIn: state.auth.loggedIn,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  // ,token
  newCategory: category => dispatch(actions.newCategory(category)),
  getCat: () => dispatch(actions.getRemoteCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormCategory);





