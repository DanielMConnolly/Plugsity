const express = require("express");
const con = require("./db");
const router = express.Router();

router.post("/business", async (req, res) => {
    console.log(req.body);
    if (Object.keys(req.body).includes("business_id")) {
        let business_id = req.body["business_id"]
        delete req.body["business_id"]
        con.updateBusiness(business_id, req.body).then(result => {
            res.send({ 'business_id': result })
        });

    }
    else {
        let keys = Object.keys(req.body);
        let values = Object.values(req.body).map(item => `'${item}'`);
        let insert_columns = keys.join(', ')
        let insert_values = values.join(', ');
        con.createBusiness(insert_columns, insert_values)
            .then(result => {
                res.send({ 'business_id': result })
            });
    }

})

module.exports = router;
