import React from 'react';
import '../css/UserProfile.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AltHeader from "../AltHeader";
import Review from "../Review/ReviewList"
import AddressPage from "./AddressPage";
import Contact from "./Contact";
import AccountSettings from "./AccountSettings";
import Footer from "../Footer.js";
import axios from 'axios';
import Tabs from '../Tabs';
import { useState } from 'react';


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            user_id: -1,
            joined: "",
            reviews: [],
        };

    };
    getReviews() {

    }
    getAccountInfo() {
        axios({
            method: 'post',
            url: '/user/myprofile',
            headers: {
                "Accept": 'application/json'
            },
            data: {
                user_id: localStorage.getItem("user_id")
            }

        }).then((response) => {
            console.log("how is this happening?")
            console.log(response)
            this.setState({
                firstname: response.data.first_name,
                lastname: response.data.last_name,
                user_id: localStorage.getItem("user_id"),
                joined: response.data.created_at
            })
        });

    }
    componentDidMount() {
        this.getAccountInfo();
    }
    render() {
        return (
            <Router>
                <div className="container3 emp-profile">
                    <AltHeader />
                    <form method="post">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-img">
                                    {
                                        //profile pic goes here 
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h5 className="h5-style">
                                        {this.state.firstname} {this.state.lastname}
                                    </h5>
                                    <h5 className="sub-title">
                                        Joined {new Date(this.state.joined).toDateString()}
                                    </h5>
                                    {/*
                                    <div className="nav nav-tabs">

                                        <Tabs activeTab={this.state.active} onClick={(label) => this.setActive(label)} center>
                                            <div label="Account Options">
                                                <div className="nav-item">
                                                    <AccountSettings />
                                                </div>
                                            </div>
                                            <div label="My Reviews" className="tab" >
                                                <div className="nav-item">

                                                </div>
                                            </div>

                                        </Tabs>
                                    </div>
                                    
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link" id="home-tab" data-toggle="tab" href="#myaccount" role="tab" aria-controls="home" aria-selected="false">My Account</a>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/myReviews" className="nav-link" > My Reviews</Link><br />
                                        </li>
                                    </ul>
                                    */}

                                </div>


                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-work">
                                    <div className="userprofile-box">
                                        <a href="/Orders" className="box-text">Orders</a><br />
                                    </div>
                                    <div className="userprofile-box1">
                                        <Link to="/myProfile/accountsettings" className="box-text"> AccountSettings</Link><br />
                                    </div>
                                    <div className="userprofile-box1">
                                        <Link to="/myProfile/myreviews" className="box-text">My Reviews</Link><br />
                                    </div>

                                    {/*
                                    <div className="userprofile-box">
                                        <a href="" className="box-text">Returns & Refunds</a><br />
                                    </div>
                                    <div className="userprofile-box">
                                        <Link to="/myProfile/accountsettings" className="box-text"> Account Settings</Link><br />
                                        <p className="box-desc"> Update your name & other personal information</p>

                                    </div>
                                    <div className="userprofile-box">
                                        <a href="" className="box-text">Payment Methods</a><br />
                                        <p className="box-desc"> Recently used payment method: Card ending with XX34</p>
                                    </div>
                                    <div className="userprofile-box1">
                                        <Link to="/myProfile/addressbook" className="box-text"> Address Book</Link><br />
                                    </div>

                                    

                                    <a href="">Looking for help?</a><br />
                                    <br />

                                    <div className="userprofile-box1">
                                        <a href="" className="box-text">View Help center</a><br />
                                    </div>

                                    <div className="userprofile-box1">
                                        <a href="" className="box-text">How do I make a return?</a><br />
                                    </div>

                                    <div className="userprofile-box1">
                                        <a href="" className="box-text">Having troubles with an order?</a><br />
                                    </div>

                                    <div className="userprofile-box1">
                                        <a href="" className="box-text">Send us a message</a><br />
                                    </div>
                                    */}

                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="test">

                                </div>
                            </div>

                        </div>
                    </form>
                    
                    <Switch>
                        <Route path="/myProfile/myreviews">
                            <Review reviews={this.state.reviews} />
                        </Route>
                        <Route path="/myProfile/accountsettings">
                            <AccountSettings />
                        </Route>
                    </Switch>
                    <Footer />
                </div>
            </Router>



        )
    }
}

export default UserProfile