const request = require('request')
const geocode = (address, callback) => {
    // const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(address)}`
    const apiKey = '05a777ea8aa448d591e7ec48c7b807ca';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;


    request({
        url, json: true
    }, (error, { body: newBody }) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (newBody.results.length === 0) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined, {
                longtitude: newBody.results[0].geometry.lng,
                latitude: newBody.results[0].geometry.lat,
                countryName: newBody.results[0].components.country

            })
            // console.log(`longtitude is: ${longitude}, latitude is: ${latitude} `)
        }
    })
}

module.exports = geocode

