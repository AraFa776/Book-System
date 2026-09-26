let Book=require('../models/Book');
const httpStatusText=require('../utils/httpStatusText');
const asyancWrapper=require('../Middleware/asyancWrapper');
const getAllBooks=asyancWrapper(async(req,res)=>
{
    const query=req.query;
    const limit=query.limit||10;
    const page=query.page||1;
    const skip=(page-1)*limit;
const Books=await Book.find({},{"__v":false}).limit(limit).skip(skip);
res.json({status:httpStatusText.SUCCEES,data:{Books}});
});

const  getSingleBook= asyancWrapper(
async(req,res)=>
{

    const book= await Book.findById(req.params.id);
    if(!book)
    {
        return res.status(404).json({status:httpStatusText.FAIL,data:{Book:"Book Not Found"}});
    }
    res.json({status:httpStatusText.SUCEES,data:{book}});
});

const CreatBook=asyancWrapper(async(req,res)=>
{
const NewBook=new Book({...req.body});
   await NewBook.save();
    res.status(201).json({status:httpStatusText.SUCEES,data:{NewBook}});
});

const UpdateWhole=asyancWrapper(
async(req,res)=>
{

    const book=await Book.findOneAndUpdate({_id:req.params.id},{$set:{...req.body}},{new:true});
     if(!book)
     {
         return res.status(404).json({status:httpStatusText.FAIL,data:{Book:"Book Not Found"}});
     }
    res.status(200).json({status:httpStatusText.SUCEES,data:{book}});
});


const UpdatePart=asyancWrapper(
async(req,res)=>
{
    const book= await Book.findById(req.params.id);
     if(!book)
     {
         return res.status(404).json({status:httpStatusText.FAIL,data:{Book:"Book Not Found"}});
     }
    if(req.body.title!==undefined)
    book.title=req.body.title;
    if(req.body.author!==undefined)
    book.author=req.body.author;
    if(req.body.category!==undefined)
    book.category=req.body.category;
    if(req.body.price!==undefined)
    book.price=req.body.price;
    if(req.body.publishedYear!==undefined)
    book.publishedYear=req.body.publishedYear;
await book.save();
    res.status(200).json(book);
});

const DeleteBook=asyancWrapper( async(req,res)=>
{
  const book=await Book.findByIdAndDelete(req.params.id);
    if(!book)
    {
        return res.status(404).json({status:httpStatusText.FAIL,data:{Book:"Book Not Found"}});
    }
   res.json({status:httpStatusText.SUCEES,data:null});
});

module.exports={
 getAllBooks,
 getSingleBook,
 CreatBook,
 UpdateWhole,
 UpdatePart,
 DeleteBook  
};