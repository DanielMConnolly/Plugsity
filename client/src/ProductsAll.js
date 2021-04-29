import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "react-dropdown/style.css";
import Loader from './assets/loader.gif';
import Header from "./Header";
import ProductCard from "./Product/ProductCard";
import "./css/ProductDetails.css";
import SearchSidebar from "./SearchSidebar";
import Footer from "./Footer";
import AltHeader from "./AltHeader";
import PageNavigation from "./PageNavigation";
import ProductFeed from './Product/ProductFeed';

class AllProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            loading: false,
            allProducts: [],
            totalResults: 0,
			totalPages: 0,
			currentPageNo: 1,
            filter_subcategories: [],
            filter_categories: []
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


    async componentDidMount() {
        const result = await axios.get("/api/products/topitems");
        if (result.data.length > 0) {
            console.log("Populating from DB: ", result.data);
            const total = result.data.length; 
            const results = result.data;
            const totalPagesCount = this.getPageCount( total, 9 ); 
            
            const filter_categories = [...new Set(results.map(result=>result.product_category).filter(item=>item!=''))]
			const filter_subcategories = [...new Set(results.map(result=>result.product_subcategory).filter(item=>item!=''))]

            this.setState({
                results: result.data.slice(0, 9),
                allProducts: result.data,
                totalResults: total,
				totalPages: totalPagesCount,
                filter_categories: filter_categories,
                filter_subcategories: filter_subcategories
            });
        } else {
            console.error("Something went wrong while fetching data: ", result);
        }
    }

    /**
	 * Fetch results according to the prev or next page requests.
	 *
	 * @param {String} type 'prev' or 'next'
	 */
	handlePageClick = ( type ) => {
        //event.preventDefault();
		const updatePageNo = 'prev' === type
			? this.state.currentPageNo - 1
			: this.state.currentPageNo + 1;
        const { currentPageNo, totalPages } = this.state;
        if( ! this.state.loading && 0 < updatePageNo  && updatePageNo <= totalPages) {
		    this.setState( { loading: true }, () => {
			    this.fetchResults( updatePageNo ); 
		    } );
        }
	};


     /**
	 * 
	 * @param {int} updatedPageNo Updated Page No.
	 *
	 */
	fetchResults = ( updatedPageNo ) => {
		const pageNumber = updatedPageNo;
        const { allProducts } = this.state;
        let offset = ((pageNumber - 1) * 9); 
        const total = allProducts.length;
        const { filter_categories } = this.state;
        const { filter_subcategories } = this.state;
        const totalPagesCount = this.getPageCount( total, 9 );
        const displayProducts = allProducts.slice(offset, 9+offset);
        this.setState({
            allProducts: allProducts,
            results: displayProducts,
            currentPageNo: pageNumber,
            totalResults: total,
			totalPages: totalPagesCount,
            loading: false,
            filter_categories: filter_categories,
            filter_subcategories: filter_subcategories
        })
        console.log(filter_categories);
	};

    renderResults = () => {
        let products= this.state.results;
        console.log(products);
        return(
            <div className='popular-products'>
                <h2 className="popular-products-heading"> All Products</h2>
                    <div className='products-list'>
                        <ProductFeed products={products} filters={this.state.filter_categories} subFilters={this.state.filter_subcategories}/>   
                    </div>
                <div>   
                </div>
                <div></div>
            </div>
        );
    }

    render() {
        const { currentPageNo, loading, totalPages } = this.state;
        console.log(totalPages);
		const showPrevLink = 1 < currentPageNo;
		const showNextLink = totalPages > currentPageNo;
        console.log("current page" + currentPageNo);
        return (
            <div>
                <AltHeader />
                <div className='homepage'>
                    
                    {/*Navigation*/}
			        <PageNavigation
                        
                        currentPageNo={currentPageNo}
                        totalPages={totalPages}
                        showPrevLink={showPrevLink}
                        showNextLink={showNextLink}
                        handlePrevClick={ () => this.handlePageClick('prev' )}
                        handleNextClick={ () => this.handlePageClick('next' )} 

                    />

                    { this.renderResults() } 

                    {/*Navigation*/}
			        <PageNavigation
                        loading={loading}
                        currentPageNo={currentPageNo}
                        totalPages={totalPages}
                        showPrevLink={showPrevLink}
                        showNextLink={showNextLink}
                        handlePrevClick={ () => this.handlePageClick('prev' )}
                        handleNextClick={ () => this.handlePageClick('next' )} 
                    />
                    <br />
                </div>
                <br />
                <br />
                <Footer />
            </div>
        );
    }
}

export default AllProducts;
