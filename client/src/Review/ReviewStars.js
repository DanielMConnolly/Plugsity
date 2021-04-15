import '../css/ReviewStars.css';
import FontAwesome from 'react-fontawesome';

export default function ReviewStars(props){

    let starCount = props.stars;
    let stars = []
    for(let i=0; i<starCount;i++){
        stars.push(<FontAwesome name="star"  key={i} className="yellow-star"/>)
    }
    for(let i=starCount;i<5;i++){
        stars.push(<FontAwesome name="star"  key={i} className="star"/>)
    }
    return (
        <div className="five-stars">
        {stars}
        </div>
        );

}