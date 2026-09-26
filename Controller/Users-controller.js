const User=require('../models/User');
const httpStatusText=require('../utils/httpStatusText');
const generateJWT=require('../utils/generateJWT');
const asyancWrapper=require('../Middleware/asyancWrapper');
const bcrypt=require('bcryptjs');

const getAllUsers=asyancWrapper(async(req,res)=>
{
    const query=req.query;
    const limit=query.limit||10;
    const page=query.page||1;
    const skip=(page-1)*limit;
const Users=await User.find({},{"__v":false,'Password':false}).limit(limit).skip(skip);
res.json({status:httpStatusText.SUCCEES,data:{Users}});
});


const register= asyancWrapper(async(req,res)=>
{
const {firstName,lastName,email,Password,role}=req.body;
const oldUser=await User.findOne({email:email});
if(oldUser)
{
    return res.status(400).json({status:httpStatusText.ERROR,message:"User Is already Found"});
}
// password hasing
const hasedPassword=await bcrypt.hash(Password,10);
const newUser=new User({
    firstName,
    lastName,
    email,
   Password:hasedPassword,
   role,
   avatar:req.file.filename
})

// generate Token
const token=await generateJWT({email:newUser.email,id:newUser._id,role:newUser.role});
newUser.token=token;
await newUser.save();


    res.status(201).json({status:httpStatusText.SUCEES,data:{newUser}});
});


const login=asyancWrapper(async(req,res)=>
{
const {email,Password}=req.body;
if(!email || !Password)
{
     return res.status(400).json({status:httpStatusText.ERROR,message:"Email and Password are required"});   
}
const user=await User.findOne({email:email});
const matchedPassword=await bcrypt.compare(Password,user.Password);
if(user&&matchedPassword)
{
    const token=await generateJWT({email:user.email,id:user._id,role:user.role});
        res.status(200).json({status:httpStatusText.SUCEES,data:{token}});
}
else
{
      return res.status(500).json({status:httpStatusText.ERROR,message:"SomeThing Wrong "});      
}
});

module.exports={
    getAllUsers,
    register,
    login
}