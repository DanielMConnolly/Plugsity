const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host : 'plugsity-dev.cuxrersyaold.us-east-2.rds.amazonaws.com',
    user : 'plugsityadmin',
    password : 'cse611devs',
    database : 'Plugsity'
});

db.connect();

app.get('/business', function(req,res){
var sql = 'SELECT * FROM BusinessPage';
db.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
});
});

app.post('/business', function(req, res){
	console.log(req.body); 
    var data = {user_id:req.body.user_id, legal_business_name:req.body.legal_business_name};
    var sql = 'INSERT INTO BusinessPage SET ?';
    db.query(sql, data, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send({
        status: 'success',
        no: null,
		user_id:req.body.user_id, 
        legal_business_name:req.body.legal_business_name
	});
});
});

app.listen(2000, ()=>{
    console.log('Server listening on 2000')
});