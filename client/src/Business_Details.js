import React, { useState, Component } from 'react';
import './css/BusinessDetails.css';
import { Link, Redirect, useHistory } from 'react-router-dom'
import axios from 'axios';
import ProductCard from './Product/ProductCard'
import ReviewList from './Review/ReviewList';
import ProductFeed from './Product/ProductFeed'
import HeaderMenu from './HeaderMenu';
import Tabs from './Tabs'
import ReviewDetails from './Review/ReviewDetails';
import AboutBusiness from './AboutBusiness';
import ReviewCard from './Review/ReviewCard';
import Searchbar from './Searchbar';
import Footer from './Footer';
import { getReviewsOfBusiness } from './Utils/ApiCalls'
import ReviewStars from "./Review/ReviewStars";
import locimg from './assets/Location_shape.png';
import shareimg from './assets/Share_shape.png';
import combimg from './assets/CombinedShape.png';
import vertLine from './assets/vertLine.png';
import placeholder from './assets/placeholder.jpg';

class Business_Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "Products",
            popularProducts: [],
            business_details: [],
            seen: false,
            user_id: this.props.location.state.user_id,

            business_image_link: {}

        }
    }

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    getReviewCards() {
        let review_cards = []
        for (let i = 0; i < 5; i += 1) {
            review_cards.push(<ReviewCard review={this.state.review} />)
        }
        return review_cards;

    }



    componentDidMount() {
        let business_id = this.props.location.state.business_id
        getReviewsOfBusiness(business_id).then((reviews) => {
            console.log(reviews);
            this.setState({
                reviews: reviews
            })
        })

        axios({
            method: 'get',
            url: `api/business_setup/business/${business_id}`,
            headers: {
                "Accept": 'application/json'
            },
        }).then(res => {
            this.setState({
                business_details: res.data[0],
                user_id: res.data[0]["user_id"]
            })

        })

        axios({
            method: 'get',
            url: `api/products/getProduct/${this.props.location.state.business_id}`,
            headers: {
                "Accept": 'application/json'
            },
        }).then(res => {
            const filter_categories = [...new Set(res.data.map(result => result.product_category).filter(item => item != ''))]
            const filter_subcategories = [...new Set(res.data.map(result => result.product_subcategory).filter(item => item != ''))]
            this.setState({
                popularProducts: res.data,
                filter_categories: filter_categories,
                filter_subcategories: filter_subcategories
            })

        })

        axios({
            method: 'get',
            url: `api/business_setup/business/getBusinessImages/${this.props.location.state.business_id}`,
            headers: {
                "Accept": 'application/json'
            },
        }).then(res => {
            if (res.data[0]) {
                this.setState({
                    business_image_link: res.data[0]["business_image_link"]
                })

            }


        })

        axios({
            method: 'get',
            url: `api/business_setup/${parseInt(this.props.location.state.user_id)}`,
        }).then(res => {
            this.setState({
                review: res.data
            })

        })

    }
    render() {
        const businesss_id = this.props.location.state.business_id;
        const businesss_details = this.state.business_details;

        return (

            <div className="homepage">
                <header style={{ marginLeft: "5%" }}>
                    <HeaderMenu />
                    <Searchbar />
                </header>

                <div style={{ marginLeft: "6%", display: "flex" }}>
                    <div style={{ fontWeight: '700', fontFamily: 'DM Sans', fontSize: '42px', fontStyle: 'normal', lineHeight: '48px', marginTop: "2%" }}>{this.state.business_details["legal_business_name"]}</div>
                    {/*<a href="#" class="fa fa-facebook" style={{ marginLeft: "1%", marginTop: "2%"}} ></a>
                    <a href="#" class="fa fa-instagram" style={{ marginLeft: "1%", marginTop: "2%" }}></a>
                    <a href="#" class="fa fa-youtube" style={{ marginLeft: "1%", marginTop: "2%" }}></a>
                    
                    {/* <button  style={{ borderRadius: '30%',align: "center", marginLeft: "65%", marginTop: "2%", fontWeight: '500', lineHeight: '16px',fontFamily: 'DM Sans', fontSize: '14px', fontStyle: 'normal', marginTop: "2%" }}>Add a Review</button> 
                    */}
                </div>
                <div>
                    <div style={{ display: "flex", marginLeft: "5%" }}>
                        <div ></div>
                        <ReviewStars stars={this.state.business_details["review_rating"]} />
                        <div style={{ marginTop: "1%", marginLeft: "1%" }}><img src={locimg} alt="logo" />{this.state.business_details["legal_business_address"]}</div>
                        {/*<img src={vertLine} style={{ margin: '11px', marginTop: "1%" }} alt="logo" />
                        {/*<div style={{ marginTop: "1%" }}><img src={shareimg} alt="logo" onClick={this.togglePop} />Share Business</div>*/}



                        <img src={vertLine} style={{ margin: '11px', marginTop: "1%" }} alt="logo" />
                        <div style={{ marginTop: "1%" }}><img src={combimg} alt="logo" />Contact Business</div>
                        <div style={{ marginTop: "1%", marginLeft: "10px" }}>{this.state.business_details["legal_business_phone"]}</div>
                    </div>
                </div>
                <div>
                    {  /* <ImgSlider slides={ImgCarouselData} /> */}

                    <img src={this.state.business_image_link ? `https://plugsity-images.s3.amazonaws.com/${this.state.business_image_link}` : placeholder} alt='Welcome'></img>
                    {  /*  <img src={placeholder} alt='Welcome'></img> */}

                </div>

                <div className="popular-products">

                    <Tabs activeTab={this.state.active} onClick={(label) => {
                        this.setState({
                            active: label
                        })
                    }}>
                        <div label=" Products" className="tab" >
                            {   /* <ProductFeed products={this.state.popularProducts} filters={this.state.filter_categories} subFilters={this.state.filter_subcategories} />  */}

                            <div class="products-list" >
                                {this.state.popularProducts.map(result => {
                                    return (
                                        <ProductCard productData={result} />
                                    )
                                })}
                            </div>
                        </div>
                        <div label="Recent Reviews" className="popular-reviews">
                            <div style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', fontFamily: 'DM Sans' }}>Video Reviews</div>
                            <ReviewList reviews={this.state.reviews} />
                        </div>
                        <div style={{ fontSize: '20px', fontWeight: '700', lineHeight: '24px', fontFamily: 'DM Sans' }}>Feedback from verified purchases</div>

                        <div label="About the Business">
                            <AboutBusiness  {...businesss_details} />
                        </div>

                    </Tabs>
                </div>
                <footer>
                    { /*  <Footer />    */} 
                </footer>
            </div>


        )
    }


}

export default Business_Details;
