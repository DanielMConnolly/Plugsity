
import React, { Component } from 'react';
import Hamburger from './assets/hamburger-icon.png'
import Dropdown from './Dropdown';
import './css/header.css'
import FontAwesome from 'react-fontawesome';
export default class Header extends Component {

    constructor() {
        super()
        let toggleOptions = ["Products", "Events", "Services"]
        this.state = {
            toggleOptions: toggleOptions,
            selectedToggle: toggleOptions[0]
        }
    }

    createToggleOptions() {


        return this.state.toggleOptions.map(item => <div className={this.state.selectedToggle == item ? " category-toggle selected-toggle" : "category-toggle"} id={item} onClick={e => this.handleToggle(e)}>{item}</div>)
    }
    handleToggle(e) {
        let selectedToggle = e.target.id;
        this.setState({
            selectedToggle: selectedToggle
        })
    }

    render() {
        return <div className="page-header">
            <img src={Hamburger} alt="burger icon" className="menu-icon" />
            <div className="search-bar">
                {this.createToggleOptions()}
                <input
                    type="text"
                    className="search-input"
                    name="searchbar"
                    placeholder="What are you looking for?"
                    value={""}
                    onChange={this.handleInputChange}
                    required
                />
                <div className="search-group">
                <Dropdown list={[{
                    id: 0,
                    title: 'New York',
                    selected: false,
                    key: 'location'
                },
                {
                    id: 1,
                    title: 'Dublin',
                    selected: false,
                    key: 'location'
                },
                {
                    id: 2,
                    title: 'California',
                    selected: false,
                    key: 'location'
                },
                {
                    id: 3,
                    title: 'Istanbul',
                    selected: false,
                    key: 'location'
                },]} title="City" />
                <Dropdown list={[{
                    id: 0,
                    title: 'New York',
                    selected: false,
                    key: 'location'
                },
                {
                    id: 1,
                    title: 'Dublin',
                    selected: false,
                    key: 'location'
                },
                {
                    id: 2,
                    title: 'California',
                    selected: false,
                    key: 'location'
                },
                {
                    id: 3,
                    title: 'Istanbul',
                    selected: false,
                    key: 'location'
                },]} title="State" />
                <button className="search-button">
                    <FontAwesome name="search"/>
                    Search</button>
                 </div>
                
            </div>
        </div>
    }
}