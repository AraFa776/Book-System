const jwt=require('jsonwebtoken');
const httpStatusText=require('../utils/httpStatusText');
const verfiyToken=(req,res,next)=>{
    const authHeader=req.headers['Authorization']|| req.headers['authorization'];

    if(!authHeader)
    {
return res.status(401).json({status:httpStatusText.ERROR,message:"Invlaid decoded Token"});    
    }
    const token=authHeader.split(' ')[1];
    try{
   const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY);
   req.decodedToken=decodedToken;
    next();
    }catch(err)
    {
return res.status(401).json({status:httpStatusText.ERROR,message:"Invlaid decoded Token"});    
}
};

module.exports=verfiyToken;