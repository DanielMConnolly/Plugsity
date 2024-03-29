
import { element } from 'prop-types';
import PlugsityLogo from './assets/plugsity-logo.png'
import './css/SignupLogin_Bus.css'
import Signup_Bus from './Signup_Bus'
import Login from './Login'
import { useState } from 'react';
import Tabs from './Tabs'

function SignupLogin_Bus() {
    const [active, setActive] = useState("Signup_Bus");
    const signupBlurb = "Sign up for a new account as a business and start selling your products locally"
    const loginBlurb = "Login to plugsity"
    const title_signup = "Sign up or Login as a Business"
    const title_login = "Login"
    return (
        <div className="SignupLogin_Bus">
            <img src={PlugsityLogo} className="logo_Bus" />
            <div className="label_Bus"> {active === "Signup_Bus" ? title_signup : title_signup} </div>

            <Tabs activeTab={active} onClick={(label) => setActive(label)}>
                <div label="Sign up" className="tabtext_Bus" >
                    <Signup_Bus className="tab_Bus" />
                </div>
                <div label="Login" className="tab_Bus">
                    <Login className="tab_Bus" />
                </div>
            </Tabs>
        </div>
    );
}

export default SignupLogin_Bus;
