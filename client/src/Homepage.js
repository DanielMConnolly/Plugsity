import { Component } from 'react';
import './css/Homepage.css'
import axios from 'axios';
import ProductCard from './Product/ProductCard'
import Header from './Header';
import Tabs from './Tabs'
import ReviewDetails from './Review/ReviewDetails';
class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "Products",
            popularProducts: []
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: '/api/products',
            headers: {
                "Accept": 'application/json'
            },
        }).then(res => {
            this.setState({
                popularProducts: res.data.slice(0, 10)
            })

        })
    }
    render() {
        console.log(this.state.popularProducts)
        return (
         
            <div className="homepage">
                     <Header />
                    <div className="heading">Proudly Supporting <br />
	     small local businesses
                    </div>
                    <div className="popular-products">
                        <h2> Popular</h2>
                        <Tabs activeTab={this.state.active} onClick={(label) => {
                            this.setState({
                                active: label
                            })
                        }}>
                            <div label="Products" className="tab" >
                              <div class="products-list" >
                              { this.state.popularProducts.map(result => {
                                    return (	
                                        <ProductCard productData={result}/>		
                                    )
                                })}
                              </div>
                            </div>
                            <div label="Services" style="{width 100%}">  
                            Services
                               
                            </div>
                            <div label="Events" >
                               Events
                               </div>
                        </Tabs>
                    </div>
           

            </div>


        )
    }


}

export default HomePage;