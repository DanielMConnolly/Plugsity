import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import './css/header.css';
import FontAwesome from 'react-fontawesome'
import {isUserABusiness} from './ApiCalls';
import Dropdown from './Dropdown';

class AccountHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: localStorage.hasOwnProperty('user_id'),
      redirectToBusinessSignup: false,
      user_id: '',
      isUserABusiness: false,
      redirectToDashboard: false,
      logout: false
    };
  }

  componentDidMount(){
    let user_id = localStorage.getItem('user_id');
    isUserABusiness(user_id).then(response=>{
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
  redirectToDashboard(){
    this.setState({
      redirectToDashboard: true
    })
  }

  logoutUser = (event) => {
    axios({
      method: 'post',
      url: '/auth/logout',
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
      localStorage.removeItem('business_id');
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
        { title: "Log Out", "id": 2, selected: false, "onClick": this.logoutUser },]
        if(this.state.isUserABusiness && !this.props.dashboard){
          dropdown_list.push({title: "Dashboard", id: 3, "selected": false, onClick: ()=>this.redirectToDashboard()})
        }
        else if(!this.state.isUserABusiness){
          dropdown_list.push({title: "Sell on Plugsity", id: 3, "selected": false, onClick: ()=>this.redirectToBusinessSignup()})
        }
    }
    if (this.state.logout) {
      return (<Redirect to="/"></Redirect>)
    }
    if(this.state.redirectToDashboard){
      return (<Redirect to ="/dashboard"></Redirect>)
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