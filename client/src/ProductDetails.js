import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import ProductDetailsRight from "./ProductDetailsRight";

import ProductDetailsLeft from "./ProductDetailsLeft";
import MoreLikeThis from "./ProductLikeThis";
import Header from "./Header";
import Footer from "./Footer";

export default class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: props.match.params.productID,
            response: {},
            loading: false,
        };
    }

    getProductDetails(productID) {
        axios
            .get(`/api/products/${productID}`)
            .then((response) => {
                console.log(response);
                    this.setState({
                        loading: true,
                        response: response.data,
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.match.params.productID !==
            this.props.match.params.productID
        ) {
            this.getProductDetails(this.props.match.params.productID);
        }
    }

    componentDidMount() {
        this.getProductDetails(this.state.productID);
    }

    render() {
        window.scroll(0, 0);
        console.log(this.state);
        if (this.state.loading) {
            return (
                <div>
                    <div>
                        <Header />
                    </div>
                    <div>
                        <div className='product-container'>
                            <ProductDetailsLeft
                             
                                productData={this.state.response}
                            />
                            <ProductDetailsRight {...this.state.response}
                        />
                        </div>
                        <div>
                            <h3 id='header'>More Products Like This</h3>
                            <MoreLikeThis product_id={this.state.productID} />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div>
                        <Footer />
                    </div> 
                </div>
            );
        } else {
            return <div>Fetching Results</div>;
        }
    }
}
