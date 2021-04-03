import { Component } from 'react';
import Header from '../Header';
import ReactPlayer from 'react-player'
import "../css/ReviewDetails.css"
import axios from 'axios';
import FontAwesome from 'react-fontawesome'


class ReviewDetails extends Component {

    constructor(props) {
        super(props);
        let user_id = 1;
        if(localStorage.getItem('user_id')){
            user_id =localStorage.getItem('user_id')
        }
        this.state = {
            reviewID: props.match.params.reviewID,
            reviewData: {},
            likes: 0,
            didUserLike: false,
            user_id: user_id
        }
    }

    likeReview(){
        console.log(this.state.user_id)
        let likes = this.state.didUserLike?this.state.likes-1:this.state.likes+1
        this.setState({
            didUserLike: !this.state.didUserLike,
            likes: likes
        })
        axios({
            method: 'post',
            url: `/review/like_review`,
            data: {
                user_id: this.state.user_id,
                review_id: this.state.reviewData.review_id
            }
        })
        .then((response) => {
           
        })
        .catch((error) => {
        });


    }

    didUserLike(){
        const req_object = JSON.stringify({
            "user_id":this.state.user_id,
            "review_id": this.state.reviewID
        })
        axios({
            method: 'get',
            url: `/review/did_user_like/${req_object}`,
        })
        .then((response) => {
            let did_user_like = response.data["did_user_like"]
            this.setState({
                didUserLike: did_user_like
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    

    getReviewDetails(reviewID) {
        axios
            .get(`/review/${reviewID}`)
            .then((response) => {
                this.setState({
                    loading: true,
                    reviewData: response.data.review,
                    likes: response.data.review.likes[0].likes
                });
            })
            .catch((error) => {
                console.log(error);
            });

    }



    componentDidMount() {
        this.getReviewDetails(this.state.reviewID);
        this.didUserLike();

    }




    render() {
        let review = this.state.reviewData;
        let likes = this.state.likes;
        return (<div className="reviewContainer">
            <Header />
            <div className="reviewData">
            <ReactPlayer controls={true} width="60% " height="auto"
            url={"https://s3-output-bucket-plugsity.s3.amazonaws.com/"+ review.product_video_link} />
            <div className="reviewHeadline">{review.review_headline}</div>
            <div className="likeShareBar">
            <div className="reviewViewsAndLikes">{review.review_views} views/{likes} likes</div>
            <div className={this.state.didUserLike?"liked":"likeButton"}> <FontAwesome name="thumbs-up"  onClick={()=> this.likeReview()} size="2x"></FontAwesome></div>
            </div>
            </div>
          </div>
        )
    }


}

export default ReviewDetails