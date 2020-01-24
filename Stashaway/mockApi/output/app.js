"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var db_1 = require("./db/db");
var cors = require('cors');
var app = express();
app.use(cors());
app.get('/get100Data', function (req, res, next) {
    res.send({ "100Data": db_1.dataFrom0100 });
});
app.get('/get6040Data', function (req, res, next) {
    res.send({ "6040Data": db_1.dataFrom6040 });
});
var PORT = 3306;
app.listen(PORT, function () {
    console.log("server running on port " + PORT);
});
