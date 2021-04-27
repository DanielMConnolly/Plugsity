import { Component } from "react";
import "./css/Homepage.css";
import axios from "axios";
import ProductCard from "./Product/ProductCard";
import PageNavigation from "./PageNavigation";
import AltHeader from "./AltHeader";
import SeeMoreCard from "./SeeMoreCard";
import Footer from "./Footer";
import ReviewCard from "./Review/ReviewCard";
import {getAllProducts, getTopReviews} from "./Utils/ApiCalls";

import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: "Products",
            popularProducts: [],
            totalResults: 0,
			totalPages: 0,
			currentPageNo: 1,
            loading: false
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

    getReviewCards() {
        let review_cards = [];
        this.state.reviews.forEach((review) => {
            review_cards.push(<ReviewCard review={review} key={review.review_id} />);
        });
        return review_cards;
    }

    componentDidMount() {
        getAllProducts().then((products) => {
            console.log(products);
            this.setState({
                popularProducts: products.slice(0, 10),
            });
        });

        getTopReviews().then((reviews) => {
            if (reviews.length < 5) {
                this.setState({
                    reviews: reviews,
                });
            } else {
                this.setState({
                    reviews: reviews.splice(0, 5),
                });
            }
        });
    }

    renderResults = () => {
        return(
            <div className='popular-products'>
                <h2 className="popular-products-heading"> Popular Products</h2>
                    <div className='products-list'>
                        {this.state.popularProducts.map(
                            (result) => {
                                return (
                                    <ProductCard
                                        productData={result}
                                    />
                                );
                            }
                        )}
                        <SeeMoreCard />
                    </div>
                <div>   
                </div>
                <div></div>
            </div>
        );
    }

    /**
	 * 
	 *
	 * @param {int} updatedPageNo Updated Page No.
	 * 
	 *
	 */
	fetchResults = ( updatedPageNo = '' ) => {
		const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
        if( this.cancel ) {
			this.cancel.cancel();
		}

		this.cancel = axios.CancelToken.source();
		axios({
            method: "get",
            url: `/api/products/?page=${pageNumber}`,
            headers: {
                Accept: "application/json",
            },
        }).then( res => {
				const total = res.data.length;
				const totalPagesCount = this.getPageCount( total, 10 );
				this.setState( {
					totalResults: total,
					totalPages: totalPagesCount,
					currentPageNo: updatedPageNo,
                    loading: false,
                    popularProducts: res.data
				} )
                console.log(total);
			} )
            .catch( error => {
				if ( axios.isCancel(error) || error ) {
					this.setState({
						loading: false
					})
				}
			} )
	};

    /**
	 * Fetch results according to the prev or next page requests.
	 *
	 * @param {String} type 'prev' or 'next'
	 */
	handlePageClick = ( type, event ) => {
        event.preventDefault();
		const updatePageNo = 'prev' === type
			? this.state.currentPageNo - 1
			: this.state.currentPageNo + 1;
        if( ! this.state.loading  ) {
		    this.setState( { loading: true }, () => {
			    this.fetchResults( updatePageNo ); 
		    } );
        }	
	};

    render() {
        const { currentPageNo, loading, totalPages } = this.state;
        console.log(currentPageNo);
		const showPrevLink = 1 < currentPageNo;
		const showNextLink = totalPages > currentPageNo;

        return (
            <div>
                <AltHeader />
                <div className='homepage'>
                    <div className='heading'>
                        Proudly Supporting <br />
                        small local businesses
                    </div>
                    {/*Navigation*/}
			        <PageNavigation
                        loading={loading}
                        showPrevLink={showPrevLink}
                        showNextLink={showNextLink}
                        handlePrevClick={ (event) => this.handlePageClick('prev', event )}
                        handleNextClick={ (event) => this.handlePageClick('next', event )} 
                    />

                    { this.renderResults() }

                    {/*Navigation*/}
			        <PageNavigation
                        loading={loading}
                        showPrevLink={showPrevLink}
                        showNextLink={showNextLink}
                        handlePrevClick={ (event) => this.handlePageClick('prev', event )}
                        handleNextClick={ (event) => this.handlePageClick('next', event )} 
                    />

                    <br />
                    <div className='popular-reviews-container'>
                        <div className='popular-reviews-label'>
                            Top Video Reviews{" "}
                        </div>
                        <div className='popular-reviews'>
                            {this.state.reviews && this.getReviewCards()}
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <Footer />
            </div>
        );
    }
}

export default HomePage;
