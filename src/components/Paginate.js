import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/Product/products';
import '../style/Index.css';

function Paginate(props) {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(props.productState.products.length / props.itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <nav className="nav-paginate">
      <ul className="ul-paginate">
        {pageNumbers.map(number => {
          return (
            <li className="li-paginate" key={number}>
              <a
                href
                onClick={() => {
                  props.setCurrentPage(number);
                }}
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const mapStateToProps = state => ({
  productState: state.products,
  loggedIn: state.auth.loggedIn,
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch, getState) => ({
  getProd: () => dispatch(actions.getRemoteProducts()),
});

// connecting my component with the mapState to props to be able to use the store.
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Paginate); /* eslint-disable react-hooks/exhaustive-deps */
