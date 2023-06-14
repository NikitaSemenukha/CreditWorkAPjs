require('dotenv').config();
const request = require('request');

const apiKey = process.env.API_KEY;
const baseCurrency = 'PLN';
const currencies = ['EUR', 'USD', 'PLN'];

function getExchangeRates(callback) {
    const url = `https://api.currencylayer.com/live?access_key=${apiKey}&source=${baseCurrency}&currencies=${currencies.join(',')}`;

    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const rates = JSON.parse(body).quotes;
            console.log(response, body);
            callback(null, rates);
        } else {
            callback(error || response.statusCode);
        }
    });
}

module.exports = {
    getExchangeRates
};
