// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Require Body Parser
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;


/*
    Callback Function for Debugging
*/
const server = app.listen(port, listening);
function listening() {
    console.log(`server running on localhost:${port}`);
}


/*
    Get Route
    http://localhost:3000/getdata
*/
app.get('/getdata', getData);
function getData(request, response) {
    response.send(projectData);
    projectData = [];
}

/*
    Post Route
*/
app.post('/postdata', postData);
function postData(request, response) {
    console.log(request.body);
    dataEntry = {
        date: request.body.date,
        temp: request.body.temp,
        content: request.body.content
    };
    // Push DataEntry To The Array
    projectData.push(dataEntry);
}