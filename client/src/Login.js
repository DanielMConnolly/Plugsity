import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import './css/Signup.css'
import { getBusinessDataFromUser, isUserABusiness } from './Utils/ApiCalls';
import axios from 'axios';
export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordWrong: false
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });

  }
  onSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: '/auth/login',
      headers: {
        "Accept": 'application/json'
      },
      data: {
        email: this.state.email,
        password: this.state.password,
      }

    }).then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user_id);
      isUserABusiness(response.data.user_id).then(result => {
        if (result) {
          getBusinessDataFromUser(response.data.user_id).then(res => localStorage.setItem('business_id', res.business_id));
        }

      });

      if (response.status == 200) {
        this.setState({ loggedIn: true })
      }
    }, (error) => {
      //password or username is incorrect
      this.setState({
        passwordWrong: true
      });
    });

  }
  render() {
    if (this.state.loggedIn) {
      return (<Redirect to="/homepage"></Redirect>)
    }
    return (
      <div className="Signup">
        <form onSubmit={this.onSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
          {this.state.passwordWrong && <div className="error">Password or Username is incorrect</div>}
          <input className={Object.values(this.state).includes("") ? "button" : "Login"} type="submit" value="Login" />
        </form>
        <hr />
        <div className="disclaimer">By signing in, you agree to Plugsity's terms of use and privacy policy</div>
      </div>
    );
  }
}

