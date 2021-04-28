import React, { Component, Fragment } from "react";
import axios from "axios";
import moment from "moment-timezone";

class CompletedOrdersDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            business_id: localStorage.getItem("business_id"),
            completedOrders: [],
            ordersUserProductData: [],
            loading: false,
        };
    }

    async fetchCompletedOrders() {
        const ordersResponse = await axios.get(
            `/api/orders/business/completed/${this.state.business_id}`
        );
        const ordersData = ordersResponse.data;

        this.setState({
            completedOrders: ordersData,
        });

        // There has to be a better way for this lolol
        var orderUserProductDataList = [];
        for (let i = 0; i < this.state.completedOrders.length; i++) {
            var order = this.state.completedOrders[i];
            var userResponse = await axios.get(
                `/api/orders/user/${order.user_id}`
            );
            var userData = userResponse.data;
            var productResponse = await axios.get(
                `/api/orders/product/details/${order.product_id}`
            );
            var productData = productResponse.data;
            // console.log(userData, productData);
            var { order_id, order_date, order_status, user_id } = order;
            order_date = moment
                .unix(order.order_date)
                .format("MMMM Do YYYY, HH:mm");
            // console.log(order_id, order_date, order_status, user_id);

            var { first_name, last_name, email_address } = userData[0];

            const { product_name, product_cost } = productData[0];
            const name = first_name + " " + last_name;
            const dataObject = {
                order_id,
                order_date,
                order_status,
                user_id,
                name,
                email_address,
                product_name,
                product_cost,
            };
            orderUserProductDataList.push(dataObject);
        }
        this.setState({
            ordersUserProductData: orderUserProductDataList,
            loading: true,
        });
    }

    async componentDidMount() {
        await this.fetchCompletedOrders();
        console.log(this.state);
    }

    render() {
        if (this.state.loading) {
            return (
                <Fragment>
                    <h1>Completed Orders</h1>
                    {this.state.ordersUserProductData.map((dataObject, idx) => {
                        return (
                            <div className='order-container'>
                                <div>
                                    Order ID:-{" "}
                                    <strong>{dataObject.order_id}</strong>{" "}
                                    Product Name:-{" "}
                                    <strong>{dataObject.product_name}</strong>
                                </div>
                                <div>
                                    Order Placed At:-{" "}
                                    <strong>{dataObject.order_date}</strong>
                                </div>
                                <div>
                                    User ID:-{" "}
                                    <strong>{dataObject.user_id}</strong>{" "}
                                    Customer Name:-{" "}
                                    <strong>{dataObject.name}</strong>
                                </div>
                                <div>
                                    Customer email:-{" "}
                                    <strong>{dataObject.email_address}</strong>
                                </div>
                                <div>
                                    Product Cost:-{" "}
                                    <strong>{dataObject.product_cost}</strong>
                                </div>
                                <div>
                                    Order Status:-{" "}
                                    <strong>{dataObject.order_status}</strong>
                                </div>
                            </div>
                        );
                    })}
                </Fragment>
            );
        } else {
            return (
                <Fragment>
                    <h1>Completed Orders</h1>
                    Fetching your stuff!
                </Fragment>
            );
        }
    }
}

export default CompletedOrdersDashboard;
