import React from 'react';
import '../css/UserProfile.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AltHeader from "../AltHeader";
import AddressPage from "./AddressPage";
import Contact from "./Contact";
import Tabs from "../Tabs";
import AccountSettings from "./AccountSettings";
import MyOrders from "./MyOrders";
import MyReviews from "./MyReviews";
import Footer from "../Footer.js";
import axios from 'axios';


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            user_id: -1,
            joined: "",
            label: "Account Settings"
        };

    }
    updateMe(){
        this.getAccountInfo();
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

            < div className="container3 emp-profile" >
                <AltHeader />
                <div className="body" >
                    <div className="profile-picture">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                    </div>
                    <div className="main-text">
                        < h5 className="h5-style" >
                            {this.state.firstname} {this.state.lastname}
                        </h5 >
                        <h5 className="sub-title">
                            Joined {new Date(this.state.joined).toDateString()}
                        </h5>
                    </div>

                    <div className="bottom">
                        <Tabs activeTab={this.state.label} onClick={(label) => this.setState({label:label})} center>
                            <div label="Account Settings">
                                <AccountSettings fname={this.state.firstname} lname={this.state.lastname} func={this.updateMe}/>
                            </div>
                            <div label="My Review" className="tab" >
                                <MyReviews user_id={this.state.user_id}/>
                            </div>
                            <div label="My Orders" className="tab" >
                                <MyOrders user_id={this.state.user_id}/>
                            </div>
                        </Tabs>
                    </div>
                </div>
                <Footer />
            </div >

        )
    }
}

export default UserProfile