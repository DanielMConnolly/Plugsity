const config = require("./config/config.json");
const stripe = require("stripe")(config.stripeTestSecret);
const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const { updateBusiness, connection } = require("./db");

// post request
// @route = /api/stripe/create-checkout-session
// @desc = create checkout session handled by Stripe API
router.post("/create-checkout-session", async (req, res) => {
    console.log("Hello I'm post req");
    const {
        product_id,
        product_name,
        image_link,
        quantity,
        product_cost,
        business_id,
        stripe_acct_id,
    } = req.body;

    console.log(
        product_id,
        product_name,
        image_link,
        quantity,
        product_cost,
        business_id,
        stripe_acct_id
    );
    let origin = req.headers.origin;

    // For development purposes ONLY
    if (origin.includes("localhost")) {
        origin = "http://localhost:3000";
    }
    console.log(origin);

    var plugsityAppFeeAmt =
        (config.plugsityCharge / 100) * (product_cost * 100);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product_name,
                        images: [image_link],
                    },
                    unit_amount: product_cost * 100,
                    // unit_amount: 10000,
                },
                quantity: quantity,
            },
        ],
        // This data will come after businesses have their own stripe connected accounts.
        // this would be setup when business register themselves on businesspages,
        payment_intent_data: {
            application_fee_amount: plugsityAppFeeAmt,
            transfer_data: {
                destination: stripe_acct_id,
            },
        },
        mode: "payment",
        success_url: `${origin}/order?success=true`,
        cancel_url: `${origin}/order?canceled=true`,
    });
    console.log(session);
    res.json({
        sessionId: session.id,
    });
});

// post request
// @route - /api/stripe/order/success
// @desc - Order success page and info
router.get("/order/success", async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(
        req.query.session_id
    );
    const customer = await stripe.customers.retrieve(session.customer);

    res.send(
        `<html><body><h1>Thanks for your order no: ${session}, ${customer.name}!</h1></body></html>`
    );
});

// post request
// @route - /api/stripe/onboard-user
// @desc - used to onboard a user and create their account on Stripe
router.post("/onboard-user", async (req, res) => {
    try {
        // account onboarding
        const { business_id } = req.body;
        const account = await stripe.accounts.create({ type: "express" });
        req.session.accountID = account.id;
        // console.log(req.session.accountID);
        console.log(account.id);
        console.log(business_id);
        console.log(req.headers);
        const dbresp = updateBusiness(business_id, {
            stripe_acct_id: account.id,
        });
        console.log("Update BusinessPage table: ", dbresp);
        let origin = req.headers.origin;

        // For development purposes ONLY
        if (origin.includes("localhost")) {
            origin = "http://localhost:3000";
        }
        console.log(origin);

        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${origin}/business_setup`,
            return_url: `${origin}/business_setup?step=4`,
            type: "account_onboarding",
        });
        // var accountLink = await stripe.accountLinks.create({
        //     account: account.id,
        //     refresh_url: `https://example.com/reauth`,
        //     return_url: `https://example.com/return`,
        //     type: "account_onboarding",
        // });
        console.log(accountLink);
        res.send({ url: accountLink });
        // res.redirect(accountLink.url);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// get request
// @route - /api/stripe/onboard-user/refresh
// @desc - used to redirect a user while onboarding if they need refresh
router.get("/onoard-user/refresh", async (req, res) => {
    if (!req.session.accountID) {
        res.redirect("/homepage");
        return;
    }
    try {
        const { accountID } = req.session;

        const origin = `${req.secure ? "https://" : "http://"}${
            req.headers.host
        }`;
        const accountLinkURL = await generateAccountLink(accountID, origin);
        res.redirect(accountLinkURL);
    } catch (err) {
        res.status(500).send({
            error: err.message,
        });
    }
});

const webhook_secret = "whsec_yMekpwcT8UXGt6KrNwFqUjeHEtg7nACA";

router.post("/webhook", (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(sig, webhook_secret);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        handleCompletedCheckoutSession(session);
    }
    res.json({ received: true });
});
const handleCompletedCheckoutSession = (session) => {
    // Fulfill the purchase.
    console.log(JSON.stringify(session));
};

function generateAccountLink(accountID, origin) {
    console.log("Inside generate account links function");
    console.log(origin);
    return stripe.accountLinks.create({
        type: "account_onboarding",
        account: accountID,
        refresh_url: `${origin}/onboard-user/refresh`,
        return_url: `${origin}/success.html`,
    });
}

router.post("/result-info", async (req, res) => {
    const data = req.body;
    console.log("Checkout Session request data: ", data);
});

module.exports = router;
