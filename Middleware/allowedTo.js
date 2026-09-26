module.exports=(...roles)=>
{
    return (req,res,next)=>
    {
       if(!roles.includes(req.decodedToken.role))
       {
 return res.status(403).json({
                status: 'error',
                message: 'You are not allowed to perform this action'
            });       }
        next();
    }
}