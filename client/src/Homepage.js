import { Component } from "react";
import "./css/Homepage.css";
import axios from "axios";
import ProductCard from "./Product/ProductCard";
import AltHeader from "./AltHeader";
import SeeMoreCard from "./SeeMoreCard";
import Footer from "./Footer";
import ReviewCard from "./Review/ReviewCard";
import Tabs from "./Tabs";
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
        };
    }

    getReviewCards() {
        let review_cards = [];
        this.state.reviews.forEach((review) => {
            review_cards.push(<ReviewCard review={review} />);
        });
        return review_cards;
    }

    componentDidMount() {
        axios({
            method: "get",
            url: "/api/products",
            headers: {
                Accept: "application/json",
            },
        }).then((res) => {
            this.setState({
                popularProducts: res.data.slice(0, 7),
            });
        });

        axios({
            method: "get",
            url: "/review/list",
        }).then((res) => {
            if (res.data.length < 5) {
                this.setState({
                    reviews: res.data,
                });
            } else {
                this.setState({
                    reviews: res.data.splice(0, 5),
                });
            }
        });
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
                    <div className='popular-products'>
                        <h2> Popular</h2>
                        <Tabs
                            activeTab={this.state.active}
                            onClick={(label) => {
                                this.setState({
                                    active: label,
                                });
                            }}
                        >
                            <div label='Products' className='tab'>
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
                            </div>
                            <div>   
                            </div>
                            <div></div>
                        </Tabs>
                    </div>
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
