/* Basic express setup file */

// Dependencies
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// set dotenv
dotenv.config({
    path: './config/config.env'
});

// Connect to DB
const connectDB = require('./config/db.js');
connectDB();

// init express
const app = express();

// init cors
app.use(cors());

// init bodyparser
app.use(express.json());

// morgan
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// ROUTE Settings
app.use('/api/v1/items', require('./routes/Item'));
app.use('/api/v1/users', require('./routes/User'));

// listen to server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`);
});