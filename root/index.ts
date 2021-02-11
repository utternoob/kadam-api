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
        res.sendStatus(500);
        console.log(error);
    }
});

//add new
app.post("/add/user", async(req: any, res: any) => {
    try {
        let userAccounts = new accountsModel({
            name: req.body.name, 
            total: req.body.total,
            balance: req.body.total,
            type: req.body.type,
            item: req.body.item,
            transaction: []
        });
        await userAccounts.save();
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});

//add transaction
app.post("/user/update/:id", async(req:any, res:any) => {
    let id = req.params.id;
    try {
        let accounts = await accountsModel.findById(id);
        let amount = req.body.transaction;
        let balance = accounts.balance - amount;
        accounts.balance = balance;
        accounts.transaction.push(amount);
        await accountsModel.update(accounts);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
});

//remove user account
app.delete("/user/delete/:id", async(req:any, res:any) => {
    let id = req.params.id;
    try {
        await accountsModel.findByIdAndRemove(id);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
})

const server = http.listen(process.env.PORT || 3000, () => {
    console.log('server started at', server.address().port);
})