import { Component } from 'react';
import {Redirect } from 'react-router-dom'
import axios from 'axios';
import './css/header.css';
import {isUserABusiness} from './Utils/ApiCalls';
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
      redirectToMyAccount: false,
      logout: false
    };
  }
  componentDidMount(){
    let user_id = localStorage.getItem('user_id');
    isUserABusiness(user_id).then(response=>{
      this.setState({
        isUserABusiness: response,
        redirectToMyAccount: false
      })
    }, (reject) => {
      this.setState({
        redirectToMyAccount: false
      })
    });
  }
  redirectToBusinessSignup(){
    this.setState({
      redirectToBusinessSignup: true
    });
  }
  redirectToMyAccount(){
    console.log("trying to access my account again");
    this.setState({
      redirectToMyAccount: true
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
  clearRedirect(){
    this.setState({
      redirectToDashboard: false,
      redirectToMyAccount: false,
      redirectToBusinessSignup: false
    });
  }
  logoutUser = (event) => {
    console.log("trying to log out")
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
      //if error, logout anyway
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('business_id');
      this.setState({ logout: true });

    });
  }
  render() {
    if (this.state.logout) {
      this.clearRedirect();
      return (<Redirect to="/"></Redirect>)
    }
    if(this.state.redirectToDashboard){
      this.clearRedirect();
      return (<Redirect to ="/dashboard"></Redirect>)
    }
    else if(this.state.redirectToBusinessSignup){
      this.clearRedirect();
      return(<Redirect to="/business_setup"></Redirect>)
    }
    if(this.state.redirectToMyAccount){
      this.clearRedirect();
      return(<Redirect to="/myprofile"></Redirect>)
    }  
    let dropdown_list = [{title: "Log In", "id": 1, onClick: ()=>this.redirectToLogin()}];
    if(this.state.logged_in){
      dropdown_list = [
        { title: `My account`, "id": 1,"selected": false, onClick: ()=>this.redirectToMyAccount()  }, 
        { title: "Log Out", "id": 2, selected: false, onClick: this.logoutUser },]
        if(this.state.isUserABusiness && !this.props.dashboard){
          dropdown_list.push({title: "Dashboard", id: 3, "selected": false, onClick: ()=>this.redirectToDashboard()})
        }
        if(!this.state.isUserABusiness){
          dropdown_list.push({title: "Sell on Plugsity", id: 4, "selected": false, onClick: ()=>this.redirectToBusinessSignup()})
        }
        else{
          dropdown_list.push({title: "Edit Business Details", id: 4, "selected": false, onClick: ()=>this.redirectToBusinessSignup()})
        }
    }
    return (
      <div className="header-row">
        <Dropdown title="My Account" list={dropdown_list} 
            borderstyle /> 
      </div>
    )
  }
}
export default AccountHeader;