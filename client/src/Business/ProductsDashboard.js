import { Component } from 'react';
import { getProductsOfBusiness } from '../Utils/ApiCalls';
import "../css/businessDashboard.css";
import AddProductCard from '../Product/AddProductCard';
import ProductCard from '../Product/ProductCard';

export default class ProductsDashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }
    componentDidMount(){
        let business_id = localStorage.getItem('business_id');
        getProductsOfBusiness(business_id).then(products=> {
            this.setState({
                products: products
            })
        })
    }

    render() {
        return (
            <div>

                <h1 className="products-dashboard-header"> Products</h1>
                <div className="products-dashboard-container">
                    <AddProductCard />
                    {this.state.products.map(product => {
                        return (
                            <div>
                                <ProductCard productData={product} editable />
                            </div>
                        )
                    })}

                </div>


            </div>
        )
    }

}