import React, { Component } from "react";
import axios from "axios";
import "./css/ProductDetails.css";
import Button from "./ProductButton";
import Tabs from "./Tabs";
import { loadStripe } from "@stripe/stripe-js";
import ImageModal from "./ImageModal";
import keys from "./keys.json";
import { Redirect } from "react-router";
const stripePromise = loadStripe(keys.stripeTestPublic);

export default class ProductDetailsRight extends Component {
    constructor(props) {
        super(props);
        console.log(keys.stripeTestPublic);
        this.state = {
            user_id: localStorage.getItem("user_id"),
            redirectToLogin: false,
            count: 1,
            active: "Description",
            product_id: this.props.product_id,
            product_name: this.props.product_name,
            image_link: this.props.product_image_link,
            product_cost: this.props.product_cost,
            business_id: this.props.business_id,
        };
        this.descriptionBlurb = "Product Description";
        this.shippingBlurb = "Shipping Details";
        this.returnsBlurb = "Return Policy";
    }

    handleCount(value) {
        this.setState((prevState) => ({ count: prevState.count + value }));
    }

    handleClick = async (event) => {
        // get stripe instance
        if (!localStorage.hasOwnProperty("user_id")) {
            console.log("Not logged in");
            this.setState({ redirectToLogin: true });
            return;
        }
        const stripe = await stripePromise;

        console.log("inside handleclick stripe");
        console.log(this.state);
        // console.log(this.state);
        // call backend here
        // hackity hack
        const acctResponse = await axios.get(
            `/api/products/stripe/${this.state.business_id}`
        );
        console.log(acctResponse.data);
        // can't find a better way to do this.
        const stripe_acct_id = acctResponse.data.stripe_acct_id;

        const response = await axios.post(
            `/api/stripe/create-checkout-session`,
            {
                product_id: this.state.product_id,
                product_name: this.state.product_name,
                image_link: this.state.image_link,
                quantity: 1,
                product_cost: this.state.product_cost,
                business_id: this.state.business_id,
                stripe_acct_id: stripe_acct_id,
            }
        );
        console.log(response);
        const session = response.data;
        console.log(session.sessionId);
        const result = await stripe.redirectToCheckout({
            sessionId: session.sessionId,
        });
        await axios.post("/api/stripe/result-info", { result });
        if (result.error) {
            return <div>{result.error.message}</div>;
        }
    };

    render() {
        if (this.state.redirectToLogin) {
            return <Redirect to='/' />;
        } else {
            return (
                <div className='column product-details-right'>
                    <div className='row'>
                        <div className='business-attrs'>
                            {" "}
                            By {this.props.legal_business_name}
                        </div>
                    </div>
                    <div className='row'>
                        <h3>{this.props.product_name}</h3>
                    </div>
                    <div className='row'>
                        <h3>$ {this.props.product_cost}</h3>
                    </div>

                    <hr />
                    <div className='row'>
                        <Button
                            btnClass='btn-minus'
                            className='btn'
                            sign='-'
                            count={this.state.count}
                            updateCount={this.handleCount.bind(this)}
                        />
                        {this.state.count}
                        <Button
                            btnClass='btn-plus'
                            sign='+'
                            count={this.state.count}
                            updateCount={this.handleCount.bind(this)}
                        />
                    </div>
                    <div className='row'>
                        <button type='submit' className='btn btn-blue'>
                            {" "}
                            Add to Cart{" "}
                        </button>
                        <button
                            role='link'
                            className='btn btn-border-blue'
                            onClick={this.handleClick}
                        >
                            {" "}
                            Checkout With Stripe{" "}
                        </button>
                    </div>

                    <div>
                        {this.state.active === "Description"
                            ? this.descriptionBlurb
                            : this.state.active === "Shipping"
                            ? this.shippingBlurb
                            : this.returnsBlurb}
                    </div>
                    <Tabs
                        active={this.state.active}
                        onClick={(label) => {
                            this.setState({ active: label });
                        }}
                    >
                        <div label='Description' className='row'>
                            {this.props.product_description}
                        </div>
                        <div label='Shipping' className='row'>
                            Shipping Info
                        </div>
                        <div label='Returns' className='row'>
                            Return info
                        </div>
                    </Tabs>
                </div>
            );
        }
    }
}
