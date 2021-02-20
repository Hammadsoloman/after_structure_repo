import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createOrder } from '../../store/Cart/index';
import CheckoutSteps from '../CheckoutSteps';
// import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { connect } from 'react-redux';
import * as actions from '../../store/Cart/index';
import '../../style/Index.css';
function PlaceOrder(props) {
  //   const cart = useSelector(state => state.cart);
  //   if (!cart.paymentMethod) {
  //     props.history.push('/payment');
  //   }
  //   const orderCreate = useSelector(state => state.orderCreate);
  //   const orderCreate = props.orderState;
  //   console.log('orderCreate in PlaceOrder', orderCreate);
  //   const { loading, success, error, order } = orderCreate;
  const toPrice = num => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  //   props.items.total = toPrice(
  //     cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0),
  //   );
  //   cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  const shippingPrice = props.items.total > 100 ? toPrice(0) : toPrice(10);
  console.log('shippingPrice', shippingPrice);
  const taxPrice = toPrice(0.15 * props.items.total);
  const totalPrice = shippingPrice + taxPrice;
  //   const dispatch = useDispatch();
  //   const placeOrderHandler = () => {
  //     dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  //   };
  useEffect(() => {
    // if (success) {
    //   props.history.push(`/order/${order._id}`);
    //   dispatch({ type: ORDER_CREATE_RESET });
    // }
    //   }, [dispatch, order, props.history, success]);
  });
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-6">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong>{' '}
                  {props.orderState.shippingAddress.fullName} <br />
                  <strong>Address: </strong>{' '}
                  {props.orderState.shippingAddress.address},
                  {props.orderState.shippingAddress.city},{' '}
                  {props.orderState.shippingAddress.postalCode},
                  {props.orderState.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {props.orderState.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {/* width: 300%; */}

                  {props.items.addedItems.map(item => (
                    <li key={item.title} style={{ width: '300%' }}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.title}
                          </Link>
                        </div>

                        <div>{totalPrice}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-6">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${props.items.totla}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    props.createOrder({
                      ...props.orderState,
                      orderItems: props.items.addedItems[0],
                      shippingAddress: props.orderState.shippingAddress,
                      itemsPrice: props.items.total,
                      paymentMethod: props.orderState.paymentMethod,
                      shippingPrice: shippingPrice,
                      taxPrice: taxPrice,
                      totalPrice: totalPrice,
                    })
                  }
                  className="primary block"
                  disabled={props.items.addedItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {/* {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  // console.log('state in placeOrder', state.items.addedItems[0]);
  return {
    items: state.products,
    loggedIn: state.auth.loggedIn,
    orderState: state.cart,
  };
};

const mapDispatchToProps = (dispatch, getState) => ({
  // ,token
  //   newShipping: shipping => dispatch(actions.newShipping(shipping)),
  createOrder: order => dispatch(createOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);
