/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/category/index';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Dropdown from '@material-ui/core/Dropdown';
import { Button } from '@material-ui/core';

function Categories(props) {
  useEffect(() => {
    props.getCat();
  }, []);

  return (
    <section key="section" className="categories">
      <span key="ul">
        {props.categories.categories.map(element => {
          console.log('element in categories', element);
          // console.log('props.categories in categories', props.categories);

          return (
            // <React.Fragment key={element.displayName}>
            //   <Button
            //     onClick={() => props.changeActiveCategory(element.displayName)}
            //   >
            //     {element.displayName}
            //   </Button>
            //   <Button
            //     onClick={() =>
            //       props.changeActiveSubCategory(element.displayName)
            //     }
            //   >
            //     {element.sub.map(home => (
            //       <div>{home.subName}</div>
            //     ))}
            //   </Button>

            //   <p>|</p>
            // </React.Fragment>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => props.changeActiveCategory(element.displayName)}
              >
                {element.displayName}
              </button>
              {/* <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {element.sub.map(home => (
                  <div class="dropdown-item"
                  onClick={() => props.changeActiveSubCategory(element.displayName)}

                  >{home.subName}</div>
                ))}
              </div> */}
            </div>
          );
        })}
      </span>
    </section>
  );
}

// we only care about the totalVotes to be displayed
const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = (dispatch, getState) => ({
  getCat: () => dispatch(actions.getRemoteCategories()),
  changeActiveCategory: name => dispatch(actions.changeActiveCategory(name)),
  changeActiveSubCategory: subName =>
    dispatch(actions.changeActiveSubCategory(subName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
