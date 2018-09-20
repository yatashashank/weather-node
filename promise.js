const request = require('request');


let geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=%20${encodedAddress}&key=AIzaSyAH_F8_to7-8gIhmcxJ-ioGY22GxqxOpmU`,
            json: true,

        },
            (error, response, body) => {
                if (error) {
                    reject('Unable to connect google servers');
                } else if (body.status === "ZERO_RESULTS") {
                    reject('Please enter valid address');
                } else if (body.status === "OK") {
                    resolve({
                        address: body.results[0].formatted_address,
                        lat: body.results[0].geometry.location.lat,
                        lng: body.results[0].geometry.location.lng
                    });
                }
            });
    })
};

geocodeAddress('64131').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});