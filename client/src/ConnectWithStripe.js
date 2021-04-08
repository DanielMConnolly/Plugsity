import React, { Component } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Redirect } from "react-router";

const stripePromise = loadStripe(
    "pk_test_51IcxTdA5vPOiaFddKJ7So1Rg4WCVjJLpKvP8JBJVK7Pd7orAZMx2C5RWseT3rxrNHT19gQYgPVKyTluxC0L0x6ER00kTG6TV59"
);

class ConnectWithStripe extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = async () => {
        const stripe = await stripePromise;
        console.log("button just clicked");

        const response = await axios.post("/api/stripe/onboard-user");
        console.log(response.data);
    };

    render() {
        return (
            <button class='stripe-connect' onClick={this.handleClick}>
                Connect with
            </button>
        );
    }
}

export default ConnectWithStripe;
