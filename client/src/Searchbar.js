import { Component } from 'react';
import './css/Search.css';
import Dropdown from './Dropdown';
import Loader from './assets/loader.gif';
import axios from 'axios';
import PageNavigation from './PageNavigation';


class Searchbar extends Component {

    constructor(props) {
        super(props);
        let toggleOptions = ["Products", "Events", "Services"];
        this.state = {
            query: '',
            results: {},
            loading: false,
            message: '',
            totalResults: 0,
            totalPages: 0,
            currentPageNo: 0,
            toggleOptions: toggleOptions,
            selectedToggle: toggleOptions[0],
            open: false,
            open1: false
        };

        this.cancel = '';
    }

    createCityList() {
        let cities = ["New York", "Seattle", "Los Angeles", "Austin", "Chicago", "Philadelphia", "Dallas"]
        let city_list = []
        cities.forEach((city, index) => city_list.push({ "id": index, "title": city, "selected": false }));
        return city_list
    }

    createStateList() {
        let states = ["New York", "California", "Arizona", "Washington", "Florida", "New Jersey", "Georgia", "Colorado", "Pennsylvania", "Connecticut"]
        let states_list = []
        states.forEach((state, index) => states_list.push({ "id": index, "title": state, "selected": false }));
        return states_list
    }

    createToggleOptions() {
        return this.state.toggleOptions.map(item => <div className={this.state.selectedToggle === item ? " category-toggle selected-toggle" : "category-toggle"} id={item} onClick={e => this.handleCategoryToggle(e)}>{item}</div>)
    }

    handleCategoryToggle(e){
        let selectedToggle = e.target.id;
        this.setState({
            selectedToggle: selectedToggle
        })

    }
    /**
 * Get the Total Pages count.
 *
 * @param total
 * @param denominator Count of results per page
 * @return {number}
 */
    getPageCount = (total, denominator) => {
        const divisible = 0 === total % denominator;
        const valueToBeAdded = divisible ? 0 : 1;
        return Math.floor(total / denominator) + valueToBeAdded;
    };


    handleButtonClick = () => {
        this.setState(state => {
            return {
                open: !state.open,
            };
        });
    };

    handleButtonClick1 = () => {
        this.setState(state => {
            return {
                open1: !state.open1,
            };
        });
    };

    render() {
        const { query, loading, message, currentPageNo, totalPages } = this.state;
        const showPrevLink = 1 < currentPageNo;
        const showNextLink = totalPages > currentPageNo;
        return (
            <>
                <div className="searchBar">
                    {this.createToggleOptions()}
                <input
                        type="text"
                        name="query"
                        value={this.props.query}
                        id="search-input"
                        autoComplete="off"
                        className="search-input-field"
                        placeholder="What are you looking for?"
                        onChange={(e)=>{
                            this.props.onHandleChange(e)}
                        }
                        onFocus={this.onFocus}
                    />
                    <div className="search-button">
                        <div className="city-dropdown" ref={this.container}>
                            <Dropdown className="dropdown" title="City" list={this.createCityList()}
                            />
                        </div>
                        {/* <Dropdown className='city' options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" /> */}
                        <div className="city-dropdown" ref={this.container}>
                            <Dropdown className="dropdown" title="State" list={this.createStateList()} />
                        </div>
                        <button className="search-button1" onClick={(e)=>{this.props.handleOnSearch(e)}}><i  aria-hidden="true"/>Search</button>
                    </div>
                </div>

            </>)
    }





}


export default Searchbar;