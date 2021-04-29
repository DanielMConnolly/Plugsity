import { React, useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Shape from '../assets/Shape.png';
import wow_you_made_it from '../assets/wow_you_made_it.png';
import '../css/Business_Setup.css';
import {uploadPDF} from '../Utils/Upload';
import FileInput from '../FileInput'

import { createOrUpdateBusiness } from '../Utils/ApiCalls';

export default function ShippingPolicies(props) {
    const [returnPolicy, setReturnPolicy] = useState();
    const [additionalPolicies, setAdditionalPolicies] = useState()
    const [returnPoliciesOpen, toggleReviewPolicies] = useState(false);
    const [additionalPoliciesOpen, toggleAdditionalPolicies] = useState(false);
    const [license_open, toggleLicense] = useState(false);
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


    const handleNext = (exit=false)=> {
     if(exit){
         props.setStep("exit")
     }
     else{
         props.setStep("next")
     }
     const uploadReturnPolicy =new Promise((resolve, reject)=>{
        if (returnPolicy) {
              uploadPDF(returnPolicy, (key) => {
                props.setUserData({ ...props.userData, "return_policy": key })
                
            });
        }
        else{
            console.log('it is not');
            resolve()
        }
    });

    const uploadAdditionalPolicies = new Promise((resolve, reject)=>{
        if (additionalPolicies) {
             uploadPDF(additionalPolicies, (key) => {
                props.setUserData({ ...props.userData, "additional_policies": key })
            });

        }
        else{
            resolve()
        }
        
    });

    Promise.all([uploadReturnPolicy, uploadAdditionalPolicies]).then(()=>{
            createOrUpdateBusiness(props.userData)
    })

    }
    const classes = useStyles();


    const getReturnPolicy = ()=>{
        if(returnPolicy){
            return returnPolicy
        }
        else if([null, "null", ''].includes(props.userData["return_policy"])){
            return null
        }
        return `https://plugsity-images.s3.amazonaws.com/${props.userData["return_policy"]}`
    }

    const getAdditionalPolicies = ()=>{

        if(additionalPolicies){
            return additionalPolicies
        }
        else if([null, "null", ''].includes(props.userData["additional_policies"])){
            return null
        }
        return `https://plugsity-images.s3.amazonaws.com/${props.userData["additional_policies"]}`
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
                        <TextField multiline style={{ height: '80%', width: '95%' }} value={props.userData['shipping_policy']} onChange={(e) => props.setUserData({ ...props.userData, "shipping_policy": e.target.value })} placeholder="Clarify to customers how you operate when it comes to shipping." margin="normal" variant="outlined" color="secondary" />
                    </div>

                        <FileInput label="Return Policies" image={getReturnPolicy()} callback={(file)=>setReturnPolicy(file)}/>
                        <FileInput label="Additional Policies" image={getAdditionalPolicies()} callback={(file)=>setAdditionalPolicies(file)}/>
                </div>



            </div>
            <footer id="pt_cntct_2_div" style={{
                height: '10%', bottom: '0px',
                position: 'absolute', display: 'flex', width: '100%'
            }}>
                <Button id="btn_back" style={{ marginLeft: '5.5%', width: '160px', height: '32px', borderRadius: '15px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => props.setStep("back")} color="primary">Back</Button>
                <Button id="btn_save_submit" style={{ marginLeft: '3.5%', width: '220px', height: '32px', borderRadius: '15px', marginLeft: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" color="primary">Save & continue later</Button>
                <Button id="btn_bus_setup_submit" style={{ marginLeft: '25%', width: '160px', height: '32px', borderRadius: '15px', marginLeft: '23%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained"
                    color="primary" onClick={()=> handleNext()}>Next</Button>
            </footer>
        </div>
    );
}


