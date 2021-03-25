const express = require('express');
const router = express.Router();
const con = require('./db.js')
/* Create a new User (register). */
router.post('/signup', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const {email, password, firstName, lastName} = req.body;
  console.log("signup has occurred");
  con.addUser(res, firstName, lastName, email, password);

});

router.post('/login', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const {email, password} = req.body;
  console.log(email," logged in");
  con.getUser(res, email, password);
  console.log()
  
});

module.exports = router;
