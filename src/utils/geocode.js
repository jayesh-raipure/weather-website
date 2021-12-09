const request = require("request")
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiamF5ZXNocmFpcHVyZSIsImEiOiJja3dycXFjNWswejdyMm9wbWRxdGNsbWM0In0.lf11h9AgnVp0YTgoVwUEUw&limit=1"

    request({ url, json: true}, (error, {body} = {}) => {
        if(error){
            callback("Unable to connect to geocoding service!", undefined)
        } else if(body.features.length ===0){
            callback("Location not found!", undefined)
        } else{
            const {features} = body
            const latitude = features[0].center[1]
            const longitude = features[0].center[0]
            const location =features[0].place_name
            const data = {
                latitude,
                longitude,
                location
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode