import {Component} from 'react';
import Dropdown from '../Dropdown';
import "../css/businessDashboard.css";

export default class BusinessDashboard extends Component{

    constructor(props){
        super(props)
    }
    render(){
        return (
        <div>
            <div className="dashboard-menu-item">
                Getting Started
            </div>
            <div className="dashboard-menu-item" onClick={()=>this.props.renderDashboard("overview")}>
               Overview
            </div>
          
             <Dropdown title="Orders" list={[]} 
             />
            <Dropdown title="Products" list={[]} handleClick={()=>this.props.renderDashboard("products")} />
            <Dropdown title="Images" list={[]} handleClick={()=>this.props.renderDashboard("images")} />
            <Dropdown title="Events" list={[]} />
            <Dropdown title="Customers" list={[]} />
            <Dropdown title="Discounts" list={[]} />
            <div className="dashboard-menu-item">
                Help
            </div>

        </div>
        )
    }

}