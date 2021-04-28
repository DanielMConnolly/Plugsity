import React, { Component } from "react";
import axios from "axios";

class OrderStatusButton extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {
            order_id: this.props.order_id,
            toStatus: this.props.toStatus,
            text: this.props.text,
        };
    }

    handleClick = () => {
        console.log(this.state);
        axios({
            method: "POST",
            url: `/api/orders/changeStatus/${this.state.order_id}/${this.state.toStatus}`,
        }).then((res) => {
            alert(`Order ID:- ${this.state.order_id} has been updated!`);
        });
    };

    render() {
        return (
            <button onClick={() => this.handleClick()}>
                {this.state.text}
            </button>
        );
    }
}

export default OrderStatusButton;
