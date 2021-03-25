import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import ProductDetailsRight from "./ProductDetailsRight";
import "bootstrap/dist/css/bootstrap.css";
import ProductDetailsLeft from "./ProductDetailsLeft";

export default class ProductDetails extends Component {
    constructor(props) {
        super(props);

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
        axios.get(`/api/products/${this.state.productID}`).then((response) => {
            console.log("API RESPONSE: ", response.data);
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

        if (this.state.loading) {
            console.log("Inside Loading", this.state);
            return (
                <div className='product-container'>
                    <ProductDetailsLeft imageURL={this.state.image} />
                    <ProductDetailsRight {...props} />
                </div>
            );
        } else {
            return <div>Fetching Results</div>;
        }
    }
}
