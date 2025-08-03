const request = require('request')
const forecast = (longtitude, latitude, callback) => {
    const geocodeURL = `http://api.weatherstack.com/current?access_key=24137f9301fc9ae26a1ee4b0034a5228&query=${latitude},${longtitude}`
    request({ url: geocodeURL, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to forecast', undefined)
        } else if (!body.request) {
            console.log(body)
            callback('unable to find location', undefined)
        }
        else {
            callback(
                undefined,
                `${body.current.weather_descriptions[0]}, It is currently: ${body.current.temperature} degrees out , it feels like ${body.current.feelslike} `
            )
        }
    })

}

module.exports = forecast