import React, { useState } from 'react';
import { connect } from 'react-redux';
// import Show from '../show';
import * as actions from '../store/Product/products';
import { useForm } from 'react-hook-form';
// import ErrorMessage from './ErrorMessage'
import Show from '../components/Show';
import Particles from 'react-particles-js';
import particlesConfig from '../config/configParticles';
import { InputLabel, Select, MenuItem } from '@material-ui/core';

// Messages
const required = 'This field is required';

// Error Component
const errorMessage = error => {
  return <div className="invalid-feedback">{error}</div>;
};

const NewProduct = props => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    props.newProduct(data, props.token);
  };

  return (
    <>
      <div
        className="hero is-primary"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div className="hero-body container">
          <Particles height="15vh" width="15vw" params={particlesConfig} />
          <h4 className="title">Add New Item</h4>
          <Particles height="15vh" width="15vw" params={particlesConfig} />
        </div>
      </div>
      {/* <Show condition={props.loggedIn}> */}
      <div style={{ margin: '100px' }}>
        <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
          <fieldset style={{ margin: '100px' }}>
            {/* <legend>Add New Item</legend> */}

            <div className="field">
              <label className="label" for="title">
                Title{' '}
              </label>
              <div className="control">
                <input
                  id="ADD ITEM"
                  name="title"
                  type="text"
                  placeholder="title"
                  className="input "
                  required=""
                  ref={register({ required: true })}
                />

                {errors.title &&
                  errors.title.type === 'required' &&
                  errorMessage(required)}
              </div>
            </div>

            <div className="field">
              <label className="label" for="desc">
                Description{' '}
              </label>
              <div className="control">
                <input
                  id="textinput-1"
                  name="desc"
                  type="text"
                  placeholder="description "
                  className="input is-large"
                  required=""
                  ref={register({ required: true })}
                />
                {errors.desc &&
                  errors.desc.type === 'required' &&
                  errorMessage(required)}
              </div>
            </div>

            <div className="field">
              <label className="label" for="price">
                Price{' '}
              </label>
              <div className="control">
                <input
                  id="textinput-3"
                  name="price"
                  type="text"
                  placeholder="price"
                  className="input "
                  required=""
                  ref={register({ required: true })}
                />
                {errors.price &&
                  errors.price.type === 'required' &&
                  errorMessage(required)}
              </div>
            </div>

            <div className="field">
              <label className="label" for="image">
                Image URL
              </label>
              <div className="control">
                <input
                  id="textinput-2"
                  name="image"
                  type="text"
                  placeholder="image"
                  className="input is-small"
                  ref={register({ required: true })}
                />
                {errors.image &&
                  errors.image.type === 'required' &&
                  errorMessage(required)}
              </div>
            </div>

            <div className="field">
              <label className="label" for="category">
                Category{' '}
              </label>
              <select
                class="custom-select"
                id="inputGroupSelect01"
                name="category"
              >
                {props.categories.categories.map(category => {
                  return (
                    <option value={category.displayName}>
                      {category.displayName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* <div className="field">
              <label className="label" for="category">
                Sub-Category{' '}
              </label>
              <select
                class="custom-select"
                id="inputGroupSelect01"
                name="category"
              >
                {props.categories.categories.map(category => {
                  return (
                    <option value={category.displayName}>
                      {category.displayName}
                    </option>
                  );
                })}
              </select>
            </div> */}

            <div className="field">
              <label className="label" for="singlebutton-0"></label>
              <div className="control">
                <button
                  id="singlebutton-0"
                  name="singlebutton-0"
                  className="button is-success"
                  style={{ marginLeft: '650px' }}
                >
                  SAVE
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
  newProduct: (product, token) => dispatch(actions.newProduct(product, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);

{
  /* <div className="field">
                <label className="label" for="category">
                  Category{' '}
                </label>
                <div className="control">
                  <input
                    id="textinput-3"
                    name="category"
                    type="text"
                    placeholder="category"
                    className="input "
                    required=""
                    ref={register({ required: true })}
                  />
                  {errors.category &&
                    errors.category.type === 'required' &&
                    errorMessage(required)}
                </div>
              </div> */
}

{
  /* <div className="field">
                <label className="label" for="desc">
                  Category{' '}
                </label>
                <div className="control">
                  <input
                    id="textinput-1"
                    name="desc"
                    type="text"
                    placeholder="category "
                    className="input is-large"
                    required=""
                    ref={register({ required: true })}
                  />
                 <option selected>Blog Title</option>
                  {props.blogs.blogs.map(blog => {
                  return (
                    <option value={blog.blogTitle}>
                      {blog.blogTitle}
                    </option>
                  );
                })}
                  {errors.desc &&
                    errors.desc.type === 'required' &&
                    errorMessage(required)}
                </div>
              </div> */
}

{
  /* <InputLabel htmlFor="category">
                Choose one Person of trinity
              </InputLabel>
              <Select
                id="category"
                inputProps={{
                  inputRef: ref => {
                    if (!ref) return;
                    register({
                      name: 'trinityPerson',
                      value: ref.value,
                    });
                  },
                }}
              >
                {props.categories.categories.map(category => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.displayName}
                  </MenuItem>
                ))}
              </Select> */
}

{
  /* <div /> */
}
