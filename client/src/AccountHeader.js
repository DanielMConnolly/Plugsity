import {Component} from 'react';
import './css/header.css';
import FontAwesome from 'react-fontawesome'
import Dropdown from './Dropdown';

class AccountHeader extends Component{

    logoutUser(){
        console.log("logging out");
    }
    render(){
    return(
        
        <div className="row">
        <Dropdown title="My Account" list={[{title: "Log Out", "id": 1, "selected": false, "onClick": this.logoutUser}]} borderstyle style="account-dropdown" /> <div className="vertical-pipe"></div>
        <div className="cart-button"><FontAwesome name="shopping-cart" /><div className="cart-label"> CART <div className="cart-items-count"> 0 items</div></div></div>
        </div>
        )
    }
}

export default AccountHeader;