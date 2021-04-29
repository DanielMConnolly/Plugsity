import React, { Component } from "react";
import axios from "axios";

class OrderStatusButton extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    handleClick = () => {
        console.log(this.props);
        this.props.handler(this.props.idx, this.props.toStatus);
        axios({
            method: "POST",
            url: `/api/orders/changeStatus/${this.props.order_id}/${this.props.toStatus}`,
        }).then((res) => {
            alert(`Order ID:- ${this.props.order_id} has been updated!`);
        });
    };

    render() {
        return (
            <button onClick={() => this.handleClick()}>
                {this.props.text}
            </button>
        );
    }
}

export default OrderStatusButton;
