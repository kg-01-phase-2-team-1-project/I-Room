require('dotenv').config()
const axios = require('axios')

class ApiController {
    static weather(req, res) {
        axios({
            methode: 'GET',
            url: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=fetch:ip`
        })
        .then(result => {
            res.status(200).json(result.data)
        }).catch(err => {
            next(err)
        });
    }
}
module.exports = ApiController