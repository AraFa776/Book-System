const mongoose=require('mongoose');
const validator=require('validator');
const Role=require('../utils/roles');
const UserSchema=new mongoose.Schema({
firstName:{
    type:String,
    required:true
},
lastName:{
  type:String,
    required:true   
},
email:{
     type:String,
    required:true,
    unique:true,
    validate:[validator.isEmail,"filed must be valid Email"]
},
Password:{
  type:String,
    required:true   
},
token:{
  type:String
}
,role:{
  type:String,
  enum:[Role.ADMIN,Role.MANGER,Role.USER],
  default:Role.USER
},
avatar:{
  type:String,
  default:'uploads/profile.png'
}
});
const User=mongoose.model('User',UserSchema);
module.exports=User;