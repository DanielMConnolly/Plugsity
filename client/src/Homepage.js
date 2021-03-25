import { Component } from 'react';
import './css/Homepage.css'
import Header from './Header';
class HomePage extends Component {
    render() {
        return (
            <div className="homepage">

                <div class="homepageContent">
                    <Header />
                    <div className=" row heading">Proudly Supporting <br />
	     small local businesses</div>
                </div>
            </div>

        )
    }


}

export default HomePage;