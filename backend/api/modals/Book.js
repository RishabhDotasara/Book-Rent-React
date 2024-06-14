const mongoose = require("mongoose")

const BookSchema = mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    // countInStock:{type:Number,required:true},
    imageUrl:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    rating:{type:Number,default:0},
    numReviews:{type:Number,default:0},
    tags:{type:Array,default:[]}
})

const Book = mongoose.model("Book",BookSchema);

module.exports = Book;