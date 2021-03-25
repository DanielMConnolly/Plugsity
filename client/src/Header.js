import {Component} from 'react';
import HeaderMenu from './HeaderMenu';
import Searchbar from './Searchbar';
class Header extends Component{
    render(){
        return(<div className="header"> <HeaderMenu/> <Searchbar/></div>);
    }


}

export default Header;