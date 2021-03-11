const express = require('express');
const bodyParser = require('body-parser');
const path = require("path")
var cors = require('cors')


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'client', 'build')))

// Setting up a route for our API
app.get('/customers/', (req, res) => {
    console.log('hello there');
    return res.status(200).json({
        status: "This will display customers profile!"
    })
})

app.post('/customers/', (req, res) => {
    return res.status(200).json({
        status: "This will display customers profile!"
    })
})


// // Redirect back to index.html if urls do not match
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
})

app.listen(port, ()=> console.log(`listening on port ${port}`)); 
