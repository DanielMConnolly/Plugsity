import { Component } from 'react';
import './css/Signup.css'
import axios from 'axios';
export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
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
      console.log("logging in now")
      axios({
        method: 'post',
        url: 'http://localhost:5000/auth/login',
        headers: {
          "Accept": 'application/json'
        },
        data: {
          email: this.state.email,
          password: this.state.password,
          name: this.state.name
        }

      }).catch(error=>{
        console.log("did not log in")
        console.log(error);
      })
    }
    
  }
  render() {
    return (
      <div className="Login">
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
        <input className={Object.values(this.state).includes("")?"button":"Login"} type="submit" value="Login" />
      </form>
      <hr/>
      <div className="disclaimer">By signing in, you agree to Plugsity's terms of use and privacy policy</div>
      </div>
    );
  }
}

