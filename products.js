const express = require("express");
const { connection} = require("./db");
const con = require('./db.js');
const router = express.Router();

/*
 TODO
 1. add authentication middleware which allows access to these routes only if the the user is logged in
 2. configure routes in such a way that only business users see the routes to create, edit and delete products
*/

// get request
// @route = /api/products/
// @desc lists all products
router.get("/", async (req, res) => {
    try {
        connection.query("USE Plugsity");
        const query = "SELECT * FROM ProductUpload";
        connection.query(query, (err, results, fields) => {
            if (err) throw err;
            return res.json(results);
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error!");
    }
});

// post request
// @route = /api/products/createProduct
// @desc query for creating a product
/**
 * product details needed which would be in the form
 * TODO:
 * 1. create a form and retrieve from the form data. (FIND A WAY)
 * 2. Allow only authorized users(business users and not customer users) to reach this route
 * user_id (obtained from current user signed in, authentication)
 * business_id (same as above)
 * product_id, unique id
 * Obtained from form :-
 * product_name, product_description, category, product_category, product_subcategory, product_tags,
 * product_listing, product_cost, product_image_link, product_video_link
 */
router.post("/createProduct", async (req, res) => {
    let keys = Object.keys(req.body);
    let values = Object.values(req.body).map(item => `'${item}'`);
    let insert_columns = keys.join(', ')
    let insert_values = values.join(', ');
    con.createProduct(insert_columns, insert_values)
    .then(result => {
        res.send({ 'product_id': result })
    });
});

// get request
// @path = /api/products/search
// @desc = use this path to pass a query for searching th DB based on that query
router.get("/search", async (req, res) => {
    connection.query("USE Plugsity");
    const searchTerm = req.query.searchTerm;

    const query = `SELECT * FROM ProductUpload WHERE concat(product_name, product_description, product_subcategory, product_category, product_tags) LIKE '%${searchTerm}%'`;
    connection.query(query, (error, result) => {
        if (error) res.send(error);
        if (result) res.json(result);
    });
});

// get request
// @path = /api/products/:id
// @desc = use this path to view a particular product based on ID.
router.get("/:id", async (req, res) => {
    connection.query("USE Plugsity");
    const product_id = req.params.id;
    const query = `SELECT * FROM ProductUpload WHERE product_id=${product_id}`;
    // const product = await getProduct(product_id);
    connection.query(query, (error, result) => {
        if (error) res.send(error);
        if (result) res.send(result);
    });
    // res.json(product);
});

// get request
// @path = /api/getProduct/:business_id
// @desc = use this path to view products of a particular business.
router.get("/getProduct/:business_id", async (req, res) => {
    connection.query("USE Plugsity");
    const business_id = req.params.business_id;

    const query = `SELECT * from ProductUpload WHERE business_id=${business_id}`;

    connection.query(query, (error, result) => {
        if (error) res.send(error);
        if (result) res.json(result);
    });
});

// put request
// @path = /api/editProduct/:product_id
// @desc = use this path to edit a product associated with the business
// there would be a middleware here that authenticates the business
router.put("/editProduct/:product_id", async (req, res) => {
    connection.query("USE Plugsity");
    const product_id = req.params.product_id;

    const {
        product_name,
        product_description,
        category,
        product_category,
        product_subcategory,
        product_tags,
        product_listing,
        product_cost,
        product_image_link,
        product_video_link,
    } = req.body;

    const query = `UPDATE ProductUpload SET product_name='${product_name}', product_description='${product_description}', category='${category}', product_category='${product_category}', product_subcategory='${product_subcategory}', product_tags='${product_tags}', product_listing='${product_listing}', product_cost='${product_cost}', product_image_link='${product_image_link}', product_video_link='${product_video_link}' WHERE product_id=${product_id}`;

    connection.query(query, (error, result) => {
        if (error) res.send(error);
        if (result) res.json(result);
    });
});

// delete request
// @path = /api/deleteProduct/:product_id
// @desc = use this path to delete a product associated with the business by the business
// there would be a middleware here that authenticates the business
router.delete("/deleteProduct/:product_id", async (req, res) => {
    connection.query("USE Plugsity");

    const product_id = req.params.product_id;

    const query = `DELETE From ProductUpload WHERE product_id=${product_id}`;

    connection.query(query, (error, result) => {
        if (error) res.send(error);
        if (result) res.json(result);
    });
});

module.exports = router;
