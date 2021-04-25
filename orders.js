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

module.exports = router;
