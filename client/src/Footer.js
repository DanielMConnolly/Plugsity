import React from 'react';
import './css/Footer.css';
import PlugsityLogo from "./Plugsity_logo.png"

class Footer extends React.Component{
    render(){
        return(
        <div>
            <div class="column-6-left">
                <img src={PlugsityLogo} width="135px" height="35px"/> <br /> <br />
                <p className="footer-text">Proudly supporting local small business</p>
                <a href="#" class="fa fa-facebook"></a>
                <a href="#" class="fa fa-twitter"></a>
                <a href="#" class="fa fa-instagram"></a>
                <a href="#" class="fa fa-linkedin"></a>
                <br /> <br /> <br />
                <p className="footer-subtitle"> © Plugsity 2021</p>
            </div>

            <div class="column-6-middle">
                <p className="footer-title">Company</p>
                <p className="footer-subtitle">About Plugsity</p>
                <p className="footer-subtitle">Careers</p>
                <p className="footer-subtitle">Press</p>
                <p className="footer-subtitle">Terms of Service</p>
                <p className="footer-subtitle">Privacy Policy</p>
            </div>

            <div class="column-6-middle">    
                <p className="footer-title">Shop</p>
                <p className="footer-subtitle">Home</p>
                <p className="footer-subtitle">Categories</p>
                <p className="footer-subtitle">Top list</p>
                <p className="footer-subtitle">Popular shopping lists</p>
                <p className="footer-subtitle">Top video reviews</p>
            </div>

            <div class="column-6-middle">
                <p className="footer-title">Sell</p>
                <p className="footer-subtitle">Sell on plugsity</p>
                <p className="footer-subtitle">How it works</p>
                <p className="footer-subtitle">Order fulfillment</p>
            </div>

            <div class="column-6-middle">
                <p className="footer-title">Help</p>
                <p className="footer-subtitle">Shipping & delivery</p>
                <p className="footer-subtitle">How it works</p>
                <p className="footer-subtitle">Trust & Safety</p>
            </div>

            <div class="column-6-right">
                <p className="footer-last-column">Follow our Journey updates</p>
                <p className="footer-subtitle"> We will share discounts for your favorite products from time to time</p>
                <div className="flexContainer">
                <input type="text" id="fname" name="firstname" placeholder="Email address" className="input-name"></input>
                <button className="subscribe">Subscribe</button>
                </div>
            </div>
        </div>
        )

    }
}

export default Footer

