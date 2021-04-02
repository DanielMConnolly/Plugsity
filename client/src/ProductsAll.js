import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "react-dropdown/style.css";
import Header from "./Header";
import ProductCard from "./Product/ProductCard";
import "./css/ProductDetails.css";
import SearchSidebar from "./SearchSidebar";
import Footer from "./Footer";
import AltHeader from "./AltHeader";

class AllProducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            loading: false,
        };
    }

    // getResultsFromAPI() {
    //     axios
    //         .get("/api/products")
    //         .then((res) => {
    //             console.log("Populating from DB: ", res.data);
    //             this.setState({
    //                 results: res.data,
    //                 loading: true,
    //             });
    //         })
    //         .catch((error) => {
    //             console.error(
    //                 "Something went wrong while fecthing data: ",
    //                 error
    //             );
    //         });
    // }

    async componentDidMount() {
        const result = await axios.get("/api/products");
        if (result.data.length > 0) {
            console.log("Populating from DB: ", result.data);
            this.setState({
                results: result.data,
                loading: true,
            });
        } else {
            console.error("Something went wrong while fetching data: ", result);
        }
    }

    render() {
        if (this.state.loading) {
            const { results } = this.state;
            if (results.length > 0) {
                return (
                    <div>
                        <AltHeader />
                        <h3>{""}</h3>
                        <h2 id='header-left'>All Products</h2>

                        <div className='results-container'>
                            <h3>{""}</h3>
                            {results.map((result) => {
                                return <ProductCard productData={result} />;
                            })}
                        </div>
                        <Footer />
                    </div>
                );
            }
        } else {
            return <div> Fetching Results!</div>;
        }
    }
}

export default AllProducts;
