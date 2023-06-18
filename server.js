const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./models/user.model.js');
const path = require('path');
const uri = "mongodb+srv://mateusz:JVlBS0eSCfTtxN6V@cluster0.5bp3dmm.mongodb.net/";
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const {userData,createUser,deleteUser,findUser} = require('./controllers/usersController.js');
const {getPrices} = require('./controllers/priceController.js');

async function connectToDb() {
    try {
        await mongoose.connect(uri);
        console.log("Connected");
    }
    catch (err) {
        console.log(err);
    }
}

connectToDb();

dotenv.config();
app.use(express.static(path.join(__dirname, "/app/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/app/build', 'index.html'));
});
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/create-user',createUser);

app.get('/user',findUser);

app.delete("/delete-user",deleteUser);

app.get('/api/prices',getPrices);

app.get('/api/user-data',userData);

app.post('')
app.listen(process.env.PORT || 8000);