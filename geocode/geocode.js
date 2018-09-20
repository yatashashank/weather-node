const request = require('request');

let geocodeAddress = (address, callback) => {

    let encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=%20${encodedAddress}&key=AIzaSyAH_F8_to7-8gIhmcxJ-ioGY22GxqxOpmU`,
        json: true,

    },
        (error, response, body) => {
            if (error) {
                callback('Unable to connect google servers');
            } else if (body.status === "ZERO_RESULTS") {
                callback('Please enter valid address');
            } else if (body.status === "OK") {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng
                })
            }
        })
};

module.exports.geocodeAddress = geocodeAddress;