import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import "../css/Signup.css";
import "../css/ProductForm.css";
import PropTypes from "prop-types";
import PlugsityLogo from "../assets/plugsity-logo.png";
export default class ProductForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            product_name: "",
            product_description: "",
            category: "Product",
            product_category: "Art",
            product_subcategory: "",
            product_tags: "",
            product_listing: "",
            product_cost: "",
            product_image_link: "",
            product_video_link: "",
            redirect: false,
        };
    }

    async uploadFile() {

        const API_ENDPOINT = 'https://kx1fso77o5.execute-api.us-east-1.amazonaws.com/handle-image-upload'

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
        let blobData = new Blob([new Uint8Array(array)], { type: "image/jpg" })
        await fetch(response.data.uploadURL, {
            method: 'PUT',
            body: blobData
        }).then(response=>console.log(response))
        .catch(err => console.log(err));
        return key
    }

    createFile(e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        let file = files[0]

        // Allowing file type 
        var allowedExtensions =
            /(\.jpg|\.jpeg|\.png)$/i;

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

    handleClick = () =>
        this.setState(({ type }) => ({
            type: type === "text" ? "password" : "text",
        }));

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });
    };

    onChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    onSubmit = (event) => {
        event.preventDefault();

        this.uploadFile().then(product_file_name => {
            axios
                .post("/api/products/createProduct", {
                    product_name: this.state.product_name,
                    product_description: this.state.product_description,
                    category: this.state.category,
                    product_category: this.state.product_category,
                    product_subcategory: this.state.product_subcategory,
                    product_tags: this.state.product_tags,
                    product_cost: this.state.product_cost,
                    product_listing: this.state.product_listing,
                    product_image_link: product_file_name,
                    product_video_link: this.state.product_video_link,
                    business_id: localStorage.getItem('business_id')
                })
                .then((response) => {
                })
                .catch((error) => {
                    console.log(error);
                });

        });


        this.setState({
            redirect: true
        })

    };

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/dashboard" />);
        }
        return (
            <div className='Signup'>
                <img src={PlugsityLogo} alt='' className='logo' />
                <form onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        name='product_name'
                        placeholder='Enter Product Name'
                        value={this.state.product_name}
                        onChange={this.handleInputChange}
                        required
                    />
                    <label>Product Name</label>
                    <input
                        type='text'
                        name='product_description'
                        placeholder='Enter Product Description'
                        value={this.state.product_description}
                        onChange={this.handleInputChange}
                        required
                    />
                    <label>Product Description</label>
                    <select
                        className='drpdwn'
                        name='category'
                        value={this.state.category}
                        onChange={this.handleInputChange}
                        required
                    >
                        <option className='drpdwn' value='Product'>
                            Product
                        </option>
                        <option className='drpdwn' value='Service'>
                            Service
                        </option>
                        <option className='drpdwn' value='Event'>
                            Event
                        </option>
                    </select>
                    <label>Select Type of your Product</label>
                    <select
                        className='drpdwn'
                        name='product_category'
                        value={this.state.product_category}
                        onChange={this.handleInputChange}
                        required
                    >
                        <option className='drpdwn' value='Art'>
                            Art
                        </option>
                        <option className='drpdwn' value='Auto_Parts'>
                            Auto Parts & Accessories
                        </option>
                        <option className='drpdwn' value='Baby'>
                            Baby
                        </option>
                        <option className='drpdwn' value='Beauty_Cosmetics'>
                            Beauty & Cosmetics
                        </option>
                        <option className='drpdwn' value='Books'>
                            Books
                        </option>
                        <option className='drpdwn' value='Professional'>
                            Business & Industrial (Professional)
                        </option>
                        <option className='drpdwn' value='Electronics'>
                            Electronics
                        </option>
                        <option className='drpdwn' value='Entertainment'>
                            Entertainment
                        </option>
                        <option className='drpdwn' value='Fashion'>
                            Fashion
                        </option>
                        <option className='drpdwn' value='Garden'>
                            Garden
                        </option>
                        <option className='drpdwn' value='Health'>
                            Health
                        </option>
                        <option className='drpdwn' value='Home'>
                            Home
                        </option>
                        <option className='drpdwn' value='Movies'>
                            Movies
                        </option>
                        <option className='drpdwn' value='Music'>
                            Music
                        </option>
                        <option className='drpdwn' value='Pet'>
                            Pet
                        </option>
                        <option className='drpdwn' value='Sports'>
                            Sports
                        </option>
                        <option className='drpdwn' value='Tools'>
                            Tools & Equipment
                        </option>
                        <option className='drpdwn' value='Toy_Hobbies'>
                            Toy & Hobbies
                        </option>
                        <option className='drpdwn' value='Travel'>
                            Travel
                        </option>
                    </select>
                    <label>Select Product Type</label>

                    <input
                        type='text'
                        name='product_tags'
                        placeholder='Enter Product Tags'
                        value={this.state.product_tags}
                        onChange={this.handleInputChange}
                    />
                    <label>Product Tags</label>
                    <input
                        type='text'
                        name='product_listing'
                        placeholder='Enter Product Listing'
                        value={this.state.product_listing}
                        onChange={this.handleInputChange}
                    />
                    <label>Product Listings</label>
                    <input
                        type='number'
                        name='product_cost'
                        placeholder='Enter Product Cost in USD $'
                        value={this.state.product_cost}
                        onChange={this.handleInputChange}
                        required
                    />
                    <label>Product Cost $</label>
              
                    <input type="file" onChange={(e) => this.createFile(e)} accept="image/*" />
                    <label>Product Image Link</label>
                    <input type='submit' value='Submit Product' />
                </form>
            </div>
        );
    }
}
