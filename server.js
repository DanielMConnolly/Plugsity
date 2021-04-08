const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
const mysql = require("mysql");

const app = express();
const port = process.env.PORT || 5000;
const auth = require('./auth.js')
const review = require('./review.js')
const businessSetup = require('./business_setup.js')
//const customer = require('./customer_db.js')

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', auth);
app.use('/review', review);
//app.use('/customer_db', customer);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

// Setting up a route for our API
app.get("/api/", (req, res) => {
    console.log("hello there");
    return res.status(200).json({
        status: "success",
    });
});

app.post("/api/", (req, res) => {
    return res.status(200).json({
        status: "success",
    });
});

//Below code is to get User's profile
const db = mysql.createConnection({
    host: "plugsity-dev.cuxrersyaold.us-east-2.rds.amazonaws.com",
    user: "plugsityadmin",
    password: "cse611devs",
    database: "Plugsity",
});

db.connect();

app.get("/customers", function (req, res) {
    var sql = "SELECT * FROM UserProfile";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post("/business", function (req, res) {
    console.log(req.body);
    var data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        user_password: req.body.user_password,
    };
    var sql = "INSERT INTO Users SET ?";
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send({
            status: "success",
            no: null,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email_address: req.body.email_address,
            cell_phone: "",
            user_password: req.body.user_password,
            user_role: "Business",
            login_success: true,
            attempted_at: "",
            old_password: "",
            new_password: "",
            created_at: "",
        });
    });
});

//products route
app.use("/api/products", require("./products"));

// // Redirect back to index.html if urls do not match
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.use("/api/businessSetup", businessSetup);

app.listen(port, () => console.log(`listening on port ${port}`));
