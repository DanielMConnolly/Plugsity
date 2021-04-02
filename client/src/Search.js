import React from 'react';
import './css/Search.css';
import axios from 'axios';
import Loader from './assets/loader.gif';
import Logo from './assets/plugsity-logo.png';
import AltHeader from './AltHeader';
import 'font-awesome/css/font-awesome.min.css';
import ProductCard from './Product/ProductCard';
import 'react-dropdown/style.css';
import {RangeStepInput} from 'react-range-step-input';



class Search extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			query: props.query ? props.query : '',
			results: [],
			loading: false,
			message: '',
			totalResults: 0,
			totalPages: 0,
			currentPageNo: 0,
			open: false,
			open1: false,
			facets: [],
			range: 500
		};

		this.cancel = '';
		this.handleInputChange = this.handleInputChange.bind(this);
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

	/**
	 * Fetch the search results and update the state with the result.
	 * Also cancels the previous query before making the new one.
	 *
	 * @param {int} updatedPageNo Updated Page No.
	 * @param {String} query Search Query.
	 *
	 */
	fetchSearchResults = (updatedPageNo = '', query) => {
		if (!query) {
			return;
		}
		const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
		const searchUrl = `http://3.138.232.158:5000/api/products/search?searchTerm=${query}`;

		// To cancel the request if it has already made
		if (this.cancel) {
			this.cancel.cancel();
		}

		//Create a Token
		this.cancel = axios.CancelToken.source();


		axios.get(searchUrl, {
			cancelToken: this.cancel.token
		})
			.then(res => {
				//const total = res.data.total;
				//const totalPagesCount = this.getPageCount( total, 20 );
				const resultNotFoundMsg = !res.data.length
					? 'Ooops! Could not find what you were looking for...☹️'
					: '';
				this.setState({
					results: res.data,
					message: resultNotFoundMsg,
					currentPageNo: updatedPageNo,
					loading: false
				})
			})
			.catch(error => {
				if (axios.isCancel(error) || error) {
					this.setState({
						loading: false,
						message: 'Ooops! Could not find what you were looking for...☹️'
					})
				}
			})
	};

	handleOnInputChange = (Event) => {
		const query = Event.target.value;
		if (!query) {
			this.setState({ query, results: [], message: '', totalPages: 0, totalResults: 0 });
		} else {
			this.setState({ query, loading: true, message: '' }, () => {
				//this.fetchSearchResults(1, query); // Here I am passing Page Number and search query
			});
		}
	};

	handleOnInputSearch = (Event) => {
		const query = this.state.query;
		if ( query ) {	
		  this.setState({ query, loading: true, message: '' }, () => {
			this.fetchSearchResults(1, query);
  
		  });
		} 
	}

	handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        
        if(target.checked){
            this.state.facets[value] = value;
			this.fetchSearchResults(1, value);   
        }else{
            this.state.facets.splice(value, 1);
        }
        
    }

	


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

	componentDidMount(props) {
		if (this.props.location.state) {
			this.setState({
				query: this.props.location.state.query
			})
			this.fetchSearchResults(1, this.props.location.state.query);
		}
		document.addEventListener("mousedown", this.handleClickOutside);
		document.addEventListener("mousedown", this.handleClickOutside1);
	}
	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
		document.removeEventListener("mousedown", this.handleClickOutside1);
	}

	onFocus = event => {
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

	logout(){
		console.log("loggingout")
	}

	submit(){
        console.warn(this.state)
    }

	onChange(e) {
        const newVal = e.target.value;
        this.setState({range: newVal});
		this.fetchSearchResults(1, newVal);
    }
	/**
	 * Fetch results according to the prev or next page requests.
	 *
	 * @param {String} type 'prev' or 'next'
	 */
	/**handlePageClick = (type) => {
		// eslint-disable-next-line no-restricted-globals
		Event.preventDefault();
		const updatePageNo = 'prev' === type
			? this.state.currentPageNo - 1
			: this.state.currentPageNo + 1;

		if (!this.state.loading) {
			this.setState({ loading: true, message: '' }, () => {
				this.fetchSearchResults(updatePageNo, this.state.query);
			});
		}
	}; **/

	container = React.createRef();
	renderSearchResults = () => {
		const { results } = this.state;
		
		
		if (this.state.query !== '' && this.state.loading === false) {
			return (
			<div>
				<form>
				<br /><h5 className="h5-class"> Filter Categories:</h5>
					{ results.map(result => {
						return (
							<div>	
								<div className="form-row2">
									
									<div className="form-check form-check-inline">
										<input type="checkbox" id="category" name="category" value={result.product_category} onChange={this.handleInputChange} />
										<label for="category" className="filter-text">{result.product_category}</label>
									</div>
									
								</div>
								
        					</div>	
							
						)
					})}
					
				</form>	

				<form>
				<br /><h5 className="h5-class"> Filter Sub-Categories:</h5> 
					{ results.map(result => {
						return (
							<div>	
								<div className="form-row1">
								<div className="form-check form-check-inline">
									<input type="checkbox" id="subcategory" name="subategory" value={result.product_subcategory} onChange={this.handleInputChange} />
									<label for="subcategory" className="filter-text">{result.product_subcategory}</label>
								</div>
								</div>
        					</div>	
	
						)
					})}
					
				</form>	

				<form>
				<br /><h5 className="h5-class"> Price Range:</h5>
					<div>
						<RangeStepInput
							className="form-row1"
							min={0} max={100}
							step={1}
							value={this.state.range}
							onChange={this.onChange.bind(this)}/>
					</div>					
				</form>	
								

				<div className="results-container">
					{ results.map(result => {
						return (	
							<ProductCard productData={result}/>		
						)
					})}

				</div>
		
				</div>	)
		}
		
	};

	render() {
		const { query, loading, message, currentPageNo, totalPages } = this.state;
		const showPrevLink = 1 < currentPageNo;
		const showNextLink = totalPages > currentPageNo;;
		return (
			<>
				<AltHeader initQuery={this.props.location.state ? this.props.location.state.query : ''} handleOnSearch={this.handleOnInputSearch} onHandleChange={this.handleOnInputChange} />
				{/*	Error Message*/}
				
				<div className="search-container">
				
				<div className="search-results">
					{message && <p className="message">{message}</p>}

					{/*	Loader*/}
					<img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loader" />

					{/*Navigation*/}
					{/*<PageNavigation
						loading={loading}
						showPrevLink={showPrevLink}
						showNextLink={showNextLink}
						// eslint-disable-next-line no-restricted-globals
						handlePrevClick={() => this.handlePageClick('prev', Event)}
						// eslint-disable-next-line no-restricted-globals
						handleNextClick={() => this.handlePageClick('next', Event)}
					/>

					{/*	Result*/} 
					{this.renderSearchResults()}

					
					{/*<PageNavigation
						loading={loading}
						showPrevLink={showPrevLink}
						showNextLink={showNextLink}
						// eslint-disable-next-line no-restricted-globals
						handlePrevClick={() => this.handlePageClick('prev', Event)}
						// eslint-disable-next-line no-restricted-globals
						handleNextClick={() => this.handlePageClick('next', Event)}
					/> */}
				</div>
				</div>

			</>
		)
	}
}

export default Search