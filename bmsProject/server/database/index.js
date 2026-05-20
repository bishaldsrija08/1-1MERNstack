const mongoose = require("mongoose")
// DB connection
const dbURI = "mongodb+srv://bishaldsrijal1_db_user:Nb5Z5Dt9iD4vZJi6@cluster0.fiviebf.mongodb.net/?appName=Cluster0"

async function connectToDb() {
    try {
        await mongoose.connect(dbURI)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}

module.exports = connectToDb; // exporting the connectToDb function to be used in other parts of the application