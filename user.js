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
            if (result) {
                res.send("true")
            }
            else {
                res.send("false");
            }
        }
        ).catch(err => console.log(err)
        );
    }
});


module.exports = router;