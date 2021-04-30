import React from 'react';
import '../css/UserProfile.css';
import { getMyReviews} from "../Utils/ApiCalls";
import ReviewCard from "../Review/ReviewCard";


class MyReviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            loading: true
        }


    }
    getReviewCards() {
        let review_cards = [];
        this.state.reviews.forEach((review) => {
            review_cards.push(<ReviewCard review={review} key={review.review_id} />);
        });
        return review_cards;
    }
    componentDidMount() {
        getMyReviews(this.props.user_id).then((myReviews) => {
            this.setState({
                loading:false,
                reviews: myReviews
            })
        }, (fail) => {
            this.setState({loading:false});
        });
    }
    render() {
        return (
            <div>
                {this.state.loading && <div>Reviews are loading</div>}
                {!this.state.loading && this.state.reviews.length == 0 && <div>
                    You do not have any Reviews
                </div> }
                {!this.state.loading && this.state.reviews.length > 0 && this.getReviewCards()}
            </div>
        )
    }
}

export default MyReviews