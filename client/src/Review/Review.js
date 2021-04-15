import axios from 'axios';
import dotenv from 'dotenv'
import { Component } from 'react';
import load from 'little-loader';
import {createFile, uploadFile} from '../Utils/Upload.js'
import '../css/Review.css';
import plugsity_logo from '../Plugsity_logo.png';

load('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap', function (err) {
    console.log('Unable to load the loader');
})


export default class Review extends Component {
    constructor(props) {
        super(props);
        let reviewData = {"productID": props.match.params.productID}
        this.state = {
            reviewData: reviewData
        }
    }

    handleStarInputChange = (event) => {
        let  { value, name } = event.target;
        let reviewData = {... this.state.reviewData, [name]: value}
        this.setState({
            reviewData: reviewData
        });
    }
    handleInputChange = (event) => {
        event.preventDefault();
        let  { value, name } = event.target;
        let reviewData = {... this.state.reviewData, [name]: value}
        this.setState({
            reviewData: reviewData,
            selectedButton: event.target.innerHTML
        });

    }

    buttonList() {
        let options = ['Excellent', 'Great', 'Average', 'Poor', 'Bad'];
        let retval = options.map(option => {
            return (
                <div className="my-column1" key={option}>
                    <button className={this.state.selectedButton==option?"review-suboptions review-suboptions-highlighted": "review-suboptions"} name="review_tag" value={option} 
                        onClick={e => this.handleInputChange(e)} style={{ backgroundColor: this.state.button_color }}>{option}</button>
                </div>
            )
        })
        return retval;
    }


    onSubmit = (event) => {
        event.preventDefault();
        var url = '/review/upload';
        uploadFile(this.state.image, "video").then(response=>{
            axios.post(url, {
                review_headline: this.state.review_headline,
                review_description: this.state.review_description,
                review_rating: this.state.review_rating,
                review_tag: this.state.review_tag,
                product_video_link: response,
                user_id: localStorage.getItem('user_id'),
                product_id: this.state.productID
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });

        })
    }

    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <img src={plugsity_logo} alt="Plugsity Logo" width="200px" height="50px" className="logo-style" />
                    <h1 className="review-header">Tell us what you think!</h1>
                    <div className="center1">
                        <p className="review-options"> How would you overall describe this product? </p>
                        {this.buttonList()}
                        <input type="text" placeholder="Title: What's most important to know about this product?" className="review-title" name="review_headline" value={this.state.review_headline} onChange={this.handleInputChange} />
                        <textarea id="bio" name="bio" rows="6" cols="120" placeholder="Tell us something about this product!" className="review-textarea" name="review_description" value={this.state.review_description} onChange={this.handleInputChange} />
                        <div className="stars">
                            <input type="radio" id="five" name="review_rating" value="5" onChange={this.handleStarInputChange} />
                            <label for="five"></label>
                            <input type="radio" id="four" name="review_rating" value="4" onChange={this.handleStarInputChange} />
                            <label for="four"></label>
                            <input type="radio" id="three" name="review_rating" value="3" onChange={this.handleStarInputChange} />
                            <label for="three"></label>
                            <input type="radio" id="two" name="review_rating" value="2" onChange={this.handleStarInputChange} />
                            <label for="two"></label>
                            <input type="radio" id="one" name="review_rating" value="1" onChange={this.handleStarInputChange} />
                            <label for="one"></label>
                            <span className="result"></span>
                        </div>
                        <input type="file" className="review-select-file" onChange={(e) => createFile(e,  (file)=>{
                            this.setState({
                                image: file
                            })
                        }, /(\.mp4|\.mov)$/i)} accept="video/*" />

                    </div>
                    <button className="review-submit-button" type="submit" onSubmit={this.onSubmit}> Submit your review!</button>
                </form>
            </div>
        )
    }

}