const { request } = require("express");
const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref: "User" , required : true},
    icome : {type: String},
    source: {type: String, required: true}, // Example: Salary, Freelance, etc.
    amount :{ type: Number, request: true},
    date: {type: Date, default: Date.now},
},{timestamps: true});

module.exports = mongoose.model("Income",IncomeSchema);