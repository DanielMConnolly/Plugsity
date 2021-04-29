import { React, useContext } from "react";
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormLabel,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@material-ui/core";

import Shape from "../assets/Shape.png";
import "../css/Business_Setup.css";
import ConnectWithStripe from "../ConnectWithStripe";

export default function PaymentMethods(props) {

    const handleNext = (exit=false) => {
        if(exit){
            props.setStep("exit")
        }
        else{
            props.setStep("next")
        }
        
    };

    return (
        <div style={{ width: "60%" }}>
            <div
                id='pay_mthd_3_div_main'
                style={{
                    display: "flex",
                    marginTop: "2%",
                    width: "100%",
                    marginLeft: "5%",
                }}
            >
                <div
                    style={{
                        float: "left",
                        width: "25%",
                        height: "30%",
                        fontFamily: "DM Sans",
                        border: "1px solid rgba(0, 0, 0, 0.07)",
                        marginLeft: "5%",
                        backgroundColor: "#F8F8F8",
                    }}
                >
                    <p
                        style={{
                            fontSize: "16px",
                            lineHeight: "24px",
                            textAlign: "left",
                            fontWeight: 500,
                            paddingLeft: "10px",
                        }}
                    >
                        Let's talk a little about payments $$${" "}
                    </p>
                    <p
                        style={{
                            fontSize: "12px",
                            lineHeight: "16px",
                            textAlign: "left",
                            paddingLeft: "10px",
                        }}
                    >
                        {" "}
                        We don't store your payments Information, we are using
                        stripe to handle our payments, we trust it and we hope
                        you do too.{" "}
                    </p>
                    <div
                        style={{
                            fontSize: "14px",
                            lineHeight: "16px",
                            fontWeight: 700,
                            marginLeft: "20px",
                        }}
                    >
                        <p>Billing </p>
                        <p>How to receive funds</p>
                    </div>
                    <div style={{ display: "flex" }}>
                        <img src={Shape} alt='logo' />
                        <p
                            style={{
                                fontSize: "12px",
                                lineHeight: "16px",
                                textAlign: "left",
                                fontWeight: 400,
                            }}
                        >
                            All information are safely encrypted and secured!{" "}
                        </p>
                    </div>
                </div>
                <div
                    style={{
                        float: "right",
                        width: "70%",
                        marginLeft: "7%",
                        border: "1px solid rgba(0, 0, 0, 0.07)",
                    }}
                >
                    <div
                        id='pay_mthd_3_div_1'
                        style={{
                            display: "flex",
                            width: "95%",
                            marginLeft: "4.5%",
                        }}
                    >
                     
                    
                        <ConnectWithStripe
                            business_id={props.userData.business_id}
                        />
                    </div>
                </div>
            </div>
            <footer
                id='pay_mthd_3_div'
                style={{
                    height: "10%",
                    bottom: "0px",
                    position: "absolute",
                    display: "flex",
                    width: "100%",
                }}
            >
                <Button
                    id='btn_back'
                    style={{
                        width: "160px",
                        height: "32px",
                        marginLeft: "5.5%",
                        borderRadius: "15px",
                        fontSize: "14px",
                        fontFamily: "DM Sans",
                        lineHeight: "16px",
                        fontWeight: 500,
                    }}
                    variant='contained'
                    onClick={() => props.setStep("back")}
                    color='primary'
                >
                    Back
                </Button>
                <Button
                    id='btn_save_submit'
                    style={{
                        width: "220px",
                        height: "32px",
                        marginLeft: "3.5%",
                        borderRadius: "15px",
                        marginLeft: "3%",
                        fontSize: "14px",
                        fontFamily: "DM Sans",
                        lineHeight: "16px",
                        fontWeight: 500,
                    }}
                    onClick={()=> handleNext(true)}
                    variant='contained'
                    color='primary'
                >
                    Save & continue later
                </Button>
                <Button
                    id='btn_next'
                    style={{
                        width: "160px",
                        height: "32px",
                        marginLeft: "25%",
                        borderRadius: "15px",
                        marginLeft: "23%",
                        fontSize: "14px",
                        fontFamily: "DM Sans",
                        lineHeight: "16px",
                        fontWeight: 500,
                    }}
                    variant='contained'
                    onClick={() => handleNext()}
                    color='primary'
                >
                    Next
                </Button>
            </footer>
        </div>
    );
}
