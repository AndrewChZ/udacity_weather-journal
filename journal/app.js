// addAnimal == addEntry
// getAnimal == getData

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?id='
let cityID = '1880252';
let apiKey = '&units=metric&appid=57a2177ab4043fe02d0ceb4845a9b1dc';

// Search via City code, for SG
// http://api.openweathermap.org/data/2.5/weather?id=1880252&appid=57a2177ab4043fe02d0ceb4845a9b1dc
// ✅ Works

document.getElementById("button-form-submit").addEventListener('click', performAction);

function performAction(e){
    const feeling = `${document.querySelector('.button-selected').firstElementChild.innerHTML}` //Was last working on this
    const thoughts = document.getElementById('thoughts').value;
    const zipcode = document.getElementById('zipcode').value;
    let weather;
    let entry;
    // getAnimal(baseURL, newAnimal, apiKey);
    getData(baseURL, cityID, apiKey)
    .then(function(data) {
        // console.log(data);
        postData('/addEntry', {feeling: feeling, thoughts: thoughts, zipcode: zipcode})
    .then(
        updateUI()
    )
    })
}

const updateUI = async() => {
    const request = await fetch('/all');
    try {
      const allData = await request.json();
      console.log(allData);
      console.log(allData.length);
      console.log(allData[0].feeling);
      console.log(allData[0].thoughts);
      console.log(allData[0].zipcode);
      updateWeather(allData, allData[0].feeling, allData[0].thoughts, weather);
    } catch(error) {
      console.log("error")
    }
  }

// Attempt to use API
const getData = async (baseURL, cityID, apiKey) => {
  // 1. This is the actual code to run if we want to simulate how actual server data is like
  const res = await fetch(baseURL+cityID+apiKey)
  // 2. As we are not using a real API, we are simulating 
  // const res = await fetch('/fakedata')
  try {
      const data = await res.json();
      console.log(`---------------------------------------------`);
      console.log(`Raw weather data:`);
      console.log(data);
      console.log(`---------------------------------------------`);
      console.log(`Temperature:`);
      console.log(`${data.main.temp}°C`);
      console.log(`---------------------------------------------`);
      weather = `${data.weather[0].description.charAt(0).toUpperCase()}${data.weather[0].description.slice(1)}, ${data.main.temp.toFixed(1)}°C`;
      return data;
  } catch(error) {
      console.log("error", error)
      // handle the error
  }
}

const postData = async ( url = '', data = {})=>{
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },    
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
      console.log("error", error);
    }
}

function updateWeather(x, feeling, thoughts, weather) {
  let fragment = document.createDocumentFragment();
  let entry = "";
  for (i=0; i<x.length; i++){
    let newEntry = `
                  <h3>Today</h3>
                  <p>Feeling: ${x[i].feeling} </p>
                  <p>Weather: ${weather}</p>
                  <p>Thoughts: ${x[i].thoughts}</p>
                  `
    entry = newEntry + entry;
  }
  fragment = entry;
  document.getElementById('resultsReplace').innerHTML = fragment;
  return;
}