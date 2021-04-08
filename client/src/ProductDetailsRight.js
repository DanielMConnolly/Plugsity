import React, { Component } from "react";
import axios from "axios";
import "./css/ProductDetails.css";
import Button from "./ProductButton";
import Tabs from "./Tabs";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
    "pk_test_51IcxTdA5vPOiaFddKJ7So1Rg4WCVjJLpKvP8JBJVK7Pd7orAZMx2C5RWseT3rxrNHT19gQYgPVKyTluxC0L0x6ER00kTG6TV59"
);

export default class ProductDetailsRight extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            count: 1,
            active: "Description",
            product_id: this.props.product_id,
            product_name: this.props.product_name,
            image_link: this.props.product_image_link,
            product_cost: this.props.product_cost,
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
        const stripe = await stripePromise;

        console.log("inside handleclick stripe");
        console.log(this.state);
        // console.log(this.state);
        // call backend here
        // const response = await fetch(`/api/stripe/create-checkout-session`, {
        //     method: "POST",
        //     body: JSON.stringify({
        // product_id: this.state.product_id,
        // product_name: this.state.product_name,
        // image_link: this.state.image_link,
        // quantity: 1,
        // product_cost: this.state.product_cost,
        //     }),
        // });

        // const session = await response.json();
        // console.log(session);
        // const result = await stripe.redirectToCheckout({
        //     sessionId: session.id,
        // });
        const response = await axios.post(
            `/api/stripe/create-checkout-session`,
            {
                product_id: this.state.product_id,
                product_name: this.state.product_name,
                image_link: this.state.image_link,
                quantity: 1,
                product_cost: this.state.product_cost,
            }
        );
        console.log(response);
        const session = response.data;
        console.log(session.sessionId);
        const result = await stripe.redirectToCheckout({
            sessionId: session.sessionId,
        });

        if (result.error) {
            return <div>{result.error.message}</div>;
        }
    };

    render() {
        return (
            <div className='column'>
                <div className='row'>
                    <div className='business-attrs'>Business name</div>
                    <div className='business-attrs'>Sales</div>
                    <div className='business-attrs'>Reviews</div>
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
