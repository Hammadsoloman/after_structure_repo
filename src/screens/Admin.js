import React, { useEffect } from 'react';
import { getAllAdmin } from '../store/Admin/admin';
import { deleteRemoteData } from '../store/Admin/admin';
import { connect } from 'react-redux';
import Particles from 'react-particles-js';
import particlesConfig from '../config/configParticles';
import { Link } from 'react-router-dom';
import Show from '../components/Show';

import '../style/Products.css';

const Admin = props => {
  useEffect(() => {
    //  props.token
    props.getAllAdmin();
    // console.log('getAllAdmin() in useEffect', getAllAdmin());
  }, []);

  return (
    <>
      <section className="products">
        <div
          className="hero is-primary"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          <div className="hero-body container heig">
            <Particles height="15vh" width="15vw" params={particlesConfig} />
            <h4 className="title">Admin</h4>
            <Particles height="15vh" width="15vw" params={particlesConfig} />
          </div>
        </div>

        <button
          class="button is-primary"
          style={{ margin: '30px', cursor: 'pointer' }}
        >
          {/* <Link to={'/newCategory'}>ADD NEW Category</Link> */}
          <Link to={'/formCategory'}>ADD NEW Category</Link>
        </button>

        {/* </Show> */}
        {/* <Show condition={props.loggedIn}> */}
        <div className="d-flex bd-highlight example-parent">
          {props.adminProducts.map((element, index) => {
            console.log('props.adminProducts', props.adminProducts);
            return (
              <div class="col-6 col-md-6 col-lg-3 mb-3">
                <div class="card  border-0">
                  <div class="card-img-top h-20">
                    <img
                      src={element.image}
                      alt="product"
                      class="img-fluid mx-auto d-block "
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
                        <i>{element.price}</i>
                      </h5>
                    </div>

                    <div className="size-button" style={{ paddingTop: '10%' }}>
                      <div className="is-clearfix">
                        <button
                          style={{ width: '100px', margin: '6px' }}
                          className="button is-small is-outlined is-primary   is-pulled-right"
                          // ,props.token
                          onClick={() => props.deleteAction(element)}
                        >
                          Delete
                        </button>
                      </div>

                      <div className="is-clearfix">
                        <button
                          style={{ width: '100px', margin: '6px' }}
                          className="button is-small is-outlined is-primary   is-pulled-right"
                        >
                          <Link to={`/select/${element._id}`}>Edit</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* </Show> */}
      </section>
    </>
  );
};

const mapStateToProps = state => {
  console.log('state.admin.adminPage.results', state.admin.adminPage);
  return {
    adminProducts: state.admin.adminPage,
    // loggedIn: state.auth.loggedIn,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  // token
  getAllAdmin: () => dispatch(getAllAdmin()),
  // token
  deleteAction: id => dispatch(deleteRemoteData(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
