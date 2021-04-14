import FontAwesome from 'react-fontawesome'
import '../css/AddProductCard.css';
import { useHistory } from "react-router-dom";

export default function AddProductCard(props){
    let history = useHistory()

    let redirectToAddProduct = ()=> {
        history.push('/products/createProduct')
    }

    return(
        <div className="card-style add-product-card" onClick={()=> redirectToAddProduct()}>
            <FontAwesome name="plus-circle" size="3x" />
            <span className="add-product-text">Add Product</span>
        </div>
    )

}