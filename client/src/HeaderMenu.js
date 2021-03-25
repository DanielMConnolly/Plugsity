import { Component } from 'react';
import Logo from './assets/plugsity-logo.png';
import Dropdown from './Dropdown'
import FontAwesome from 'react-fontawesome'
import "./css/header.css"

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
               <Dropdown title="My Account" list={[]} borderstyle/>
               <button><FontAwesome name="shopping-cart" size="2x" /> Cart</button>
            </div>

            <div className="row">

            </div>


        </div>);
    }


}

export default HeaderMenu;