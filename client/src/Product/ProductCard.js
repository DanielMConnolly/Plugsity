import { Component } from 'react';
import "../css/ProductCard.css";
import axios from "axios";
import placeholder from '../assets/placeholder.jpg';
import { Link } from 'react-router-dom';

class ProductCard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let product = this.props.productData;
        return (
            <Link to={'/products/show/' + product.product_id} className="result-item">
                <div className="image-wrapper">
                    <img className="image" src={product.product_image_link?`https://plugsity-images.s3.amazonaws.com/${product.product_image_link}`:placeholder} alt={`${product.product_name} image`} />
                </div>
                <div className="product-data">
                    <span className="product-data-name">{product.product_name}</span>
                    <span className="product-data-price">By {product.product_name}</span>
                    <span className="product-data-price">${product.product_cost}</span>

                </div>




            </Link>
        )
    }
}

export default ProductCard;