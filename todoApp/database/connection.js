const mongoose = require('mongoose');

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://bishaldsrijal1_db_user:Nb5Z5Dt9iD4vZJi6@cluster0.fiviebf.mongodb.net/?appName=Cluster0")
    console.log("Database Connected");
}

module.exports = connectDB;