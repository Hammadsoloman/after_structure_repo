import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
/*
import * as actionsCart from '../store/cartAfterEffect'
*/
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';

import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';
import Show from './Show';
import Particles from 'react-particles-js';
import particlesConfig from '../config/configParticles';
import * as actions from '../store/Product/products';
import Rating from '../components/Rating';
import '../style/Index.css';
import { useParams } from 'react-router-dom';
import { BoxLoading } from 'react-loadingg';

// import { saveProductReview } from '../store/Product/products';

const ItemScreen = props => {
  let { id } = useParams();

  // const classes = useStyles();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const handleKeyDown = e => {
    console.log('');
    if (e.key === 'Enter') {
      console.log('do validate');
    }
  };
  // useEffect(
  //   () => {
  //     let timer1 = setTimeout(() => setShowLoading(null), 1000);

  //     // this will clear Timeout when component unmount like in willComponentUnmount
  //     return () => {
  //       clearTimeout(timer1);
  //     };
  //   },
  //   [], //useEffect will run only one time
  //   //if you pass a value to array, like this [data] than clearTimeout will run every time this value changes (useEffect re-run)
  // );

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log('This will run after 1 second!');
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  // return showLoading && <div>I will be visible after ~1000ms</div>

  const submitHandler = async e => {
    e.preventDefault();
    // dispatch actions
    // dispatch(
    //   saveProductReview(props.match.params.id, {
    //     // name: userInfo.name,
    //     rating: rating,
    //     comment: comment,
    //   }),
    // );
    await props.saveProductReview(id, {
      rating: rating,
      comment: comment,
    });
  };

  function alertSign() {
    console.log(
      'props.lastReview.newReview.message',
      props.lastReview.newReview.message,
    );
    if (props.lastReview.newReview.message) {
      Swal.fire({
        icon: 'success',
        title: 'Review saved successfully!',
      });
      // .then(function () {
      //   history.push('/');
      // });
      // } else {
      //   // dont forget the error here
      //   console.log('cookie in else');
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Wrong username or password',
      //   });
    }
  }

  console.log('props.oneItem', props.oneItem);
  if (props.oneItem.oneItem.reviews) {
    return (
      <>
        <section className="products">
          <div
            className="hero is-primary"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            <div className="hero-body container">
              <Particles height="15vh" width="15vw" params={particlesConfig} />
              <h4 className="title">Detailes</h4>
              <Particles height="15vh" width="15vw" params={particlesConfig} />
            </div>
          </div>
          {/* <Show condition={props.loggedIn}> */}
          {/* </Show> */}
          {/* <div className="d-flex bd-highlight example-parent">
          <div className="p-2 flex-fill bd-highlight col-example">
            <div className="box" style={{ marginLeft: '550px' }}>
              <img
                src={props.oneItem.oneItem.image}
                alt="product"
                className="zoom"
              />
              <div className="media">
                <div className="media-content">
                  <b style={{ textTransform: 'capitalize' }}>
                    {props.oneItem.oneItem.title} <br />
                    <span className="tag is-primary">
                      ${props.oneItem.oneItem.price}
                    </span>
                  </b>
                  <br />

                  <div>{props.oneItem.oneItem.desc}</div>

                  <div className="size-button" style={{ paddingTop: '10%' }}>
                    <div className="is-clearfix">
                      <button
                        style={{ width: '100px', margin: '6px' }}
                        className="button is-small is-outlined is-primary   is-pulled-right"
                        onClick={() => {
                          props.addToCart(props.oneItem.oneItem._id);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

          <div className="details">
            <div className="details-image">
              <img src={props.oneItem.oneItem.image} alt="product"></img>
            </div>
            <div
              className="details-info detailColor"
              style={{ padding: '16px', borderRadius: '10px' }}
            >
              <ul>
                <li>
                  <h4 className="colorFont">{props.oneItem.oneItem.title}</h4>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={props.oneItem.oneItem.rating}
                      text={props.oneItem.oneItem.numReviews + ' reviews'}
                      className="colorFont"
                    />
                  </a>
                </li>
                <li className="colorFont">
                  Price:{' '}
                  <b className="colorFont">${props.oneItem.oneItem.price} </b>
                </li>
                <li className="colorFont">
                  Description:
                  <div className="colorFont">{props.oneItem.oneItem.desc}</div>
                </li>
              </ul>
              <div className="details-action">
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        props.addToCart(props.oneItem.oneItem._id);
                      }}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* {!props.oneItem.oneItem.reviews.length && (
              <div>There is no review</div>
            )} */}
          {/* 
             {
               props.oneItem.oneItem.reviews.length?({
                 
              }): ({
                <div>...Loading</div>
              })
              
            } */}

          <div className="content-margined">
            <ul className="review" id="reviews">
              {props.oneItem.oneItem.reviews.map(review => (
                <li className="oneComment" key={review._id}>
                  <div>
                    <Rating value={review.rating} caption=" "></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}

              {/* {props.lastReview.map(element => {
                if (element.lastReview.newReview) {
                  return (
                    <li className="oneComment" key={props._id}>
                      <div>
                        <Rating
                          value={props.lastReview.newReview.rating}
                          caption=" "
                        ></Rating>
                      </div>
                      <div>
                        {props.lastReview.newReview.createdAt.substring(0, 10)}
                      </div>
                      <div>{props.lastReview.newReview.comment}</div>
                    </li>
                  );
                }
              })} */}

              {props.isComplete ? (
                <li
                  className="oneComment"
                  key={props.lastReview.newReview.data._id}
                >
                  <div>
                    <Rating
                      value={props.lastReview.newReview.data.rating}
                      caption=" "
                    ></Rating>
                  </div>
                  <div>
                    {props.lastReview.newReview.data.createdAt.substring(0, 10)}
                  </div>
                  <div>{props.lastReview.newReview.data.comment}</div>
                </li>
              ) : (
                <div>{/* <BoxLoading /> */}</div>
              )}

              <li className="formReview">
                <h3>Write a customer review</h3>
                {/* {userInfo ? ( */}
                <form onSubmit={submitHandler}>
                  <ul className="form-container">
                    <li>
                      <label
                        htmlFor="rating"
                        style={{ paddingRight: '10px', marginTop: '6px' }}
                      >
                        Rating
                      </label>

                      <select
                        className="select"
                        name="rating"
                        id="rating"
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                      >
                        <label htmlFor="rating">Select</label>

                        <option className="option" value="1">
                          Poor
                        </option>
                        <option className="option" value="2">
                          Fair
                        </option>
                        <option className="option" value="3">
                          Good
                        </option>
                        <option className="option" value="4">
                          Very Good
                        </option>
                        <option className="option" value="5">
                          Excelent
                        </option>
                      </select>
                    </li>
                    {/* <li>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        name="comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        onKeyDown={handleKeyDown}
                      ></textarea>
                    </li> */}
                    <li>
                      {/* <button type="submit" className="button primary">
                        Submit
                      </button> */}
                      <label
                        htmlFor="comment"
                        style={{ paddingRight: '10px', marginTop: '23px' }}
                      >
                        Comment
                      </label>

                      {/* <input
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        onKeyDown={handleKeyDown}
                      /> */}
                      <TextField
                        id="filled-basic"
                        label="Filled"
                        variant="filled"
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    </li>
                  </ul>
                </form>
              </li>
            </ul>
          </div>
          {/* </Show> */}
        </section>
      </>
    );
  } else {
    // eslint-disable-next-line no-unused-expressions
    return (
      <div>
        <BoxLoading />
      </div>
    );
  }
};

const mapStateToProps = state => {
  console.log('products in oneItem state', state.products);
  return {
    oneItem: state.oneItem,
    loggedIn: state.auth.loggedIn,
    token: state.auth.token,
    lastReview: state.products,
    isComplete: state.products.isComplete,
    // reviews:state.

    // token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  addToCart: id => {
    dispatch(actions.addToCart(id));
  },

  saveProductReview: (id, product) => {
    dispatch(actions.saveProductReview(id, product));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen);

// ) : (
//   <div>
//     Please <Link to="/signin">Sign-in</Link> to write a review.
//   </div>
// )}
