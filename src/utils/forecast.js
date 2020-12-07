const request = require('request');


const forecast = (latitude,longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=328deedf5aa717c7be95c28cc32b44a9&query= '  + latitude + ',' + longitude + '&units=f';
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the weather servers!',undefined);
        }else if(body.error){
            callback('Unable to find location try again!', undefined);
        }else{
            callback(undefined, body.current.weather_descriptions[0]+ ' .Its currently ' + body.current.temperature + ' degress out.Feels like ' + body.current.feelslike + ' degress out')
        }
    });
};


module.exports = forecast;