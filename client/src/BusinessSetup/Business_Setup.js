import React, { Component } from "react";
import "../App.css";
import { useState, useEffect } from "react";
import Bus_Identification_1 from "./Bus_Identification_1";
import Bus_Identification_2 from "./Bus_Identification_2";
import Point_Of_Contact from "./Point_Of_Contact";
import Point_Of_Contact_2 from "./Point_Of_Contact_2";
import PaymentMethods from "./PaymentMethods";
import Business_Policies from "./ShippingPolicies";
import Header from "../Header";
import AltHeader from "../AltHeader";
import { Stepper, StepLabel, Step } from "@material-ui/core";
import "../css/Stepper.css";
import "../css/Business_Setup.css";
import { Redirect } from "react-router-dom";
import {
    getBusinessDataFromUser,
    isUserABusiness,
    createOrUpdateBusiness,
} from "../Utils/ApiCalls";
import ShippingPolicies from "./ShippingPolicies";

class Business_Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: { user_id: localStorage.getItem("user_id") },
            currentStep: 1,
            redirectToLogin: false,
        };
    }
    setStep(mode) {
        let currentStep = this.state.currentStep;
        if (Number.isInteger(mode)) {
            this.setState({
                currentStep: mode,
            });
        } else {
            switch (mode) {
                case "next":
                    console.log(currentStep + 1);
                    this.setState({
                        currentStep: currentStep + 1,
                    });
                    break;
                case "back":
                    this.setState({
                        currentStep: this.state.currentStep - 1,
                    });
                    break;
                case "exit":
                    this.setState({
                        currentStep: 6,
                    });
                    break;
            }
        }
    }
    setUserData(data) {
        this.setState({
            userData: data,
        });
    }

    queryParams() {
        const query = new URLSearchParams(window.location.search);
        if (query.get("step")) {
            let redirectStep = parseInt(query.get("step"));
            if (redirectStep <= 5 && redirectStep > 0) {
                this.setStep(redirectStep);
            } else {
                this.setStep(1);
            }
        }
    }

    componentDidMount() {
        this.queryParams();
        const user_id = localStorage.getItem("user_id");
        isUserABusiness(user_id).then((is_user_a_business) => {
            if (is_user_a_business) {
                getBusinessDataFromUser(user_id).then((data) => {
                    this.setState({ userData: data });
                    localStorage.setItem("business_id", data.business_id);
                });
            }
        });
    }

    showStep(step) {
        switch (step) {
            case 1:
                return (
                    <Bus_Identification_1
                        userData={this.state.userData}
                        setUserData={this.setUserData.bind(this)}
                        setStep={this.setStep.bind(this)}
                    />
                );
            case 2:
                return (
                    <Bus_Identification_2
                        userData={this.state.userData}
                        setUserData={this.setUserData.bind(this)}
                        setStep={this.setStep.bind(this)}
                        updateBusiness={() => {
                            console.log(this.state.userData);
                            createOrUpdateBusiness(this.state.userData);
                        }}
                    />
                );
            case 3:
                return (
                    <PaymentMethods
                        userData={this.state.userData}
                        setUserData={this.setUserData.bind(this)}
                        setStep={this.setStep.bind(this)}
                    />
                );
            case 4:
                return (
                    <ShippingPolicies
                        userData={this.state.userData}
                        setUserData={this.setUserData.bind(this)}
                        setStep={this.setStep.bind(this)}
                    />
                );

            case 5:
                return (
                    <Point_Of_Contact_2
                        userData={this.state.userData}
                        setUserData={this.setUserData.bind(this)}
                        setStep={this.setStep.bind(this)}
                    />
                );
            case 6:
                return <Redirect to='/homepage' />;
        }
    }

    render() {
        if (!localStorage.hasOwnProperty("user_id")) {
            return <Redirect to='/' />;
        }

        return (
            <div className='App'>
                <header style={{ width: "100%" }}>
                    <AltHeader />
                    <div style={{ marginLeft: "13%" }}>
                        <p
                            style={{
                                fontSize: "26px",
                                lineHeight: "48px",
                                textAlign: "left",
                                fontFamily: "DM Sans",
                                fontWeight: 700,
                            }}
                        >
                            Let's get started!
                        </p>
                    </div>
                    <div style={{ marginLeft: "13%" }}>
                        <p
                            style={{
                                fontSize: "16px",
                                lineHeight: "24px",
                                textAlign: "left",
                                fontFamily: "DM Sans",
                                fontWeight: 700,
                            }}
                        >
                            Tell us about you and your Business
                        </p>
                    </div>
                </header>

                <Stepper
                    style={{ width: "65%" }}
                    activeStep={this.state.currentStep - 1}
                    orientation='horizontal'
                >
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                    <Step>
                        <StepLabel></StepLabel>
                    </Step>
                </Stepper>
                {this.showStep(this.state.currentStep)}
            </div>
        );
    }
}

export default Business_Setup;
