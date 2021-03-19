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
                if (err) { console.log(err); res.send(err) }
                else if (result) { res.send({ firstName: firstname, lastName: lastname, email: email, password: password }); }

                if (fields) console.log(fields);

            });
        }

    });

}

const getUser = (res, email, password) => {
    con.connect(function (err) {
        con.query('USE Plugsity');
        const query = `SELECT email_address FROM Users WHERE email_address = '${email}'`;
        con.query(query, function (err, result, fields) {
            if (err) console.log(err);
            if (result.length > 0) {
                //if password is the same, give them a token
                console.log("there exists a query for ", result.)
                res.status(409);
            }else{
                console.log("there does not exist a query")
                res.status(409);
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
            const query = "SELECT product_video_link FROM ProductMediaReview";
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





exports.addUser = addUser;
exports.getUser = getUser;
exports.addReview = addReview;
exports.getReviews = getReviews;
exports.connection = con;