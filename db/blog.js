const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blog = new Schema({
title:String,
introduction:String,
author:String,
editor:String});

module.exports = mongoose.model('Blog', blog);