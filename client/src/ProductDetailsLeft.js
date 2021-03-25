import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./css/ProductDetails.css";
import { Container, Row, Col } from "react-bootstrap";

const ProductDetailsLeft = ({ imageURL }) => (
    <div className='column product-img'>
        <img className='img-left' src={imageURL} alt=''></img>
    </div>
    // <Container>
    //     <img src={imageURL} alt=''></img>
    // </Container>
);

export default ProductDetailsLeft;
