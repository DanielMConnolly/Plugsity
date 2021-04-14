const express = require('express');
const router = express.Router();
const con = require('./db.js');

router.get('/business', function (req, res) {
    con.getAllBusinesses().then(result => {
        res.send(result);
    })
});

router.get('/business_id/:user_id', (req, res) => {
    let user_id = req.params.user_id;
    con.getBusinessDataFromUserId(user_id).then(result=>{
        res.send(result);
    })

});

router.get('/getAllProducts/:business_id', (req, res)=> {
    let business_id = req.params.business_id;
    con.getProductsOfBusiness(business_id).then(result=>{
        res.send(result);
    })

})

module.exports = router;