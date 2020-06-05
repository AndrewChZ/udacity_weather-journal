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
    const feeling = document.querySelector('.button-selected').firstElementChild.innerHTML
    const thoughts = document.getElementById('thoughts').value;
    const zipcode = document.getElementById('zipcode').value;
    let weather;
    let entry;
    if (document.getElementById('thoughts').value.length > 0) {
      getData(baseURL, cityID, apiKey)
      .then(function(data) {
          postData('/addEntry', {feeling: feeling, thoughts: thoughts, zipcode: zipcode})
      .then(
          updateUI()
      )
      })
    } else if(document.getElementsByClassName("thoughts-warning").length == 1) {
      return;
    } else {
      document.getElementById("thoughts").insertAdjacentHTML('afterend', '<p class="thoughts-warning">Please fill in your thoughts!</p>');
    }
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
      toggleSelectedMenu();
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
                  <div class="diary-entry">
                    <h1 class="diary-entry-header">Today</h1>
                    <p class="dairy-entry-weather">${weather}</p>
                    <div class="entry-thoughts">
                      <div class="entry-emoji">${x[i].feeling}</div>
                      <p>“${x[i].thoughts}”</p>
                    </div>
                  </div>
                  `
    entry = newEntry + entry;
  }
  fragment = entry;
  document.getElementById('resultsReplace').innerHTML = fragment;
  return;
}

// Makes the feeling emojis clickable
let emojiButtons = document.getElementsByClassName("button-emoji-group");

for (let i = 0; i < emojiButtons.length ; i++) {
  emojiButtons[i].addEventListener('click', feelingsClicked);
}



function feelingsClicked(evt) {
  // console.log(`You've just clicked ${evt.target.classList}`);
  // console.log(`The parenst clicked ${evt.target.textContent}`);
  // console.log(`You've jut node's class list is; ${evt.target.parentNode.classList}`);
  if (evt.target.classList.contains("button-emoji-group")) {
    if (document.getElementsByClassName("button-selected").length == 1) {
      document.querySelector(".button-selected").classList.toggle("button-selected");
    }
    evt.target.classList.toggle("button-selected");
  } else {
    if (document.getElementsByClassName("button-selected").length == 1) {
      document.querySelector(".button-selected").classList.toggle("button-selected");
    }
    evt.target.parentNode.classList.toggle("button-selected");
  }
}

function toggleSelectedMenu() {
  document.querySelectorAll(".nav-btn")[0].classList.toggle("selected");
  document.querySelectorAll(".nav-btn")[1].classList.toggle("selected");
}