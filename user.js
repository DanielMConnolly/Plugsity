const express = require('express');
const router = express.Router();
const con = require('./db.js');

router.get('/check_if_business/:user_id', async (req, res, next) => {
  
    const user_id  = req.params.user_id;
    if (!user_id) {
        res.send("false");
    }
    else {
        await con.isUserABusiness(user_id).then(result => {
           res.send(result);
        }
        ).catch(err => console.log(err)
        );
    }
});

router.post('/myprofile', async (req,res,next) => {
    const user_id = req.body.user_id;
    const query = `SELECT first_name,last_name,created_at FROM Users WHERE user_id = '${user_id}'`;
    con.queryDatabase(query).then((result) => {
        res.send(result[0]);
        
    },(error) => {
        res.sendStatus(400);
    });

});


module.exports = router;