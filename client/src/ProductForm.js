import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/Signup_Bus.css";
import "./css/SignupLogin.css";
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
            <div className='Signup_Buss'>
                <img src={PlugsityLogo} className='logo' />
                <form onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        name='product_name'
                        placeholder='Enter Product Name'
                        value={this.state.product_name}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input
                        type='text'
                        name='product_description'
                        placeholder='Enter Product Description'
                        value={this.state.product_description}
                        onChange={this.handleInputChange}
                        required
                    />
                    <select
                        name='category'
                        value={this.state.category}
                        onChange={this.handleInputChange}
                        required
                    >
                        <option value='art'>Art</option>
                        <option value='auto_parts'>
                            Auto Parts & Accessories
                        </option>
                        <option value='baby'>Baby</option>
                        <option value='beauty_cosmetics'>
                            Beauty & Cosmetics
                        </option>
                        <option value='books'>Books</option>
                        <option value='professional'>
                            Business & Industrial (Professional)
                        </option>
                        <option value='electronics'>Electronics</option>
                        <option value='entertainment'>Entertainment</option>
                        <option value='fashion'>Fashion</option>
                        <option value='garden'>Garden</option>
                        <option value='health'>Health</option>
                        <option value='home'>Home</option>
                        <option value='movies'>Movies</option>
                        <option value='music'>Music</option>
                        <option value='pet'>Pet</option>
                        <option value='sports'>Sports</option>
                        <option value='tools'>Tools & Equipment</option>
                        <option value='toy_hobbies'>Toy & Hobbies</option>
                        <option value='travel'>Travel</option>
                    </select>
                    {/* TODO */}
                    {/* Need product categories and subcategories here */}
                    <input
                        type='text'
                        name='product_tags'
                        placeholder='Enter Product Tags'
                        value={this.state.product_tags}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type='text'
                        name='product_listing'
                        placeholder='Enter Product Listing'
                        value={this.state.product_listing}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type='number'
                        name='product_cost'
                        placeholder='Enter Product Cost in USD $'
                        value={this.state.product_cost}
                        onChange={this.handleInputChange}
                        required
                    />
                    <input
                        type='text'
                        name='product_image_link'
                        placeholder='Enter Image URL'
                        value={this.state.product_image_link}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type='text'
                        name='product_video_link'
                        placeholder='Enter Video URL'
                        value={this.state.product_video_link}
                        onChange={this.handleInputChange}
                    />
                    <input type='submit' value='Submit Product' />
                </form>
            </div>
        );
    }
}
