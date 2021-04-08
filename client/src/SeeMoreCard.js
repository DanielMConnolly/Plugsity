
import "./css/Card.css"
import {Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from "react-fontawesome";


export default class SeeMoreCard extends Component{

    render(){
        return(
            <Link to="/products/show" className="card-style" >
                <div>
                View All in 
                <br/>
                <span className="see-more-card-products"> Products </span>
                </div>
                <FontAwesome name="arrow-right"/>
            </Link>
        )
    }
}
