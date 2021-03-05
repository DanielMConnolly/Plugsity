
import { element } from 'prop-types';
import PlugsityLogo from './assets/plugsity-logo.png'
import './css/SignupLogin.css'
import Signup from './Signup'
import { useState } from 'react';
import Tabs from './Tabs'

function SignupLogin() {
    const [active, setActive] = useState("Signup");
    const signupBlurb = "Sign up for a new account to submit your own video reviews to products you love, submit orders, book service and events"
    const loginBlurb = "TODO (not defined in mockup)!!! Login to plugsity"
    return (
        <div className="SignupLogin">
            <img src={PlugsityLogo} className="logo" />
            <div className="blurb">{active==="Signup"?signupBlurb:loginBlurb}</div>
            <Tabs activeTab={active} onClick={(label) => setActive(label)}>
                <div label="Signup" className="tab" >
                    <Signup className="tab" />
                </div>
                <div label="Login">
                    <div className="tab">After 'while, <em>Crocodile</em>! </div>
                </div>
            </Tabs>
        </div>
    );
}

export default SignupLogin;