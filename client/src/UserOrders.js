import React, { Component, Fragment } from "react";
import axios from "axios";
import AltHeader from "./AltHeader";
import { Redirect } from "react-router";
import "./css/UserOrders.css";
import placeholder from "./assets/placeholder.jpg";
import moment from "moment-timezone";

class UserOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: localStorage.getItem("user_id"),
            loading: false,
            orderData: [],
            productData: [],
        };
    }

    async setProductData() {
        var list = [...this.state.productData];
        for (let i = 0; i < this.state.orderData.length; i++) {
            const order = this.state.orderData[i];
            const productResponse = await axios.get(
                `/api/products/${order.product_id}`
            );
            const {
                product_name,
                legal_business_name,
                product_image_link,
                legal_business_email,
                product_cost,
                legal_business_phone,
                product_description,
            } = productResponse.data;
            var order_date = moment
                .unix(order.order_date)
                .format("MMMM Do YYYY, HH:mm");
            console.log(order_date);
            // console.log(
            //     moment
            //         .utc(order_date)
            //         .tz("America/New_York")
            //         .format("YYYY-MM-DD HH:mm:ss")
            // );
            var order_status = order.order_status;
            var order_id = order.order_id;
            const prodObject = {
                product_name,
                legal_business_name,
                product_image_link,
                legal_business_email,
                product_cost,
                legal_business_phone,
                product_description,
                order_date,
                order_status,
                order_id,
            };
            list.push(prodObject);
        }
        return list;
    }

    async fetchData() {
        console.log("starting to fetch");
        const response = await axios.get(`/api/orders/${this.state.user_id}`);
        // response.data is an array
        // store in state

        console.log("fetched successfully");
        this.setState({
            orderData: response.data,
        });
        console.log("starting to get productdata");
        const productList = await this.setProductData();
        console.log("finsihed product data");
        this.setState({
            productData: productList,
            loading: true,
        });
    }

    async componentDidMount() {
        await this.fetchData();
        console.log(this.state);
    }

    render() {
        if (!localStorage.hasOwnProperty("user_id")) {
            return <Redirect to='/' />;
        } else {
            if (this.state.loading) {
                this.state.productData.map((product) => {
                    console.log(product);
                });
                return (
                    <Fragment>
                        {this.state.productData.length == 0 && <div className="No Items">There are no products ordered</div>}
                        {this.state.productData.map((product) => {
                            return (
                                <div className='order-container'>
                                    <img
                                        className='order-img'
                                        src={
                                            product.product_image_link
                                                ? `https://plugsity-images.s3.amazonaws.com/${product.product_image_link}`
                                                : placeholder
                                        }
                                        alt='...'
                                    ></img>
                                    <div>Order ID:- {product.order_id}</div>
                                    <div>
                                        Product Name:- {product.product_name}
                                    </div>
                                    <div>
                                        Product Cost:- $ {product.product_cost}
                                    </div>
                                    <div>
                                        Business Name:-{" "}
                                        {product.legal_business_name}
                                    </div>
                                    <div>
                                        Contact Number:-{" "}
                                        {product.legal_business_phone}
                                    </div>
                                    <div>
                                        Email:- {product.legal_business_email}
                                    </div>
                                    <div>
                                        Order placed on :- {product.order_date}
                                    </div>
                                    <div>
                                        Order Status :- {product.order_status}
                                    </div>
                                </div>
                            );
                        })}
                    </Fragment>
                );
            } else {
                return (
                    <Fragment>
                        <div>Fetching your orders</div>
                    </Fragment>
                );
            }
        }
    }
}

export default UserOrders;
