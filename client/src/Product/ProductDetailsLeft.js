import React, {useHistory } from "react-router-dom";
import placeholder from '../assets/placeholder.jpg';

import "../css/ProductDetails.css";
import ReviewStars from "../Review/ReviewStars";

const ProductDetailsLeft = ({ productData }) => {
    let history = useHistory();
    let redirectToReviewForm = ()=>{
        history.push(`/reviews/upload/${productData.product_id}`)
    }
    let redirectToViewReview = ()=>{
        history.push(`/product_reviews/${productData.product_id}`)
    } 
    return(
    <div className='product-details-left'>
        <img className='img-left' src={productData.product_image_link?`https://plugsity-images.s3.amazonaws.com/${productData.product_image_link}`:placeholder} alt='Welcome'></img>  
        <div className="product-details-review-bar">
            <button className="product-details-blue-button" onClick={()=>redirectToViewReview()} > Video Reviews </button>   <button className="product-details-blue-button" onClick={()=>redirectToReviewForm()}>Upload a new video review</button> 
            <ReviewStars stars={productData.rating}/>
        </div>
    </div>
    );
};

export default ProductDetailsLeft;
