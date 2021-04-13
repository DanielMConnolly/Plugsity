import { React, useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, TextField, Select, MenuItem, InputLabel, FormLabel, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { multiStepContext } from './StepContext';
import { makeStyles } from '@material-ui/core/styles';
import Shape from '../assets/Shape.png';
import '../css/Business_Setup.css';
import axios from 'axios';

export default function Payment_Methods_3() {
    const { setStep, userData, setUserData } = useContext(multiStepContext);
    const [submitted, setSubmitted] = useState(false);
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
    }));

    const classes = useStyles();
    if (submitted) {
        return (<Redirect to="/homepage" />)
    }
    return (
        <div style={{width : '60%'}}>

            <div id="pay_mthd_3_div_main" style={{ display: 'flex', marginTop: '2%', width: '100%' ,marginLeft: '5%'}}>

                <div style={{ float: 'left', width: '25%', height: '30%', fontFamily: 'DM Sans', border: '1px solid rgba(0, 0, 0, 0.07)', marginLeft: '5%', backgroundColor: '#F8F8F8'}}>

                    <p style={{ fontSize: '16px', lineHeight: '24px', textAlign: 'left', fontWeight: 500, paddingLeft: '10px' }}>Let's talk a little about payments $$$ </p>
                    <p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', paddingLeft: '10px' }}> We don't store your payments Information, we are using stripe to handle our payments, we trust it and we hope you do too. </p>
                    <div style={{ fontSize: '14px', lineHeight: '16px', fontWeight: 700, marginLeft: '20px' }}>
                        
                        <p>Billing </p>
                        <p>How to receive funds</p>
                    </div>
                    <div style={{ display: 'flex' }}><img src={Shape} alt="logo" /><p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', fontWeight: 400 }}>All information are safely encrypted and secured! </p>
                    </div></div>
                <div style={{ float: 'right', width: '70%', marginLeft: '7%', border: '1px solid rgba(0, 0, 0, 0.07)' }}>

                    <div id="pay_mthd_3_div_1" style={{ display: 'flex'}}>
                        
                        
                        
                    </div>

                    
                    
                    <div>
                        <Button id="btn_cnnctPP" style={{ marginBottom: '4%',width: '160px', height: '32px', borderRadius: '15px', marginLeft: '70%', marginTop: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" color="primary">Connect Stripe</Button>
                    </div>

                </div>



            </div>
            <footer id="pay_mthd_3_div" style={{
                height: '10%', bottom: '0px',
                position: 'absolute', display: 'flex', width: '100%'
            }}>
                <Button id="btn_back" style={{ width: '160px', height: '32px', marginLeft: '5.5%', borderRadius: '15px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => setStep(5)} color="primary">Back</Button>
                <Button id="btn_save_submit" style={{ width: '220px', height: '32px', marginLeft: '3.5%', borderRadius: '15px', marginLeft: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" color="primary">Save & continue later</Button>
                <Button id="btn_next" style={{ width: '160px', height: '32px', marginLeft: '25%', borderRadius: '15px', marginLeft: '23%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => uploadData(userData, () => setSubmitted(true))} color="primary">Submit</Button>

            </footer>
        </div>
    );
}

let uploadData = (userData, callback) => {
    const user_id = localStorage.getItem('user_id');
    axios
        .post("/api/businessSetup/business", {
            legal_business_name: userData.bus_lgl_name,
            legal_business_address: userData.bus_address,
            legal_business_phone: userData.bus_phone_num,
            legal_business_email: userData.bus_email,
            business_link: "buslink",
            shipping_policy: userData.ship_pol,
            tax_id: userData.bus_tax_id_num,
            business_form: userData.bus_form,
            business_license_link: "liclink",
            business_permit_link: "permlink",
            language: userData.language,
            country: userData.bus_country,
            currency: userData.currency,
            business_type: userData.bus_type,
            business_description: "desc",
            user_id: user_id

        })
        .then((response) => {
            callback();

        })
        .catch((error) => {
            console.log(error);
        })
}
