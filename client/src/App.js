import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {useState, useEffect} from 'react';
import SignupLogin from './SignupLogin';
import Signup_Bus from './Signup_Bus';
import Home from './Home';
import Review from './Review'
import ReviewList from './ReviewList'
import SignupLogin_Bus from './SignupLogin_Bus';

function App() {



  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path="/">
          <SignupLogin/>
        </Route>
        <Route path="/business">
          <SignupLogin_Bus/>
        </Route>
        <Route path="/home">
        <Home/>
        </Route>
        <Route path="/review">
        <Review/>
        </Route>
        <Route path="/reviewlist">
        <ReviewList/>
        </Route>
      </Switch>
  </Router>
  </div>
  );
}

export default App;
