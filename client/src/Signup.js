import { Component } from 'react';
import './css/Signup.css'
import axios from 'axios';
export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      passwordsDontMatch: false
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
    if(this.state.confirmPassword!==this.state.password){
      this.setState({
        passwordsDontMatch: true
      })
    }
    else{
      axios({
        method: 'post',
        url: 'http://localhost:5000/auth/signup',
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
    return (
      <div className="Signup">
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          value={this.state.firstName}
          onChange={this.handleInputChange}
          required
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={this.state.confirmPassword}
          onChange={this.handleInputChange}
          required
        />
        {this.state.passwordsDontMatch && <div>Passwords don't match</div>}
        <input className={Object.values(this.state).includes("")?"button":"activatedButton"} type="submit" value="Sign Up" />
      </form>
      <div className="disclaimer">By clicking the "Sign Up button, you are creating a plugsity account, and you agree to Plugsity's terms of use and privacy policy</div>
      <hr/>
      <div className="business-signup">
      <div>Sign up as a business? </div> 
      <div>Get Started</div>
      </div>
      </div>
    );
  }
}

