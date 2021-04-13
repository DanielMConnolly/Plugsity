import React, { useContext } from 'react';
import '../App.css';
import {useState, useEffect} from 'react';
import Bus_Identification_1 from './Bus_Identification_1';
import Bus_Identification_2 from './Bus_Identification_2';
import Point_Of_Contact from './Point_Of_Contact';
import Point_Of_Contact_2 from './Point_Of_Contact_2';
import Payment_Methods_3 from './Payment_Methods_3';
import Payment_Methods_1 from './Payment_Methods_1';
import Business_Policies from './Business_Policies';
import Header from '../Header';
import AltHeader from '../AltHeader';

import { Stepper, StepLabel, Step } from '@material-ui/core';
import { multiStepContext } from './StepContext';
import '../css/Stepper.css';
import '../css/Business_Setup.css';

function App() {

    const [reponse, setResponse] = useState(null);
    const [userData, setUserData] = useState({});
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
                return <Business_Policies />
                
            case 6:
                return <Payment_Methods_3 />
           
                
            
        }

    };


    return (

        <div className="App">
            <header style={{width: '100%'}}>
                <AltHeader />
                <div style={{ marginLeft: '13%' }} >

                    <p style={{ fontSize: '26px', lineHeight: '48px', textAlign: 'left', fontFamily: 'DM Sans', fontWeight: 700 }}>Let's get started!</p>
                </div>
                <div style={{ marginLeft: '13%' }}>
                    <p style={{ fontSize: '16px', lineHeight: '24px', textAlign: 'left', fontFamily: 'DM Sans', fontWeight: 700 }}>Tell us about you and your Business</p>
                </div>
            </header>

            <Stepper style={{ width: '65%'}} activeStep={ currentStep-1 } orientation="horizontal">
              <Step>
                  <StepLabel></StepLabel>
              </Step>
              <Step>
                  <StepLabel></StepLabel>
                </Step>
                <Step>
                    <StepLabel></StepLabel>
                </Step>
              <Step>
                  <StepLabel></StepLabel>
                </Step>
                <Step>
                    <StepLabel></StepLabel>
                </Step>
                <Step>
                    <StepLabel></StepLabel>
                </Step>
                
                
               
                
          </Stepper>
          { showStep(currentStep) }
            
      </div>
  );
}

export default App;
