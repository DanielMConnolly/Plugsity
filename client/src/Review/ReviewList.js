import axios from 'axios';
import { Component } from 'react';
import ReviewCard from './ReviewCard';
import "../css/ReviewList.css"



export default class Review extends Component {

    constructor(props){
        super(props);
    }


    renderReviews(){
        let reviewCards = []
        this.props.reviews.map(review=>{
            reviewCards.push(<ReviewCard review={review}/>)
        })
        return reviewCards;
    }




    render(){
        return(
        <div className="review-list">
            {this.renderReviews()}
        </div>
        )
    }

   


}