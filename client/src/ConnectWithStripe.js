import React, { Component } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Redirect } from "react-router";
import "./css/ConnectWithStripe.css";

class ConnectWithStripe extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = async () => {
        console.log("button just clicked");
        const response = await axios.post(
            "/api/stripe/onboard-user",
            { business_id: this.props.business_id },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        // can create a post request here to input into businesspages
        console.log(response.data.url);
        const accountLink = response.data.url;
        if (accountLink.url) {
            console.log("URL: ", accountLink.url);
            window.location = accountLink.url;
        } else {
            return <div>Something went Wrong!</div>;
        }
    };

    render() {
        return (
            <div class='stripe-connect' onClick={this.handleClick}>
                <span>Connect with</span>
            </div>
        );
    }
}

export default ConnectWithStripe;
