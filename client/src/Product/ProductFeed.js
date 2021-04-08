import { Component } from 'react';
import ProductCard from './ProductCard'
import { RangeStepInput } from 'react-range-step-input';
import "../css/ProductDetails.css";


class ProductFeed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            facets: [],
            sub_facets: [],
            range: Math.max(... this.props.products.map(product => product.product_cost)),
        }
    }

    filterResults(results) {
        let categories = this.state.facets;
        let sub_categories = this.state.sub_facets;
        if(this.state.facets.length==0 && this.state.sub_facets.length==0){
            return results.filter(item => parseInt(item.product_cost) <= this.state.range);
        }
       
        return results.filter(item => (categories.includes(item.product_category)
            || sub_categories.includes(item.product_subcategory))
            && parseInt(item.product_cost) <= this.state.range);
    }

    handleRangeSliderChange(e) {
        this.setState({
            range: parseInt(e.target.value)
        })

    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.products!=this.props.products){
            this.setState({
                range: Math.max(... this.props.products.map(product => product.product_cost)),
            })
        }
    }

    handleCheckbox(event, facets) {
        const target = event.target;
        var value = target.value;
        if (target.checked) {
            let new_facets = this.state[[facets]];
            new_facets.push(value)
            this.setState({
                [facets]: new_facets
            })

        } else {
            this.setState({
                [facets]: this.state.facets.filter(category => category != value)
            })
        }

    }


    render() {
        let products = this.props.products;
        let max_price = Math.max(... this.props.products.map(product => product.product_cost))
        products = this.filterResults(products);
        
        if (this.props.products.length > 0) {
            return (
                <div className="searchArea">
                    <div className="filter-menus">
                        <div className="menu-wrapper">
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
                                            <input type="checkbox" id="subcategory" name="subategory" value={product_subcategory} onChange={(e) => this.handleCheckbox(e, "sub_facets")} />
                                            <label for="subcategory" className="filter-text">{product_subcategory}</label>
                                        </div>
                                    </div>


                                )
                            })}


                            <br /><h5 className="h5-class"> Price Range:</h5>
                            <div>
                                <RangeStepInput
                                    className="form-row1"
                                    min={0} max={max_price}
                                    step={1}
                                    value={this.state.range}
                                    onChange={(e) => this.handleRangeSliderChange(e)} />
                                    ${this.state.range}
                            </div>
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
        else {
            return <></>
        }
    }


}

export default ProductFeed;