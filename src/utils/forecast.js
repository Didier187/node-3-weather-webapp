const request = require('request')


const forecast= (longitude, latitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=9f2b54294d71b9e081c8e402751686b4&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=f'
    request ({url, json:true},(error, { body }) =>{
        if(error){
            callback("unable to connect to weather services", undefined)
        }else if(body.error){
            callback("unable to to find location", undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0]+'. it is currently '+ body.current.temperature + " degrees out, feels like "+ body.current.feelslike)
        }
    })
}

module.exports = forecast