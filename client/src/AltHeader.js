import {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { Redirect } from 'react-router';
import AccountHeader from './AccountHeader';
import './css/AltHeader.css';
import Icon from './assets/plugsity-icon.png';
import Searchbar from './Searchbar';


class AltHeader extends Component{

    constructor(props){
        super(props);
        this.state= {
            searchActivated: false,
            query: props.initQuery||''
        }
    }

    onHandleChange(e){
        if(this.props.onHandleChange){
            this.props.onHandleChange(e);
        }
            this.setState({
                query: e.target.value
            });
    }

    toSearch(query){
        if(this.props.searchFunction){
            this.prop.searchFunction(1, this.state.query);
        }
        else{
            this.setState({
                searchActivated: true
            })

        }
       

    }
    render(){
        if(this.state.searchActivated){
            return(<Redirect
                to={{
                pathname: "/search",
                state: { query: this.state.query}
              }}
            />)
        }
        return(
        <div class="alt-header-row">
        <div className="alt-header-left">
        <FontAwesome className="hamburger-menu" name="bars" size='2x'/>
        <img src={Icon} className="plugsity-icon" />
        </div>
        <Searchbar query={this.state.query} onHandleChange={e=>this.onHandleChange(e)} searchFunction={()=>this.toSearch()}/>
        <AccountHeader/>
        </div>
        );
        
    }


}

export default AltHeader;