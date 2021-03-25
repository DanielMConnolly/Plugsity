import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./css/Signup.css";
import "./css/ProductForm.css";
import PropTypes from "prop-types";
import PlugsityLogo from "./assets/plugsity-logo.png";
export default class ProductForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product_name: "",
            product_description: "",
            category: "",
            product_category: "",
            product_subcategory: "",
            product_tags: "",
            product_listing: "",
            product_cost: "",
            product_image_link: "",
            product_video_link: "",
        };
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
                product_image_link: this.state.product_image_link,
                product_video_link: this.state.product_video_link,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        this.setState({
            product_name: "",
            product_description: "",
            category: "",
            product_category: "",
            product_subcategory: "",
            product_tags: "",
            product_listing: "",
            product_cost: "",
            product_image_link: "",
            product_video_link: "",
        });
    };

    render() {
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
                    <input
                        type='text'
                        name='product_image_link'
                        placeholder='Enter Image URL'
                        value={this.state.product_image_link}
                        onChange={this.handleInputChange}
                    />
                    <label>Product Image Link</label>
                    <input
                        type='text'
                        name='product_video_link'
                        placeholder='Enter Video URL'
                        value={this.state.product_video_link}
                        onChange={this.handleInputChange}
                    />
                    <label>Product Video Link</label>
                    <input type='submit' value='Submit Product' />
                </form>
            </div>
        );
    }
}
