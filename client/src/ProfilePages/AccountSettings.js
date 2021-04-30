import React from 'react';
import '../css/UserProfile.css';
import axios from 'axios';

class AccountSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newfname: this.props.fname,
            newlname:this.props.lname
        };

    }

    onSubmit = (event) => {
        event.preventDefault();
        axios({
          method: 'post',
          url: '/user/update',
          headers: {
            "Accept": 'application/json'
          },
          data: {
            user_id: localStorage.getItem("user_id"),
            newfname: this.state.newfname,
            newlname: this.state.newlname
          }
    
        }).then((response) => {
            this.props.func();
        }, (error) => {
          
        });
    }
    render() {
        return (
            <div className="AccountSettingsMain">
                <form onSubmit={this.onSubmit}>
                    <input
                        type="text"
                        name="First Name"
                        placeholder= {this.props.fname}
                        value={this.props.fname}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="Last Name"
                        placeholder= {this.props.lname}
                        value={this.props.lname}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input 
                        type="submit" 
                        value="Update" />
                </form>
            </div>
        )
    }
}

export default AccountSettings