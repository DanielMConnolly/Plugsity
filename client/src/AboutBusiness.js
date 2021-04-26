import React, { useState, Component } from 'react';
import './css/Homepage.css'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import ProductCard from './Product/ProductCard'
import ProductFeed from './Product/ProductFeed'
import HeaderMenu from './HeaderMenu';
import Tabs from './Tabs'
import ReviewDetails from './Review/ReviewDetails';
import AboutBusiness from './AboutBusiness';
import Searchbar from './Searchbar';
import Footer from './Footer';
import ImgSlider from './ImgSlider';
import ImgCarouselData from './ImgCarouselData';
import ReviewStars from "./Review/ReviewStars";
import locimg from './assets/Location_shape.png';
import shareimg from './assets/Share_shape.png';
import combimg from './assets/CombinedShape.png';
import vertLine from './assets/vertLine.png';

class Business_Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "Products",
            viewTab : false,
        }
        
    }

    onClick_about = (button_id) => {
        if (button_id == "about_bus") {
            console.log(button_id);
        }
        else {


        }
        
    };

    render() {
        
        return (    
            <div id="abt_bus_maindiv">
                <div>
                    <button id="about_bus" >About</button>              
                    <button id="shipPol_bus">Shipping Policies</button>
                    <button id="retPol_bus">Returns & Policies</button>
                    <button id="addPol_bus">Additional Policies</button>
                </div>
            </div>    
        )
    }


}

export default Business_Details;
