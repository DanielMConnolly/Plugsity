import { Component } from 'react';
import { Link } from 'react-router-dom';
import "../css/Card.css";
import "../css/ReviewCard.css";
import ReactPlayer from 'react-player'
import FontAwesome from 'react-fontawesome';

export default class ReviewCard extends Component {

    renderStars(number){
        let stars = []
        for(let i=0; i<number;i++){
            stars.push(<FontAwesome name="star"  key={i} className="yellow-star"/>)
        }
        for(let i=number;i<5;i++){
            stars.push(<FontAwesome name="star"  key={i} className="star"/>)
        }
        return stars;
    }

    render() {
        let review = this.props.review;
        return (
            <Link to={"reviews/show/" + review.review_id} className="skinny-card">

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
                     <img src={review.product.product_image_link} />
                     <div className="review-card-product-details">
                         {review.product.product_name} <br/>
                         By {review.product.legal_business_name}
                     </div>
                     </div>
                     <div className="price-stars-container">${review.product.product_cost}
                     <div className="five-stars" >{this.renderStars(review.review_rating)}</div>
                     </div>
                    </div>
                </div>
            </Link>
        )

    }
}