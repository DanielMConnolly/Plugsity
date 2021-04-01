import { Component } from 'react';
import "../css/ProductDetails.css";
import axios from "axios";
import { Link } from 'react-router-dom';

class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: props.productData
        }
    }


    render() {
        let product = this.state.productData;
        return (
            <Link to={'/products/show/' + product.product_id} className="result-item">

                <div className="image-username">
                    <p className="image-product-name">{product.product_category}</p>
                    <p className="image-username1">By the {product.product_name}</p>
                    <p className="image-cost">${product.product_cost}</p>

                </div>

                <div className="image-wrapper">
                    <img className="image" src={product.product_image_link} alt={`${product.product_name} image`} />
                </div>



            </Link>
        )
    }
}

export default ProductCard;