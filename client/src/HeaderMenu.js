import { Component } from 'react';
import Logo from './assets/plugsity-logo.png';
import Dropdown from './Dropdown'

import "./css/header.css"
import AccountHeader from './AccountHeader';

class HeaderMenu extends Component {

    render() {
        return (
            <div className="header-menu">
                <img src={Logo} alt="logo" width="200" />
                <div className="header-row">
                    <Dropdown title="Categories" list={[]}/>
                    <Dropdown title="Trending" list={[]}/>
                    <a href="#" className="header-link">Top List</a>
                    <a href="#" className="header-link">Video Reviews</a>

                </div>
              <AccountHeader/>
            </div>

     );
    }


}

export default HeaderMenu;