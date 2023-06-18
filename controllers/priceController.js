const {prices} = require('../data.js');

function getPrices(req,res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(prices));
}

module.exports =  {
    getPrices: getPrices
}