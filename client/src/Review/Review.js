import axios from 'axios';
import dotenv from 'dotenv'
import { Component } from 'react';


const API_ENDPOINT = 'https://hizg8qqb08.execute-api.us-east-1.amazonaws.com/uploads'
dotenv.config()



export default class Review extends Component {
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
            url:  "/review/upload",
            headers: {
                "Accept": 'application/json'
            },
            data: {
               user_id: 1,
               video_name: key,
               review_rating: 4, 
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
        return <div>
            <h1>Upload Video</h1>
            <input type="file" onChange={(e) => this.createFile(e)} accept="video/*" />
            <button onClick={() => this.uploadFile()}>Upload file</button>
        </div>
    }

}