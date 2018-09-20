const yargs = require('yargs');

const geocode = require('./geocode/geocode.js')
const weather = require('./weather/weather.js')
const argv = yargs.
    options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log('Address:', results.address);
        //console.log(JSON.stringify(results, undefined, 2));
        weather.getWeather(results.lat, results.lng, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`The current Tempareture is : ${weatherResults}`);
            }

        });
    }
});

