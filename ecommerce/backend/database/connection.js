// DB Connection code goes here
const mongoose = require("mongoose")


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB Connected")
    } catch (error) {
        console.error("DB Connection Failed", error)
    }
}

module.exports = connectDB