import { Component } from "react";
import AltHeader from "../AltHeader";
import ProductsDashboard from "./ProductsDashboard";
import DashboardHeader from "./DashboardHeader";
import ImageUploadDashboard from "./ImageUploadDashboard";
import PendingOrdersDashboard from "./PendingOrdersDashboard";
import CompletedOrdersDashboard from "./CompletedOrdersDashboard";

export default class BusinessDashboard extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.history);
        this.state = {
            dashboard_name: "home",
        };
    }
    setDashboard(name) {
        this.setState({
            dashboard_name: name,
        });
    }

    renderDashboard() {
        let { dashboard_name } = this.state;
        if (dashboard_name == "products") {
            return <ProductsDashboard />;
        } else if (dashboard_name == "images") {
            return <ImageUploadDashboard />;
        } else if (dashboard_name == "pending_orders") {
            return <PendingOrdersDashboard />;
        } else if (dashboard_name == "completed_orders") {
            return <CompletedOrdersDashboard />;
        } else {
            return <h1>Overview</h1>;
        }
    }
    render() {
        return (
            <>
                <AltHeader dashboard />
                <DashboardHeader
                    renderDashboard={this.setDashboard.bind(this)}
                />
                {this.renderDashboard()}
            </>
        );
    }
}
