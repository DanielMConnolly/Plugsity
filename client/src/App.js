import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SignupLogin from "./SignupLogin";
import Review from "./Review/Review";
import ReviewDetails from "./Review/ReviewDetails";
import ReviewList from "./Review/ReviewList";
import SignupLogin_Bus from "./SignupLogin_Bus";
import Search from "./Search";
import HomePage from "./Homepage";
import ProductForm from "./ProductForm";
import ProductDetails from "./ProductDetails";
import Dashboard from "./Business/BusinessDashboard";
import UserProfile from "./ProfilePages/UserProfile";
import Footer from "./Footer";
import AllProducts from "./ProductsAll";
import Business_Setup from "./BusinessSetup/Business_Setup";
import ProductEditForm from "./ProductEditForm";
import OrderSuccess from "./OrderSuccess";

function App() {
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <SignupLogin />
                    </Route>
                    <Route path='/business'>
                        <SignupLogin_Bus />
                    </Route>
                    <Route path='/homepage'>
                        <HomePage />
                    </Route>
                    <Route
                        exact
                        path='/reviews/show/:reviewID'
                        component={ReviewDetails}
                    ></Route>
                        <Route
                        exact
                        path='/reviews/upload/:productID'
                        component={Review}
                    ></Route>
                    <Route path='/reviewlist'>
                        <ReviewList />
                    </Route>
                    <Route path='/products/createProduct'>
                        <ProductForm />
                    </Route>
                    <Route path='/myProfile'>
                        <UserProfile />
                    </Route>
                    <Route path='/footer'>
                        <Footer />
                    </Route>
                    <Route path='/dashboard'>
                        <Dashboard />
                    </Route>
                    <Route path='/business_setup'>
                        <Business_Setup />
                    </Route>
                    <Route
                        exact
                        path='/products/show/:productID'
                        component={ProductDetails}
                    ></Route>
                    <Route
                        path='/search'
                        render={(props) => <Search {...props} />}
                    />
                    <Route path='/products/show/'>
                        <AllProducts />
                    </Route>
                    <Route
                        path='/products/editProduct/:productID'
                        component={ProductEditForm}
                    ></Route>
                    <Route path='/order' component={OrderSuccess}></Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
