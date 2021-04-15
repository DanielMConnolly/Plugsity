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
import { makeStyles } from "@material-ui/core/styles";
import Shape from "../assets/Shape.png";
import "../css/Business_Setup.css";
import ConnectWithStripe from "../ConnectWithStripe";

export default function PaymentMethods(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            "& > *": {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: "none",
        },
    }));

    const handleNext = () => {
        props.setStep(4);
    };

    const classes = useStyles();
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
                        <FormControl
                            component='fieldset'
                            style={{
                                marginTop: "3%",
                                width: "100%",
                            }}
                        >
                            <FormLabel
                                component='legend'
                                style={{
                                    marginLeft: "1%",
                                    width: "100%",
                                    fontSize: "14px",
                                    fontFamily: "DM Sans",
                                    lineHeight: "16px",
                                    fontWeight: 700,
                                }}
                            >
                                How to receive funds?{" "}
                            </FormLabel>
                            <RadioGroup
                                aria-label='recv_funds'
                                name='recv_funds'
                                value={props.userData["rcv_funds"]}
                                onChange={(e) =>
                                    props.setUserData({
                                        ...props.userData,
                                        rcv_funds: e.target.value,
                                    })
                                }
                                style={{ width: "100%", marginLeft: "1%" }}
                                row
                            >
                                <FormControlLabel
                                    value='bank_account'
                                    control={<Radio />}
                                    label='Stripe'
                                />
                                <FormControlLabel
                                    value='cc_db'
                                    control={<Radio />}
                                    label='Credit Card /Debit Card'
                                />
                                <FormControlLabel
                                    value='square'
                                    control={<Radio />}
                                    label='Square'
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div
                        id='pay_mthd_3_div_2'
                        style={{ display: "block", marginLeft: "6%" }}
                    >
                        <InputLabel
                            id='label'
                            style={{
                                marginTop: "2%",
                                width: "95%",
                                marginBottom: "3%",
                                fontSize: "14px",
                                fontFamily: "DM Sans",
                                lineHeight: "16px",
                                fontWeight: 700,
                            }}
                        >
                            Paypal Email Address
                        </InputLabel>

                        <TextField
                            style={{ height: "8%", width: "93.5%" }}
                            value={props.userData["paypal_email"]}
                            onChange={(e) =>
                                props.setUserData({
                                    ...props.userData,
                                    paypal_email: e.target.value,
                                })
                            }
                            placeholder='Email Address'
                            variant='outlined'
                            color='secondary'
                        />
                    </div>
                    <div>
                        <Button
                            id='btn_cnnctPP'
                            style={{
                                marginBottom: "4%",
                                width: "160px",
                                height: "32px",
                                borderRadius: "15px",
                                marginLeft: "70%",
                                marginTop: "3%",
                                fontSize: "14px",
                                fontFamily: "DM Sans",
                                lineHeight: "16px",
                                fontWeight: 500,
                            }}
                            variant='contained'
                            color='primary'
                        >
                            Connect Stripe
                        </Button>
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
                    onClick={() => props.setStep(2)}
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
