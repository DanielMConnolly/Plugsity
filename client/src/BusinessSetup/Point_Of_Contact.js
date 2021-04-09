import { React, useContext } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel } from '@material-ui/core';
import { multiStepContext } from './StepContext';
import { makeStyles } from '@material-ui/core/styles';
import Shape from '../assets/Shape.png';
import off_to_the_next_step from '../assets/Off_to_next_step.png';
import '../css/Business_Setup.css';

export default function Point_Of_Contact() {
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
        <div>

            <div id="pt_cntct_div_main" style={{ display: 'flex', marginTop: '2%' }}>

                <div style={{ float: 'left', width: '30%', height: '30%', fontFamily: 'DM Sans', border: '1px solid rgba(0, 0, 0, 0.07)', marginLeft: '6%', backgroundColor: '#F8F8F8'}}>

                    <img src={off_to_the_next_step} style={{ margin: '11px' }} alt="logo" />
                    <p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', paddingLeft: '10px' }}> This is section about who ,  this helps us know how we get in touch. </p>
                    <div style={{ fontSize: '14px', lineHeight: '16px', fontWeight: 700, marginLeft: '20px' }}>
                        
                        <p >Passport/Government ID </p>
                        <p >Proof of Address</p>
                    </div>
                    <div style={{ display: 'flex' }}><img src={Shape} alt="logo" /><p style={{ fontSize: '12px', lineHeight: '16px', textAlign: 'left', fontWeight: 400 }}>All information are safely encrypted and secured! </p>
                    </div></div>
                <div style={{ float: 'right', width: '70%', marginLeft: '8%', border: '1px solid rgba(0, 0, 0, 0.07)' }}>
                    <div id="pt_cntct_div_1" style={{display: 'flex'}}>
                        <div style={{ width: '30%',  marginLeft: '6%'}}>
                            <InputLabel id="label_bus_name" style={{ marginTop: '10px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>First legal Name *</InputLabel>
                            <TextField style={{ height: '8%' }} value={userData['bus_owner_f_name']} onChange={(e) => setUserData({ ...userData, "bus_owner_f_name": e.target.value })}  placeholder="First Name " margin="normal" variant="outlined" color="secondary" />
                        </div>
                        <div style={{ width: '30%', marginRight: '2%', marginLeft: '2%' }}>
                            <InputLabel id="label_tax_num" style={{ marginTop: '10px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Middle legal Name *</InputLabel>
                            <TextField style={{ height: '8%' }} value={userData['bus_owner_m_name']} onChange={(e) => setUserData({ ...userData, "bus_owner_m_name": e.target.value })}    placeholder="Middle Name " margin="normal" variant="outlined" color="secondary" />
                        </div>
                        <div style={{ width: '30%', marginRight: '5%' }}>
                            <InputLabel id="label_tax_num" style={{ marginTop: '10px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Last legal Name *</InputLabel>
                            <TextField style={{ height: '8%' }} value={userData['bus_owner_l_name']} onChange={(e) => setUserData({ ...userData, "bus_owner_l_name": e.target.value })}    placeholder="Last Name" margin="normal" variant="outlined" color="secondary" />
                        </div>
                    </div>
                    <div style={{marginRight: '5%' }}>
                        <InputLabel id="label_bus_pos" style={{ marginTop: '10px', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700, marginLeft: '6%' }}>Your position in the business</InputLabel>
                        <TextField id="txt_bus_pos" value={userData['bus_owner_position']} onChange={(e) => setUserData({ ...userData, "bus_owner_position": e.target.value })}   style={{ height: '8%', marginLeft: '6%', width: '94%' }} placeholder="CEO, Business owner, etc " margin="normal" variant="outlined" color="secondary" />
                    </div>

                    <div id="pt_cntct_div_2" style={{ width: '95%', display: 'flex', marginLeft: '4.5%' }} >
                        <div style={{ width: '30%' }}>
                            <InputLabel id="label" style={{ marginTop: '3%', marginBottom: '3%', marginLeft: '6%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Country of Citizenship</InputLabel>
                            <Select id="drpdwn_coc" value={userData['bus_owner_coc']} onChange={(e) => setUserData({ ...userData, "bus_owner_coc": e.target.value })} place holder="Country" variant="outlined" color="secondary" style={{
                                marginLeft: '6%', width : '100%'
                            }}>
                                <MenuItem value="1">USA </MenuItem>
                                <MenuItem value="2">India</MenuItem>
                            </Select>
                        </div>
                        <div style={{ width: '31%' }}>
                            <InputLabel id="label" style={{ marginLeft: '10%', marginTop: '3%', marginBottom: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Country of Birth</InputLabel>
                            <Select id="drpdwn_cob" value={userData['bus_owner_cob']} onChange={(e) => setUserData({ ...userData, "bus_owner_cob": e.target.value })}   style={{
                                marginLeft: '13%'
                            }} place holder="Currency" variant="outlined" color="secondary">
                                <MenuItem value="1">USA</MenuItem>
                                <MenuItem value="2">India</MenuItem>
                            </Select>
                        </div>
                        <div style={{ width: '30%' }}>
                            <InputLabel id="label" style={{ marginLeft: '18%', marginTop: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Date of Birth</InputLabel>
                            <TextField placeholder="mm/dd/yyyy" value={userData['bus_owner_dob']} onChange={(e) => setUserData({ ...userData, "bus_owner_dob": e.target.value })}  style={{ marginTop: '3%', marginLeft: '17%' }} variant="outlined" color="secondary" />
                        </div>
                    </div>

                    <div id="pt_cntct_div_4" style={{ marginLeft: '6%' }}>
                        <InputLabel id="label" style={{ marginTop: '4%', marginBottom: '4%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 700 }}>Passport / Government ID</InputLabel>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" style={{ marginBottom: '5%' }}> Upload</Button>
                        </label>

                    </div>

                </div>



            </div>
            <footer id="pt_cntct_div" style={{
                height: '10%', bottom: '0px',
                position: 'absolute', display: 'flex', width: '100%'
            }}>
                <Button id="btn_back" style={{ width: '160px', height: '32px', borderRadius: '15px', marginLeft: '3%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => setStep(2)} color="primary">Back</Button>
                <Button id="btn_save_submit" style={{ width: '220px', height: '32px', borderRadius: '15px', marginLeft: '4%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" color="primary">Save & continue later</Button>
                <Button id="btn_next" style={{ width: '160px', height: '32px', borderRadius: '15px', marginLeft: '20%', fontSize: '14px', fontFamily: 'DM Sans', lineHeight: '16px', fontWeight: 500 }} variant="contained" onClick={() => setStep(4)} color="primary">Next</Button>

            </footer>
        </div>
    );
}
