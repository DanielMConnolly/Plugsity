import {Component} from 'react';
import SearchSidebarBox from './SearchSidebarBox'

class SearchSidebar extends Component{

    render(){
        return(<div className="search-sidebar">
        <SearchSidebarBox/>
        <SearchSidebarBox/>
        <SearchSidebarBox/>
        <SearchSidebarBox/>

        </div>);
    }

}

export default SearchSidebar;