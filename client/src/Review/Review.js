import axios from 'axios';
import dotenv from 'dotenv'
import { Component } from 'react';
import load from 'little-loader';
import '../css/Review.css'; 
import plugsity_logo from '../Plugsity_logo.png';



const API_ENDPOINT = 'https://hizg8qqb08.execute-api.us-east-1.amazonaws.com/uploads'
dotenv.config()
load('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap', function(err){
    console.log('Unable to load the loader');
})


export default class Review extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          review_headline: '',
          review_description: '',
          review_rating: '',
          review_tag: '',
          button_color: '',
          button_color1: '',
          button_color2: '',
          button_color3: '',
          button_color4: ''
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }
    handleInputChange1 = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        this.setState({
          [name]: value,
          button_color1: 'green',
          button_color4: '',
          button_color:'',
          button_color2:'',
          button_color3:''
        });
    }
    handleInputChange2 = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        this.setState({
          [name]: value,
          button_color2: 'green',
          button_color4: '',
          button_color1:'',
          button_color:'',
          button_color3:''
        });
    }

    handleInputChange3 = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        this.setState({
          [name]: value,
          button_color3: 'green',
          button_color4: '',
          button_color1:'',
          button_color2:'',
          button_color:''
        });
    }

    handleInputChange4 = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        this.setState({
          [name]: value,
          button_color4: 'green',
          button_color:'',
          button_color1:'',
          button_color2:'',
          button_color3:''
        });
    }

    handleInputChange5 = (event) => {
        event.preventDefault();
        const { value, name } = event.target;
        this.setState({
          [name]: value,
          button_color: 'green',
          button_color4: '',
          button_color1:'',
          button_color2:'',
          button_color3:''
        });
    }


    onSubmit = (event) => {
        event.preventDefault();
          //var url = 'http://3.138.232.158:5000/review/upload';
            var url = 'http://localhost:3000/review/upload';
          axios.post(url, {
            review_headline: this.state.review_headline,
            review_description: this.state.review_description,
            review_rating: this.state.review_rating,
            review_tag: this.state.review_tag
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          this.state.review_headline = '';
          this.state.review_description = '';
          this.state.review_rating = '';
          this.state.review_tag = '';
    }

    async uploadFile() {
        const response = await axios({
            method: 'GET',
            url: API_ENDPOINT
        })
        const key = response.data.Key;

        let binary = atob(this.state.image.split(',')[1]);
        let array = []
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i))
        }
        let blobData = new Blob([new Uint8Array(array)], { type: "video/mp4" })
        axios({
            method: 'POST',
            url: process.env.REACT_APP_PROXY+ "/review/upload",
            headers: {
                "Accept": 'application/json'
            },
            data: {
               user_id: 1,
               video_name: key,
               //review_rating: 4, 
               product_id: 1
            }
        }) 

        await fetch(response.data.uploadURL, {
            method: 'PUT',
            body: blobData
        });

    } 

    createFile(e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        let file = files[0]
          
        // Allowing file type 
        var allowedExtensions =  
                /(\.mp4|\.mov)$/i; 
          
        if (!allowedExtensions.exec(file.name)) { 
            alert('Invalid file type'); 
            e.target.value = ''
            return false; 
        }  
        let reader = new FileReader()
        reader.onload = (e) => {
            console.log(e.target);
            this.setState({
                image: e.target.result
            })

        }
        reader.readAsDataURL(file);



    } 

    render() {
        return (
        <div>
            <form onSubmit={this.onSubmit}>
            <img src= { plugsity_logo } alt="Plugsity Logo" width="200px" height="50px" className="logo-style"/>
            <h1 className="review-header">Tell us what you think!</h1>
            <div className="center1">
                <p className="review-options"> How would you overall desribe this product? </p>
                <div className="my-column1">
                    <button className="review-suboptions" name="review_tag" value="Excellent" onClick={this.handleInputChange5} style={{backgroundColor:this.state.button_color}}>Excellent</button>
                </div>
                <div className="my-column1">
                    <button className="review-suboptions" name="review_tag" value="Great" onClick={this.handleInputChange1} style={{backgroundColor:this.state.button_color1}}>Great</button>
                </div>
                <div className="my-column1">
                    <button className="review-suboptions" name="review_tag" value="Average" onClick={this.handleInputChange2} style={{backgroundColor:this.state.button_color2}}>Average</button>
                </div>
                <div className="my-column1">
                    <button className="review-suboptions" name="review_tag" value="Poor" onClick={this.handleInputChange3} style={{backgroundColor:this.state.button_color3}}>Poor</button>
                </div>
                <div className="my-column1">
                    <button className="review-suboptions" name="review_tag" value="Bad" onClick={this.handleInputChange4} style={{backgroundColor:this.state.button_color4}}>Bad</button>
                </div>
                <input type="text" placeholder="Title: What's most important to know about this product?" className="review-title" name="review_headline" value={this.state.review_headline} onChange={this.handleInputChange} />
                <textarea id="bio" name="bio" rows="6" cols="120" placeholder="Tell us something about this product!" className="review-textarea" name="review_description" value={this.state.review_description} onChange={this.handleInputChange} />
                <div className="stars">
                    <input type="radio" id="five" name="review_rating" value="5" onChange={this.handleInputChange}/>
                    <label for="five"></label>
                    <input type="radio" id="four" name="review_rating" value="4" onChange={this.handleInputChange}/>
                    <label for="four"></label>
                    <input type="radio" id="three" name="review_rating" value="3" onChange={this.handleInputChange}/>
                    <label for="three"></label>
                    <input type="radio" id="two" name="review_rating" value="2" onChange={this.handleInputChange}/>
                    <label for="two"></label>
                    <input type="radio" id="one" name="review_rating" value="1" onChange={this.handleInputChange}/>
                    <label for="one"></label>
                    <span className="result"></span>
                </div>
                <input type="file" className ="review-select-file" onChange={(e) => this.createFile(e)} accept="video/*" />
                <button className="review-upload-button" onClick={() => this.uploadFile()}>Upload video <i className="fa fa-youtube-play"></i></button>

                
            </div>
            <button className="review-submit-button" type="submit" onSubmit={this.onSubmit}> Submit your review!</button>
            </form>
        </div>
        )
    }

}