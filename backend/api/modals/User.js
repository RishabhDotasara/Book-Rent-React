const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    isAdmin:{type:Boolean,required:true, default:false},
})

//now we will be adding a sort of middleware in between the save function, where we will hash the password before saving.
UserSchema.pre("save",function (next){
    bcrypt.hash(this.password, 10, (err, hash)=>{
        if (err) return next(err);
        this.password = hash;
        next()
    })
})

const User = mongoose.model("User",UserSchema);
module.exports = User;