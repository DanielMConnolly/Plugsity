import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "react-dropdown/style.css";
import ProductCard from "../Product/ProductCard";

export default class MoreLikeThis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            business_id: 1, // to be changed later
            results: [],
            loading: false,
            parent_productID: props.product_id,
        };
    }

    componentDidMount() {
        axios
            .get(`/api/products/getProduct/${this.state.business_id}`)
            .then((res) => {
                this.setState({
                    results: res.data,
                    loading: true,
                });
            });
    }

    render() {
        if (this.state.loading) {
            const { results } = this.state;
            if (results.length > 0) {
                return (
                    <div className='results-container'>
                        <h3>{""}</h3>
                        {results.map((result) => {
                            if (
                                result.product_id !==
                                this.state.parent_productID
                            ) { 
                                return (
                                  <ProductCard productData={result}/>
                                );
                            }
                        })}
                    </div>
                );
            }
        } else {
            return <div> Fetching Something More!</div>;
        }
    }
}
