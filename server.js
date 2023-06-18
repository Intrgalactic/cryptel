const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const User = require('./models/user.model.js');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const {userData,createUser,deleteUser,findUser} = require('./controllers/usersController.js');
const {getPrices} = require('./controllers/priceController.js');
const corsOptions = {
    origin: "https://client-t6py.onrender.com/",
    optionsSuccessStatus: 200
}
dotenv.config();
async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected");
    }
    catch (err) {
        console.log(err);
    }
}

connectToDb();



app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/create-user',cors(corsOptions),createUser);

app.get('/user',cors(corsOptions),findUser);

app.delete("/delete-user",cors(corsOptions),deleteUser);

app.get('/api/prices',cors(corsOptions),getPrices);

app.get('/api/user-data',cors(corsOptions),userData);

app.listen(process.env.PORT || 8000);