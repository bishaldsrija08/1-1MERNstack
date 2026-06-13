// DB Connection code goes here
const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://bishaldsrijal1_db_user:7EFXE7Hr6BD1D0Nx@cluster0.m2n9mg8.mongodb.net/?appName=Cluster0")
        console.log("DB Connected")
    } catch (error) {
        console.error("DB Connection Failed", error)
    }
}

module.exports = connectDB