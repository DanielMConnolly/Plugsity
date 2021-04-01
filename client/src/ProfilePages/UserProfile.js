import React from 'react';
import '../css/UserProfile.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AltHeader from "../AltHeader";
import AddressPage from "./AddressPage";
import Contact from "./Contact";
import AccountSettings from "./AccountSettings";
import Footer from "../Footer.js";


class UserProfile extends React.Component{
    render(){
        return(
            <Router>
            <div className="container3 emp-profile">
                <AltHeader />
            <form method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5 className="h5-style">
                                        Carlota Monteiro
                                    </h5>
                                    <h5 className="sub-title">
                                        Joined Feb 20, 2021
                                    </h5>
                                    <p className="proile-rating"><span className="followers">10 reviews</span>      <span>200 followers</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link" id="home-tab" data-toggle="tab" href="#myaccount" role="tab" aria-controls="home" aria-selected="false">My Account</a>   
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#myshoppinglist" role="tab" aria-controls="profile" aria-selected="false">My Shopping lists</a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/myReviews" className="nav-link" > My Reviews</Link><br/>
                                </li>
                            </ul>
                            
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <button className="user-button">All</button>                    
                            </div>
                            <div className="col-md-2">
                                <button className="user-product-button">Products</button>
                            </div>
                            <div className="col-md-2">
                                <button className="user-service-button">Booked services</button>
                            </div> 
                            <div className="col-md-2">
                                <button className="user-ticket-button">Booked Tickets</button>
                            </div>
                            <div className="col-md-2">
                                <button className="user-prevorder-button">Previous Orders</button>
                            </div>
                        </div>
                    </div>    
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">           
                            <div className="userprofile-box">
                                <a href="http://localhost:3000/Orders" className="box-text">Orders</a><br/>
                            </div>
                            <div className="userprofile-box">
                                <a href="" className="box-text">Returns & Refunds</a><br/>
                            </div>
                            <div className="userprofile-box">
                                <Link to="/myProfile/accountsettings" className="box-text"> Account Settings</Link><br/>
                                <p className="box-desc"> Update your name & other personal information</p>
                                
                            </div>
                            <div className="userprofile-box">
                                <a href="" className="box-text">Payment Methods</a><br/>
                                <p className="box-desc"> Recently used payment method: Card ending with XX34</p>
                            </div>
                            <div className="userprofile-box1">
                                <Link to="/myProfile/addressbook" className="box-text"> Address Book</Link><br/>    
                            </div>

                            <div className="userprofile-box1">
                                <Link to="/myProfile/contactpreference" className="box-text"> Contact Preference</Link><br/>
                            </div>
                            
                            <a href="">Looking for help?</a><br/>
                            <br />

                            <div className="userprofile-box1">
                                <a href="" className="box-text">View Help center</a><br/>
                            </div>

                            <div className="userprofile-box1">
                                <a href="" className="box-text">How do I make a return?</a><br/>
                            </div>

                            <div className="userprofile-box1">
                                <a href="" className="box-text">Having troubles with an order?</a><br/>
                            </div>

                            <div className="userprofile-box1">
                                <a href="" className="box-text">Send us a message</a><br/>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="test">
                              
                        </div>       
                    </div>
                       
                </div>
                   
            </form>  
            <Switch>
            <Route path="/myProfile/addressbook">
                    <AddressPage />
            </Route>
            <Route path="/myProfile/contactpreference">
                <Contact />
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