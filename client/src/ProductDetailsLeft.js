import React, { Component } from "react";
import placeholder from './assets/placeholder.jpg';

import "./css/ProductDetails.css";

const ProductDetailsLeft = ({ imageURL }) => (
    <div className='column product-img'>
        <img className='img-left' src={imageURL?`https://plugsity-images.s3.amazonaws.com/${imageURL}`:placeholder} alt=''></img>
    </div>
    // <Container>
    //     <img src={imageURL} alt=''></img>
    // </Container>
);

export default ProductDetailsLeft;
