import React from 'react';
import '../css/UserProfile.css';
import AltHeader from "../AltHeader";
import Tabs from "../Tabs";
import AccountSettings from "./AccountSettings";
import MyOrders from "./MyOrders";
import MyReviews from "./MyReviews";
import Footer from "../Footer.js";
import axios from 'axios';
import { createFile, uploadFile } from '../Utils/Upload'
import ImageModal from "../ImageModal"


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            user_id: -1,
            joined: "",
            label: "Account Settings",
            email: "",
            image: ""
        };

    }
    updateMe() {
        this.getAccountInfo();
    }
    getAccountInfo() {
        axios({
            method: 'post',
            url: '/user/myprofile',
            headers: {
                "Accept": 'application/json'
            },
            data: {
                user_id: localStorage.getItem("user_id")
            }

        }).then((response) => {
            this.setState({
                firstname: response.data.first_name,
                lastname: response.data.last_name,
                user_id: localStorage.getItem("user_id"),
                joined: response.data.created_at,
                email: response.data.email_address
            })
        });

    }
    onSubmit = async (event) => {
        event.preventDefault();
        const { product_id } = this.state;

        const uploadImage = new Promise((resolve, reject)=>{
            if(this.state.image){
                uploadFile(this.state.image, (key)=>{
                    this.setState({
                        product_image_link: key
                    })
                    resolve()
                })
            }
            else{
                resolve()
            }

        })
        uploadImage.then(()=>{
            this.props.history.push('/dashboard')
            axios
            .put(`/api/products/editProduct/${product_id}`, {
                product_name: this.state.product_name,
                product_description: this.state.product_description,
                category: this.state.category,
                product_category: this.state.product_category,
                product_subcategory: this.state.product_subcategory,
                product_tags: this.state.product_tags,
                product_cost: this.state.product_cost,
                product_listing: this.state.product_listing,
                product_image_link: this.state.product_image_link,
                product_video_link: this.state.product_video_link,
            })
            .then((response) => {
                console.log(response);

            })
            .catch((error) => {
                console.log(error);
            });

        })

    };
    getImage(){
        if(this.state.image){
            return URL.createObjectURL(this.state.image)
        }
        else{
            return `https://plugsity-images.s3.amazonaws.com/${this.state.product_image_link}`
        }
    }
    componentDidMount() {
        this.getAccountInfo();
    }
    render() {
        return (

            < div className="container3 emp-profile" >
                <AltHeader />
                <div className="body" >
                    <div className="profile-picture">
                        {/*
                    <ImageModal open={this.state.modalOpen} handleClose={()=>{this.setState({modalOpen: false})}} image={this.getImage()} />
                        <input
                            accept="image/*"
                            id="profile-picture-input"
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                createFile(e, (file) => {
                                    this.setState({
                                        image: file
                                    })
                                })
                            }}
                        />
                        <label for="profile-picture-input"><div className="select-file-button">Select File</div></label>
                        */}
                        

                    </div>
                    <div className="main-text">
                        < h5 className="h5-style" >
                            {this.state.firstname} {this.state.lastname}
                        </h5 >
                        <h5 className="sub-title">
                            Joined {new Date(this.state.joined).toDateString()}
                        </h5>
                        <h5 className="sub-title">
                            Email: {this.state.email}
                        </h5>
                    </div>

                    <div className="bottom">
                        <Tabs activeTab={this.state.label} onClick={(label) => this.setState({ label: label })} center>
                            <div label="Account Settings">
                                <AccountSettings fname={this.state.firstname} lname={this.state.lastname} user_id={this.state.user_id} />
                            </div>
                            <div label="My Review" className="tab" >
                                <MyReviews user_id={this.state.user_id} />
                            </div>
                            <div label="My Orders" className="tab" >
                                <MyOrders user_id={this.state.user_id} />
                            </div>
                        </Tabs>
                    </div>
                </div>
                <Footer />
            </div >

        )
    }
}

export default UserProfile