import {Component } from 'react';
import { Link } from 'react-router-dom';
import "../css/Card.css";
import "../css/ReviewCard.css";

export default class ReviewCard extends Component{

    render(){
        let review = this.props.review;
        console.log(review);
        return(
            <Link to={"reviews/show/"+review.review_id} className="skinny-card">

                <div className="review-card-video">

                </div>
                <div className="review-card-data">
                    <span> {review.review_headline}</span>
                </div>
            </Link>
        )
        
    }
}