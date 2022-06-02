const request = require('postman-request')


const weather = (latitude,longitude={},callback) => {
    url = `http://api.weatherstack.com/current?access_key=7d74fc637d9dcd9b7edcfb8f74900a9d&query=${latitude},${longitude}&units=m`;
    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback("Could not connect to the source")
        } else if(body.error){
            callback("unable to find location")
        } else {
            // const forecastData = body.current.temperature;
            // const feelsLikeTemp = body.current.feelslike;
            callback(undefined , {temperature : body.current.temperature,
                                    feelsLike : body.current.feelslike,
                                    humidity : body.current.humidity,
                                    localTime : body.location.localtime})
        }
    })
}


module.exports = weather