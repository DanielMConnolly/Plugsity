import React, { Component, Fragment, useEffect, useState } from "react";
import axios from "axios";
import AltHeader from "./AltHeader";
import { Link, Route } from "react-router-dom";

class OrderSuccess extends Component {
    // const [success, setSuccess] = useState("");
    // const [userID, setUserID] = useState(localStorage.getItem("user_id"));
    // const [productID, setProductID] = useState(null);
    // const [productData, setProductData] = useState(null);
    // useEffect(() => {
    //     const query = new URLSearchParams(window.location.search);
    //     if (query.get("success")) {
    //         setSuccess(true);
    //         setProductID(parseInt(query.get("productID")));
    //         const response = await axios.post
    //     }
    //     if (query.get("canceled")) {
    //         setSuccess(false);
    //     }
    // }, []);
    // return success ? (
    //     <div> Your order {sessionID} has been placed successfully</div>
    // ) : (
    //     <div>Your order was not successful</div>
    // );  && localStorage.hasOwnProperty("user_id")
    // return success ? (
    //     <Fragment>
    //         <Header />
    //         <div>Your order has been placed successfully</div>
    //     </Fragment>
    // ) : (
    //     <Fragment>
    //         <Header />
    //         <div>{success}Your order was not placed</div>
    //     </Fragment>
    // );

    constructor(props) {
        super(props);

        this.state = {
            user_id: localStorage.getItem("user_id"),
            success: "",
            product_id: null,
            productData: {},
            loading: false,
        };
    }

    async fetchParams() {
        const query = new URLSearchParams(window.location.search);

        if (query.get("success") === "true" && query.get("productID")) {
            const response = await axios.get(
                `/api/products/${query.get("productID")}`
            );
            console.log(response.data);
            this.setState({
                success: true,
                product_id: parseInt(query.get("productID")),
                productData: response.data,
                loading: true,
            });
            // create an order entry in order table
            const postResponse = await axios.post(`/api/orders/create`, {
                user_id: this.state.user_id,
                business_id: this.state.productData.business_id,
                product_id: this.state.product_id,
            });
        }
        if (query.get("cancelled") === "true") {
            this.setState({
                success: false,
                loading: true,
                product_id: null,
                productData: null,
            });
        }
    }

    async componentDidMount() {
        await this.fetchParams();
        console.log(this.state);
    }

    render() {
        return this.state.loading ? (
            this.state.success ? (
                <Fragment>
                    <AltHeader />
                    <div>Your order has been placed successfully</div>{" "}
                    <Link to='/myorders'>
                        Click here to see all of your orders!
                    </Link>
                </Fragment>
            ) : (
                <Fragment>
                    <AltHeader />
                    <div>Order not placed</div>
                </Fragment>
            )
        ) : (
            <div>One Moment!</div>
        );
    }
}

export default OrderSuccess;
