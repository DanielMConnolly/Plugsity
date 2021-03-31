import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import ProductDetailsRight from "./ProductDetailsRight";

import ProductDetailsLeft from "./ProductDetailsLeft";
import MoreLikeThis from "./ProductLikeThis";
import Header from "./Header";

export default class ProductDetails extends Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.productID);
        this.state = {
            productID: props.match.params.productID,
            response: {},
            count: 1,
            name: "",
            description: "",
            category: "",
            product_category: "",
            subcategory: "",
            tags: "",
            listing: "",
            cost: 0,
            image_link: "",
            video_link: "",
            loading: false,
        };
        // console.log(this.state.productID);
    }

    getProductDetails() {
        axios.get(`/api/products/${this.state.productID}`).then((response) => {
            console.log(response.data);
        });
    }

    componentDidMount() {
        axios
            .get(`/api/products/${this.state.productID}`)
            .then((response) => {
                console.log("API RESPONSE: ", response.data);
                if (response.data.length > 0) {
                    this.setState({
                        response: response.data[0],
                        name: response.data[0].product_name,
                        cost: response.data[0].product_cost,
                        category: response.data[0].category,
                        product_category: response.data[0].product_category,
                        subcategory: response.data[0].product_subcategory,
                        description: response.data[0].product_description,
                        tags: response.data[0].product_tags,
                        listing: response.data[0].product_listing,
                        image: response.data[0].product_image_link,
                        video: response.data[0].product_video_link,
                        loading: true,
                    });
                } else {
                    console.log("Something went wrong!", this.state);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const {
            name,
            cost,
            category,
            product_category,
            subcategory,
            description,
            tags,
            listing,
            image,
            video,
            loading,
        } = this.state;
        let props = {
            name: name,
            cost: cost,
            category: category,
            product_category: product_category,
            subcategory: subcategory,
            description: description,
            tags: tags,
            listing: listing,
            image: image,
            video: video,
        };

        if (loading) {
            console.log("Inside Loading", this.state.productID);
            return (
                <div>
                    <div>
                        <Header />
                    </div>
                    <div>
                        <div className='product-container'>
                            <ProductDetailsLeft imageURL={this.state.image} />
                            <ProductDetailsRight {...props} />
                        </div>
                        <div>
                            <h3 id='header'>More Products Like This</h3>
                            <MoreLikeThis product_id={this.state.productID} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return <div>Fetching Results</div>;
        }
    }
}
