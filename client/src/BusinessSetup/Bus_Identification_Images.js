import { React, useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Shape from '../assets/Shape.png';

import ImageModal from '../ImageModal';
import { createOrUpdateBusinessImages } from '../Utils/ApiCalls';
import hy from '../assets/Heythere.png';
import '../css/Business_Setup.css';
import { createFile, uploadFile } from '../Utils/Upload';


export default function Bus_Identification_Images(props) {
    //     const [key, setKey] = useState()
    const handleNext = async () => {
        props.setStep(4);
        const uploadBusinessImage = new Promise((resolve, reject) => {
            if (BusinessImage) {
                uploadFile(BusinessImage, (key) => {

                    props.setbusImagesData({ ...props.busImagesData, "business_image_link": key })

                    if (props.busImagesData.business_id == null) {
                        createOrUpdateBusinessImages({ "id": props.userData.business_id , ...props.busImagesData, "business_image_link": key })
                    }
                    else {
                        createOrUpdateBusinessImages({ ...props.busImagesData, "business_image_link": key })
                    }
                    
                    resolve()

                });
            }
            else {
                resolve()
            }
        });


        //         Promise.all([uploadBusinessImage]).then(() => {
        //             console.log("Inside promiseAll")
        //             console.log(props.busImagesData)

        //         })


    }

    const getBusinessImage = () => {
        if (BusinessImage) {
            return URL.createObjectURL(BusinessImage)
        }
        return `https://plugsity-images.s3.amazonaws.com/${props.busImagesData["business_image_link"]}`
    }


    const [BusinessImage_open, toggleBusinessImage] = useState(false);
    const [BusinessImage, setBusinessImage] = useState();



    const showLicenseModalButton = props.busImagesData["business_image_link"] != 'null' || BusinessImage
    console.log(BusinessImage);
    return (
        <div>
            <ImageModal open={BusinessImage_open} handleClose={toggleBusinessImage} image={BusinessImage} />


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


                    <div className="img-upload-section">
                        <InputLabel id="label">Business Images </InputLabel>
                        <input
                            accept="image/*"
                            id="business-images-input"
                            className="hidden"
                            type="file"
                            onChange={(e) => {
                                createFile(e, (file) => {
                                    setBusinessImage(file)
                                })
                            }}
                        />
                        <label for="business-images-input"><div className="select-file-button">Select File</div></label>
                        {props.busImagesData["business_image_link"] != 'null' &&
                            <button onClick={() => toggleBusinessImage(!BusinessImage_open)}>See existing file</button>
                        }
                    </div>



                </div>
            </div>
            <footer id="bus_iden2_div" style={{
                height: '10%', bottom: '0px',
                position: 'absolute', display: 'flex', width: '100%'
            }}>
                <Button id="btn_back" style={{ width: '160px', height: '32px', borderRadius: '15px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => props.setStep(2)} color="primary">Back</Button>
                <Button id="btn_save_submit" style={{ width: '220px', height: '32px', borderRadius: '15px', marginLeft: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" color="primary">Save & continue later</Button>
                <Button id="btn_next" style={{ width: '160px', height: '32px', borderRadius: '15px', marginLeft: '14%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => handleNext()} color="primary">Next</Button>

            </footer>
        </div>
    );

}
