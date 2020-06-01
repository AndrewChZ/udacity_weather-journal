// addAnimal == addEntry
// getAnimal == getData

let baseURL = 'http://api.animalinfo.org/data/?animal='
let apiKey = '&appid=9f15e45060...';
// const thoughts = document.getElementById('thoughts').value;

document.getElementById("button-form-submit").addEventListener('click', performAction);

function performAction(e){
    const feeling = `&#x${document.querySelector('.button-selected').firstElementChild.dataset.unicode}` //Was last working on this
    const thoughts = document.getElementById('thoughts').value;
    const zipcode = document.getElementById('zipcode').value;
    // getAnimal(baseURL, newAnimal, apiKey);
    getData('/fakedata')
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
      document.getElementById('animalName').innerHTML = allData[0].animal;
      document.getElementById('animalFact').innerHTML = allData[0].facts;
    } catch(error) {
      console.log("error", error)
    }
  }

const getData = async (baseURL, animal, key) => {
    // 1. This is the actual code to run if we want to simulate how actual server data is like
    // const res = await fetch(baseURL+animal+key)
    // 2. As we are not using a real API, we are simulating 
    const res = await fetch('/fakedata')
    try {
        const data = await res.json();
        // console.log(data);
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