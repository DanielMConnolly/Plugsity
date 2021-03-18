import React from 'react';
import './css/Search.css';
import axios from 'axios';
import Loader from './loader.gif';
import Logo from './Plugsity_logo.png';
import PageNavigation from './PageNavigation';
import 'font-awesome/css/font-awesome.min.css';
import 'react-dropdown/style.css';

class Search extends React.Component {

	constructor( props ) {
		super( props );

		this.state = {
			query: '',
			results: {},
			loading: false,
			message: '',
			totalResults: 0,
			totalPages: 0,
			currentPageNo: 0,
			open:false,
			open1:false
		};

		this.cancel = '';
	}


	/**
	 * Get the Total Pages count.
	 *
	 * @param total
	 * @param denominator Count of results per page
	 * @return {number}
	 */
	getPageCount = ( total, denominator ) => {
		const divisible	= 0 === total % denominator;
		const valueToBeAdded = divisible ? 0 : 1;
		return Math.floor( total/denominator ) + valueToBeAdded;
	};

	/**
	 * Fetch the search results and update the state with the result.
	 * Also cancels the previous query before making the new one.
	 *
	 * @param {int} updatedPageNo Updated Page No.
	 * @param {String} query Search Query.
	 *
	 */
	fetchSearchResults = ( updatedPageNo = '', query ) => {
		const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
		const searchUrl = `http://3.138.232.158:5000/api/products/search?searchTerm=${query}`;

		// To cancel the request if it has already made
		if( this.cancel ) {
			this.cancel.cancel();
		}

		//Create a Token
		this.cancel = axios.CancelToken.source();


		axios.get( searchUrl, {
			cancelToken: this.cancel.token
		} )
			.then( res => {
				//const total = res.data.total;
				//const totalPagesCount = this.getPageCount( total, 20 );
				const resultNotFoundMsg = ! res.data.length
										? 'Ooops! Could not find what you were looking for...☹️'
										: '';
				this.setState( {
					results: res.data,
					message: resultNotFoundMsg,
					currentPageNo: updatedPageNo,
					loading: false
				} )
			} )
			.catch( error => {
				if ( axios.isCancel(error) || error ) {
					this.setState({
						loading: false,
						message: 'Ooops! Could not find what you were looking for...☹️'
					})
				}
			} )
	};

	handleOnInputChange = ( Event ) => {
		const query = Event.target.value;
		if ( ! query ) {
			this.setState( { query, results: {}, message: '', totalPages: 0, totalResults: 0 } );
		} else {
			this.setState( { query, loading: true, message: '' }, () => {
				this.fetchSearchResults( 1, query ); // Here I am passing Page Number and search query
			} );
		}
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

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
		document.addEventListener("mousedown", this.handleClickOutside1);
	}
	componentWillUnmount() {
	  document.removeEventListener("mousedown", this.handleClickOutside);
	  document.removeEventListener("mousedown", this.handleClickOutside1);
	}

	onFocus=event => {
		event.target.setAttribute('autocomplete', 'off');
		console.log(event.target.autocomplete);
	}
	
	handleClickOutside = event => {
		if (this.container.current && !this.container.current.contains(event.target)) {
		  this.setState({
			open: false,
		  });
		}
	};

	handleClickOutside1 = event => {
		if (this.container.current && !this.container.current.contains(event.target)) {
		  this.setState({
			open1: false,
		  });
		}
	};

	/**
	 * Fetch results according to the prev or next page requests.
	 *
	 * @param {String} type 'prev' or 'next'
	 */
	handlePageClick = ( type ) => {
		// eslint-disable-next-line no-restricted-globals
		Event.preventDefault();
		const updatePageNo = 'prev' === type
			? this.state.currentPageNo - 1
			: this.state.currentPageNo + 1;

		if( ! this.state.loading  ) {
			this.setState( { loading: true, message: '' }, () => {
				this.fetchSearchResults( updatePageNo, this.state.query );
			} );
		}
	};

	container = React.createRef();
	renderSearchResults = () => {
		const { results } = this.state;

		if ( Object.keys( results ).length && results.length ) {
			return (
				<div className="results-container">
					{ results.map( result => {
						return (
							<a href={ result.product_image_link } className="result-item">
									
								<div className="image-username">
									<p className="image-product-name">{result.product_category}</p>
									<p className="image-username1">By the {result.product_name}</p>
									<p className="image-cost">${result.product_cost}</p>
								</div>
								
								<div className="image-wrapper">
									<iframe className="image" src={ result.product_image_link } alt={`${result.product_name} image`}/>
								</div>
							</a>
						)
					} ) }

				</div>
			)
		}
	};

	render() {
		const { query, loading, message, currentPageNo, totalPages } = this.state;

		const showPrevLink = 1 < currentPageNo;
		const showNextLink = totalPages > currentPageNo;
		return (
			<div className="container">
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
							<button className="city" onClick={this.handleButtonClick}>City <i className="fa fa-caret-down"></i></button>
							{this.state.open && (
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
							</div> )}
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

			</div>
		)
	}
}

export default Search