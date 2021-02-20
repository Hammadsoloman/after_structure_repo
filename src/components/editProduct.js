/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as actions from '../store/Admin/admin';
import Show from '../components/Show';
import Particles from 'react-particles-js';
import particlesConfig from '../config/configParticles';

const EditProduct = props => {
  let { id } = useParams();

  const [product, setProduct] = useState({});

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    console.log('product in handleSubmit', product);
    e.preventDefault();
    // i will add the token here when i use auth
    // ,props.token
    await props.editAdmin(id, product);
  };

  {
    /* <Show condition={props.loggedIn}> */
  }
  {
    /* </Show> */
  }
  return (
    <>
      <div
        className="hero is-primary"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div className="hero-body container">
          <Particles height="15vh" width="15vw" params={particlesConfig} />
          <h4 className="title">Edit Selected Item</h4>
          <Particles height="15vh" width="15vw" params={particlesConfig} />
        </div>
      </div>
      <Show condition={props.loggedIn}>
        <div style={{ margin: '100px' }}>
          <form className="form-horizontal" onSubmit={handleSubmit}>
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
                    onChange={handleChange}
                    value={product.title}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" for="category">
                  category{' '}
                </label>
                <div className="control">
                  <input
                    id="textinput-1"
                    name="category"
                    type="text"
                    placeholder="category"
                    className="input is-large"
                    required=""
                    onChange={handleChange}
                    value={product.category}
                  />
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
                    placeholder="desc"
                    className="input is-large"
                    required=""
                    onChange={handleChange}
                    value={product.desc}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label" for="textinput-3">
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
                    onChange={handleChange}
                    value={product.price}
                  />
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
                    onChange={handleChange}
                    value={product.image}
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
                    Edit
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </Show>
    </>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  // ,token
  editAdmin: (id, product) => dispatch(actions.editAdmin(id, product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
