/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth() + '-' + d.getDate() + '-' + d.getFullYear();

let baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let apiKey = '&appid=ecedc88b09ad15c739e106da8aef3445';


document.getElementById('generate').addEventListener('click', (e) => {
    const zip = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;
    fetchData(baseUrl, zip, apiKey).then(
        function (data) {
            console.log(data);
            postData('/postdata', { date: date, temp: data.list[0].main.temp, content: content });
            updateUi();
        }
    )
});


// Fetching Data
const fetchData = async (baseUrl, zip, key) => {
    const res = await fetch(baseUrl + zip + key);
    try {
        let data = await res.json();
        return data;
    } catch (error) {
        // Print Error in Console
        console.log('Opps! ' + error);
    }
}

const postData = async (url = '', data = {}) => {
    console.log(data);
    let response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        // Print Error in Console
        console.log('Opps! ' + error);
    }
}

// Start Update UI
const updateUi = async () => {
    const request = await fetch('/getdata');
    try {
        let data = await request.json();
        document.getElementById('date').innerHTML = `Date is : ${data[0].date}`;
        document.getElementById('temp').innerHTML = `Temperature is : ${data[0].temp}`;
        document.getElementById('content').innerHTML = `Feeling : ${data[0].content}`;
    } catch (error) {
        // Print Error in Console
        console.log('Opps! ' + error);
    }
}
// End Update UI