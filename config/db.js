/* File to connect to DB */

// Dependencies
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: true
        });

        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in connecting to DB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;