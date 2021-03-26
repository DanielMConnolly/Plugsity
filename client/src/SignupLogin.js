
import { element } from 'prop-types';
import PlugsityLogo from './assets/plugsity-logo.png'
import ShinyHappy from './assets/shiny-happy.svg';
import './css/SignupLogin.css'
import Signup from './Signup'
import Login from './Login'
import { useState } from 'react';
import Tabs from './Tabs'

function SignupLogin() {
    const [active, setActive] = useState("Signup");
    const signupBlurb = "Sign up for a new account to submit your own video reviews to products you love, submit orders, book service and events"
    const loginBlurb = signupBlurb
    return (
        <div className="SignupLogin">
            <img src={PlugsityLogo} className="logo" />
            <div className="blurb">{active==="Signup"?signupBlurb:loginBlurb}</div>
            <Tabs activeTab={active} onClick={(label) => setActive(label)}>
                <div label="Signup" className="tab" >
                    <Signup className="tab" />
                </div>
                <div label="Login">
                    <Login className="tab"/>
                </div>
            </Tabs>
            <div ><img src={ShinyHappy} /></div>
        </div>
    );
}

export default SignupLogin;