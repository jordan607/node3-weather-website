const request = require('request')

let apiKey = 'pk.eyJ1Ijoic2VwdmkiLCJhIjoiY2s5ZmF1NThiMDlvdDNkdDA3dzVnNXBxNyJ9.UiwNxmXAq4L5E1p4vCBJVg';

const geocode = (address,callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token='+ apiKey +'&limit=1'

    request({url, json :  true}, (error, response) =>{
         if(error){
            callback('Unable to connect to location services',undefined)
        }else if(response.body.features.length===0){
            callback('Please check the searched location and try again',undefined)
        }else{
            const {place_name, center} = response.body.features[0]
            callback(undefined, {
                place_name,
                longitude: center[0],
                latitude: center[1]            
        })     
  } 
    })

} 

module.exports = geocode