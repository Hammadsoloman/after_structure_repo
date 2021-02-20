import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './navigation/NavBar';
import Footer from './components/Footer';
import Products from './screens/Product';
import Cart from './screens/Cart';
// import CartScreen from './components/CartScreen';
import ItemScreen from './components/Detailes';
// import Admin from './components/Admin'
// import NewProduct from './components//newProduct';
import Admin from './screens/Admin';
import EditProduct from './components/editProduct';
import Order from './screens/Order';
import { connect } from 'react-redux';
import Show from './components/Show';
import Login from './utils/SingIn';
import SignUp from './utils/SignUp';
import Payment from './components/payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import NewForm from './components/newForm';
// import AdminForm from './components/AdminForm';
import FormCategory from './components/FormCategory';
import FormSub from './components/FormSub';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap-theme.min.css';
import Shipping from './components/newPayment/shipping';
import './style/App.css';
import ShippingPayment from './components/newPayment/shippingPayment';
import PlaceOrder from './components/newPayment/PlaceOrder';
// import Categories from './components/categories';
// import ActiveCategory from './components/activeCategories';
// import GoogleLogin from './components/GoogleLogin';

const stripe = loadStripe(
  'pk_test_51I6GFrAAyiIKrt7bIif0gqWYFldPEwjyMVgZU91jfks16TNwVVR8by6TJxKQO7E4Dbt6l6Cjx612VYMd5ZGxXiPQ00P6HRPHct',
);
const App = props => {
  console.log('login in app', !props.loggedIn);

  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header />

          <Switch>
            <Route exact path="/" component={Products} />

            <Route exact path="/">
              <Products />
            </Route>

            {/* <Route exact path="/login">
              <Login />
            </Route> */}

            <Route exact path="/item/:id">
              <ItemScreen />
            </Route>

            <Route exact path="/new">
              <NewForm />
            </Route>

            {/* <Route exact path="/newCategory">
              <AdminForm />
            </Route> */}

            <Route exact path="/formCategory">
              <FormCategory />
            </Route>

            <Route exact path="/categories/:id">
              <FormSub />
            </Route>

            <Route exact path="/cart">
              <Cart />
            </Route>

            <Route exact path="/adminScreen">
              <Admin />
            </Route>

            <Route exact path="/order">
              <Order />
            </Route>

            <Route exact path="/shippingPayment">
              <ShippingPayment />
            </Route>

            <Route exact path="/shipping">
              <Shipping />
            </Route>
            <Route exact path="/placeOrder">
              <PlaceOrder />
            </Route>

            <Route exact path="/payment">
              <Elements stripe={stripe}>
                <Payment />
              </Elements>
            </Route>

            <Route exact path="/select/:id">
              <EditProduct />
            </Route>

            {/* <Route exact path="/signup">
              <SignUp />
            </Route> */}
          </Switch>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </>
  );
};

const mapStateToProps = state => {
  console.log('state.auth in app', state.auth);
  return {
    loggedIn: state.auth.loggedIn,
    // user: state.auth.user,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(App);
