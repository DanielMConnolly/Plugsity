import React, {useHistory } from "react";
import placeholder from './assets/placeholder.jpg';

import "./css/ProductDetails.css";
import ReviewStars from "./Review/ReviewStars";

const ProductDetailsLeft = ({ productData }) => {
    // let history = useHistory();
    let redirectToReviewForm = ()=>{
        //history.push('/')
    }
    return(
    <div className='product-details-left'>
        <img className='img-left' src={productData.product_image_link?`https://plugsity-images.s3.amazonaws.com/${productData.product_image_link}`:placeholder} alt=''></img>
        <div className="product-details-review-bar">
            <button className="product-details-blue-button"> Video Reviews </button>   <button className="product-details-blue-button" onClick={()=>redirectToReviewForm()}>Upload a new video review</button> <ReviewStars stars={productData.rating}/>
        </div>
    </div>
    );
};

export default ProductDetailsLeft;
