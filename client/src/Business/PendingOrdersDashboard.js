import { Component, Fragment } from "react";
import axios from "axios";
import moment from "moment-timezone";
import OrderStatusButton from "./OrderStatusButton";

class PendingOrdersDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            business_id: localStorage.getItem("business_id"),
            orders: [],
            orderUserProductData: [],
            loading: false,
        };

        this.changeParentState = this.changeParentState.bind(this);
    }

    async fetchOrdersData() {
        const ordersResponse = await axios.get(
            `/api/orders/business/pending/${this.state.business_id}`
        );

        this.setState({
            orders: ordersResponse.data,
        });
        var orderUserProductDataList = [];
        for (let i = 0; i < this.state.orders.length; i++) {
            var order = this.state.orders[i];
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
            orderUserProductData: orderUserProductDataList,
            loading: true,
        });
        console.log(this.state);
    }

    changeParentState(idx, toStatus) {
        console.log(
            "change parent state from child in parent: ",
            idx,
            toStatus
        );
        var list = this.state.orderUserProductData;

        var myObject = list[idx];
        console.log("Before: ", myObject);
        myObject.order_status = toStatus;
        console.log("After: ", myObject);
        list[idx] = myObject;
        this.setState({
            orderUserProductData: list,
        });
    }

    renderSwitch(order_status, order_id, idx) {
        console.log(order_status);
        switch (order_status) {
            case "Placed":
                return (
                    <OrderStatusButton
                        order_id={order_id}
                        idx={idx}
                        toStatus='Acknowledged'
                        text='Acknowledge Order'
                        handler={this.changeParentState}
                    ></OrderStatusButton>
                );
            case "Acknowledged":
                return (
                    <OrderStatusButton
                        order_id={order_id}
                        idx={idx}
                        toStatus='Shipped'
                        text='Ship Order / Ready for Pickup'
                        handler={this.changeParentState}
                    ></OrderStatusButton>
                );
            case "Shipped":
                return (
                    <OrderStatusButton
                        order_id={order_id}
                        idx={idx}
                        toStatus='Completed'
                        text='Complete Order'
                        handler={this.changeParentState}
                    ></OrderStatusButton>
                );
            default:
                return;
        }
    }

    async componentDidMount() {
        await this.fetchOrdersData();
    }

    render() {
        if (this.state.loading) {
            return (
                <Fragment>
                    <h1>Pending Orders</h1>
                    {this.state.orderUserProductData.map((dataObject, idx) => {
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
                                <div>
                                    {this.renderSwitch(
                                        dataObject.order_status,
                                        dataObject.order_id,
                                        idx
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </Fragment>
            );
        } else {
            return (
                <div>
                    <h1>Orders</h1>
                    Fetching your stuff!
                </div>
            );
        }
    }
}

export default PendingOrdersDashboard;
