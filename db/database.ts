let mongoose = require('mongoose');

const dbUrl = "mongodb+srv://Ammavan:Ammavan@cluster0.kdjo2.mongodb.net/accounts?retryWrites=true&w=majority";

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                console.log("db connected")
            }).catch((err: any) => {
                console.error(err);
            })
    }
}

module.exports = new Database();