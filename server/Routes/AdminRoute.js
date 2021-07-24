//Creating Routes for Admin Infos
const router=require('express').Router();
const multer=require('multer')
const ObjectId=require('mongoose').Types.ObjectId;
const {Admin}=require('../Models/Admin');
const {User}=require('../Models/Users');

//multer for saving image in server
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/' )
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype==='image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
var upload = multer({ 
    storage: storage,
    fileFilter:fileFilter
 })
//POST AdminDetails and Create Admin
router.post('/AddAdmin',async(req,res)=>{
    try{
        console.log(req.body)
        const docs=await User.findOne({_id:req.body.register_number});
        console.log(docs)
        if(docs!==null){
            return res.status(409).send({Error:`Registered Id already Exist`})
        }
        else{
            try{
                const newUser=await new User({
                    _id:req.body.register_number,
                    password:req.body.date_of_birth,
                    type:req.body.type
                })
                await newUser.save()
            }
            catch(err){
                if(err.name==='ValidationError'){
                    return res.status(409).send({Error:err.message})
                }
                else{
                    return res.sendStatus(500)
                }
            }
        }
        const newAdmin=await new Admin(req.body);
        const document=await newAdmin.save();
        return res.send({User:document,message:"Created Successfully"})
    }
    catch(err){
        if(err.name==='ValidationError'){
            return res.status(409).send({Error:err.message})
        }
        else{
            return res.sendStatus(500)
        }
    }
})
//GET Admin Profile
router.get('/AdminProfile/:id',async(req,res)=>{
    try{
        const exist=await User.findById(req.params.id)
        if(exist===null){
            return res.status(409).send({Error:"Invalid ID"})
        }
        const adminProfile=await Admin.findOne({register_number:req.params.id});
        res.send(adminProfile)
    }
    catch(err){
        res.sendStatus(500)
    }
})

//PUT for Update Admin Profile
router.patch('/UpdateAdmin/:id',upload.single('dp'),async(req,res)=>{
    try{
        console.log(req.file)
        const exist=await Admin.findOne({register_number:req.params.id})
        if(exist===null){
            return res.status(409).send({Error:"Invalid ID"})
        }
        const newBody={...req.body,dp:req.file.path};
        const updated=await Admin.findByIdAndUpdate(exist._id,{$set:newBody},{new:true})
        return res.send(updated)
    }
    catch(err){
            return res.sendStatus(500)
    }
})
module.exports=router;