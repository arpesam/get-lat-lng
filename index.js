const axios = require('axios')
const maps = require('@google/maps');


const apiKey = process.env.GOOGLE_MAPS_API

async function getLatLng(address = '') {
  try {
    console.log(address)
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
    if (response.data.status != 'OK') return console.log(response.data.status)

    // console.log('result long -> ', response.data.results)
    console.log('result -> ', response.data.results[0].geometry.location)

  } catch (error) {
    console.error(error.response.data.error_message)
  }
}

const addressTofind = 'digite aqui o endereco. Ex. Rua Joao Teodoro, 615'
const formatedAddressTofind = addressTofind.split(' ').join('+')

getLatLng(formatedAddressTofind);