const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const config = require("./config/config.json");

const smtpTransport = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: "support@plugsity.com",
        pass: config.supportPassword,
    },
    secure: true,
});

router.post("/create-email", async (req, res) => {
    // get data from the req.body
    const {
        user_email_address,
        user_name,
        user_order_id,
        product_name,
        product_cost,
    } = req.body;
    console.log("sending email");
    // setup e-mail data with unicode symbols
    let cost = 45;
    const mailOptions = {
        from: "support@plugsity.com", // sender address
        to: user_email_address, // list of receivers
        subject: "Plugsity Order Status Update", // Subject line
        html: `<h3> Order ID:- ${user_order_id}</h3> 
        Hi ${user_name},
        Your order ${product_name} order status has been updated on Plugsity!`, // html body
    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message Sent: ", info);
        }
    });

    return res.status(200).json({
        status: "success",
    });
});

module.exports = router;
