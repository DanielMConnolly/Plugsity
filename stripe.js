const stripe = require("stripe")(
    "sk_test_51IcxTdA5vPOiaFdd1YyfvNR4hswZD8La8GRFln8xOS2awO1PreetSAUAyA41OrvBjvT5olGA9OzKcfdOp3u9sFPR00nqKMtN4B"
);
const express = require("express");
const router = express.Router();

// post request
// @route = /api/stripe/create-checkout-session
// @desc = create checkout session handled by Stripe API
router.post("/create-checkout-session", async (req, res) => {
    console.log("Hello I'm post req");
    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ["card"],
    //     line_items: [
    //         {
    //             price_data: {
    //                 currency: "usd",
    //                 product_data: {
    //                     name: "T-shirt",
    //                 },
    //                 unit_amount: 2000,
    //             },
    //             quantity: 1,
    //         },
    //     ],
    //     mode: "payment",
    //     success_url: "https://example.com/success",
    //     cancel_url: "https://example.com/cancel",
    // });

    // res.json({ id: session.id });
    const {
        product_id,
        product_name,
        image_link,
        quantity,
        product_cost,
    } = req.body;

    console.log(product_id, product_name, image_link, quantity, product_cost);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product_name,
                    },
                    unit_amount: product_cost * 100,
                    // unit_amount: 10000,
                },
                quantity: quantity,
            },
        ],
        // This data will come after businesses have their onw stripe connected accounts.
        // this would be setup when business register themselves on businesspages, kiran's part
        // payment_intent_data: {
        //     application_fee_amount: product_cost,
        //     transfer_data: {
        //         destination: account,
        //     },
        // },
        mode: "payment",
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
    });
    console.log(session);
    res.json({
        sessionId: session.id,
    });
});

// post request
// @route - /api/stripe/onboard-user
// @desc - used to onboard a user and create their account on Stripe
router.post("/onboard-user", async (req, res) => {
    try {
        // account onboarding
        const account = await stripe.accounts.create({ type: "express" });
        // req.session.accountID = account.id;
        // console.log(req.session.accountID);
        console.log(account.id);

        console.log(req.headers);

        var origin = `${req.headers.origin}`;

        if (!req.headers.origin) {
            origin = "http://localhost:5000/";
        }

        // const accountLink = await generateAccountLink(account.id, origin);
        console.log(origin);
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${origin}onboard`,
            return_url: `${origin}/`,
            type: "account_onboarding",
        });
        // var accountLink = await stripe.accountLinks.create({
        //     account: account.id,
        //     refresh_url: `https://example.com/reauth`,
        //     return_url: `https://example.com/return`,
        //     type: "account_onboarding",
        // });
        console.log(accountLink);
        // res.send({ url: accountLink });
        res.redirect(accountLink.url);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// get request
// @route - /api/stripe/onboard-user/refresh
// @desc - used to redirect a user while onboarding if they need refresh
// router.get("/onoard-user/refresh", async (req, res) => {
//     if (!req.session.accountID) {
//         res.redirect("/homepage");
//         return;
//     }
//     try {
//         const { accountID } = req.session;

//         const origin = `${req.secure ? "https://" : "http://"}${
//             req.headers.host
//         }`;
//         const accountLinkURL = await generateAccountLink(accountID, origin);
//         res.redirect(accountLinkURL);
//     } catch (err) {
//         res.status(500).send({
//             error: err.message,
//         });
//     }
// });

// function generateAccountLink(accountID, origin) {
//     console.log("Inside generate account links function");
//     console.log(origin);
//     return stripe.accountLinks.create({
//         type: "account_onboarding",
//         account: accountID,
//         refresh_url: `${origin}/onboard-user/refresh`,
//         return_url: `${origin}/success.html`,
//     });
// }

module.exports = router;
