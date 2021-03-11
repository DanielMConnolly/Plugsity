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

app.get('/customers', function(req,res){
var sql = 'SELECT * FROM UserProfile';
db.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
});
});

app.post('/customers', function(req, res){
	console.log(req.body); 
    var data = {profile_id:req.body.profile_id, profile_photo_link:req.body.profile_photo_link, profile_name:req.body.profile_name, about_me:req.body.about_me, user_id:req.body.user_id};
    var sql = 'INSERT INTO UserProfile SET ?';
    db.query(sql, data, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send({
        status: 'success',
        no: null,
		profile_id:req.body.profile_id, 
        profile_photo_link:req.body.profile_photo_link, 
        profile_name:req.body.profile_name, 
        about_me:req.body.about_me, 
        user_id:req.body.user_id
	});
});
});

app.listen(5000, ()=>{
    console.log('Server listening on 5000')
});