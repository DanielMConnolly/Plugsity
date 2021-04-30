import React, { useState, Component } from "react";
import "./css/Homepage.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import ProductCard from "./Product/ProductCard";
import ProductFeed from "./Product/ProductFeed";
import HeaderMenu from "./HeaderMenu";
import Tabs from "./Tabs";
import ReviewDetails from "./Review/ReviewDetails";
import AboutBusiness from "./AboutBusiness";
import Searchbar from "./Searchbar";


import ReviewStars from "./Review/ReviewStars";
import locimg from "./assets/Location_shape.png";
import shareimg from "./assets/Share_shape.png";
import combimg from "./assets/CombinedShape.png";
import vertLine from "./assets/vertLine.png";

import AboutBusinessText from "./AboutBusinessText";

class Business_Details extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            active: "Products",
            viewTab: false,
            textToPass: "",
        };

        this.aboutBusiness = this.aboutBusiness.bind(this);
    }

    onClick_about = (button_id) => {
        if (button_id == "about_bus") {
            console.log(button_id);
        } else {
        }
    };

    aboutBusiness(e) {
        e.preventDefault();
        console.log(e.target);
        let about = e.target.value;
        console.log(this.state);
        switch (about) {
            case "about":
                this.setState({
                    textToPass: this.props.business_description,
                });
                return;
            case "shipping":
                this.setState({
                    textToPass: this.props.shipping_policy,
                });
                return;
            case "returns":
                this.setState({
                    textToPass: this.props.return_policy,
                });
                return;
            default:
                this.setState({
                    textToPass: "",
                });
                return;
        }
    }

    render() {
        return (
            <div id='abt_bus_maindiv'>
                <div>
                    <button
                        id='about_bus'
                        onClick={this.aboutBusiness}
                        value='about'
                    >
                        About
                    </button>
                    <button
                        id='shipPol_bus'
                        onClick={this.aboutBusiness}
                        value='shipping'
                    >
                        Shipping Policies
                    </button>
                    <button
                        id='retPol_bus'
                        onClick={this.aboutBusiness}
                        value='returns'
                    >
                        Returns & Policies
                    </button>
                    {/* <button
                        id='addPol_bus'
                        onClick={this.aboutBusiness}
                        value='additional'
                    >
                        Additional Policies
                    </button> */}
                </div>
                <AboutBusinessText text={this.state.textToPass} />
            </div>
        );
    }
}

export default Business_Details;
