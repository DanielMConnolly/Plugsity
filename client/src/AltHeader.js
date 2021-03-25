import {Component} from 'react';
import { Redirect } from 'react-router';
import Searchbar from './Searchbar';


class AltHeader extends Component{

    constructor(props){
        super(props);
        console.log("altheader props: ", props);
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
        <Searchbar query={this.state.query} onHandleChange={e=>this.onHandleChange(e)} searchFunction={()=>this.toSearch()}/>
        );
        
    }


}

export default AltHeader;