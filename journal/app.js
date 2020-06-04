// addAnimal == addEntry
// getAnimal == getData

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?id='
let cityID = '1880252';
let apiKey = '&appid=57a2177ab4043fe02d0ceb4845a9b1dc';
// const thoughts = document.getElementById('thoughts').value;

// My API key == 57a2177ab4043fe02d0ceb4845a9b1dc
// API code exmaple

// Trying to get my own address for Singapore
// http://api.openweathermap.org/data/2.5/weather?zip=752501,sgp&appid=57a2177ab4043fe02d0ceb4845a9b1dc
// ❌ does not work

// Trying to use the example on OpenWeather website
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=57a2177ab4043fe02d0ceb4845a9b1dc
// ✅ Works

// Search via ZIP code, for US
// http://api.openweathermap.org/data/2.5/weather?zip=99501,us&appid=57a2177ab4043fe02d0ceb4845a9b1dc
// ❌ does not work

// Search via City code, for SG
// http://api.openweathermap.org/data/2.5/weather?id=1880252&appid=57a2177ab4043fe02d0ceb4845a9b1dc
// ✅ Works

document.getElementById("button-form-submit").addEventListener('click', performAction);

function performAction(e){
    const feeling = `${document.querySelector('.button-selected').firstElementChild.innerHTML}` //Was last working on this
    const thoughts = document.getElementById('thoughts').value;
    const zipcode = document.getElementById('zipcode').value;
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
      console.log(allData[0].feeling);
      console.log(allData[0].thoughts);
      console.log(allData[0].zipcode);
      document.getElementById('feelingReplace').innerHTML = allData[0].feeling;
      document.getElementById('thoughtsReplace').innerHTML = allData[0].thoughts
      document.getElementById('zipcodeReplace').innerHTML = allData[0].zipcode;
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
      console.log(data);
      return data;
  } catch(error) {
      console.log("error", error)
      // handle the error
  }
}

// // Original code chunk that uses fake data
// const getData = async (baseURL, animal, key) => {
//     // 1. This is the actual code to run if we want to simulate how actual server data is like
//     // const res = await fetch(baseURL+animal+key)
//     // 2. As we are not using a real API, we are simulating 
//     const res = await fetch('/fakedata')
//     try {
//         const data = await res.json();
//         // console.log(data);
//         return data;
//     } catch(error) {
//         console.log("error", error)
//         // handle the error
//     }
// }

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
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