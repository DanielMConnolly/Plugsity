import {Component} from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import './css/header.css';
import FontAwesome from 'react-fontawesome'
import Dropdown from './Dropdown';

class AccountHeader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            logout: false,
            user_id: ''
        };
    }

    logoutUser = (event) => {
        console.log("logging out");
        axios({
            method: 'post',
            url: 'http://3.138.232.158:5000/auth/logout',
            headers: {
              "Accept": 'application/json'
            },
            data: {
              token: localStorage.getItem('token'),
              user_id: localStorage.getItem('user_id'),
            }
      
          }).then((response) => {
            localStorage.setItem('token', '');
            localStorage.setItem('user_id', '');
            this.setState({ logout: true });
          }, (error)=>{
            //do not logout
          });
        
    }
    render(){
    if (this.state.logout) {
        
        return (<Redirect to="/"></Redirect>)
    }
    return(
        <div className="row">
        <Dropdown title="My Account" list={[{title:`Hello User ${this.state.user_id}`},{title: "Log Out", "id": 2, "selected": false, "onClick": this.logoutUser}]} borderstyle style="account-dropdown" /> <div className="vertical-pipe"></div>
        <div className="cart-button"><FontAwesome name="shopping-cart" /><div className="cart-label"> CART <div className="cart-items-count"> 0 items</div></div></div>
        </div>
        )
    }
}

export default AccountHeader;