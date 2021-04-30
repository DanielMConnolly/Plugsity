const express = require("express");
const router = express.Router();
const { connection } = require("./db");

// get request
// @route - /api/orders/:user_id
// @desc - this route gives all orders of the user
router.get("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    connection.query("USE Plugsity");
    const query = `SELECT * FROM OrderHistory WHERE user_id=${user_id} ORDER BY order_id DESC`;
    connection.query(query, (error, results) => {
        if (error) console.log;
        if (results) res.json(results);
    });
});

// post request
// @route - /api/orders/create
// @desc - this route creates an order when a customer checkouts
router.post("/create", async (req, res) => {
    const { user_id, business_id, product_id } = req.body;
    connection.query("USE Plugsity");
    const timestamp = Math.floor(Date.now() / 1000);
    const query = `INSERT INTO OrderHistory (user_id, business_id, product_id, order_date) VALUES ('${user_id}', '${business_id}', '${product_id}', '${timestamp}')`;
    connection.query(query, (error, results) => {
        if (error) console.log(error);
        if (results) res.json(results);
    });
});

// get request
// @route - /api/orders/business/:business_id
// @desc - this route gives all pending orders for a business
router.get("/business/pending/:business_id", async (req, res) => {
    const business_id = req.params.business_id;
    connection.query("USE Plugsity");
    const query = `SELECT * FROM OrderHistory WHERE business_id=${business_id} AND order_status !='Completed'`;

    connection.query(query, (error, results) => {
        if (error) console.log(error);
        if (results) res.json(results);
    });
});

// get request
// @route - /api/orders/business/:business_id
// @desc - this route gives all completed orders for a business
router.get("/business/completed/:business_id", async (req, res) => {
    const business_id = req.params.business_id;
    connection.query("USE Plugsity");
    const query = `SELECT * FROM OrderHistory WHERE business_id=${business_id} AND order_status='Completed'`;

    connection.query(query, (error, results) => {
        if (error) console.log(error);
        if (results) res.json(results);
    });
});

// get request
// @route - /api/orders/user/:user_id
// @desc - this route gives first name, last name and email for a user
router.get("/user/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    connection.query("USE Plugsity");

    const query = `SELECT first_name, last_name, email_address FROM Users WHERE user_id=${user_id}`;
    connection.query(query, (error, results) => {
        if (error) console.log(error);
        if (results) res.json(results);
    });
});

// get request
// @route - /api/orders/product/details/:product_id
// @desc - this route gives product name and product cost of a specific product
router.get("/product/details/:product_id", async (req, res) => {
    const product_id = req.params.product_id;
    connection.query("USE Plugsity");
    const query = `SELECT product_name, product_cost FROM ProductUpload WHERE product_id=${product_id}`;

    connection.query(query, (error, results) => {
        if (error) console.log(error);
        if (results) res.json(results);
    });
});

// post request
// @route - /api/orders/changeStatus/:order_id/:status
// @desc - this route is used to change the order_status of an order to status
router.post("/changeStatus/:order_id/:status", async (req, res) => {
    const order_id = req.params.order_id;
    const status = req.params.status;
    connection.query("USE Plugsity");
    const query = `UPDATE OrderHistory SET order_status='${status}' WHERE order_id=${order_id}`;
    connection.query(query, (error, results) => {
        if (error) console.log(error);
        if (results) res.json(results);
    });
});

module.exports = router;
