import { React, useState } from 'react';
import {Button, TextField, Select, MenuItem, InputLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Shape from '../assets/Shape.png';
import {createOrUpdateBusiness} from '../Utils/ApiCalls';
import hy from '../assets/Heythere.png';
import '../css/Business_Setup.css';
import {createFile, uploadFile} from '../Utils/Upload';

export default function Bus_Identification_2(props) {
 


    const handleNext =  ()=> {
        createOrUpdateBusiness(props.userData);
        props.setStep(3);
        
    }

    const [licenseImage, setLicenseImage] = useState();
    const [permitImage, setPermitImage] = useState();

    return (
        <div>
        
        <div id="bus_iden2_div_main" style={{ display: 'flex', marginTop: '2%' }}>
            
                <div style={{ float: 'left', width: '30%', height: '30%', fontFamily: 'DM Sans', border: '1px solid rgba(0, 0, 0, 0.07)', backgroundColor: '#F8F8F8'}}>
                    
                    <img src={hy} style={{margin: '11px'}} alt="logo" />
                <p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', paddingLeft: '10px'}}> Make sure you have the following documents ready as we will need it later </p>
                <div style={{ fontSize: '14px', lineHeight: '16px', fontWeight: 700, marginLeft: '20px' }}>
                    <p>Business License </p>
                    <p >Business Permit </p>
                    <p >Passport/Government ID </p>
                    <p >Proof of Address</p>
                </div>
                    <div style={{display:'flex'}}><img src={Shape} alt="logo" /><p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', fontWeight: 400 }}>All information are safely encrypted and secured! </p>
            </div></div>
            <div style={{ float: 'right', width: '70%', marginLeft: '10%', border: '1px solid rgba(0, 0, 0, 0.07)'}}>
                <div id="bus_iden2_div_1">
                    <div style={{ width: '42%', float: 'left', marginLeft: '6%'}}>
                            <InputLabel id="label_bus_name" style={{ marginTop: '10px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Business Phone Number</InputLabel>
                            <TextField style={{ height: '8%' }} value={props.userData['legal_business_phone']} onChange={(e) => props.setUserData({ ...props.userData, "legal_business_phone": e.target.value })}   placeholder="000-000-000" margin="normal" variant="outlined" color="secondary" />
                    </div>
                    <div style={{ width: '42%', float: 'right', marginRight: '5%'}}>
                        <InputLabel id="label_tax_num" style={{ marginTop: '10px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Business Email</InputLabel>
                            <TextField style={{ height: '8%' }} value={props.userData['legal_business_email']} onChange={(e) => props.setUserData({ ...props.userData, "legal_business_email": e.target.value })}   placeholder="hi@plugsity.com" margin="normal" variant="outlined" color="secondary" />
                     </div>
                </div>

                    <div id="bus_iden2_div_2" style={{ width: '90%', display: 'flex', marginLeft: '4%' }} >
                        <div style={{ width: '33%' }}>
                            <InputLabel id="label" style={{ marginTop: '4%', marginBottom: '4%',marginLeft: '6%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Country *</InputLabel>
                            <Select id="drpdwn_cntry" style={{ width: '28%' }} value={props.userData['country']} onChange={(e) => props.setUserData({ ...props.userData, "country": e.target.value })}   place holder="Country" variant="outlined" color="secondary" style={{
                                marginLeft: '6%'
                            }}>
                                <MenuItem value="USA">USA </MenuItem>
                                <MenuItem value="India">India</MenuItem>
                            </Select>
                        </div>
                        <div style={{width : '33%'}}>
                            <InputLabel id="label" style={{ marginLeft: '6%', marginTop: '4%', marginBottom: '4%',fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Currency *</InputLabel>
                            <Select id= "drpdwn_currency" style={{
                                marginLeft: '8%'
                            }} place holder="Currency" variant="outlined" value={props.userData['currency']} onChange={(e) => props.setUserData({ ...props.userData, "currency": e.target.value })}  color="secondary">
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="Rupees">Rupees</MenuItem>
                            </Select>
                        </div>
                        <div style={{ width: '33%' }}>
                            <InputLabel id="label" style={{ marginLeft: '6%', marginTop: '4%', marginBottom: '4%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Language</InputLabel>
                            <Select id="drpdwn_lang" place holder="Language" value={props.userData['language']} onChange={(e) => props.setUserData({ ...props.userData, "language": e.target.value })}    variant="outlined" color="secondary" style={{
                                marginLeft: '10%'
                            }}>
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Hindi">Hindi</MenuItem>
                            </Select>
                        </div>
                </div>

                    <div id="bus_iden2_div_3" style={{ marginLeft: '4%' }}>
                        <InputLabel id="label" style={{ marginTop: '3%', marginBottom: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Business License *</InputLabel>
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            onChange={(e) =>{
                                createFile(e, (file)=> {
                                setLicenseImage(file)
                            })
                            }}
                        />                               
                    </div>

                    <div id="bus_iden2_div_4" style={{ marginLeft: '6%' }}>
                        <InputLabel id="label" style={{ marginTop: '3%', marginBottom: '3%',fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Business Permit *</InputLabel>
                        <input
                            accept="image/*"
                        
                            id="contained-button-file"
                            type="file"
                            onChange={(e) =>{
                                createFile(e, (file)=> {
                                    setPermitImage(file)
                            })
                            }}
                        />
                    </div>
               
                </div>
            
            
            
        </div>
            <footer id="bus_iden2_div" style={{
                height: '10%', bottom: '0px',
                position: 'absolute', display: 'flex', width: '100%'
            }}>
                <Button id="btn_back" style={{ width: '160px', height: '32px',  borderRadius: '15px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => props.setStep(1)} color="primary">Back</Button>
                <Button id="btn_save_submit" style={{ width: '220px', height: '32px', borderRadius: '15px', marginLeft: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500}} variant="contained" color="primary">Save & continue later</Button>
                <Button id="btn_next" style={{ width: '160px', height: '32px', borderRadius: '15px', marginLeft: '14%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500}} variant="contained" onClick={() => handleNext()} color="primary">Next</Button>

        </footer>
        </div>
);
}
