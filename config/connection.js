// import mongoose from 'mongoose';

const mongoose = require('mongoose');

const connectDB = async (DATABASE_URL) =>{
    
    try{
        const DB_Option = {
            dbName: 'productChart',
        };

        await mongoose.connect(DATABASE_URL, DB_Option);
        console.log("Connectd Db  Sucessfully!!");
    }
    catch(err){
        console.log(err);
    }
};

module.exports = connectDB