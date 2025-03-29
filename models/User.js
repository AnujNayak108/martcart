import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    _id:{type : String , required : true},
    _name:{type : String , required : true},
    _email:{type : String , required : true, unique : true},
    imageurl:{type : String , required : true},
    cartitems:{type : Object , default: {}},
}, {minimize:false})

const User = mongoose.model.user || mongoose.model('user' , userSchema)

export default User
