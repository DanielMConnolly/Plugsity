import { Component } from 'react';
import ProductCard from './ProductCard'
import {RangeStepInput} from 'react-range-step-input';
import "../css/ProductDetails.css";


class ProductFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            facets: [],
            sub_facets: []
        }
    }

    filterResults(results){
		let categories = this.state.facets;
		let sub_categories = this.state.sub_facets;
		return results.filter(item=> categories.includes(item.product_category) || sub_categories.includes(item.product_subcategory));
	}

    handleCheckbox(event, facets) {
        const target = event.target;
        var value = target.value;
        if(target.checked){
			let new_facets = this.state[[facets]];
			new_facets.push(value)
			this.setState({
				[facets]: new_facets
			})
    
        }else{
            this.setState({
				[facets]: this.state.facets.filter(category=>category!=value)
			})
        }
        
    }


    render() {
        let products = this.props.products;
        if(this.state.sub_facets.length>0 || this.state.facets.length>0){
			products = this.filterResults(products);
		}
        return (
            <div className="searchArea">
                <div className="filter-menus">
                    <br /><h5 className="h5-class"> Filter Categories:</h5>
                    {this.props.filters.map(category => {
                        return (
                            <div className="form-row" key={category}>

                                <div className="form-check form-check-inline">
                                    <input type="checkbox" id="category" name="category" value={category} onChange={(e) => this.handleCheckbox(e, "facets")} />
                                    <label for="category" className="filter-text">{category}</label>
                                </div>

                            </div>

                        )
                    })}

                    <br /><h5 className="h5-class"> Filter Sub-Categories:</h5>
                    {this.props.subFilters.map(product_subcategory => {
                        return (

                            <div className="form-row" key={product_subcategory}>
                                <div className="form-check form-check-inline">
                                    <input type="checkbox" id="subcategory" name="subategory" value={product_subcategory} onChange={(e) => this.handleInputChange(e, "sub_facets")} />
                                    <label for="subcategory" className="filter-text">{product_subcategory}</label>
                                </div>
                            </div>


                        )
                    })}


                    <br /><h5 className="h5-class"> Price Range:</h5>
                    <div>
                        <RangeStepInput
                            className="form-row1"
                            min={0} max={100}
                            step={1}
                            value={this.state.range}
                            onChange={()=>{}} />
                    </div>
                </div>
                <div class="results-exterior">
                    <div className="results-container">
                        {products.map(product => {
                            return (
                                <div>
                                    <ProductCard productData={product} />
                                </div>
                            )
                        })}

                    </div></div>
            </div>

        )
    }


}

export default ProductFeed;