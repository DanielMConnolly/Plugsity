import { Component } from 'react';
import Logo from './assets/plugsity-logo.png';
import Dropdown from './Dropdown'

import "./css/header.css"
import AccountHeader from './AccountHeader';

class HeaderMenu extends Component {

    render() {
        return (<div className="headerMenu">
            <div className="header-row">
                <img src={Logo} alt="logo" width="200" />
                <div className="row">
                    <Dropdown title="Categories" list={[]}/>
                    <Dropdown title="Trending" list={[]}/>
                    <a href="#" className="header-link">Top List</a>
                    <a href="#" className="header-link">Video Reviews</a>

                </div>
              <AccountHeader/>
            </div>

            <div className="row">

            </div>


        </div>);
    }


}

export default HeaderMenu;