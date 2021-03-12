const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config()


const con = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    port: process.env.PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});


const addUser = (res, firstname, lastname, email, password) => {
    con.connect(function (err) {
        con.query('USE Plugsity');
        const query = `SELECT email_address FROM Users WHERE email_address = '${email}'`;
        con.query(query, function(err, result, fields){
            if(err) console.log(err);
            if(result.length>0){    
                res.send({error: "email exists"})
            } 
        })
        con.query(`INSERT INTO Users (email_address, first_name, last_name, user_password) VALUES ('${email}', '${firstname}', '${lastname}', '${password}')`, function (err, result, fields) {
          if (err) res.send(err);
          else if (result) res.send({ firstName: firstname, lastName: lastname, email: email, password: password });
          if (fields) console.log(fields);
        });
      });
  
}





exports.addUser = addUser;

exports.connection = con;