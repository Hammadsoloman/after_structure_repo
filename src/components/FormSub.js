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

const FormSub = props => {
  console.log('categories', props.categories);
  console.log(
    '555555555555555',
    JSON.stringify(props.categories.categories[0].subCategory),
  );
  let { id } = useParams();

  // eslint-disable-next-line react-hooks/rules-of-hooks

  useEffect(() => {
    //  props.token
    props.getCat();
    // console.log('getAllAdmin() in useEffect', getAllAdmin());

    const filteredCategoriesById = props.categories.categories.filter(
      category => category._id === id,
    );

    console.log('qqqqqqqqqqqqqqqqqqq', JSON.stringify(filteredCategoriesById));
  }, []);

  const [textToggle, textToggleState] = useState(false);
  const [subCategory, setSubCategory] = useState({});
  // const [subSub, setsubSub] = useState({});

  const handleChange = e => {
    setSubCategory({ ...subCategory, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    console.log('product in handleSubmit', subCategory);
    e.preventDefault();
    // i will add the token here when i use auth
    // ,props.token
    await props.newSubCategory(id, subCategory);
  };

  return (
    <>
      <div
        className="hero is-primary"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div className="hero-body container">
          <Particles height="15vh" width="15vw" params={particlesConfig} />
          <h4 className="title">Add new subCategory</h4>
          <Particles height="15vh" width="15vw" params={particlesConfig} />
        </div>
      </div>
      {/* <Show condition={props.loggedIn}> */}
      <div style={{ margin: '100px' }}>
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <fieldset style={{ margin: '100px' }}>
            {/* <legend>Add New Item</legend> */}

            <div className="field">
              <label className="label" for="subName">
                Sub-Category{' '}
              </label>
              <div className="control">
                <input
                  id="ADD category"
                  name="subName"
                  type="text"
                  placeholder="subName"
                  className="input "
                  required=""
                  onChange={handleChange}
                  value={subCategory.subName}
                />
              </div>
            </div>

            <div className="field">
              <label className="label" for="singlebutton-0"></label>
              <div className="control">
                <button
                  name="singlebutton-0"
                  className="button is-success"
                  id="save"
                  onClick={() => textToggleState(!textToggle)}
                >
                  Save
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>

      <div id="table">
        <table id="customers">
          <thead>
            <tr>
              <th>Category</th>
            </tr>
          </thead>

          <tbody>
            {/* </tbody> */}

            {props.categories.categories
              .filter(category => category._id === id)[0]
              .subCategory.map(element => {
                console.log('props.categories in sub', element);

                return (
                  <Fragment>
                    <tr>
                      <td>{element.subName}</td>
                    </tr>
                  </Fragment>
                );
              })}

            {textToggle ? (
              <tr>
                <td>{props.categories.sub.subName}</td>
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
{
}

{
  /* <td>{props.categories.sub.subName}</td> */
}
{
  /* <Fragment>
  <tr>
    <td>{props.categories.sub.subName}</td>
  </tr>
</Fragment> */
}
const mapStateToProps = state => {
  console.log('newSUBCategory in formcategory', state.categories);
  return {
    token: state.auth.token,
    loggedIn: state.auth.loggedIn,
    categories: state.categories,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  // ,token
  newSubCategory: (id, subCategory) =>
    dispatch(actions.newSubCategory(id, subCategory)),
  getCat: () => dispatch(actions.getRemoteCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSub);
