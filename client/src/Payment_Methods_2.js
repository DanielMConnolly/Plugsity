import { React, useContext } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormLabel, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { multiStepContext } from './StepContext';
import { makeStyles } from '@material-ui/core/styles';
import Shape from './Shape.png';
import off_to_the_next_step from './Off_to_next_step.png';
import './css/Business_Setup.css';

export default function Point_Of_Contact_2() {
    const { setStep, userData, setUserData } = useContext(multiStepContext);
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
    return (
        <div style={{width : '60%'}}>

            <div id="pt_cntct_2_div_main" style={{ display: 'flex', marginTop: '2%', width: '100%' ,marginLeft: '5%'}}>

                <div style={{ float: 'left', width: '25%', height: '30%', fontFamily: 'DM Sans', border: '1px solid rgba(0, 0, 0, 0.07)', marginLeft: '5%', backgroundColor: '#F8F8F8' }}>

                    <p style={{ fontSize: '16px', lineHeight: '24px', textAlign: 'left', fontWeight: 500, paddingLeft: '10px' }}>Let's talk a little about payments $$$ </p>
                    <p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', paddingLeft: '10px' }}> We don't store your payments Information, we are using strip to handle our payments, we trust it and we hope you do too. </p>
                    <div style={{ fontSize: '14px', lineHeight: '16px', fontWeight: 700, marginLeft: '20px' }}>
                        
                        <p>LOL </p>
                        <p>How to receive funds</p>
                    </div>
                    <div style={{ display: 'flex' }}><img src={Shape} alt="logo" /><p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', fontWeight: 400 }}>All information are safely encrypted and secured! </p>
                    </div></div>
                <div style={{ float: 'right', width: '70%', marginLeft: '7%', border: '1px solid rgba(0, 0, 0, 0.07)' }}>
                    <div id="pt_cntct_3_div_1" style={{ display: 'flex', width: '95%'}}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Billing method</FormLabel>
                            <RadioGroup aria-label="billing_method" value={userData['bill_method']} onChange={(e) => setUserData({ ...userData, "bill_method": e.target.value })}   name="billing_method" row>
                                <FormControlLabel value="bank_account" control={<Radio />} label="Bank Account" />
                                <FormControlLabel value="cc_db" control={<Radio />} label="Credit Card /Debit Card" />
                            </RadioGroup>
                        </FormControl>
                    </div>

                    <div id="pt_cntct_3_div_2" style={{ width: '95%', display: 'flex', marginLeft: '4.5%' }} >
                        <TextField style={{ height: '8%', width: '100%' }} value={userData['bank_name']} onChange={(e) => setUserData({ ...userData, "bank_name": e.target.value })}  placeholder="Bank name" margin="normal" variant="outlined" color="secondary" />
                    </div>
                    <div id="pt_cntct_3_div_3" style={{ width: '95%', display: 'flex', marginLeft: '4.5%' }} >
                        <TextField style={{ height: '8%', width: '100%' }} value={userData['bank_acc']} onChange={(e) => setUserData({ ...userData, "bank_acc": e.target.value })}  placeholder="Bank account No." margin="normal" variant="outlined" color="secondary" />
                    </div>
                    <div id="pt_cntct_3_div_4" style={{ width: '95%', display: 'flex', marginLeft: '4.5%' }} >
                        <TextField style={{ height: '8%', width: '100%' }} value={userData['bank_add']} onChange={(e) => setUserData({ ...userData, "bank_add": e.target.value })}  placeholder="Bank Address" margin="normal" variant="outlined" color="secondary" />
                    </div>

                    <div id="pt_cntct_3_div_5" style={{ width: '95%', display: 'flex', marginLeft: '4.5%' }} >
                        <Select id="drpdwn_city" value={userData['bank_city']} onChange={(e) => setUserData({ ...userData, "bank_city": e.target.value })} place holder="City" variant="outlined" color="secondary" style={{
                            marginLeft: '6%', width: '100%'
                        }}>
                            <MenuItem value="1">Buffalo </MenuItem>
                            <MenuItem value="2">NYC</MenuItem>
                        </Select>
                        <TextField style={{ height: '8%', width: '100%' }} value={userData['bank_state']} onChange={(e) => setUserData({ ...userData, "bank_state": e.target.value })}  placeholder="State" margin="normal" variant="outlined" color="secondary" />
                    </div>

                    <div id="pt_cntct_3_div_6" style={{ marginLeft: '6%' }}>
                        
                        <TextField style={{ height: '8%', width: '100%' }} value={userData['aba_rout_num']} onChange={(e) => setUserData({ ...userData, "aba_rout_num": e.target.value })} placeholder="ABA Routing No." margin="normal" variant="outlined" color="secondary" />
                    </div>

                </div>



            </div>
            <footer id="pt_cntct_3_div" style={{
                height: '10%', bottom: '0px',
                position: 'absolute', display: 'flex', width: '100%'
            }}>
                <Button id="btn_back" style={{ width: '160px', height: '32px', borderRadius: '15px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => setStep(5)} color="primary">Back</Button>
                <Button id="btn_save_submit" style={{ width: '220px', height: '32px', borderRadius: '15px', marginLeft: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" color="primary">Save & continue later</Button>
                <Button id="btn_next" style={{ width: '160px', height: '32px', borderRadius: '15px', marginLeft: '23%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => setStep(7)} color="primary">Next</Button>

            </footer>
        </div>
    );
}
