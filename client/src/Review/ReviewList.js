import axios from 'axios';
import { Component } from 'react';
import dotenv from 'dotenv'
import ReactPlayer from 'react-player'

dotenv.config()

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
            url: process.env.REACT_APP_PROXY + "/review/list",

        }).then(response => {

            response.data.video_links.forEach(element => {
                console.log(element);
            });
            this.setState({
                videos: response.data.video_links.map(item => item["product_video_link"])
            });
            console.log(this.state.videos)
        });
    }
    render() {

        return (
           <>
            {this.renderVideos()}
           </>
        );
    }




}