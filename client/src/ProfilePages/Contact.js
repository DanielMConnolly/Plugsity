import React from 'react';
import '../css/UserProfile.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AltHeader from "../AltHeader";
import AddressPage from "./AddressPage";
import AccountSettings from "./AccountSettings";


class Contact extends React.Component{
    render(){
        return(
        <Router>
        <div className="container3 emp-profile">
        <form method="post">
            <div className="row">
                <div className="col-md-8">
                    <div className="sub-page">
                        <p className="title-address"> What would you like to hear about from Plugsity?</p>
                        <p className="subtitle-address"> Select your options below and we'll keep you in the loop</p>
                        <div className="contact-box1">
                            <label className="para-title">Discounts & Offers
                                <input type="checkbox" className="check" />
                                <p className="para-subtitle">Be first in line to nab the stuff you love for less</p>
                            </label>
                            <hr className="hr"/>
                            <label className="para-title">New small businesses on Plugsity
                                <input type="checkbox" className="check" />
                                <p className="para-subtitle">Show your favourite local stores your support by staying up to date</p>
                            </label>
                            <hr className="hr"/>
                            <label className="para-title">Your exclusives
                                <input type="checkbox" className="check" />
                                <p className="para-subtitle">Enjoy a birthday treat as well as other tailored updates just for you</p>
                            </label>
                            
                        </div> 
                            
                    </div> 
                         
                </div>  
                <button className="preferences"> Confirm Preferences</button>
            </div> 
                 
        </form>
        <Switch>
             <Route path="/myProfile/addressbook">
                    <AddressPage />
            </Route>
            <Route path="/myProfile/accountsettings">
                    <AccountSettings />
            </Route>
        </Switch>      
    </div>
    </Router>
        )
    }
}

export default Contact