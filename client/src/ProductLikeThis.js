import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "react-dropdown/style.css";

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
                console.log("API Response: ", res.data);
                this.setState({
                    results: res.data,
                    loading: true,
                });
            });
    }

    render() {
        if (this.state.loading) {
            const { results } = this.state;
            console.log(
                results.length,
                "HELLLOOOOO!!!",
                this.state.parent_productID
            );
            if (results.length > 0) {
                return (
                    <div className='results-container'>
                        <h3>{""}</h3>
                        {results.map((result) => {
                            console.log(result);
                            if (
                                result.product_id !==
                                this.state.parent_productID
                            ) {
                                return (
                                    <Link
                                        to={`/products/show/${result.product_id}`}
                                        className='result-item'
                                    >
                                        <div className='image-username'>
                                            <p className='image-product-name'>
                                                {result.product_category}
                                            </p>
                                            <p className='image-username1'>
                                                By the {result.product_name}
                                            </p>
                                            <p className='image-cost'>
                                                ${result.product_cost}
                                            </p>
                                        </div>
                                        <div className='image-wrapper'>
                                            <iframe
                                                className='image'
                                                src={result.product_image_link}
                                                alt={`${result.product_name} image`}
                                                title={`${result.product_name}`}
                                            />
                                        </div>
                                    </Link>
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
