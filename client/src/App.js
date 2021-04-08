import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SignupLogin from "./SignupLogin";
import Review from "./Review/Review";
import ReviewDetails from "./Review/ReviewDetails"
import ReviewList from "./Review/ReviewList";
import SignupLogin_Bus from "./SignupLogin_Bus";
import Search from "./Search";
import HomePage from "./Homepage";
import ProductForm from "./ProductForm";
import ProductDetails from "./ProductDetails";
import UserProfile from "./ProfilePages/UserProfile";
import Footer from "./Footer";
import AllProducts from "./ProductsAll";
import SignupLogin from './SignupLogin';
import Bus_Identification_1 from './Bus_Identification_1';
import Bus_Identification_2 from './Bus_Identification_2';
import Point_Of_Contact from './Point_Of_Contact';
import Point_Of_Contact_2 from './Point_Of_Contact_2';
import Payment_Methods_3 from './Payment_Methods_3';
import Payment_Methods_1 from './Payment_Methods_1';
import Business_Policies from './Business_Policies';
import AltHeader from './AltHeader';
import { Stepper, StepLabel, Step } from '@material-ui/core';
import { multiStepContext } from './StepContext';
import './StepperCSS.css';
import './css/Business_Setup.css';



function App() {
    const { currentStep, finalData } = useContext(multiStepContext);
     function showStep(step) {
        switch (step) {
            case 1:
                return <Bus_Identification_1 />
            case 2:
                return <Bus_Identification_2 />
            case 3:
                return <Point_Of_Contact />
            case 4:
                return <Point_Of_Contact_2 />
            case 5:
                return <Payment_Methods_1 />
            case 6:
                return <Payment_Methods_3 />
            case 7:
                return <Business_Policies />
            
        }

    };
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
                    <Route exact path='/reviews/upload'>
                        <Review />
                    </Route>
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
                </Switch>
            </Router>
        </div>
    );
}

export default App;
