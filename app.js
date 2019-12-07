const PORT = process.env.PORT || 3000;

var express = require('express');
var axios = require('axios')
var bodyParser = require('body-parser');
const cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

app.get('/weather', function (req, res) {
    const API_URL = "https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633"
    const longitude = req.param('longitude');
    const latitude = req.param('latitude');

    axios.get(`${API_URL}/${latitude},${longitude}?extend=minutely`)
        .then(function (response) {
            res.send(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.get('/place', function (req, res) {
    const API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places"
    const access_token="pk.eyJ1Ijoib2poZXJuYW5kZXpjIiwiYSI6ImNrM3ZmaWR5ODAyYTEzZ3F6eDAwODBhdGkifQ.sFSAFOHjtga70t-6kD5_mw"
    const city = req.param('city');
    
    console.log(`${API_URL}/${city}.json?access_token=${access_token}`)

    axios.get(`${API_URL}/${city}.json?access_token=${access_token}`)
        .then(function (response) {
            res.send(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
});

app.listen(PORT, function () {
    console.log('App listening on port ' + PORT);
});
