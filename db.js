const dotenv = require("dotenv");
const mysql = require("mysql");

dotenv.config();

const con = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    port: process.env.PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
});

//updates or registers user_id in the token table
//return a promise of a token
// resolve is only implemented and returns a callback token
function createToken(user_id) {
    let token_to_be_returned = require("crypto")
        .randomBytes(10)
        .toString("hex");
    const update_query = `UPDATE dummyUserToken SET dummyToken = '${token_to_be_returned}' WHERE dummyid = '${user_id}'`;
    const insert_query = `INSERT INTO dummyUserToken (dummyid, dummyToken) VALUES ('${user_id}', '${token_to_be_returned}')`;
    return new Promise((resolve, reject) => {
        queryDatabase(update_query)
            .then((result) => {
                if (result.length == 0) {
                    queryDatabase(insert_query)
                        .then((result) => {
                            resolve(token_to_be_returned);
                        })
                        .catch((err) => console.log(err));
                } else {
                    resolve(token_to_be_returned);
                }
            })
            .catch((err) => console.log(err));
    });
}

//returns a promise for when the token is correct
//resolve is when token is varified
//reject is when token is
function tokenVerification(user_id, token) {
    return new Promise((resolve, reject) => {
        con.connect(function (err) {
            con.query("USE Plugsity");
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
const addUser = (firstname, lastname, email, password) => {
    const query = `INSERT INTO Users (email_address, first_name, last_name, user_password) VALUES ('${email}', '${firstname}', '${lastname}', '${password}')`;
    return new Promise((resolve, reject) => {
        checkIfEmailExists(email).then((emailExists) => {
            if (emailExists) {
                reject("email");
            } else {
                queryDatabase(query).then((result) => {
                    let user_id = result.insertId;
                    createToken(user_id).then((result) => {
                        resolve({ user_id: user_id, token: result });
                    });
                });
            }
        });
    });
};

//used for login
const authenticateUser = (res, email, password) => {
    con.connect(function (err) {
        con.query("USE Plugsity");
        const query = `SELECT * FROM Users WHERE (email_address = '${email}' AND user_password = '${password}')`;
        con.query(query, function (err, result, fields) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            if (result.length > 0) {
                let user_id = JSON.parse(JSON.stringify(result))[0].user_id;
                createToken(user_id).then(function (tokenRes) {
                    res.send({ token: tokenRes, user_id: user_id });
                }); //end of create token
            } else {
                console.log("there does not exist a query");
                res.sendStatus(409);
            }
        });
    });
};

const logout = (res, token, user_id) => {
    con.connect(function (err) {
        con.query("USE Plugsity");
        const query = `SELECT dummyToken FROM dummyUserToken WHERE dummyid = '${user_id}'`;
        con.query(query, function (err, result, fields) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            if (result.length > 0) {
                tokenVerification(user_id, token).then(
                    function () {
                        //correct token
                        //delete entry
                        const queryDelete = `DELETE FROM dummyUserToken WHERE dummyid = '${user_id}'`;
                        con.query(
                            query,
                            function (err, resultDelete, fieldsDelete) {
                                if (err) {
                                    console.log(err);
                                    res.send(err);
                                } else {
                                    res.sendStatus(200);
                                }
                            }
                        );
                    },
                    function () {
                        //wrong token
                        res.sendStatus(409);
                    }
                );
            } else {
                //passwords are different or email is noneexistant
                res.sendStatus(200);
            }
        });
    });
};

const getAllReviews = async (callback) => {
    const query = "SELECT * FROM ProductMediaReview  WHERE processing_status = 'Ready'";
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const setVideoComplete = (id) => {
    const query = `UPDATE ProductMediaReview SET processing_status = 'Ready' WHERE product_video_link = "${id}"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const likeReview = (user_id, review_id) => {
    const check_query = `SELECT * FROM ProductReviewLikes WHERE review_id = ${review_id} AND user_id=${user_id}`;
    const add_query = `INSERT INTO ProductReviewLikes (user_id, review_id) VALUES (${user_id}, ${review_id})`;
    const remove_query = `DELETE FROM  ProductReviewLikes WHERE review_id = ${review_id} AND user_id=${user_id}`;
    queryDatabase(check_query)
        .then((result) => {
            if (result.length == 0) queryDatabase(add_query);
            else queryDatabase(remove_query);
        })
        .catch((err) => console.log(err));
};

const didUserLike = (user_id, review_id) => {
    const query = `SELECT * FROM ProductReviewLikes WHERE review_id = ${review_id} AND user_id=${user_id}`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result.length != 0);
            })
            .catch((err) => console.log(err));
    });
};

const addReviewView = (id) => {
    const query = `UPDATE ProductMediaReview  SET review_views = review_views + 1 WHERE review_id= "${id}"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const getAllLikes = (review_id) => {
    const query = `SELECT COUNT(*) as likes FROM ProductReviewLikes WHERE review_id = ${review_id}`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const getReview = (review_id, user_id) => {
    const query = `SELECT * FROM ProductMediaReview WHERE review_id = "${review_id}"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const getUserProfile = (id) => {
    const query = `SELECT * FROM Users WHERE Users.user_id = "${id}"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const getTopProducts = ()=>{
    const query = `SELECT ProductUpload.*, (SELECT COUNT(*) as likes FROM ProductReviewLikes GROUP BY product_id) FROM ProductUpload p , ProductReviewLikes r  WHERE r.product_id = p.product_id`
}

const getTopReviews = ()=>{
    const query =  `SELECT *, COUNT(likes) as like_ranking FROM (SELECT reviews.*, likes.id as likes FROM (SELECT  review.* FROM BusinessPage business, ProductUpload product, ProductMediaReview review WHERE  product.business_id = business.business_id AND review.product_id = product.product_id  AND review.processing_status="ready") reviews LEFT JOIN ProductReviewLikes likes ON likes.review_id = reviews.review_id)as output GROUP BY review_id ORDER BY like_ranking DESC;`
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });

}

const getProduct = (id) => {
    const query = `SELECT * FROM BusinessPage JOIN (SELECT ProductUpload.* FROM ProductUpload  WHERE product_id="${id}") as products ON products.business_id = BusinessPage.business_id` ;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const isUserABusiness = (id) => {
    const query = `SELECT user_id FROM BusinessPage WHERE user_id="${id}"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result.length > 0);
            })
            .catch((err) => console.log(err));
    });
};

const getBusinessDataFromUserId = (user_id) => {
    const query = `SELECT * FROM BusinessPage WHERE user_id=${user_id}`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result[0]);
            })
            .catch((err) => console.log(err));
    });
};

const checkIfEmailExists = (email) => {
    const query = `SELECT email_address FROM Users WHERE email_address = '${email}'`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result.length > 0);
            })
            .catch((err) => console.log(err));
    });
};

const getAllBusinesses = () => {
    const query = "SELECT * FROM BusinessPage";
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const getAllProducts = () => {
    const query = `SELECT * FROM BusinessPage JOIN (SELECT ProductUpload.* FROM ProductUpload) as products ON products.business_id = BusinessPage.business_id` ;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });

}

const getAllProductsWithReviews = () => {
    const query = `SELECT ProductUpload.*, AVG(ProductMediaReview.review_rating) as rating, BusinessPage.*
    FROM ProductMediaReview
    RIGHT JOIN ProductUpload
    ON ProductUpload.product_id = ProductMediaReview.product_id
    JOIN BusinessPage
    ON ProductUpload.business_id = BusinessPage.business_id
    GROUP BY ProductUpload.product_id, BusinessPage.business_id
    ORDER BY rating desc` ;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });

}

const updateBusiness = (business_id, insert_data) => {
    let data = [];
    for (const [key, value] of Object.entries(insert_data)) {
        data.push(key + " = " + `'${value}'`);
    }
    data.join(", ");

    const query = `UPDATE BusinessPage SET ${data} WHERE business_id = ${business_id}`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result.insertId);
            })
            .catch((err) => console.log(err));
    });
};

const createBusiness = (insert_cols, insert_vals) => {
    const query = `INSERT INTO BusinessPage (${insert_cols}) VALUES (${insert_vals})`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result.insertId);
            })
            .catch((err) => console.log(err));
    });
};

const addReview = (insert_cols, insert_vals) => {
    const query = `INSERT INTO ProductMediaReview (${insert_cols}) VALUES (${insert_vals})`;
    return new Promise((resolve, reject) => {
        queryDatabase(query).then(result => {
            resolve(result);
        }).catch(err => console.log(err));
    })
}

const getProductsOfBusiness = (business_id) => {
    const query =
        `SELECT ProductUpload.*,  BusinessPage.legal_business_name FROM ProductUpload, BusinessPage WHERE ProductUpload.business_id = BusinessPage.` +
        `business_id AND ProductUpload.business_id = '${business_id}'`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const createProduct = (insert_cols, insert_vals) => {
    const query = `INSERT INTO ProductUpload (${insert_cols}) VALUES (${insert_vals})`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const getProductReviewAverage = (product_id) => {
    const query = `SELECT AVG(review_rating) AS rating FROM ProductMediaReview WHERE product_id=${product_id}`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const getReviewsOfProduct = (product_id) => {
    const query =  `SELECT * FROM ProductMediaReview where product_id=${product_id} AND ProductMediaReview.processing_status = "ready"`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
}

const getReviewsOfBusiness = (business_id) => {
    const query = `SELECT review.* FROM ProductMediaReview review, ProductUpload product, BusinessPage business WHERE review.product_id = product.product_id AND business.business_id = product.business_id AND review.processing_status="ready" AND business.business_id =${business_id}` ;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
}

const searchForProducts = (searchTerm) => {
    const query =
        `SELECT ProductUpload.*, BusinessPage.legal_business_name FROM ProductUpload, BusinessPage ` +
        `WHERE concat(product_name, product_description, product_subcategory, product_category, product_tags) LIKE '%${searchTerm}%'` +
        `AND BusinessPage.business_id = ProductUpload.business_id`;
    return new Promise((resolve, reject) => {
        queryDatabase(query)
            .then((result) => {
                resolve(result);
            })
            .catch((err) => console.log(err));
    });
};

const queryDatabase = (query) => {
    return new Promise((resolve, reject) => {
        con.connect(function (err) {
            con.query("USE Plugsity");
            con.query(query, function (err, result, fields) {
                if (err) {
                    console.log(err);
                    reject();
                }
                resolve(result);
            });
        });
    });
};

exports.getBusinessDataFromUserId = getBusinessDataFromUserId;
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
exports.getReviewsOfProduct = getReviewsOfProduct;
exports.addReviewView = addReviewView;
exports.didUserLike = didUserLike;
exports.getAllBusinesses = getAllBusinesses;
exports.searchForProducts = searchForProducts;
exports.isUserABusiness = isUserABusiness;
exports.checkIfEmailExists = checkIfEmailExists;
exports.createBusiness = createBusiness;
exports.getTopReviews = getTopReviews;
exports.getReviewsOfBusiness = getReviewsOfBusiness;
exports.getProductReviewAverage = getProductReviewAverage;
exports.updateBusiness = updateBusiness;
exports.getAllProducts = getAllProducts;
exports.getAllProductsWithReviews = getAllProductsWithReviews;
exports.getProductsOfBusiness = getProductsOfBusiness;
exports.createProduct = createProduct;
exports.queryDatabase = queryDatabase;
exports.connection = con;
