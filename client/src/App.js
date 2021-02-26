import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

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
     
          <h2>{reponse}</h2>
     
    </div>
  );
}

export default App;
