"use strict";
var mongooseSchema = require('mongoose');
var cashSchema = new mongooseSchema.Schema({
    date: Date,
    amount: Number,
    total: Number,
    balance: Number,
    item: String
});
var accountSchema = new mongooseSchema.Schema({
    name: String,
    total: Number,
    balance: Number,
    type: String,
    item: String,
    transaction: [Number]
});
module.exports = mongooseSchema.model("accounts", accountSchema);
