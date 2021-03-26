import React, { Component } from "react";

import "./css/ProductDetails.css";

const ProductDetailsLeft = ({ imageURL }) => (
    <div className='column product-img'>
        <img className='img-left' src={imageURL} alt=''></img>
    </div>
    // <Container>
    //     <img src={imageURL} alt=''></img>
    // </Container>
);

export default ProductDetailsLeft;
