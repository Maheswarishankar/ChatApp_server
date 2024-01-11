const mongoose = require("mongoose")

const connection_DB = async () => {
    try {

        const connect = await mongoose.connect(process.env.MONGO_URL)

        console.log(`MongoDB Connected:${connect.connection.host}`.blue.underline)

    } catch (error) {
        console.log(error)

    }
}
module.exports = connection_DB;