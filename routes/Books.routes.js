const BookController=require('../Controller/Books-controller');
const validation=require('../Middleware/Validator');
const {body,param}=require('express-validator');
const express=require('express');
const verify=require('../Middleware/verfiyToke');
const Role = require('../utils/roles');
const router=express.Router();
const allowedTo=require('../Middleware/allowedTo');
router.route('/').get(BookController.getAllBooks).post(verify,allowedTo(Role.MANGER),body('title').notEmpty(),body('author').notEmpty(),body('publishedYear').isNumeric(),body('category').notEmpty(),body('price').notEmpty().isNumeric(),validation,BookController.CreatBook);

router.route('/:id').get(param('id').isMongoId(),BookController.getSingleBook)
.put(param('id').isMongoId(),body('title').notEmpty(),body('author').notEmpty(),body('publishedYear').isNumeric(),body('category').notEmpty(),body('price').notEmpty().isNumeric(),validation,BookController.UpdateWhole)
.patch(param('id').isMongoId(),body('price').optional().isNumeric(),validation,BookController.UpdatePart)
.delete(verify,allowedTo(Role.ADMIN,Role.MANGER),param('id').isMongoId(),validation,BookController.DeleteBook);

module.exports=router;