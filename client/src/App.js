import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SignupLogin from "./SignupLogin";
import Review from "./Review";
import ReviewList from "./ReviewList";
import SignupLogin_Bus from "./SignupLogin_Bus";
import Search from "./Search";
import ProductForm from "./ProductForm";

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
                        <Search />
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
                </Switch>
            </Router>
        </div>
    );
}

export default App;
