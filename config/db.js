const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {});
        console.log("Connected DB !!!");
    }catch(error){
        console.log("Error: " + error);
        process.exit(1);
    }
};

module.exports = connectDB;