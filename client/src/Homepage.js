import { Component } from "react";
import "./css/Homepage.css";
import axios from "axios";
import ProductCard from "./Product/ProductCard";
import PageNavigation from "./PageNavigation";
import AltHeader from "./AltHeader";
import SeeMoreCard from "./SeeMoreCard";
import Footer from "./Footer";
import ReviewCard from "./Review/ReviewCard";
import {getAllProducts, getTopReviews, getAllProductsWithReviews} from "./Utils/ApiCalls";
import ProductFeed from './Product/ProductFeed';
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
            allProducts: [],
            loading: false,
            rating: 0,
            filter_subcategories: [],
            filter_categories: [],
			range: 500
        };
        this.cancel = '';
    }


    getReviewCards() {
        let review_cards = [];
        this.state.reviews.forEach((review) => {
            review_cards.push(<ReviewCard review={review} key={review.review_id} />);
        });
        return review_cards;
    }

    componentDidMount() {
        getAllProductsWithReviews().then((products) => {
            const results = products;
            console.log(results);
            const filter_categories = [...new Set(results.map(products=>products.product_category).filter(item=>item!=''))]
			const filter_subcategories = [...new Set(results.map(products=>products.product_subcategory).filter(item=>item!=''))]

            this.setState({
                allProducts: products,
                rating: products.rating,
                popularProducts: products.slice(0, 9),
                filter_categories: filter_categories,
                filter_subcategories: filter_subcategories
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
        let products= this.state.popularProducts;
        return(
            <div className='popular-products'>
                <h2 className="popular-products-heading"> Popular Products</h2>
                    <div className='products-list'>
                        <ProductFeed products={products} filters={this.state.filter_categories} subFilters={this.state.filter_subcategories}/>    
                    </div>
                    <div className='products-list'>
                        <SeeMoreCard />
                    </div>
                <div>   
                </div>
                <div></div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <AltHeader />
                <div className='homepage'>
                    <div className='heading'>
                        Proudly Supporting <br />
                        small local businesses
                    </div>
                    { this.renderResults() } 
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
