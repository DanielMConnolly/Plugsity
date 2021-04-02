import React from 'react';
import '../css/UserProfile.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AltHeader from "../AltHeader";
import Contact from "./Contact";
import AccountSettings from "./AccountSettings";


class AddressPage extends React.Component{
    render(){
        return(
        <Router>
        <div className="container3 emp-profile">
        <form method="post">
            <div className="row">
                <div className="col-md-8">
                    <div className="sub-page">
                        <div className="address-box1">
                            <button className="but-style"> Add a new address</button>
                        </div> 

                    </div>       
                </div>    
            </div>      
        </form> 
        <Switch>
            <Route path="/myProfile/contactpreference">
                <Contact />
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

export default AddressPage