import React from 'react';
import '../css/UserProfile.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AltHeader from "../AltHeader";
import AddressPage from "./AddressPage";
import Contact from "./Contact";

class AccountSettings extends React.Component {
    render() {
        return (
            <div className="container3 emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="sub-page">
                                <div className="contact-box1">
                                    <div className="my-column">
                                        <h6 className="name-style">First Name</h6>
                                        <input type="text" id="fname" name="firstname" placeholder="Your first name.." className="input-name"></input>
                                    </div>
                                    <div className="my-column" >
                                        <h6 className="name-style">Last Name</h6>
                                        <input type="text" id="lname" name="lastname" placeholder="Your last name.." className="input-name"></input>
                                    </div>
                                    <div className="my-column">
                                        <h6 className="name-style">Bio</h6>
                                        <textarea id="bio" name="bio" rows="6" cols="120" placeholder="Tell us a little bit about yourself" className="textarea" />
                                    </div>
                                </div>

                            </div>

                        </div>
                        <button className="preferences1"> Update</button>
                    </div>

                </form>
            </div>
        )
    }
}

export default AccountSettings