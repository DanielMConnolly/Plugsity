import { React, useContext, useState } from 'react';
import {Button, TextField, Select, MenuItem, InputLabel} from '@material-ui/core';
import {createOrUpdateBusiness} from '../Utils/ApiCalls';
import Shape from '../assets/Shape.png';
import hy from '../assets/Heythere.png';
import '../css/Business_Setup.css';

export default function Bus_Identification_1(props) {

    const handleNext =  async ()=> {

        if(! ["legal_business_name", "tax_id", "business_type", "business_form"].every(item =>props.userData.hasOwnProperty(item))){
            alert("You are missing a required field");
        }
        else{
            createOrUpdateBusiness(props.userData).then(business_id=> {
                if(!localStorage.hasOwnProperty('business_id')){
                    localStorage.setItem('business_id', business_id);
                    props.setUserData({...props.userData, "business_id": business_id})
                }
                props.setStep(2);

            })

        }
    }

    return (
        <div>
        
        <div id="bus_iden1_div_main" style={{ display: 'flex', marginTop: '2%' }}>
            
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
                <div id="bus_iden1_div_1">
                    <div style={{ width: '42%', float: 'left', marginLeft: '6%'}}>
                        <InputLabel id="label_bus_name" style = {{ marginTop: '10px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Legal Business Name *</InputLabel>
                            <TextField value={props.userData['legal_business_name']} onChange={(e) => props.setUserData({ ...props.userData, "legal_business_name": e.target.value })} style={{ height: '8%' }} placeholder="Legal Business Name" margin="normal" variant="outlined" color="secondary"/>
                    </div>
                    <div style={{ width: '42%', float: 'right', marginRight: '5%'}}>
                        <InputLabel id="label_tax_num" style={{ marginTop: '10px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Tax Identification Number *</InputLabel>
                            <TextField style={{ height: '8%' }} placeholder="ABD-2021312321" value={props.userData['tax_id']} required onChange={(e) => props.setUserData({ ...props.userData, "tax_id": e.target.value })} 
                                 margin="normal" variant="outlined" color="secondary" />
                     </div>
                </div>

                    <div id="bus_iden1_div_2" style={{marginLeft: '6%' }}>
                    <InputLabel id="label_otherbusname" style={{ fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Other Business Name (If not applicable, leave blank)</InputLabel>
                        <TextField id="txtfld_otrbname" style={{ width: '94%' }} placeholder="Other Business Name" value={props.userData['other_business_name']} onChange={(e) => props.setUserData({ ...props.userData, "other_business_name": e.target.value })} margin="normal" variant="outlined" color="secondary" />
                </div>

                    <div id="bus_iden1_div_3" style={{marginLeft: '6%' }}>
                    <InputLabel id="label_bus_form" style={{fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Form of Business *</InputLabel>
                        <Select id="dropdown_busform" style={{ width: '94%', marginTop: '2%' }} value={props.userData['business_form']} onChange={(e) => props.setUserData({ ...props.userData, "business_form": e.target.value })} placeholder=" Sole Proprietorship; Partnership.." margin="normal" variant="outlined" color="secondary">
                            <MenuItem value="Sole Proprietorship">Sole Proprietorship</MenuItem>
                            <MenuItem value="Partnership">Partnership</MenuItem>
                    </Select>
                </div>

                    <div id="bus_iden1_div_4" style={{ marginLeft: '6%' }}>
                        <InputLabel id="label_bus_type" style={{ fontSize: '14px', marginTop: '2%', marginBottom: '2%',fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Business Type *</InputLabel>
                        <Select id="dropdown_busType" style={{ width: '94%', marginBottom: '15px' }} value={props.userData['business_type']} onChange={(e) => props.setUserData({ ...props.userData, "business_type": e.target.value })} placeholder="Publicly-owned, Privately-owned.." margin="normal" variant="outlined" color="secondary">
                            <MenuItem value="Public-owned">Public-owned</MenuItem>
                            <MenuItem value="Private-owned">Private-owned</MenuItem>
                    </Select>
                </div>
               
            </div>
            
            
            
        </div>
        <footer id="bus_iden1_div" style={{
                height: '10%', bottom: '0px',
                position: 'absolute', display: 'flex', width:'100%'}}>

                <Button id="btn_save_submit" style={{ width: '220px', height: '32px', borderRadius: '15px', marginLeft: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500}} variant="contained" color="primary">Save & continue later</Button>
                <Button id="btn_next" style={{ width: '160px', height: '32px', borderRadius: '15px', marginLeft: '23%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500}} variant="contained" onClick={() =>handleNext()} color="primary">Next</Button>

        </footer>
        </div>
);
}
