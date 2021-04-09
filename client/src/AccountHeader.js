import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import './css/header.css';
import FontAwesome from 'react-fontawesome'
import Dropdown from './Dropdown';

class AccountHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: localStorage.hasOwnProperty('user_id'),
      redirectToBusinessSignup: false,
      user_id: '',
      isUserABusiness: false,
      logout: false
    };
  }

  componentDidMount(){
    let user_id = localStorage.getItem('user_id');
    axios({
      method: 'get', 
      url: `/user/check_if_business/${user_id}`,
    }).then(response=>{
      console.log(response.data);
      this.setState({
        isUserABusiness: response.data
      })
    });
  }

  redirectToBusinessSignup(){
    this.setState({
      redirectToBusinessSignup: true
    });
  }
  redirectToLogin(){
    this.setState({
      logout: true
    })
  }

  logoutUser = (event) => {
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
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      this.setState({ logout: true });
    }, (error) => {
      //do not logout
    });

  }
  render() {
    let dropdown_list = [{title: "Log In", "id": 1, onClick: ()=>this.redirectToLogin()}];
    if(this.state.logged_in){
      dropdown_list = [
        { title: `Hello User ${this.state.user_id}`, "id": 1 }, 
        { title: "Log Out", "id": 2, selected: false, "onClick": this.logoutUser },
        {title: "Sell on Plugsity", id: 3, "selected": false, onClick: ()=>this.redirectToBusinessSignup()}]
    }
    if (this.state.logout) {
      return (<Redirect to="/"></Redirect>)
    }
    else if(this.state.redirectToBusinessSignup){
      return(<Redirect to="/business_setup"></Redirect>)
    }
    return (
      <div className="header-row">
        <Dropdown title="My Account" list={dropdown_list} 
            borderstyle style="account-dropdown" /> <div className="vertical-pipe"></div>
        <div className="cart-button"><FontAwesome name="shopping-cart" /><div className="cart-label"> CART <div className="cart-items-count"> 0 items</div></div></div>
      </div>
    )
  }
}

export default AccountHeader;