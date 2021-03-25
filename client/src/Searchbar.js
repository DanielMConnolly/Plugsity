import {Component} from 'react';
import './css/Search.css';
import Dropdown from './Dropdown';

class Searchbar extends Component{


    render(){
        return (	<div className="container">
        {/*	Heading*/}
        <img src={ Logo } alt="logo" height="60px" width="200px" className="logo1"/>
        {/* Search Input*/}
        <label className="search-label" htmlFor="search-input">
            
            <input
                type="text"
                name="query"
                value={ query }
                id="search-input"
                autoComplete = "off"
                className = "search-input-field"
                placeholder="What are you looking for?"
                onChange={this.handleOnInputChange}
                onFocus={this.onFocus}
            />
            <button className="products-class" value = "products"><p className="products-design">Products</p> </button>
            <button className="services-class" > Services </button> 
            <p className='vertical-line'> | </p>
            <button className="events-class" > Events </button> 
            <p className='vertical-line1'> | </p>
            <button className="search-button">
                <div>
                    <div className="city-dropdown" ref={this.container}>
                        {/* <button className="city" onClick={this.handleButtonClick}>City <i className="fa fa-caret-down"></i></button> */}
                        {/* {this.state.open && (
                        <div className="dropdown">
                            <ul className="ul">
                                <li className="li">New York City</li>
                                <li className="li">Seattle</li>
                                <li className="li">Austin</li>
                                <li className="li">Chicago</li>
                                <li className="li">Los Angeles</li>
                                <li className="li">Philadelphia</li>
                                <li className="li">Dallas</li>
                            </ul>
                        </div> )} */}
                        <Dropdown title="city" 
                    </div>
                    {/* <Dropdown className='city' options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" /> */}
                    <div className="city-dropdown" ref={this.container}>
                        <button className="state" onClick={this.handleButtonClick1}>State <i className="fa fa-caret-down"></i></button>
                        {this.state.open1 && (
                        <div className="dropdown">
                            <ul className="ul">
                                <li className="li">New York</li>
                                <li className="li">Washington</li>
                                <li className="li">Arizona</li>
                                <li className="li">Florida</li>
                                <li className="li">New Jersey</li>
                                <li className="li">California</li>
                                <li className="li">Georgia</li>
                                <li className="li">Texas</li>
                                <li className="li">Connecticut</li>
                                <li className="li">Colorado</li>
                                <li className="li">Pennsylvania</li>
                            </ul>
                        </div> )}
                    </div>
                    <button className = "search-button1"><p className="search-design"><i className="fa fa-search search-icon" aria-hidden="true"/>Search</p></button>
                </div>
            </button>
        </label>
        <p className="heading"> Proudly Supporting</p>
        <p className="heading1"> small local businesses</p>

        {/*	Error Message*/}
            {message && <p className="message">{ message }</p>} 

        {/*	Loader*/}
        <img src={ Loader } className={`search-loading ${ loading ? 'show' : 'hide' }`} alt="loader"/>

        {/*Navigation*/}
        <PageNavigation
            loading={loading}
            showPrevLink={showPrevLink}
            showNextLink={showNextLink}
            // eslint-disable-next-line no-restricted-globals
            handlePrevClick={ () => this.handlePageClick('prev', Event )}
            // eslint-disable-next-line no-restricted-globals
            handleNextClick={ () => this.handlePageClick('next', Event )}
        />

        {/*	Result*/}
        { this.renderSearchResults() }

        {/*Navigation*/}
        <PageNavigation
            loading={loading}
            showPrevLink={showPrevLink}
            showNextLink={showNextLink}
            // eslint-disable-next-line no-restricted-globals
            handlePrevClick={ () => this.handlePageClick('prev', Event )}
            // eslint-disable-next-line no-restricted-globals
            handleNextClick={ () => this.handlePageClick('next', Event )}
        />

        </div>)
    }



    

}


export default Searchbar;