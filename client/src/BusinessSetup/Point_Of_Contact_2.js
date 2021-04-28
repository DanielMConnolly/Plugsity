import { React, useContext } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Shape from '../assets/Shape.png';
import {createOrUpdateBusiness} from '../Utils/ApiCalls';
import off_to_the_next_step from '../assets/Off_to_next_step.png';
import '../css/Business_Setup.css';

export default function Point_Of_Contact_2(props) {
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



   
    const handleNext =  (exit=false)=> {
        if(exit){
            props.setStep("exit")
        }
        else{
            props.setStep('next')
        }  
        createOrUpdateBusiness(props.userData);
       
    }

    const classes = useStyles();
    return (
        <div style={{width : '60%'}}>

            <div id="pt_cntct_2_div_main" style={{ display: 'flex', marginTop: '2%', width: '100%' ,marginLeft: '5%'}}>

                <div style={{ float: 'left', width: '25%', height: '30%', fontFamily: 'DM Sans', border: '1px solid rgba(0, 0, 0, 0.07)', marginLeft: '5%', backgroundColor: '#F8F8F8'}}>

                    <img src={off_to_the_next_step} style={{ margin: '11px' }} alt="logo" />
                    <p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', paddingLeft: '10px' }}> This is section about who ,  this helps us know how we get in touch. </p>
                    <div style={{ fontSize: '14px', lineHeight: '16px', fontWeight: 700, marginLeft: '20px' }}>
                        
                        <p >Passport/Government ID </p>
                        <p >Proof of Address</p>
                    </div>
                    <div style={{ display: 'flex' }}><img src={Shape} alt="logo" /><p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', fontWeight: 400 }}>All information are safely encrypted and secured! </p>
                    </div></div>
                <div style={{ float: 'right', width: '70%', marginLeft: '7%', border: '1px solid rgba(0, 0, 0, 0.07)' }}>
                    <div id="pt_cntct_2_div_1" style={{ display: 'flex', width: '95%'}}>
                        <div style={{ marginLeft: '6.5%', width: '93%'}}>
                            <InputLabel id="label_bus_name" style={{  width : '100%', marginTop: '10px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Business Address *</InputLabel>
                            <TextField value={props.userData['legal_business_address']} onChange={(e) => props.setUserData({ ...props.userData, "legal_business_address": e.target.value })} style={{ height: '8%', width : '100%'}} placeholder="Address" margin="normal" variant="outlined" color="secondary" />
                        </div>
                        
                    </div>

                    <div id="pt_cntct_2_div_2" style={{ width: '95%', display: 'flex', marginLeft: '4.5%' }} >
                        <div style={{ width: '29%' }}>
                            <InputLabel id="label" style={{ marginTop: '3%', width: '100%', marginBottom: '3%', marginLeft: '6%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Location Type</InputLabel>
                            <Select key={props.userData["country"]} id="drpdwn_loc" value={props.userData['country']} onChange={(e) => props.setUserData({ ...props.userData, "country": e.target.value })} place holder="Location Type" variant="outlined" color="secondary" style={{
                                marginLeft: '6%', width : '100%'
                            }}>
                                <MenuItem value="1">USA </MenuItem>
                                <MenuItem value="2">India</MenuItem>
                            </Select>
                        </div>
                        <div style={{ width: '29%',marginLeft: '1%' }}>
                            <InputLabel id="label" style={{ marginLeft: '10%', marginTop: '3%', marginBottom: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>City</InputLabel>
                            <Select key={props.userData['city']} id="drpdwn_city" value={props.userData['city']} onChange={(e) => props.setUserData({ ...props.userData, "city": e.target.value })}   style={{
                                marginLeft: '13%',width : '100%'
                            }} place holder="City" variant="outlined" color="secondary">
                                <MenuItem value="Buffalo">Buffalo</MenuItem>
                                <MenuItem value="NYC">NYC</MenuItem>
                            </Select>
                        </div>
                        <div style={{ width: '29%', marginLeft: '3%' }}>
                            <InputLabel id="label" style={{ marginLeft: '10%', marginTop: '3%', marginBottom: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>State</InputLabel>
                            <Select key={props.userData['city']}  id="drpdwn_state" value={props.userData['state']} onChange={(e) => props.setUserData({ ...props.userData, "state": e.target.value })}  style={{
                                marginLeft: '13%', width: '100%'
                            }} place holder="State" variant="outlined" color="secondary">
                                <MenuItem value="NY">NY</MenuItem>
                                <MenuItem value="VA">VA</MenuItem>
                            </Select>
                        </div>
                    </div>

                </div>



            </div>
            <footer id="pt_cntct_2_div" style={{
                height: '10%', bottom: '0px',
                position: 'absolute', display: 'flex', width: '100%'
            }}>
                <Button id="btn_back" style={{ width: '160px', height: '32px', marginLeft: '5.5%',borderRadius: '15px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => props.setStep(4)} color="primary">Back</Button>
                <Button onClick={()=>handleNext(true)} id="btn_save_submit" style={{ width: '220px', height: '32px', borderRadius: '15px', marginLeft: '3.5%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" color="primary">Save & continue later</Button>
                <Button id="btn_next" style={{ width: '160px', height: '32px', borderRadius: '15px', marginLeft: '25%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => handleNext()} color="primary">Submit</Button>

            </footer>
        </div>
    );
}
