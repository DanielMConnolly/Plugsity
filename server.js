const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

// database
const connectDB = require("./config/db");

// connect to DB
connectDB.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "build")));

// Setting up a route for our API
app.get("/api/", (req, res) => {
    return res.status(200).json({
        status: "success",
    });
});

// routes
app.use("/api/products", require("./routes/api/products"));

// Redirect back to index.html if urls do not match
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(port, () => console.log(`listening on port ${port}`));
