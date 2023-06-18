const mongoose = require('mongoose');
const User = require('../models/user.model.js');
const {prices} = require('../data.js');

async function findUser(req,res) {
    const uid = req.query.uid;
    var data = await User.find({ uid: `${uid}` });
    const userData = {
        name: data[0].name,
        lastname: data[0].lastName,
        date: new Date(data[0].dateOfBirth).toDateString()
    }
    res.send(JSON.stringify(userData));
}

async function deleteUser(req,res) {
    try {
        await User.deleteOne({ uid: `${req.query.uid}` });
        res.status(200);
    } catch (err) {
        res.send(err);
    }
}

async function createUser(req,res) {
    const uid = req.query.uid;
    const name = req.query.name;
    const lastName = req.query.lastName;
    const dateArr = req.query.dateOfBirth.split('-');
    const date = new Date(`${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`);

    const user = new User({ uid: uid, name: name, lastName: lastName, dateOfBirth: date });

    try {
        user.save().then(() => {
            res.status(200);
        });
    }   
    catch(err) {
        res.send(err);
    }
}


function userData(req,res) {
    res.setHeader('Content-Type', 'application/json');
    var userBalance = 0;
    var totalProfit = 0;
    const pnl = [255, 20, 5, 40, 32, 48, 72, 1, -23, -52, 56, -3, 87, 12, 3, 87, -42, 320, -222, 33, 44, 1, 52, 32, 99, 0, -40, -60, -32, 100];
    const goodsPricesAtBuying = [prices.tenthWeek.btc[3], prices.tenthWeek.eth[3], prices.tenthWeek.sol[3], prices.tenthWeek.atom[3]];
    const actualGoodsPrices = [prices.twentyfifthWeek.btc[6], prices.twentyfifthWeek.eth[6], prices.twentyfifthWeek.sol[6], prices.twentyfifthWeek.atom[6]];
    const goodsArrangement = [40, 23, 22, 15];
    for (let i = 0; i < goodsArrangement.length; i++) {
        userBalance += goodsArrangement[i] / 100 * actualGoodsPrices[i];
    }
    for (let i = 0; i < pnl.length; i++) {
        totalProfit += pnl[i];
    }
    userBalance = userBalance.toFixed(2);
    const userData = {
        userName: "Helixon",
        goodsOwned: ["BTC", "ETH", "SOL", "ATOM"],
        goodsPricesAtBuying: goodsPricesAtBuying,
        actualGoodsPrices: actualGoodsPrices,
        goodsArrangement: goodsArrangement,
        pnl: pnl,
        totalProfit: totalProfit,
        createdAt: "09 03 2023",
        balance: `${userBalance} USD`
    }
    res.send(JSON.stringify(userData, actualGoodsPrices[0][6]));
}

module.exports = {
    deleteUser: deleteUser,
    createUser: createUser,
    findUser: findUser,
    userData: userData,
}