// addAnimal == addEntry
// getAnimal == getData

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?id='
let cityID = '1880252';
let apiKey = '&units=metric&appid=57a2177ab4043fe02d0ceb4845a9b1dc';

// Search via City code, for SG
// http://api.openweathermap.org/data/2.5/weather?id=1880252&appid=57a2177ab4043fe02d0ceb4845a9b1dc
// ✅ Works

document.getElementById("button-form-submit").addEventListener('click', performAction);

// document.getElementsByClassName("nav-btn")[0].addEventListener('click', updateUI);



function performAction(e) {
    if (document.getElementById('thoughts').value.length > 0 && document.getElementsByClassName("button-selected").length == 1 && document.getElementById('zipcode').value.length > 0) {
      printValidationText();
      const feeling = document.querySelector('.button-selected').firstElementChild.innerHTML
      const thoughts = document.getElementById('thoughts').value;
      const zipcode = document.getElementById('zipcode').value;
      const date = `Today`;
      let entry;
      getData(baseURL, cityID, apiKey)
      .then(function(data) {
          postData('/addEntry', {date: date, feeling: feeling, thoughts: thoughts, zipcode: zipcode, weather: `${data.weather[0].description.charAt(0).toUpperCase()}${data.weather[0].description.slice(1)}, ${data.main.temp.toFixed(1)}°C`})
      .then(
          updateUI()
      )
      })
    } else {
      printValidationText();
    }
}

function printValidationText() {
  let isFeelingValid = (document.getElementsByClassName("button-selected").length == 1);
  let isThoughtsValid = (document.getElementById('thoughts').value.length > 0);
  let isZipcodeValid = (document.getElementById('zipcode').value.length > 0);
  let isFeelingWarningAppeared = (document.getElementsByClassName('feeling-warning').length > 0);
  let isThoughtsWarningAppeared = (document.getElementsByClassName('thoughts-warning').length > 0);
  let isZipcodeWarningAppeared = (document.getElementsByClassName('zipcode-warning').length > 0);

  if (isFeelingValid == false && isFeelingWarningAppeared == false) {
    let validationText = document.c
    document.getElementById("feeling-validation-text").innerHTML = '<p class="feeling-warning">Please select your feeling!</p>';
  }

  if (isFeelingValid == true && isFeelingWarningAppeared == true) {
    document.getElementById("feeling-validation-text").removeChild(document.getElementsByClassName('feeling-warning')[0]);
  }

  if (isThoughtsValid == false && isThoughtsWarningAppeared == false) {
    document.getElementById("thoughts-validation-text").innerHTML = `<p class="thoughts-warning">Please fill in your thoughts!</p>`;
  }

  if (isThoughtsValid == true && isThoughtsWarningAppeared == true) {
    document.getElementById("thoughts-validation-text").removeChild(document.getElementsByClassName('thoughts-warning')[0]);
  }

  if (isZipcodeValid == false && isZipcodeWarningAppeared == false) {
    document.getElementById("zipcode-validation-text").innerHTML = '<p class="zipcode-warning">Please fill in your zipcode!</p>';
  }

  if (isZipcodeValid == true && isZipcodeWarningAppeared == true) {
    document.getElementById("zipcode-validation-text").removeChild(document.getElementsByClassName('zipcode-warning')[0]);
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
      updateContent();
      updateWeather(allData);
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

function updateWeather(x) {
  let fragment = document.createDocumentFragment();
  let entry = "";
  for (i=0; i<x.length; i++){
    let newEntry = `
                  <div class="diary-entry">
                    <h1 class="diary-entry-header">${x[i].date}</h1>
                    <p class="dairy-entry-weather">${x[i].weather}</p>
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

function updateContent() {
  let addEntryHTML = `  
                    <div class="content-add-entry">
                      <div class="illustration-space">
                          <img src="img/top-illustration-01.svg">
                          <h1>Welcome back, Andrew</h1>
                      </div>
                      <form>
                          <label><h1>How are you feeling today?</h1></label>
                          <div class="emotionSelection">
                              <button type="button" class="button-emoji-group">
                                  <div class="button-emoji">😃</div>
                                  Happy!
                              </button>
                              <button type="button" class="button-emoji-group">
                                  <div class="button-emoji">😐</div>
                                  Meh
                              </button>
                              <button type="button" class="button-emoji-group">
                                  <div class="button-emoji">😩</div>
                                  Sigh
                              </button>
                              <button type="button" class="button-emoji-group">
                                  <div class="button-emoji">😡</div>
                                  #@&*!
                              </button>
                              <button type="button" class="button-emoji-group">
                                  <div class="button-emoji">😱</div>
                                  OMG
                              </button>
                          </div>
                          <div id="feeling-validation-text"></div>
                          <label for="thoughts"><h1>Any thoughts to add?</h1></label>
                          <input type="text" id="thoughts" name="thoughts" placeholder="I feel...">
                          <div id="thoughts-validation-text"></div>
                          <label for="zipcode" id="zip"><h1>Let us fetch your weather</h1></label>
                          <input type="text" id="zipcode" name="zipcode" placeholder="My zipcode is..."><br>
                          <div id="zipcode-validation-text"></div>
                          <button type="button" class="button-form-submit" id="button-form-submit">Submit</button>
                      </form>
                    </div>
                    `;
  let viewDiaryHTML = `
                    <div class="content-view-diary">
                      <div id="resultsReplace"></div>
                      <div class="illustration-space">
                          <img src="img/bottom-illustration-01.svg">
                          <h1>Have something on your mind?</h1>
                          <button type="button" class="button-enourage-submission">Submit An Entry</button>
                      </div> 
                    </div>
                    `;
  if (document.getElementsByClassName("nav-btn")[0].classList.length = 2) {
    document.getElementById("content-div").innerHTML = viewDiaryHTML;
  } else {
    document.getElementById("content-div").innerHTML = addEntryHTML;
  }
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