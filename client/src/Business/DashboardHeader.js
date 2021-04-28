import { Component } from "react";
import Dropdown from "../Dropdown";
import "../css/businessDashboard.css";

export default class BusinessDashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Dropdown
                    title='Products'
                    list={[]}
                    handleClick={() => this.props.renderDashboard("products")}
                />
                <Dropdown
                    title='Pending Orders'
                    list={[]}
                    handleClick={() =>
                        this.props.renderDashboard("pending_orders")
                    }
                />
                <Dropdown
                    title='Completed Orders'
                    list={[]}
                    handleClick={() =>
                        this.props.renderDashboard("completed_orders")
                    }
                />
            </div>
        );
    }
}
