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
			sub_facets: [],
			range: 500
		};

		this.cancel = '';
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	filterResults(results){
		let categories = this.state.facets;
		let sub_categories = this.state.sub_facets;
		return results.filter(item=> categories.includes(item.product_category) || sub_categories.includes(item.product_subcategory));
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
			const filter_categories = [...new Set(this.state.results.map(result=>result.product_category).filter(item=>item!=''))]
			const filter_subcategories = [...new Set(this.state.results.map(result=>result.product_subcategory).filter(item=>item!=''))]
			this.setState({
				filter_categories: filter_categories,
				filter_subcategories: filter_subcategories
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

	handleOnInputSearch = (Event, query) => {
		if ( query ) {	
		  this.setState({ query: query, loading: true, message: '' }, () => {
			this.fetchSearchResults(1, query);
  
		  });
		} 
	}

	handleInputChange(event, facets) {
        const target = event.target;
        var value = target.value;
        if(target.checked){
			let new_facets = this.state[[facets]];
			new_facets.push(value)
			this.setState({
				[facets]: new_facets
			})
    
        }else{
            this.setState({
				[facets]: this.state.facets.filter(category=>category!=value)
			})
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
		let products  = this.state.results;
		if(this.state.sub_facets.length>0 || this.state.facets.length>0){
			products = this.filterResults(products);
		}
		console.log("in here: " , this.state.filter_categories);
		if (this.state.query !== '' && this.state.loading === false) {
			return (
			<div className="searchArea">
				<div className="filter-menus">
				<br /><h5 className="h5-class"> Filter Categories:</h5>
					{ this.state.filter_categories.map(category => {
						return (
								<div className="form-row" key={category}>
									
									<div className="form-check form-check-inline">
										<input type="checkbox" id="category" name="category" value={category} onChange={(e)=>this.handleInputChange(e, "facets")} />
										<label for="category" className="filter-text">{category}</label>
									</div>
									
								</div>
							
						)
					})}
					
				<br /><h5 className="h5-class"> Filter Sub-Categories:</h5> 
					{ this.state.filter_subcategories.map(product_subcategory => {
						return ( 
				
								<div className="form-row" key={product_subcategory}>
								<div className="form-check form-check-inline">
									<input type="checkbox" id="subcategory" name="subategory" value={product_subcategory} onChange={(e)=>this.handleInputChange(e, "sub_facets")} />
									<label for="subcategory" className="filter-text">{product_subcategory}</label>
								</div>
								</div>
        			
	
						)
					})}
					

				<br /><h5 className="h5-class"> Price Range:</h5>
					<div>
						<RangeStepInput
							className="form-row1"
							min={0} max={100}
							step={1}
							value={this.state.range}
							onChange={this.onChange.bind(this)}/>
					</div>					
					</div>		
					<div class="results-exterior">
				<div className="results-container">
					{ products.map(product => {
						return (
							<div>
							<ProductCard productData={product}/>
							</div>		
						)
					})}

				</div></div>
				</div>	)
		}
		
	};

	render() {
		const { query, loading, message, currentPageNo, totalPages } = this.state;
		const showPrevLink = 1 < currentPageNo;
		const showNextLink = totalPages > currentPageNo;;
		return (
			<>
				<AltHeader initQuery={this.props.location.state ? this.props.location.state.query : ''} handleOnSearch={this.handleOnInputSearch} />
				{/*	Error Message*/}
				
				<div className="search-container">
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

			</>
		)
	}
}

export default Search