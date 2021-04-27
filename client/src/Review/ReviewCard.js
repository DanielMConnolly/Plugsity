import { Component } from 'react';
import { Link } from 'react-router-dom';
import "../css/Card.css";
import "../css/ReviewCard.css";
import placeholder from '../assets/placeholder.jpg';
import ReactPlayer from 'react-player'
import ReviewStars from './ReviewStars';

export default class ReviewCard extends Component {

    render() {
        let review = this.props.review;
        let product = review.product;
        return (
            <Link to={"/reviews/show/" + review.review_id} className="skinny-card">

                <div className="review-card-video">
                    <div className="review-card-video-player" >
                        <ReactPlayer
                            url={"https://s3-output-bucket-plugsity.s3.amazonaws.com/" + review.product_video_link} />
                    </div>
                    <div className="review-card-user">{review.user.first_name} {review.user.last_name} <br />
                        {review.review_views}  views/ {review.likes} likes
                    </div>
                </div>
                <div className="review-card-data">
                    <div className="review-card-headline"> {review.review_headline}</div>
                    <div className="review-card-details">
                        <div>
                     <img src={product.product_image_link ? `https://plugsity-images.s3.amazonaws.com/${product.product_image_link}` : placeholder} alt={`${product.product_name} image`} />
                     <div className="review-card-product-details">
                         {review.product.product_name} <br/>
                         By {review.product.legal_business_name}
                     </div>
                     </div>
                     <div className="price-stars-container">${review.product.product_cost}
                     <ReviewStars stars={review.review_rating}/>
                     </div>
                    </div>
                </div>
            </Link>
        )

    }
}