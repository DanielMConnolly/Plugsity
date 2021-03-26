import {Component} from 'react';
import './css/header.css';
import FontAwesome from 'react-fontawesome'
import Dropdown from './Dropdown';

class AccountHeader extends Component{
    render(){
    return(
        
        <div className="row">
        <Dropdown title="My Account" list={[]} borderstyle style="account-dropdown" /> <div className="vertical-pipe"></div>
        <div className="cart-button"><FontAwesome name="shopping-cart" /><div className="cart-label"> CART <div className="cart-items-count"> 0 items</div></div></div>
        </div>
        )
    }
}

export default AccountHeader;