//Express to run server and routes
const express = require('express');

//Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

const projectData = [
  {date: "12 May", emoji: "😱" , feelings: "Kopi-pua seo He still small boy one He still small boy one Buay.", zipcode: "827361", weather: "Thunderstorm, 26.3ºC"},
  {date: "16 May", emoji: "😃" , feelings: "Relak lah! Got problem ah? White Horse Shiok Char Kway Teow Don't fly my kite. Issit Taupok Pon then you know! Don't fly my kite 'Cher Issit Zhun Sam Seng Act Blur.", zipcode: "827361", weather: "Cloudy, 31.8ºC"},
  {date: "22 May", emoji: "😡" , feelings: "Don't play play. Relak lah!", zipcode: "827361", weather: "Broken clouds, 32.4ºC"},
  {date: "26 May", emoji: "😱" , feelings: "Eye-Power Catch No Ball Izzit? then you know! ", zipcode: "827361", weather: "Sunny, 34.4ºC"},
  {date: "30 May", emoji: "😃" , feelings: "Got problem ah? On lah! Gone-case Izzit? Don't fly my kite. My England not powderful!", zipcode: "827361", weather: "Rain, 29.7ºC"}
]

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
    feelings: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam'
  }


// Used to send in the data that we have when user a clicks on the button
// Adapted from "app.get('/fakeAnimalData', getFakeData)"
app.get('/fakedata', getFakeData)

function getFakeData(req, res) {
  res.send(fakeData);
}

// Adapted from "app.post('/addAnimal', addAnimal);"
app.post('/addEntry', addEntry);

// Adapted from "function addAnimal(req, res)"
function addEntry(req, res) {
    // console.log(req.body)
    newEntry = {
        date: req.body.date,
        emoji: req.body.emoji,
        feelings: req.body.feelings,
        zipcode: req.body.zipcode,
        weather: req.body.weather       
    }
    
    projectData.push(newEntry)
    res.send(projectData)
    console.log(projectData)
}

// invokes when there is a get request to the homepage
// respond with "hello world" when a GET request is made to the homepage
app.get('/all', function (req, res) {
    res.send(projectData);
})

// invokes when there is a post request to the homepage
app.post('/', function (req, res) {
  res.send('POST received')
})
