const { v4: uuidV4 } = require("uuid");
const express = require("express");
const connnectDB = require("../../config/db");
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
        const query = "SELECT * FROM ProductUpload";
        connnectDB.query(query, (err, results, fields) => {
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
    const {
        user_id,
        business_id,
        product_id,
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
    console.log(
        product_name,
        product_description,
        category,
        product_category,
        product_subcategory,
        product_tags,
        product_listing,
        product_cost,
        product_image_link,
        product_video_link
    );
    const query = `INSERT INTO ProductUpload (user_id, business_id, product_id, product_name, product_description, category, product_category, product_subcategory, product_tags, product_listing, product_cost, product_image_link, product_video_link) VALUES('${user_id}', '${business_id}', '${product_id}','${product_name}', '${product_description}', '${category}', '${product_category}', '${product_subcategory}', '${product_tags}', '${product_listing}', '${product_cost}', '${product_image_link}', '${product_video_link}')`;

    connnectDB.query(query, (error, result, fields) => {
        if (error) res.send(error);
        if (result) res.json(result);
        if (fields) console.log(fields);
    });
});

// get request
// @path = /api/products/search
// @desc = use this path to pass a query for searching th DB based on that query
router.get("/search", async (req, res) => {
    const searchTerm = req.query.searchTerm;

    const query = `SELECT * FROM ProductUpload WHERE concat(product_name, product_description, product_subcategory, product_tags) LIKE '%${searchTerm}%'`;
    connnectDB.query(query, (error, result, fields) => {
        if (error) res.send(error);
        if (result) res.json(result);
        if (fields) console.log(fields);
    });
});

module.exports = router;
