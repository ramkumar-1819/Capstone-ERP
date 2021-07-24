//Creating Routes for Student Infos
const router=require('express').Router();
const multer=require('multer')
const ObjectId=require('mongoose').Types.ObjectId;
const {Faculty}=require('../Models/Faculty');
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
router.post('/AddFaculty',async(req,res)=>{
    try{
        const docs=await User.findOne({_id:req.body.register_number});
        if(docs!==null){
            return res.status(409).send({Error:`Registered Id already Exist`})
        }
        else{
            try{
                const newUser=await new User({
                    _id:req.body.register_number,
                    password:req.body.date_of_birth,
                    type:'Faculty'
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
        const newFaculty=await new Faculty(req.body);
        const document=await newFaculty.save();
        return res.send({User:document,message:"Created Successfully"})
    }
    catch(err){
        if(err.name==='ValidationError'){
            return res.status(409).send(err.message)
        }
        else{
            return res.sendStatus(500)
        }
    }
})
//GET FACULTY Profile
router.get('/FacultyProfile/:id',async(req,res)=>{
    try{
        const exist=await User.findById(req.params.id)
        if(exist===null){
            return res.status(409).send({Error:"Invalid ID"})
        }
        const facultyProfile=await Faculty.findOne({register_number:req.params.id});
        res.send(facultyProfile)
    }
    catch(err){
        res.sendStatus(500)
    }
})

//POST for GETFACULTIES
router.post('/getFaculties',async(req,res)=>{
    try{
        const faculties=await Faculty.find({department:req.body.department})
        res.send(faculties)
    }
    catch(err){
        res.sendStatus(500)
    }
})
//PATCH for Update the Faculty by Admin
router.patch('/updateFaculty/:id',async(req,res)=>{
    try{
        const oldData=await Faculty.findById(req.params.id)
        await User.findByIdAndRemove(oldData.register_number)
        const newUser=await new User({
            _id:req.body.register_number,
            password:req.body.date_of_birth,
            type:'Faculty'
        })
        await newUser.save()
        const updated=await Faculty.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        return res.send(updated)
    }
    catch(err){
        if(err.name==='ValidationError'){
            res.status(409).send(err.message)
        }
        res.sendStatus(500)
    }
})
//PATH for update the faculty Details by Faculty
router.patch('/updateFacultyDetails/:id',upload.single('dp'),async(req,res)=>{
    try{
        console.log(req.file)
        const exist=await Faculty.findOne({register_number:req.params.id})
        if(exist===null){
            return res.status(409).send("Invalid ID")
        }
        const newBody={...req.body,dp:req.file.path};
        const updated=await Faculty.findByIdAndUpdate(exist._id,{$set:newBody},{new:true})
        return res.send(updated)
    }
    catch(err){
            return res.sendStatus(500)
    }
})

//DELETE faculty
router.delete('/deleteFaculty/:id',async(req,res)=>{
    try{
        if(!ObjectId.isValid(req.params.id)){
           return res.status(409).send("The user with the specified ID does not exist." )
        }
        const oldData=await Faculty.findById(req.params.id)
        await User.findByIdAndRemove(oldData.register_number)
        const deletedFaculty=await Faculty.findByIdAndRemove(req.params.id)
        res.send(deletedFaculty)
    }
    catch(err){
        res.sendStatus(500)
    }
})
module.exports=router;