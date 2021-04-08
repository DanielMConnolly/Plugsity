const express = require('express');
const router = express.Router();
const con = require('./db.js')
/* Create a new User (register). */
router.post('/signup', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const {email, password, firstName, lastName} = req.body;
  con.addUser(res, firstName, lastName, email, password);

});

router.post('/login', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const {email, password} = req.body;
  con.authenticateUser(res, email, password);
});

router.post('/logout', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  const {token, user_id} = req.body;
  con.logout(res, token, user_id);
});

module.exports = router;
