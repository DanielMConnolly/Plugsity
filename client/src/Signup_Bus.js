import React, { Component } from 'react';
import './css/Signup_Bus.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

import PropTypes from 'prop-types';

export default class Signup_Bus extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      firstlegalname: '',
      lastlegalname: '',
      businessname: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordsDontMatch: false
    };
  }

  handleClick = () => this.setState(({type}) => ({
    type: type === 'text' ? 'password' : 'text'
  }))

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

 onChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if(this.state.confirmPassword !== this.state.password){
      this.setState({
        passwordsDontMatch: true
      })
    }
    else {
      axios({
        method: 'post',
        url: '',
        headers: {
          "Accept": 'application/json'
        },
        data: {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        }

      }).catch(error=>{
        console.log(error);
      })
    }
  }

  render() {
    const bottom_custsignup = {
      width: "154px",
      fontFamily: "DM Sans",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "16px"      
    };

    return (
      <div className="Signup_Bus">
      <form onSubmit={this.onSubmit}>
	<div style = {{alignSelf: "center"}}>
        <input
          type="text"
          name="firstlegalname"
          placeholder="First legal name"
          value={this.state.firstlegalname}
          onChange={this.handleInputChange}
          class = "f_seller_name"
          required
        />
	<input
          type="text"
          name="lastlegalname"
          placeholder="Last legal name"
          value={this.state.lastlegalname}
          onChange={this.handleInputChange}
          class = "l_seller_name"
          required
        />
	</div>
	<input
          type="text"
          style = {{alignSelf: "center"}}
          name="businessname"
          placeholder="Registered business name"
          value={this.state.businessname}
          onChange={this.handleInputChange}
          class = "bus_name"
          required
        />
        <input
          style = {{alignSelf: "center"}}
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          class = "email"
          onChange={this.handleInputChange}
          required
        />   
         <input
           style = {{alignSelf: "center",width:"300px",textAlign:"left"}}
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input
           style = {{alignSelf: "center",width:"300px",textAlign:"left"}}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={this.state.confirmPassword}
          onChange={this.handleInputChange}
          required
        />
        {this.state.passwordsDontMatch && <div>Passwords don't match</div>}     
        <input style = {{alignSelf: "center"}} className={Object.values(this.state).includes("")?"button_Bus":"activatedButton_Bus"} type="submit" value="Sign Up" />
      </form>
      <div className="disclaimer_Bus" style = {{alignSelf: "center"}}>By clicking the "Sign Up" button, you are creating a plugsity account, and you agree to Plugsity's Terms of Use and Privacy Policy</div>
      <hr/>
      <div className="business-signup" style = {{alignSelf: "center"}}>
      
      <div style = {bottom_custsignup}> Sign up as a customer? </div> 
      <Link to="/">
      <div>Get Started</div>
      </Link>
      </div>
      </div>
    );
  }
}

