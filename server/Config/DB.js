const { connect } = require("mongoose");
const { appEnvs } = require("./env");

const { db } = appEnvs;

async function connectDB() {
    try {
        await connect(db);
        console.log("DB connected!")
    } catch (error) {
        console.log("Error while connecting DB:", error)
    }
}

module.exports = connectDB;