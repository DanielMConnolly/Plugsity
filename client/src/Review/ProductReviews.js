
import {Component} from 'react';
import AltHeader from '../AltHeader';
import {getAllReviews} from '../Utils/ApiCalls'
import ReviewList from './ReviewList';

export default class ProductReview extends Component{

    constructor(props){
        super(props);
        this.state = {
            reviews: []
        }
        
    }


    componentDidMount(){
        let product_id =  this.props.match.params.productID;
        getAllReviews().then(result=>this.setState({
            reviews: result
        }))
    }

    render(){
        return(
            <>
            <AltHeader/>
        <ReviewList reviews={this.state.reviews}/>
        </>)
    }


}