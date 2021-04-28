import { React, useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Shape from '../assets/Shape.png';
import PDFModal from '../PDFModal'
import axios from 'axios';
import { createOrUpdateBusiness } from '../Utils/ApiCalls';
import hy from '../assets/Heythere.png';
import '../css/Business_Setup.css';
import { createFile, uploadPDF } from '../Utils/Upload';

export default function Bus_Identification_2(props) {
    const handleNext = async (exit=false) => {
        if(exit){
            props.setStep("exit")
        }
        else{
            props.setStep("next")
        }
  
        const uploadLicense =new Promise((resolve, reject)=>{
            if (licenseImage) {
                  uploadPDF(licenseImage, (key) => {
                    props.setUserData({ ...props.userData, "business_license_link": key })
                    
                });
            }
            else{
                resolve()
            }
        });

        const uploadPermit = new Promise((resolve, reject)=>{
            if (permitImage) {
                 uploadPDF(permitImage, (key) => {
                    props.setUserData({ ...props.userData, "business_permit_link": key })
                });

            }
            else{
                resolve()
            }
            
        });

        Promise.all([uploadLicense, uploadPermit]).then(()=>{
                console.log("hello")
                createOrUpdateBusiness(props.userData)
        })




    }

    const getPermitImage = () => {
        if (permitImage) {
            return permitImage
        }
        return `https://plugsity-images.s3.amazonaws.com/${props.userData["business_permit_link"]}`

    }



    const getLicenseImage = () => {
        if (licenseImage) {
            return licenseImage
        }
        return `https://plugsity-images.s3.amazonaws.com/${props.userData["business_license_link"]}`
    }

    const [permit_open, togglePermit] = useState(false);
    const [license_open, toggleLicense] = useState(false);
    const [licenseImage, setLicenseImage] = useState();
    const [permitImage, setPermitImage] = useState();
    const showPermitModalButton = (!["null", null].includes(props.userData["business_permit_link"] )) || permitImage
    const showLicenseModalButton = (!["null", null].includes(props.userData["business_license_link"] ))|| licenseImage
    return (
        <div>
            <PDFModal open={license_open} handleClose={toggleLicense} image={getLicenseImage()} />
            <PDFModal open={permit_open} handleClose={togglePermit} image={getPermitImage()} />

            <div id="bus_iden2_div_main" style={{ display: 'flex', marginTop: '2%' }}>
                <div style={{ float: 'left', width: '30%', height: '30%', fontFamily: 'DM Sans', border: '1px solid rgba(0, 0, 0, 0.07)', backgroundColor: '#F8F8F8' }}>

                    <img src={hy} style={{ margin: '11px' }} alt="logo" />
                    <p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', paddingLeft: '10px' }}> Make sure you have the following documents ready as we will need it later </p>
                    <div style={{ fontSize: '14px', lineHeight: '16px', fontWeight: 700, marginLeft: '20px' }}>
                        <p>Business License </p>
                        <p >Business Permit </p>
                        <p >Passport/Government ID </p>
                        <p >Proof of Address</p>
                    </div>
                    <div style={{ display: 'flex' }}><img src={Shape} alt="logo" /><p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', fontWeight: 400 }}>All information are safely encrypted and secured! </p>
                    </div></div>
                <div style={{ float: 'right', width: '70%', marginLeft: '10%', border: '1px solid rgba(0, 0, 0, 0.07)' }}>
                    <div id="bus_iden2_div_1">
                        <div style={{ width: '42%', float: 'left', marginLeft: '6%' }}>
                            <InputLabel id="label_bus_name" style={{ marginTop: '10px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Business Phone Number</InputLabel>
                            <TextField style={{ height: '8%' }} value={props.userData['legal_business_phone']} onChange={(e) => props.setUserData({ ...props.userData, "legal_business_phone": e.target.value })} placeholder="000-000-000" margin="normal" variant="outlined" color="secondary" />
                        </div>
                        <div style={{ width: '42%', float: 'right', marginRight: '5%' }}>
                            <InputLabel id="label_tax_num" style={{ marginTop: '10px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Business Email</InputLabel>
                            <TextField style={{ height: '8%' }} value={props.userData['legal_business_email']} onChange={(e) => props.setUserData({ ...props.userData, "legal_business_email": e.target.value })} placeholder="hi@plugsity.com" margin="normal" variant="outlined" color="secondary" />
                        </div>
                    </div>

                    <div id="bus_iden2_div_2" style={{ width: '90%', display: 'flex', marginLeft: '4%' }} >
                        <div style={{ width: '33%' }}>
                            <InputLabel id="label" style={{ marginTop: '4%', marginBottom: '4%', marginLeft: '6%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Country *</InputLabel>
                            <Select  key={props.userData["country"]} id="drpdwn_cntry" style={{ width: '28%' }} value={props.userData['country']} onChange={(e) => props.setUserData({ ...props.userData, "country": e.target.value })} place holder="Country" variant="outlined" color="secondary" style={{
                                marginLeft: '6%'
                            }}>
                                <MenuItem value="USA">USA </MenuItem>
                                <MenuItem value="India">India</MenuItem>
                            </Select>
                        </div>
                        <div style={{ width: '33%' }}>
                            <InputLabel id="label" style={{ marginLeft: '6%', marginTop: '4%', marginBottom: '4%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Currency *</InputLabel>
                            <Select id="drpdwn_currency" style={{
                                marginLeft: '8%'
                            }} place holder="Currency" variant="outlined" value={props.userData['currency']} onChange={(e) => props.setUserData({ ...props.userData, "currency": e.target.value })} color="secondary">
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="Rupees">Rupees</MenuItem>
                            </Select>
                        </div>
                        <div style={{ width: '33%' }}>
                            <InputLabel id="label" style={{ marginLeft: '6%', marginTop: '4%', marginBottom: '4%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Language</InputLabel>
                            <Select id="drpdwn_lang" place holder="Language" value={props.userData['language']} onChange={(e) => props.setUserData({ ...props.userData, "language": e.target.value })} variant="outlined" color="secondary" style={{
                                marginLeft: '10%'
                            }}>
                                <MenuItem value="English">English</MenuItem>
                                <MenuItem value="Hindi">Hindi</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="permit-upload-section">
                        <InputLabel id="label">Business License *</InputLabel>
                        <input
                            accept="image/* application/pdf"
                            id="business-license-input"
                            className="hidden"
                            type="file"
                            onChange={(e) => {
                                createFile(e, (file) => {
                                    setLicenseImage(file)
                                })
                            }}
                        />
                        <label for="business-license-input"><div className="select-file-button">Select File</div></label>
                        {showLicenseModalButton &&
                            <button onClick={() => toggleLicense(!license_open)}>See existing file</button>
                        }
                    </div>

                    <div>
                        <InputLabel id="label" >Business Permit *</InputLabel>
                        <input
                            accept="image/* application/pdf"
                            id="business-permit-input"
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                createFile(e, (file) => {
                                    setPermitImage(file)
                                })
                            }}
                        />
                        <label for="business-permit-input"><div className="select-file-button">Select File</div></label>
                        {showPermitModalButton &&
                            <button onClick={() => togglePermit(!permit_open)}>See existing file</button>
                        }
                    </div>

                </div>
            </div>
            <footer id="bus_iden2_div" style={{
                height: '10%', bottom: '0px',
                position: 'absolute', display: 'flex', width: '100%'
            }}>
                <Button id="btn_back" style={{ width: '160px', height: '32px', borderRadius: '15px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => props.setStep("back")} color="primary">Back</Button>
                <Button id="btn_save_submit" onClick={()=>handleNext(true)}style={{ width: '220px', height: '32px', borderRadius: '15px', marginLeft: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" color="primary">Save & continue later</Button>
                <Button id="btn_next" style={{ width: '160px', height: '32px', borderRadius: '15px', marginLeft: '14%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => handleNext()} color="primary">Next</Button>

            </footer>
        </div>
    );

}
