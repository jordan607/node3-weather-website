let request = require('request');

let apiKey = 'a5132cf41ea41adf227a72ff78e9f41e';

const weather = (address, callback) =>{
    //let url = 'http://api.openweathermap.org/data/2.5/weather?q='+ encodeURIComponent(address) +'&APPID='+ apiKey +'&units=metric&lang=hi' // for changing the language
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+ encodeURIComponent(address) +'&APPID='+ apiKey +'&units=metric'

    request({url, json: true}, (err,{body}) => {
    if(err){
       callback('Unable to connect to weather services',undefined)
    }else if(body.cod>400 && body.cod<500){
        callback(body.message,undefined)
    } else {
        const {temp : temperature, pressure} = body.main
        callback(undefined,'Climate : '+ body.weather[0].description +'. Current temperature is '+ temperature +' and pressure is '+pressure+ ' of city '+ body.name )       
    }
});
}

module.exports = weather