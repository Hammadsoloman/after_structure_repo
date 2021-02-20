/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../store/Product/products';
// import * as actionsCart from '../store/cartAfterEffect'
import { getOneItem } from '../store/Detailes/detailes';
// import {postRemoteData} from '../store/cartAfterEffect'
import Show from '../components/Show';
import '../style/Products.css';
import Particles from 'react-particles-js';
import particlesConfig from '../config/configParticles';
// import Categories from '../components/categories';
import Sidebar from '../components/Sidebar';
import Rating from '../components/Rating';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Paginate from '../components/Paginate';
// import { Pagination } from '@material-ui/lab/Pagination';
import ActiveCategories from '../components/activeCategories';
import Pagination from '@material-ui/lab/Pagination';
import StarsIcon from '@material-ui/icons/Stars';
const Products = props => {
  let [products, setProducts] = useState([]);
  const [textToggle, textToggleState] = useState(false);

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPost - itemsPerPage;
  const currentPost = props.productState.products.slice(
    indexOfFirstPage,
    indexOfLastPost,
  );
  useEffect(() => {
    // try {
    console.log('product in use effects');
    props.getProd().then(tempUsers => setProducts(tempUsers));
    // } catch (error) {
    //   console.error(error);
    // }
  }, [products]);
  // const [offset, setOffset] = useState(0);
  // const [data, setData] = useState([]);
  // const [perPage] = useState(10);
  // const [pageCount, setPageCount] = useState(0);

  // const getData = async () => {
  //   const res = await axios.get(
  //     `https://main-server-hammad.herokuapp.com/product`,
  //   );
  //   const data = res.data;
  //   const slice = data.slice(offset, offset + perPage);
  //   const postData = slice.map(pd => (
  //     <div key={pd.id}>
  //       <p>{pd.title}</p>
  //       <img src={pd.thumbnailUrl} alt="" />
  //     </div>
  //   ));
  //   setData(postData);
  //   setPageCount(Math.ceil(data.length / perPage));
  // };
  // const handlePageClick = e => {
  //   const selectedPage = e.selected;
  //   setOffset(selectedPage + 1);
  // };

  // useEffect(() => {
  //   props.getProd();
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [offset]);

  // const updateFunctions = element => {
  //   // props.addToCart(element)
  //   console.log('element',element)
  //   props.newCart( element);

  //   // props.createCart(props.cartState.cartItem);
  //   // props.updateRemoteCart(props.cartState.cartItem[0])
  // }

  return (
    <section className="products">
      <div
        className="hero is-primary"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div className="hero-body container">
          <Particles height="15vh" width="15vw" params={particlesConfig} />
          <h4 className="title">Our Products</h4>
          <Particles height="15vh" width="15vw" params={particlesConfig} />
        </div>
      </div>
      {/* <Show condition={props.loggedIn}> */}
      <button
        class="button is-primary"
        style={{ margin: '30px', cursor: 'pointer' }}
      >
        <Link to={'/new'}>ADD NEW ITEM</Link>
      </button>
      {/* </Show> */}
      {/* <Sidebar /> */}
      {/* <ActiveCategories /> */}

      <div class="container height">
        <div className="row">
          {/* <div className="p-2 flex-fill bd-highlight col-example"> */}
          {/* <Categories /> */}
          <Sidebar />
          {/* </div> */}

          {/* {props.productState.products.map(element => { */}
          {currentPost.map(element => {
            // console.log(
            //   'element.category in props.productState.products',
            //   element,
            // );
            // console.log(
            //   'props.categoryState.activeCategory',
            //   props.categoryState,
            // );
            console.log('props.categoryState before if ', props.categoryState);
            console.log('element.category before if', element.category);
            console.log('element before if', element);

            if (
              !props.categoryState.activeCategory &&
              !props.categoryState.activeSupCategory
            ) {
              console.log('after first iffff');
              return (
                <div class="col-6 col-md-6 col-lg-3 mb-3">
                  {/* <i class="far fa-star">icon</i> */}
                  <div class="card  border-0">
                    <StarsIcon
                      // onClick={() => {
                      //   props.addToFav(element._id);
                      // }}
                      // name={element.favorite ? 'heart' : 'heart-o'}
                      // color={element.favorite ? '#F44336' : 'rgb(50, 50, 50)'}
                      style={{
                        marginLeft: '15px',
                        marginTop: '10px',
                      }}
                    />

                    <div class="card-img-top h-20">
                      <img
                        src={element.image}
                        alt="product"
                        class="img-fluid mx-auto d-block zoom"
                      />
                    </div>
                    <div class="card-body text-center">
                      <div>
                        <h4 class="card-title">
                          <a
                            href="product.html"
                            class=" font-weight-bold text-dark text-uppercase small"
                          >
                            {element.title}
                          </a>
                        </h4>
                        <p class="card-title">
                          <a
                            href="product.html"
                            class=" font-weight-bold text-dark text-uppercase small"
                          >
                            {element.desc}
                          </a>
                        </p>
                        <h5 class="card-price small text-warning">
                          <i style={{ color: '#00D1B2' }}>
                            <AttachMoneyIcon />
                            {element.price}
                          </i>
                        </h5>
                      </div>
                      <Rating
                        value={element.rating}
                        text={element.numReviews + ' reviews'}
                        className="colorFont"
                      />
                      <h3 style={{ fontSize: '20px' }}>
                        {element.reviews.length} Reviews
                      </h3>
                      <div
                        className="size-button"
                        style={{ paddingTop: '10%' }}
                      >
                        <button
                          style={{ width: '100px', margin: '6px' }}
                          className="button is-small is-outlined is-primary   is-pulled-right"
                          onClick={() => {
                            props.addToCart(element._id);
                          }}
                        >
                          Add to Cart
                        </button>

                        <div className="is-clearfix">
                          <button
                            style={{ width: '100px', margin: '6px' }}
                            className="button is-small is-outlined is-primary   is-pulled-right"
                            key={element._id}
                            onClick={() => {
                              props.getOneItem(element._id, props.token);
                              console.log(
                                'props.getOneItem in product',
                                props.getOneItem(element._id),
                              );
                            }}
                          >
                            <Link to={`/item/${element._id}`}> Details</Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            if (element.category === props.categoryState.activeCategory) {
              console.log('after first iffff');
              return (
                // style={{ display:'flex'}}  className=" column is-half"
                <div className="p-2 flex-fill bd-highlight col-example">
                  <div className="box" style={{ height: '500px' }}>
                    <img
                      src={element.image}
                      alt="product"
                      // style={{cursor: 'pointer'}}
                      className="zoom"
                    />
                    <div className="media">
                      {/* <div className="media-left"> */}
                      {/* <figure className="image is-128x128"> */}
                      {/* </figure> */}
                      {/* </div> */}
                      <div className="media-content">
                        <b style={{ textTransform: 'capitalize' }}>
                          {element.title} <br />
                          <span className="tag is-primary">
                            ${element.price}
                          </span>
                        </b>
                        <br />

                        <div>{element.desc}</div>
                        <div className="product-rating">
                          <Rating
                            value={element.rating}
                            text={element.numReviews + ' reviews'}
                          />
                        </div>

                        {/* <Show condition={props.loggedIn}> */}
                        <div
                          className="size-button"
                          style={{ paddingTop: '10%' }}
                        >
                          <button
                            style={{ width: '100px', margin: '6px' }}
                            className="button is-small is-outlined is-primary   is-pulled-right"
                            onClick={() => {
                              props.addToCart(element._id);
                            }}
                          >
                            Add to Cart
                          </button>

                          <div className="is-clearfix">
                            <button
                              style={{ width: '100px', margin: '6px' }}
                              className="button is-small is-outlined is-primary   is-pulled-right"
                              key={element._id}
                              onClick={() => {
                                props.getOneItem(element._id, props.token);
                                console.log(
                                  'props.getOneItem in product',
                                  props.getOneItem(element._id),
                                );
                              }}
                            >
                              <Link to={`/item/${element._id}`}> Details</Link>
                            </button>
                          </div>
                        </div>

                        {/* </Show> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            // console.log(
            //   'props.categoryState.subCategory ',
            //   props.categoryState.subCategory[0].subName,
            // );
            // console.log('props.activeSubCategory ', props.activeSubCategory);
            console.log(
              'props.categoryState.categoryState',
              props.categoryState.categoryState,
            );
            // let mapActiveSub=props.categoryState.activeSubCategory.map(activeSub=>{

            // })
            if (element.subCategory === props.categoryState.activeSubCategory) {
              console.log('after Second iffff');
              return (
                // style={{ display:'flex'}}  className=" column is-half"
                <div className="p-2 flex-fill bd-highlight col-example">
                  <div className="box" style={{ height: '500px' }}>
                    <img
                      src={element.image}
                      alt="product"
                      // style={{cursor: 'pointer'}}
                      className="zoom"
                    />
                    <div className="media">
                      {/* <div className="media-left"> */}
                      {/* <figure className="image is-128x128"> */}
                      {/* </figure> */}
                      {/* </div> */}
                      <div className="media-content">
                        <b style={{ textTransform: 'capitalize' }}>
                          {element.title} <br />
                          <span className="tag is-primary">
                            ${element.price}
                          </span>
                        </b>
                        <br />

                        <div>{element.desc}</div>
                        <div className="product-rating">
                          <Rating
                            value={element.rating}
                            text={element.numReviews + ' reviews'}
                          />
                        </div>

                        {/* <Show condition={props.loggedIn}> */}
                        <div
                          className="size-button"
                          style={{ paddingTop: '10%' }}
                        >
                          <button
                            style={{ width: '100px', margin: '6px' }}
                            className="button is-small is-outlined is-primary   is-pulled-right"
                            onClick={() => {
                              props.addToCart(element._id);
                            }}
                          >
                            Add to Cart
                          </button>

                          <div className="is-clearfix">
                            <button
                              style={{ width: '100px', margin: '6px' }}
                              className="button is-small is-outlined is-primary   is-pulled-right"
                              key={element._id}
                              onClick={() => {
                                props.getOneItem(element._id, props.token);
                                console.log(
                                  'props.getOneItem in product',
                                  props.getOneItem(element._id),
                                );
                              }}
                            >
                              <Link to={`/item/${element._id}`}> Details</Link>
                            </button>
                          </div>
                        </div>
                        {/* </Show> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>

        {/* <nav aria-label="Page navigation example">
          <ul className="pagination pagination-accept">
            <li class="page-item">
              <a class="page-link" href="!#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>

            <Paginate
              setCurrentPage={setCurrentPage}
              products={products}
              itemsPerPage={itemsPerPage}
            />
            <li class="page-item">
              <a class="page-link" href="!#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav> */}

        {/* <nav aria-label="Page navigation example">
          <ul class="pagination"> */}
        {/* <li class="page-item">
              <a class="page-link" href="/#">
                <Paginate setCurrentPage={setCurrentPage - 1} />
                Previes
              </a>
            </li> */}
        {/* <br />
            <li class="page-item">
              <a class="page-link" href="/#">
                {' '}
                <Paginate
                  setCurrentPage={setCurrentPage}
                  products={products}
                  itemsPerPage={itemsPerPage}
                />
              </a>
            </li> */}
        {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}

        {/* <li class="page-item">
              <a class="page-link" href="/#">
                <Paginate setCurrentPage={setCurrentPage + 1} />
                Next
              </a>
            </li> */}
        {/* </ul>
        </nav> */}

        <nav aria-label="Page navigation example">
          <ul class="pagination pagination-accept">
            {/* <li class="page-item">
              <a class="page-link" href="!#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li> */}
            <Paginate
              setCurrentPage={setCurrentPage}
              products={products}
              itemsPerPage={itemsPerPage}
            />
            {/* <li class="page-item">
              <a class="page-link" href="!#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li> */}
          </ul>
        </nav>
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  productState: state.products,
  loggedIn: state.auth.loggedIn,
  token: state.auth.token,
  categoryState: state.categories,
});

const mapDispatchToProps = (dispatch, getState) => ({
  getProd: () => dispatch(actions.getRemoteProducts()),
  // ,token
  getOneItem: id => dispatch(getOneItem(id)),
  // // ,token
  // post: (element) => dispatch(actionsCart.postRemoteData(element)),
  //   // ,token
  // putRemoteData: (element) => dispatch(actionsCart.putRemoteData(element))
  addToCart: id => {
    dispatch(actions.addToCart(id));
  },
});

// connecting my component with the mapState to props to be able to use the store.
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products); /* eslint-disable react-hooks/exhaustive-deps */
