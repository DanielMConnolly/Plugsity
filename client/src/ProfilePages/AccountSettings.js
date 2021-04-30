import React from 'react';
import '../css/UserProfile.css';
import axios from 'axios';

class AccountSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newfname: "",
            newlname: ""
        };

    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });

    }

    onAccountSettingSubmit = (event) => {
        let newfirstname = "";
        let newlastname = "";
        if (this.state.newfname == "") {
            newfirstname = this.props.fname;
        } else {
            newfirstname = this.state.newfname;
        }
        if (this.state.newlname == "") {
            newlastname = this.props.lname;
        } else {
            newlastname = this.state.newlname;
        }

        axios({
            method: 'post',
            url: '/user/myprofile',
            headers: {
                "Accept": 'application/json'
            },
            data: {
                user_id: localStorage.getItem("user_id")
            }

        }).then((response) => {
            console.log(response)
        });


        axios({
            method: 'post',
            url: '/user/update',
            data: {
                user_id: localStorage.getItem("user_id"),
                newfname: newfirstname,
                newlname: newlastname
            }

        }).then((response) => {
            console.log("success");
        }, (error) => {
            console.log("error")
        });
    }
    render() {
        return (
            <div className="AccountSettingsMain">
                <form onSubmit={this.onAccountSettingSubmit}>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="newfname"
                        placeholder={this.props.fname}
                        onChange={this.handleInputChange}
                    />
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="newlname"
                        placeholder={this.props.lname}
                        onChange={this.handleInputChange}
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