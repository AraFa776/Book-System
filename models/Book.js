const mongoose=require('mongoose');
const {Schema}=mongoose;

const BookSchema=new Schema({
title:String,
author:String,
price:Number,
category:String,
publishedYear:Number
});

const Book=mongoose.model('Book',BookSchema);
module.exports=Book;
