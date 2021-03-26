const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config()


const con = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    port: process.env.PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

//updates or registers user_id in the token table
//return a promise of a token
// resolve is only implemented and returns a callback token
function createToken(user_id) {
    return new Promise((resolve, reject) => {
        let token_to_be_returned = 0;
        con.connect(function(err) {
            con.query('USE Plugsity');
            let did_find = true;
            //const queryFind = `SELECT user_token FROM UserToken WHERE user_id = '${user_id}'`;
            const queryFind = `SELECT dummyid FROM dummyUserToken WHERE dummyid = '${user_id}'`;
            con.query(queryFind, function (err, result, fields) {
                if (err) console.log(err);
                if (result.length > 0) {
                    did_find = true;
                }else{
                    did_find = false;
                }
                //TODO: fix tokenizer
                //token_to_be_returned = Math.floor(Math.random() * 2^20);
                token_to_be_returned = require('crypto').randomBytes(10).toString('hex')
                console.log(`token is ${token_to_be_returned}`);
                console.log(`user id is ${user_id}`);
                let queryUpdate = "";
                if (did_find == true){
                    //queryUpdate = `UPDATE UserToken SET user_token = '${token_to_be_returned}' WHERE user_id = '${user_id}'`
                    queryUpdate = `UPDATE dummyUserToken SET dummyToken = '${token_to_be_returned}' WHERE dummyid = '${user_id}'`;
                }else{
                    //queryUpdate = `INSER INTO user_token (user_token, user_id) VALUES ('${token_to_be_returned}', '${user_id}')`
                    queryUpdate = `INSERT INTO dummyUserToken (dummyid, dummyToken) VALUES ('${user_id}', '${token_to_be_returned}')`;
                }
                con.query(queryUpdate, function (err, result, feilds) {
                    if (err) console.log(err);
                    resolve(token_to_be_returned);
                });
            }); 
        });
    });
}

//returns a promise for when the token is correct
//resolve is when token is varified
//reject is when token is garbo
function tokenVarification(user_id,token){
    return new Promise((resolve, reject) => {
        con.connect(function(err) {
            con.query('USE Plugsity');
            //const query = `SELECT user_token FROM UserToken WHERE user_id = '${user_id}'`;
            const query = `SELECT dummyToken FROM dummyUserToken WHERE dummyid = '${user_id}'`;
            con.query(query, function (err, result, feilds) {
                console.log("trying to get a query, this is our result:", result)
                console.log(result[0].dummyToken)
                console.log(token)
                //TODO: change type??
                console.log("the answer is ",token == result[0].dummyToken);
                if (token == result[0].dummyToken){
                    resolve();
                }else{
                    reject();
                }
            });
        });
    });
}

//used for signin
const addUser = (res, firstname, lastname, email, password) => {
    con.connect(function (err) {
        con.query('USE Plugsity');
        let email_ok = true;
        const query = `SELECT email_address FROM Users WHERE email_address = '${email}'`;
        con.query(query, function (err, result, fields) {
            if (err) console.log(err);
            if (result.length > 0) {
                email_ok = false;
                res.status(409);
            }
        })
        if (email_ok) {
            con.query(`INSERT INTO Users (email_address, first_name, last_name, user_password) VALUES ('${email}', '${firstname}', '${lastname}', '${password}')`, function (err, result, fields) {
                if (err) { 
                    console.log(err); res.send(err) 
                }else if (result) { 
                    createToken(result[0].user_id).then(function(tokenRes){
                        res.send({ firstName: firstname, lastName: lastname, email: email, password: password, token:tokenRes }); 
                    });//end of create token
                }
                if (fields) console.log(fields);
            });
        }
    });
}

//used for login
const getUser = (res, email, password) => {
    con.connect(function (err) {
        con.query('USE Plugsity');
        const query = `SELECT * FROM Users WHERE (email_address = '${email}' AND user_password = '${password}')`;
        con.query(query, function (err, result, fields) {
            if (err) {console.log(err); res.send(err);}
            if (result.length > 0) {
                createToken(result[0].user_id).then(function(tokenRes){
                    tokenVarification(result[0].user_id,tokenRes).then(function(){//resolve
                        console.log("token varified");
                    }, function(){//reject
                        console.log("token no varified");
                    });
                    res.send({token:tokenRes});
                });//end of create token
            }else{
                //passwords are different or email is noneexistant
                console.log("there does not exist a query")
                res.sendStatus(409);
            }
        })
    });

}

const addReview = (video_name, user_id, review_rating, product_id) => {
    con.connect(function (err) {
        con.query('USE Plugsity');
        const query = `INSERT INTO ProductMediaReview (user_id, review_rating, product_video_link, product_id) VALUES (${user_id}, ${review_rating}, '${video_name}', ${product_id})`;
        con.query(query, function (err, result, fields) {
            if (err) { console.log(err) }
            else if (result) {
                console.log(result);
            }
        }
        );

    });
}

const getReviews = async (callback) => {
    return new Promise((resolve, reject) => {
        con.connect(function (err) {
            con.query('USE Plugsity');
            const query = "SELECT product_video_link FROM ProductMediaReview WHERE processing_status = 'Ready' ";
            let videos_to_render = [];
            let x = con.query(query, function (err, result, fields) {
                if (err) { console.log(err) }
                else if (result) {
                    resolve(result);
                }
            }
            );
        });
    })

}

const setVideoComplete = (id)=>{
    con.connect(function (err) {
        con.query('USE Plugsity');
        const query = `UPDATE ProductMediaReview SET processing_status = 'Ready' WHERE product_video_link = "${id}"`;
        console.log(query);
        con.query(query, function (err, result, fields) {
            if (err) { console.log(err) }
            else if (result) {
                console.log(result);
            }
        }
        );

    });

}




exports.addUser = addUser;
exports.getUser = getUser;
exports.addReview = addReview;
exports.getReviews = getReviews;
exports.setVideoComplete = setVideoComplete;
exports.connection = con;