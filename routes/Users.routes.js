const express=require('express');
const router=express.Router();
const Usercontroller=require('../Controller/Users-controller');
const verfiyToken=require('../Middleware/verfiyToke');
const multer=require('multer');
const diskStorage=multer.diskStorage({
    destination: function(req,file,cb)
    {
        cb(null,'uploads')
    },
    filename:function(req,file,cb)
    {
        const ext=file.mimetype.split('/')[1];
        const fileName=`user-${Date.now()}.${ext}`;
        cb(null,fileName);
    }
})
const fileFilter=(req,file,cb)=>
{
    const imageType=file.mimetype.split('/')[0];
    if(imageType==='image')
    {
        return cb(null,true)
    }
    else 
    {
        return cb("The file must be Image",false);
    }
};
const upload=multer({storage:diskStorage,fileFilter});
// get all users
router.route('/').get(verfiyToken,Usercontroller.getAllUsers);
// register
router.route('/Register')
    .post(upload.single('avatar'), Usercontroller.register);
// login
router.route('/Login').post(Usercontroller.login);

module.exports=router;