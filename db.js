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
        con.connect(function (err) {
            con.query('USE Plugsity');
            let did_find = true;
            //const queryFind = `SELECT user_token FROM UserToken WHERE user_id = '${user_id}'`;
            const queryFind = `SELECT dummyid FROM dummyUserToken WHERE dummyid = '${user_id}'`;
            con.query(queryFind, function (err, result, fields) {
                if (err) console.log(err);
                if (result.length > 0) {
                    did_find = true;
                } else {
                    did_find = false;
                }
                //TODO: fix tokenizer
                //token_to_be_returned = Math.floor(Math.random() * 2^20);
                token_to_be_returned = require('crypto').randomBytes(10).toString('hex')
                let queryUpdate = "";
                if (did_find == true) {
                    //queryUpdate = `UPDATE UserToken SET user_token = '${token_to_be_returned}' WHERE user_id = '${user_id}'`
                    queryUpdate = `UPDATE dummyUserToken SET dummyToken = '${token_to_be_returned}' WHERE dummyid = '${user_id}'`;
                } else {
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
//reject is when token is 
function tokenVarification(user_id, token) {
    return new Promise((resolve, reject) => {
        con.connect(function (err) {
            con.query('USE Plugsity');
            //const query = `SELECT user_token FROM UserToken WHERE user_id = '${user_id}'`;
            const query = `SELECT dummyToken FROM dummyUserToken WHERE dummyid = '${user_id}'`;
            con.query(query, function (err, result, feilds) {
                if (token == result[0].dummyToken) {
                    resolve();
                } else {
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
            if (email_ok) {
                con.query(`INSERT INTO Users (email_address, first_name, last_name, user_password) VALUES ('${email}', '${firstname}', '${lastname}', '${password}')`, function (err, r, fields) {
                    if (err) {
                        console.log(err); res.send(err);
                    } else if (r) {
                        con.query(`SELECT user_id FROM Users WHERE email_address = '${email}';`, function (err, result, fields) {
                            if (err) {
                                console.log(err); res.send(err);
                            } else if (result) {
                                createToken(result[0].user_id).then(function (tokenRes) {
                                    res.send({ firstName: firstname, lastName: lastname, email: email, password: password, token: tokenRes, user_id: result[0].user_id });
                                });//end of create token
                            }
                            if (fields) console.log(fields);
                        });
                    }
                    if (fields) console.log(fields);
                });
            }
        });
    });
}

//used for login
const authenticateUser = (res, email, password) => {
    con.connect(function (err) {
        con.query('USE Plugsity');
        const query = `SELECT * FROM Users WHERE (email_address = '${email}' AND user_password = '${password}')`;
        con.query(query, function (err, result, fields) {
            if (err) { console.log(err); res.send(err); }
            if (result.length > 0) {
                createToken(result[0].user_id).then(function (tokenRes) {

                    res.send({ token: tokenRes, user_id: result[0].user_id });
                });//end of create token
            } else {
                //passwords are different or email is noneexistant
                console.log("there does not exist a query")
                res.sendStatus(409);
            }
        })
    });
}

const logout = (res, token, user_id) => {
    con.connect(function (err) {
        con.query('USE Plugsity');
        const query = `SELECT dummyToken FROM dummyUserToken WHERE dummyid = '${user_id}'`;
        con.query(query, function (err, result, fields) {
            if (err) { console.log(err); res.send(err); }
            if (result.length > 0) {
                tokenVarification(user_id, token).then(function () {//correct token
                    //delete entry
                    const queryDelete = `DELETE FROM dummyUserToken WHERE dummyid = '${user_id}'`;
                    con.query(query, function (err, resultDelete, fieldsDelete) {
                        if (err) {
                            console.log(err); res.send(err);
                        } else {

                            res.sendStatus(200);
                        }
                    });
                }, function () {//wrong token
                    res.sendStatus(409);
                });
            } else {
                //passwords are different or email is noneexistant
                res.sendStatus(200);
            }
        });
    });
}

const addReview = (video_name, user_id, review_rating, product_id) => {
    const query = `INSERT INTO ProductMediaReview (user_id, review_rating, product_video_link, product_id) VALUES (${user_id}, ${review_rating}, '${video_name}', ${product_id})`;
    return new Promise((resolve, reject) => {
        queryDatabase(query).then(result => {
            resolve(result);
        }).catch(err => console.log(err));
    })
}

const getAllReviews = async (callback) => {
    const query = "SELECT product_video_link FROM ProductMediaReview WHERE processing_status = 'Ready' ";
    return new Promise((resolve, reject) => {
        queryDatabase(query).then(result => {
            resolve(result);
        }).catch(err => console.log(err));
    })
}

const setVideoComplete = (id) => {
    const query = `UPDATE ProductMediaReview SET processing_status = 'Ready' WHERE product_video_link = "${id}"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query).then(result => {
            resolve(result);
        }).catch(err => console.log(err));
    })
}

const likeReview = (user_id, review_id) => {
    const check_query = `SELECT * FROM ProductReviewLikes WHERE review_id = ${review_id} AND user_id=${user_id}`;
    const add_query = `INSERT INTO ProductReviewLikes (user_id, review_id) VALUES (${user_id}, ${review_id})`
    const remove_query = `DELETE FROM  ProductReviewLikes WHERE review_id = ${review_id} AND user_id=${user_id}`
    queryDatabase(check_query).then(result => {
        if (result.length == 0) queryDatabase(add_query)
        else queryDatabase(remove_query)
    }).catch(err => console.log(err));
}

const didUserLike = (user_id, review_id) => {
    const query = `SELECT * FROM ProductReviewLikes WHERE review_id = ${review_id} AND user_id=${user_id}`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then(result =>{resolve(result.length != 0)})
            .catch(err => console.log(err));

    })
}

const addReviewView = (id) => {
    const query = `UPDATE ProductMediaReview  SET review_views = review_views + 1 WHERE review_id= "${id}"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query).then(result => {
            resolve(result);
        }).catch(err => console.log(err));
    })
}

const getAllLikes = (review_id) => {
    const query = `SELECT COUNT(*) as likes FROM ProductReviewLikes WHERE review_id = ${review_id}`;
    return new Promise((resolve, reject) => {
        queryDatabase(query).then(result => {
            resolve(result);
        }).catch(err => console.log(err));
    })
}

const getReview = (review_id, user_id) => {
    const query = `SELECT * FROM ProductMediaReview WHERE review_id = "${review_id}"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query).then(result => {
            resolve(result);
        }).catch(err => console.log(err));
    })
}


const getUserProfile = (id) => {
    const query = `SELECT first_name, last_name, profile_photo_link FROM Users, UserProfile WHERE Users.user_id = UserProfile.user_id AND  Users.user_id = "${id}"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query).then(result => {
            resolve(result);
        }).catch(err => console.log(err));
    })
}

const getProduct = (id) => {
    const query = `SELECT ProductUpload.*, BusinessPage.legal_business_name FROM ProductUpload, BusinessPage WHERE product_id="${id} AND Product_Upload.business_id = BusinessPage.business_id"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query).then(result => {
            resolve(result);
        }).catch(err => console.log(err));
    })
}

const isUserABusiness = (id) => {
    const query = `SELECT user_id FROM BusinessPage WHERE user_id="${id}"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query).then(result => {
            resolve(result);
        }).catch(err => console.log(err));
    })
}

const queryDatabase = (query) => {
    return new Promise((resolve, reject) => {
        con.connect(function (err) {
            con.query('USE Plugsity');
            con.query(query, function (err, result, fields) {
                if (err) {
                    console.log(err);
                    reject()
                }
                resolve(result);
            })
        }
        );
    });
}



exports.addUser = addUser;
exports.getUserProfile = getUserProfile;
exports.authenticateUser = authenticateUser;
exports.logout = logout;
exports.getProduct = getProduct;
exports.addReview = addReview;
exports.getAllReviews = getAllReviews;
exports.getReview = getReview;
exports.setVideoComplete = setVideoComplete;
exports.likeReview = likeReview;
exports.getAllLikes = getAllLikes;
exports.addReviewView = addReviewView;
exports.didUserLike = didUserLike;
exports.isUserABusiness = isUserABusiness;
exports.connection = con;