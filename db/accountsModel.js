"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator = require('validator');
var mongoose = require('mongoose');
var cashSchema = new mongoose.Schema({
    date: Date,
    amount: Number,
    total: Number,
    balance: Number,
    item: String
});
var accountSchema = new mongoose.Schema({
    name: String,
    total: Number,
    balance: Number,
    type: String,
    item: String,
    transaction: [Number]
});
module.exports = mongoose.model("accounts", accountSchema);
