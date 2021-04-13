import { React, useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { multiStepContext } from './StepContext';
import { makeStyles } from '@material-ui/core/styles';
import Shape from '../assets/Shape.png';
import wow_you_made_it from '../assets/wow_you_made_it.png';
import '../css/Business_Setup.css';
import axios from 'axios';

export default function Business_Policies() {
    const { setStep, userData, setUserData, submitData, finalData } = useContext(multiStepContext);
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
    if(submitted){
        return (<Redirect to="/homepage"/>)
    }
    return (
        <div style={{ width: '60%' }}>

            <div id="bus_pol_div_main" style={{ display: 'flex', marginTop: '2%', width: '100%', marginLeft: '5%' }}>

                <div style={{ float: 'left', width: '25%', height: '30%', fontFamily: 'DM Sans', border: '1px solid rgba(0, 0, 0, 0.07)', marginLeft: '4%', backgroundColor: '#F8F8F8' }}>

                    <img src={wow_you_made_it} style={{ margin: '11px' }} alt="logo" />
                    <p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', paddingLeft: '10px' }}>Let's define some polices your business have so your customers are well informed!</p>
                    <div style={{ fontSize: '14px', lineHeight: '16px', fontWeight: 700, marginLeft: '20px' }}>

                        <p >Shipping policies </p>
                        <p >Returns and Refunds</p>
                    </div>
                    <div style={{ display: 'flex' }}><img src={Shape} alt="logo" /><p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', fontWeight: 400 }}>All information are safely encrypted and secured! </p>
                    </div>
                </div>
                <div style={{ float: 'right', width: '70%', marginLeft: '7%', border: '1px solid rgba(0, 0, 0, 0.07)' }}>
                    <div id="bus_pol_div_1" style={{ display: 'flex', width: '95%' }}>
                        <div style={{ marginLeft: '5%' }}>
                            <InputLabel id="label_bus_pol" style={{ width: '100%', marginTop: '10px', fontSize: '12px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 400 }}>This step can be filled later</InputLabel>

                        </div>

                    </div>
                    <div id="bus_pol_div_2" style={{ display: 'block', width: '95%', marginLeft: '5%' }}>
                        <InputLabel id="label" style={{ marginTop: '2%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Shipping Policies</InputLabel>
                        <TextField multiline style={{ height: '80%', width: '95%' }} value={userData['ship_pol']} onChange={(e) => setUserData({ ...userData, "ship_pol": e.target.value })} placeholder="Clarify to customers how you operate when it comes to shipping." margin="normal" variant="outlined" color="secondary" />
                    </div>

                    <div id="bus_pol_2_div_3" style={{ display: 'block', width: '95%', marginLeft: '6%', width: '95%' }}>
                        <InputLabel id="label" value={userData['ret_pol']} onChange={(e) => setUserData({ ...userData, "ret_pol": e.target.value })} style={{ width: '95%', marginTop: '2%', marginBottom: '1%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Returns & Policies</InputLabel>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"

                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span"> Add</Button>
                        </label>

                    </div>

                    <div id="bus_pol_2_div_4" style={{ marginLeft: '6%', display: 'block' }}>
                        <InputLabel id="label" style={{ marginTop: '4%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700, marginBottom: '1%' }}>Additional Policies</InputLabel>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" style={{ marginBottom: '3%' }}> Add</Button>
                        </label>

                    </div>


                </div>



            </div>
            <footer id="pt_cntct_2_div" style={{
                height: '10%', bottom: '0px',
                position: 'absolute', display: 'flex', width: '100%'
            }}>
                <Button id="btn_back" style={{ marginLeft: '5.5%', width: '160px', height: '32px', borderRadius: '15px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => setStep(4)} color="primary">Back</Button>
                <Button id="btn_save_submit" style={{ marginLeft: '3.5%', width: '220px', height: '32px', borderRadius: '15px', marginLeft: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" color="primary">Save & continue later</Button>
                <Button id="btn_bus_setup_submit" style={{ marginLeft: '25%', width: '160px', height: '32px', borderRadius: '15px', marginLeft: '23%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained"
                    color="primary" onClick={()=> uploadData(userData, ()=>setSubmitted(true))}>Submit</Button>
            </footer>
        </div>
    );
}


let uploadData = (userData, callback) => {
    const user_id= localStorage.getItem('user_id');
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
