import axios from 'axios';
import { Component } from 'react';
import ReactPlayer from 'react-player'

export default class Review extends Component {

    constructor(){
        super();
        this.state = {
            videos: []
        }
    }
    renderVideos() {
        return this.state.videos.map(item => (<ReactPlayer controls={true} key={item}
            url={"https://s3-output-bucket-plugsity.s3.amazonaws.com/"+ item} />))
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: "http://localhost:5000/review/list",

        }).then(response => {

            response.data.video_links.forEach(element => {
                console.log(element);
            });
            this.setState({
                videos: response.data.video_links.map(item => item["product_video_link"])
            });
        });
    }
    render() {

        console.log(ReactPlayer.canPlay("https://s3uploader-s3uploadbucket-39rbxdinzvg2.s3.us-east-2.amazonaws.com/7280697.mp4"))
        return (
           <>
            {this.renderVideos()}
           </>
        );
    }




}