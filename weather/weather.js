const request = require('request');

getWeather = (lat, lng, callback) => {

    request({
        url: `https://api.darksky.net/forecast/390f503fc8cd4e807095988bb21c30f6/${lat},${lng}`,
        json: true,
    },
        (error, response, body) => {
            if (error) {
                callback('Unable to fetch the data');
            } else {
                callback(undefined, body.currently.temperature);
            }
        })
};

module.exports.getWeather = getWeather;
