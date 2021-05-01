import React from 'react';
import '../css/UserProfile.css';

import UserOrders from "../UserOrders";


class MyOrders extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <UserOrders id={this.props.user_id} />
            </div>
        )
    }
}

export default MyOrders