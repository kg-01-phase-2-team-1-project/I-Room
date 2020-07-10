require('dotenv').config()
const axios = require('axios')
const { HolidayAPI } = require('holidayapi');

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

    static async holiday(req, res, next) {
        
        const key = process.env.HOLIDAY_API_KEY;
        const holidayApi = new HolidayAPI({ key });
        try {
            const holidays = await holidayApi.countries();
            
            res.status(200).json(holidays);
        } catch (error) {
            next(err);
        }
    }
}
module.exports = ApiController