import { mongo } from "mongoose";

let validator = require('validator');
let mongoose = require('mongoose');
let cashSchema = new mongoose.Schema({
    date: Date,
    amount: Number,
    total: Number,
    balance: Number,
    item: String
});

let accountSchema = new mongoose.Schema({
    name: String,
    total: Number,
    balance: Number,
    type: String,
    item: String,
    transaction: [Number]
});

module.exports = mongoose.model("accounts", accountSchema);