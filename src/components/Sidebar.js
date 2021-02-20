/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/category/index';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import '../style/Sidebar.css';

function Sidebar(props) {
  useEffect(() => {
    props.getCat();
  }, []);

  return (
    <section key="section" className="col-6 col-md-6 col-lg-3 mb-3 categories">
      <span key="ul">
        {props.categories.categories.map(element => {
          console.log('element.subCategory  in sidepar', element.subCategory);
          // console.log('props.categories in sidepar', props.categories);

          return (
            <div className="sidebar">
              <List disablePadding dense>
                <ListItem
                  key={element._id}
                  button
                  onClick={() =>
                    props.changeActiveCategory(element.displayName)
                  }
                  //   value={category.sub.map(home => (
                  //     <div>{home.subName}</div>
                  //  ))}
                >
                  <ListItemText style={{ color: '#00D1B2', marginLeft: '35%' }}>
                    {element.displayName}
                  </ListItemText>

                  {/* <ListItemText>{element.subCategory.subName}</ListItemText> */}
                </ListItem>
              </List>

              <br />
              <List disablePadding dense>
                {element.subCategory.map(home => (
                  <ListItem key={home._id} button>
                    <ListItemText
                      onClick={() =>
                        props.changeActiveSubCategory(home.subName)
                      }
                    >
                      {home.subName}
                    </ListItemText>
                    {/* <ListItemText>{element.subCategory.subName}</ListItemText> */}
                  </ListItem>
                ))}
              </List>
            </div>
          );

          // return(
          //   <div class="col-md-4 order-md-1 col-lg-3 sidebar-filter">
          //         <h3 class="mt-0 mb-5">Showing Products</h3>
          //         <h6 class="text-uppercase font-weight-bold mb-3">Categories</h6>
          //         <div class="mt-2 mb-2 pl-2">
          //           <div class="custom-control custom-checkbox">
          //             <input type="checkbox" class="custom-control-input" id="category-1">
          //             <label class="custom-control-label" for="category-1">Accessories</label>
          //           </div>
          //         </div>
          // )
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
