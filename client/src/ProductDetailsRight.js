import React, { Component } from "react";

import "./css/ProductDetails.css";
import Button from "./ProductButton";
import Tabs from "./Tabs";

export default class ProductDetailsRight extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            count: 1,
            active: "Description",
        };
        this.descriptionBlurb = "Product Description";
        this.shippingBlurb = "Shipping Details";
        this.returnsBlurb = "Return Policy";
    }

    handleCount(value) {
        this.setState((prevState) => ({ count: prevState.count + value }));
    }

    render() {
        return (
            <div className='column'>
                <div className='row'>
                    <div className='business-attrs'>Business name</div>
                    <div className='business-attrs'>Sales</div>
                    <div className='business-attrs'>Reviews</div>
                </div>
                <div className='row'>
                    <h3>{this.props.product_name}</h3>
                </div>
                <div className='row'>
                    <h3>$ {this.props.product_cost}</h3>
                </div>

                <hr />
                <div className='row'>
                    <Button
                        btnClass='btn-minus'
                        className='btn'
                        sign='-'
                        count={this.state.count}
                        updateCount={this.handleCount.bind(this)}
                    />
                    {this.state.count}
                    <Button
                        btnClass='btn-plus'
                        sign='+'
                        count={this.state.count}
                        updateCount={this.handleCount.bind(this)}
                    />
                </div>
                <div className='row'>
                    <button type='submit' className='btn btn-blue'>
                        {" "}
                        Add to Cart{" "}
                    </button>
                    <button type='submit' className='btn btn-border-blue'>
                        {" "}
                        Buy Now{" "}
                    </button>
                </div>

                <div>
                    {this.state.active === "Description"
                        ? this.descriptionBlurb
                        : this.state.active === "Shipping"
                        ? this.shippingBlurb
                        : this.returnsBlurb}
                </div>
                <Tabs
                    active={this.state.active}
                    onClick={(label) => {
                        this.setState({ active: label });
                    }}
                >
                    <div label='Description' className='row'>
                        {this.props.product_description}
                    </div>
                    <div label='Shipping' className='row'>
                        Shipping Info
                    </div>
                    <div label='Returns' className='row'>
                        Return info
                    </div>
                </Tabs>
            </div>
        );
    }
}
