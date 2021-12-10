const request = require("request")
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=695c43f04f59eef8cac7a2a64ca14d5e&query='+lat+','+long+'&unit=f'
    request({ url, json: true}, (error, {body} = {}) => {

        if(error){
            callback("Unable to connect to weather service!", undefined)
        } else if(body.error){
            callback("Unable to find location!", undefined)
        } else{
            const {weather_descriptions, temperature, feelslike, wind_speed} = body.current
            const data = `${weather_descriptions[0]}. Its ${temperature} degree out there. It feels like ${feelslike} degree out. The wind speed is ${wind_speed} km/h`
            callback(undefined, data)
        }
    })
}

module.exports = forecast