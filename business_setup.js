const express = require("express");
const {connection} = require("./db");
const router = express.Router();

router.post("/business", async (req, res) => {
    console.log(req.body);
    if (Object.keys(req.body).includes("business_id")) {
        let business_id = req.body["business_id"]
        delete req.body["business_id"]
        connection.updateBusiness(business_id, req.body).then(result => {
            res.send({ 'business_id': result })
        });

    }
    else {
        let keys = Object.keys(req.body);
        let values = Object.values(req.body).map(item => `'${item}'`);
        let insert_columns = keys.join(', ')
        let insert_values = values.join(', ');
        connection.createBusiness(insert_columns, insert_values)
            .then(result => {
                res.send({ 'business_id': result })
            });
    }

})

router.get("/business/:business_id", async (req, res) => {
    const business_id = req.params.business_id;
    const query = `SELECT * FROM Plugsity.BusinessPage WHERE business_id = '${business_id}'`;
    connection.query(query, (error, results) => {
        if (error) res.send(error)
        if (results) res.json(results)

    })
})

router.get("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const query = `SELECT * FROM Plugsity.ProductMediaReview WHERE user_id = '${user_id}'`;
    connection.query(query, (error, results) => {
        if (error) res.send(error)
        if (results) res.json(results)

    })
})

router.get("/reviews/:business_id", async (req, res) => {
    const business_id = req.params.business_id
    const query = `SELECT * FROM Plugsity.ProductMediaReview WHERE business_id = '${business_id}'`;
    connection.query(query, (error, results) => {
        if (error) res.send(error)
        if (results) res.json(results)

    })
})





module.exports = router;
