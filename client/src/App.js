import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SignupLogin from "./SignupLogin";
import Review from "./Review";
import ReviewList from "./ReviewList";
import SignupLogin_Bus from "./SignupLogin_Bus";
import Search from "./Search";
import HomePage from './Homepage';
import ProductForm from "./ProductForm";
import ProductDetails from "./ProductDetails";
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
                    <Route exact path='/homepage'>
                        <HomePage />
                    </Route>
                    <Route path='/review'>
                        <Review />
                    </Route>
                    <Route path='/reviewlist'>
                        <ReviewList />
                    </Route>
                    <Route path='/products/createProduct'>
                        <ProductForm />
                    </Route>
                    <Route
                        path='/products/:productID'
                        component={ProductDetails}
                    ></Route>
                    <Route
                        path='/search'
                    >
                        <Search />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
