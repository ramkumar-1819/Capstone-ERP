//Creating Routes for Student Infos
const router=require('express').Router();
const multer=require('multer')
const ObjectId=require('mongoose').Types.ObjectId;
const {Librarian}=require('../Models/Librarian');
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
router.post('/AddLibrarian',async(req,res)=>{
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
                    type:'Librarian'
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
        const newLibrarian=await new Librarian(req.body);
        const document=await newLibrarian.save();
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
//GET for GETLIBRARIANS
router.get('/getLibrarians',async(req,res)=>{
    try{
        const students=await Librarian.find({})
        res.send(students)
    }
    catch(err){
        res.sendStatus(500)
    }
})
//PUT for Update Librarian
router.patch('/updateLibrarian/:id',async(req,res)=>{
    try{
        const oldData=await Librarian.findById(req.params.id)
        await User.findByIdAndRemove(oldData.register_number)
        const newUser=await new User({
            _id:req.body.register_number,
            password:req.body.date_of_birth,
            type:'Librarian'
        })
        await newUser.save()
        const updated=await Librarian.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        return res.send(updated)
    }
    catch(err){
        if(err.name==='ValidationError'){
            res.status(409).send(err.message)
        }
        res.sendStatus(500)
    }
})
//DELETE Librarian
router.delete('/deleteLibrarian/:id',async(req,res)=>{
    try{
        if(!ObjectId.isValid(req.params.id)){
           return res.status(409).send("The user with the specified ID does not exist." )
        }
        const oldData=await Librarian.findById(req.params.id)
        await User.findByIdAndRemove(oldData.register_number)
        const deletedLibrarian=await Librarian.findByIdAndRemove(req.params.id)
        res.send(deletedLibrarian)
    }
    catch(err){
        res.sendStatus(500)
    }
})
//GET for LIBRARIAN Profile
router.get('/LibrarianProfile/:id',async(req,res)=>{
    try{
        const exist=await User.findById(req.params.id)
        if(exist===null){
            return res.status(409).send("ID that you are requesting for a libraian is not found")
        }
        const librarianProfile=await Librarian.findOne({register_number:req.params.id});
        res.send(librarianProfile)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
//PATH for update the Librarian
router.patch('/updateLibrarianDetails/:id',upload.single('dp'),async(req,res)=>{
    try{
        console.log(req.file)
        const exist=await Librarian.findOne({register_number:req.params.id})
        if(exist===null){
            return res.status(409).send("Invalid ID")
        }
        const newBody={...req.body,dp:req.file.path};
        const updated=await Librarian.findByIdAndUpdate(exist._id,{$set:newBody},{new:true})
        return res.send(updated)
    }
    catch(err){
            return res.sendStatus(500)
    }
})
module.exports=router;