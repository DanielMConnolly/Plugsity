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
import SignupLogin_Bus from './SignupLogin_Bus';

function App() {

const [reponse, setResponse] = useState(null);
 const getResponse = async() => {
  const response = await fetch('/api/hello');
  const body = await response.json();
  if(response.status !==200) throw Error(body.message);
  return body;
 }

 useEffect(()=> {
   getResponse().then(res => {
    const someData = res.express;
    console.log(someData);
    setResponse(someData);
   });

 });

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
      </Switch>
  </Router>
  </div>
  );
}

export default App;
