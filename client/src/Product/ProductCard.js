import { useHistory } from 'react-router-dom';
import "../css/ProductCard.css";
import axios from "axios";
import placeholder from '../assets/placeholder.jpg';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

export default function ProductCard(props) {
    let history = useHistory();
    let product = props.productData;
    console.log(product);

    if(!product){
        return <></>
    }
    return (
        <div className="result-item">
            <div className="image-wrapper" >
                {props.editable && 
                <FontAwesome className="product-card-edit" name="edit" onClick={() => { history.push(`/products/editProduct/${product.product_id}`) }} />
                }      
                <img className="image" onClick={() => history.push(`/products/show/${product.product_id}`)} 
                    src={product.product_image_link ? `https://plugsity-images.s3.amazonaws.com/${product.product_image_link}` : placeholder} alt={`${product.product_name} image`} />
            </div>
            <div className="product-data" onClick={() => history.push(`/products/show/${product.product_id}`)}>
                <span className="product-data-name">{product.product_name}</span>
                <span className="product-data-price">By {product.legal_business_name}</span>
                <span className="product-data-price">${product.product_cost}</span>

            </div>
        </div>

    )
}
