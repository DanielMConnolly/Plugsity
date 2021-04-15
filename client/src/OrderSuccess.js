import React, { Component, useState, useEffect, Fragment } from "react";
import axios from "axios";
import Header from "./Header";
const OrderSuccess = () => {
    const [success, setSuccess] = useState("");

    const [sessionID, setSessionID] = useState(null);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setSuccess(true);
            setSessionID(query.get("session_id"));
        }

        if (query.get("canceled")) {
            setSuccess(false);
            setSessionID(query.get("session_id"));
        }
    }, []);

    // return success ? (
    //     <div> Your order {sessionID} has been placed successfully</div>
    // ) : (
    //     <div>Your order was not successful</div>
    // );
    return success ? (
        <Fragment>
            <Header />
            <div>Your order {sessionID} has been placed successfully</div>
        </Fragment>
    ) : (
        <Fragment>
            <Header />
            <div>Your order was not placed</div>
        </Fragment>
    );
};

export default OrderSuccess;
