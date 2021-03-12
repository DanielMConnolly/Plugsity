import logo from './logo.svg';
import './App.css';
import Signup from './Signup.js'
import Tabs from './Tabs';
import {useState, useEffect} from 'react';
import SignupLogin from './SignupLogin';
import Signup_Bus from './Signup_Bus';
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
      <SignupLogin/>
     
      
       
     
    </div>
  );
}

export default App;
