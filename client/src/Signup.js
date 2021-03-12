import { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
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
      lastname: '',
      passwordsDontMatch: false
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
      emailtaken: this.state.emailtaken?name=="email":false
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
          firstName: this.state.firstname,
          lastName: this.state.lastname
        }

      })
      .then((res=>{
      
      if(res.status==200){
       this.setState({loggedIn: true})
      }
      })).catch(error=>{
        console.log(error);
        this.setState({
          emailtaken: true
        })
        
      })
    }
    
  }
  render() {
    if(this.state.loggedIn){
      return(<Redirect to="/home"></Redirect>)
    }
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
          type="text"
          name="lastname"
          placeholder="Last Name"
          value={this.state.lastName}
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
        {this.state.emailtaken && <div className="error">Email already taken</div>}
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
        {this.state.passwordsDontMatch && <div className="error">Passwords don't match</div>}
        <input className={Object.values(this.state).includes("")?"button":"activatedButton"} type="submit" value="Sign Up" />
      </form>
      <div className="disclaimer">By clicking the "Sign Up button, you are creating a plugsity account, and you agree to Plugsity's terms of use and privacy policy</div>
      <hr/>
      <div className="business-signup">
      <div>Sign up as a business? </div> 
      <Link to="/business">
      <div>Get Started</div>
      </Link>
      </div>
      </div>
    );
  }
}

