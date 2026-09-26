require('dotenv').config();
const express =require('express');
const mongoose=require('mongoose');
const app=express();
const BookRouter=require('./routes/Books.routes');
const UserRouter=require('./routes/Users.routes');
const httpStatusText=require('./utils/httpStatusText');
const cors=require('cors');
const path=require('path');

main().catch(err => console.log(err));
async function main()
{
await mongoose.connect(process.env.Mongo_url);
console.log('Successfuly');
}

app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(cors());
app.use(express.json());

app.use('/api/Books',BookRouter);
app.use('/api/Users',UserRouter);

app.use((req,res)=>{
        return res.status(404).json({status:httpStatusText.FAIL,message:"Request Not Found"});
});

app.use((error,req,res,next)=>
{
        res.status(500).json({status:httpStatusText.ERROR,message:error.message});
})
app.listen(process.env.port,()=>{
console.log("Listing on port 3002");
});