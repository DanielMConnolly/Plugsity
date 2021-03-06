const express = require('express');
const router = express.Router();
const con = require('./db.js')
/* Create a new User (register). */
router.post('/signup', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const {email, password, firstName, lastName} = req.body;

   con.addUser(res, firstName, lastName, email, password);

});

module.exports = router;
