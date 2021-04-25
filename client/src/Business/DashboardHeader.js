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
            </div>
        );
    }
}
