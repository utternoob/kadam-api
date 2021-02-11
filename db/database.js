"use strict";
var mongoose = require('mongoose');
var dbUrl = "mongodb+srv://Ammavan:Ammavan@cluster0.kdjo2.mongodb.net/accounts?retryWrites=true&w=majority";
var Database = /** @class */ (function () {
    function Database() {
        this._connect();
    }
    Database.prototype._connect = function () {
        mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(function () {
            console.log("db connected");
        }).catch(function (err) {
            console.error(err);
        });
    };
    return Database;
}());
module.exports = new Database();
