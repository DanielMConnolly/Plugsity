import {Component} from 'react';
import { Redirect } from 'react-router';
import HeaderMenu from './HeaderMenu';
import Searchbar from './Searchbar';
class Header extends Component{
    constructor(props){
        super(props);
        this.state= {
            searchActivated: false,
            query: ''
        }
    }

    onHandleChange(e){
        this.setState({
            query: e.target.value
        })
    }

    toSearch(query){
        this.setState({
            searchActivated: true
        })

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
        return(<div className="header"> <HeaderMenu/> <Searchbar query={this.state.query} onHandleChange={e=>this.onHandleChange(e)} searchFunction={()=>this.toSearch()}/></div>);
    }


}     

export default Header;