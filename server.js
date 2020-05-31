//Express to run server and routes
const express = require('express');

//Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

const diaryData = []

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

const port = 8000;

const server = app.listen(port, listening);

function listening() {
	console.log(`server running`);
	console.log(`running on localhost: ${port}`);
}

// points the server code to the folder that has 'index.html'
app.use(express.static('journal'));

// Dummy API Endpoint
const fakeData = {
    weather: 'Rain, 36ºC',
    thoughts: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  }

// Adapted from "app.get('/fakeAnimalData', getFakeData)"
app.get('/fakedata', getFakeData)

function getFakeData(req, res) {
  res.send(fakeData);
}

// Adapted from "app.post('/addAnimal', addAnimal);"
app.post('/addEntry', addEntry);

// Adapted from "function addAnimal(req, res)"
function addEntry(req, res) {
    console.log(req.body)
    newEntry = {
        feeling: req.body.feeling,
        zipcode: req.body.zipcode        
    }
    
    diaryData.push(newEntry)
    res.send(diaryData)
    console.log(diaryData)
}

// invokes when there is a get request to the homepage
// respond with "hello world" when a GET request is made to the homepage
app.get('/all', function (req, res) {
    // res.send('hello world2');
    res.send('GET on /all received');
})