const mongoose = require('mongoose')

async function connectDB (url) {

    try {
        await mongoose.connect(url)
        console.log("Database Connected.");
    } catch (error) {
        console.log("Database connection error:", error);
    }
}

module.exports = connectDB