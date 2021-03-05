const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'client', 'build')))

// Setting up a route for our API
app.get('/api/', (req, res) => {
    return res.status(200).json({
        status: "success"
    })
})

// Redirect back to index.html if urls do not match
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
})


app.listen(port, ()=> console.log(`listening on port ${port}`)); 
