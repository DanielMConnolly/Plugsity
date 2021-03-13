
import React, { Component } from 'react';
import Hamburger from './assets/hamburger-icon.png'
import './css/header.css'
export default class Header extends Component {
    handleToggle() {
        console.log("I was clicked");
    }

    render() {
        return <div className="page-header">
            <img src={Hamburger} alt="burger icon" className="menu-icon" />
            <div className="search-bar">
                <div className="category-toggle" name="products" onclick={() => this.handleToggle()}>Products</div>
                <div className="category-toggle" name="services" onclick={() => this.handleToggle()}>Services</div>
                <div className="category-toggle" name="events" onclick={() => this.handleToggle()}>Events</div>
                <input
                    type="text"
                    className="search-input"
                    name="searchbar"
                    placeholder="What are you looking for?"
                    value={""}
                    onChange={this.handleInputChange}
                    required
                />
            

                <button>Search</button>
            </div>
        </div>
    }
}