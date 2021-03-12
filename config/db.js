const mysql = require("mysql");
const config = require("config");

const DB_ENDPOINT = config.get("DB_ENDPOINT");
const username = config.get("user");
const password = config.get("password");
const port = config.get("port");

const connnectDB = mysql.createConnection({
    host: DB_ENDPOINT,
    user: username,
    password: password,
    port: port,
    database: "Plugsity",
});

module.exports = connnectDB;
