const express = require('express');
const bodyParser = require('body-parser');
const path = require("path")
var cors = require('cors')





const app = express();
const port = process.env.PORT || 5000;
const auth = require('./auth.js')



app.use(cors());
app.use(bodyParser.json());
app.use('/auth', auth);
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'client', 'build')))

// Setting up a route for our API
app.get('/api/', (req, res) => {
    console.log('hello there');
    return res.status(200).json({
        status: "success"
    })
})

app.post('/api/', (req, res) => {
    return res.status(200).json({
        status: "success"
    })
})


// // Redirect back to index.html if urls do not match
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
})


app.listen(port, ()=> console.log(`listening on port ${port}`)); 
