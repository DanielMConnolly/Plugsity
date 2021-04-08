import { Component } from 'react';
import { Link } from 'react-router-dom';
import "../css/Card.css";
import "../css/ReviewCard.css";
import ReactPlayer from 'react-player'

export default class ReviewCard extends Component {

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
                     <img src={review.product.product_image_link} />
                     <div className="review-card-product-details">
                         {review.product.product_name} <br/>
                     </div>
                    </div>
                </div>
            </Link>
        )

    }
}