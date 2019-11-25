require('dotenv').config()
const axios = require('axios')
const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const port = 3000

var jsonParser = bodyParser.json()
console.log('api key ->', process.env.GOOGLE_MAPS_API)
const apiKey = process.env.GOOGLE_MAPS_API


async function getLatLng(address = '') {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)

    if (response.data.status != 'OK') {
      console.log(response.data)
      return { lat: '-', lng: '-', status: response.data.status}
    }

    console.log('result -> ', response.data.results[0].geometry.location)

    return { ...response.data.results[0].geometry.location, status: 'OK' }

  } catch (error) {
    console.log('ERROR ->', error.response.data.error_message)
    return { lat: '-', lng: '-', status: 'Error' }
  }
}


app.post('/latlng', jsonParser, async function (req, res) {
  const addressTofind = req.body.address;
  const formatedAddressTofind = addressTofind.split(' ').join('+')
  const result = await getLatLng(formatedAddressTofind)

  console.log(result)

  res.json({
    latlng: [result.lat, result.lng],
    status: result.status,
  })

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))