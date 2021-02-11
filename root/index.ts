const express = require('express');
const app = express();
const body_parser = require('body-parser')
const http = require('http').Server(app);
let accountsModel = require('../db/accountsModel');
let _mongoose = require('mongoose');
let database = require('../db/database');

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: false}));

_mongoose.Promise = Promise;

//fetch all
app.get("/fetch/users/all", async(req:any, res:any) => {
    try {
        res.send(await accountsModel.find());
    } catch (error) {
        res.send(500);
        console.log(error);
    }
});

//add new
app.post("/add/user", async(req: any, res: any) => {
    try {
        let userAccounts = new accountsModel({
            name: req.name, 
            total: req.total,
            balance: req.total,
            type: req.type,
            item: req.item,
            transactions: []
        });
        await userAccounts.save();
        res.status(200);
    } catch (error) {
        res.send(500);
        console.log(error);
    }
});

//add transaction
app.post("/user/update/:id", async(req:any, res:any) => {
    let id = req.params.id;
    try {
        let accounts = await accountsModel.findById(id);
        let amount = req.transaction;
        let balance = accounts.balance - amount;
        accounts.balance = balance;
        accounts.transaction.push(amount);
        await accountsModel.update(accounts);
        res.status(200);
    } catch (error) {
        res.send(500);
        console.log(error);
    }
});

//remove user account
app.delete("/user/delete/:id", async(req:any, res:any) => {
    let id = req.params.id;
    try {
        await accountsModel.findByIdAndRemove(id);
        res.status(200);
    } catch (error) {
        res.send(500);
        console.log(error);
    }
})

const server = http.listen(3000, () => {
    console.log('server started at', server.address().port);
})