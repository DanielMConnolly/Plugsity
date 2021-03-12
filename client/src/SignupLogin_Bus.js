
import { element } from 'prop-types';
import PlugsityLogo from './assets/plugsity-logo.png'
import './css/SignupLogin.css'
import Signup_Bus from './Signup_Bus'
import { useState } from 'react';
import Tabs from './Tabs'

function SignupLogin_Bus() {
    const [active, setActive] = useState("Signup_Bus");
    const signupBlurb = "Sign up for a new account as a business and start selling your products locally"
    const loginBlurb = "Business TODO!!! Login to plugsity"
    const title_signup = "Sign up as Business"
    const title_login = "Login"
    return (
        <div className="SignupLogin">
            <img src={PlugsityLogo} className="logo" />
             <div className ="label"> {active==="Signup_Bus"? title_signup : title_login} </div>
            <div className ="blurb"> {active==="Signup_Bus"? signupBlurb : loginBlurb} </div>
 	    
            <Tabs activeTab = {active} onClick={(label) => setActive(label)}>
                <div label="Sign up" className="tabtext" >
                    <Signup_Bus className="tab" />
                </div>
                <div label="Login" className = "tab">
                    <div className="tab"> Later! </div>
                </div>
            </Tabs>
        </div>
    );
}

export default SignupLogin_Bus;
