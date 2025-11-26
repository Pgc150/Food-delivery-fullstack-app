import mongoose from "mongoose";

// define schema for user
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role: { type: String, default:"user" },
    cartData :{type:Object,default:{}},
},{minimize:false});

const userModel = mongoose.user || mongoose.model("user",userSchema);
export default userModel;