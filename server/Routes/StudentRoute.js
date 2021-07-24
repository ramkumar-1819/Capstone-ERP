//Creating Routes for Student Infos
const router=require('express').Router();
const multer=require('multer')
const ObjectId=require('mongoose').Types.ObjectId;
const {Student}=require('../Models/Student');
const {User}=require('../Models/Users');
const {Attendence}=require('../Models/Attendence');
const {Result}=require('../Models/Result');
const {Book}=require('../Models/Books');

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
router.post('/AddStudent',async(req,res)=>{
    try{
        const docs=await User.findOne({_id:req.body.register_number});
        if(docs!==null){
            return res.status(409).send(`Registered Id already Exist`)
        }
        else{
            try{
                const newUser=await new User({
                    _id:req.body.register_number,
                    password:req.body.date_of_birth,
                    type:'Student'
                })
                await newUser.save()
            }
            catch(err){
                if(err.name==='ValidationError'){
                    return res.status(409).send(err.message)
                }
                else{
                    return res.sendStatus(500)
                }
            }
        }
        const newStudent=await new Student(req.body);
        const document=await newStudent.save();
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
//POST for GETSTUDENTS
router.post('/getStudents',async(req,res)=>{
    try{
        console.log(req.body)
        const students=await Student.find(req.body)
        console.log(students)
        res.send(students)
    }
    catch(err){
        res.sendStatus(500)
    }
})
//PUT for Update Student
router.patch('/updateStudent/:id',async(req,res)=>{
    try{
        console.log(req.body)
        const oldData=await Student.findById(req.params.id)
        await User.findByIdAndRemove(oldData.register_number)
        const newUser=await new User({
            _id:req.body.register_number,
            password:req.body.date_of_birth,
            type:'Student'
        })
        await newUser.save()
        const updated=await Student.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        return res.send(updated)
    }
    catch(err){
        if(err.name==='ValidationError'){
            res.status(409).send(err.message)
        }
        res.sendStatus(500)
    }
})
//DELETE student
router.delete('/deleteStudent/:id',async(req,res)=>{
    try{
        if(!ObjectId.isValid(req.params.id)){
            return res.status(409).send("The user with the specified ID does not exist." )
        }
        const oldData=await Student.findById(req.params.id)
        await User.findByIdAndRemove(oldData.register_number)
        const allAttendence=await Attendence.find({student:req.params.id})
        for(let attendence of allAttendence){
            await Attendence.findByIdAndRemove(attendence._id)
        }
        const allResult=await Result.find({student:req.params.id})
        for(let result of allResult){
            await Result.findByIdAndRemove(result._id)
        }
        const allBooks=await Book.find({student:req.params._id});
        for(let books of allBooks){
            await Book.findByIdAndRemove(books._id)
        }
        const deletedStudent=await Student.findByIdAndRemove(req.params.id)
        res.send(deletedStudent)
    }
    catch(err){
        res.sendStatus(500)
    }
})
//GET to get all the Sections of requested Department
router.get('/getSections/:department/:year/:semester',async(req,res)=>{
    try{
        const students=await Student.find({department:req.params.department,year:req.params.year,semester:req.params.semester});
        const sections=[];
        students.forEach(value=>{
            if(sections.indexOf(value.section)<0){
                sections.push(value.section)
            }
        })
        res.send(sections)
    }
    catch(err){
        res.sendStatus(500)
    }
})
//GET - for Up one Year
router.get('/Semup',async(req,res)=>{
    try{
        const allStudents=await Student.find();
        for(let student of allStudents){
            if(Number(student.semester)%2===0){
                if(Number(student.year)===4){
                    await User.findByIdAndRemove(student.register_number)
                    await Student.findByIdAndRemove(student._id)
                    const allBooks=await Book.find({student:student._id});
                    for(let books of allBooks){
                        await Book.findByIdAndRemove(books._id)
                    }
                    const allAttendence=await Attendence.find({student:student._id})
                    for(let attendence of allAttendence){
                        await Attendence.findByIdAndRemove(attendence._id)
                    }
                    const allResult=await Result.find({student:student._id})
                    for(let result of allResult){
                        await Result.findByIdAndRemove(result._id)
                    }
                }
                else{
                    student.year=Number(student.year)+1;
                    student.semester=Number(student.semester)+1;
                    await student.save()
                }
            }
            else{
                student.semester=Number(student.semester)+1;
                await student.save()
            }
        }
        res.send('Students Updated to next Semester')
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
//GET for STUDENT Profile
router.get('/StudentProfile/:id',async(req,res)=>{
    try{
        const exist=await User.findById(req.params.id)
        if(exist===null){
            return res.status(409).send("ID that you are requesting for a student is not found")
        }
        const studentProfile=await Student.findOne({register_number:req.params.id});
        res.send(studentProfile)
    }
    catch(err){
        res.sendStatus(500)
    }
})
//PATH for update the Student
router.patch('/updateStudentDetails/:id',upload.single('dp'),async(req,res)=>{
    try{
        console.log(req.file)
        const exist=await Student.findOne({register_number:req.params.id})
        if(exist===null){
            return res.status(409).send("Invalid ID")
        }
        const newBody={...req.body,dp:req.file.path};
        const updated=await Student.findByIdAndUpdate(exist._id,{$set:newBody},{new:true})
        return res.send(updated)
    }
    catch(err){
            return res.sendStatus(500)
    }
})

module.exports=router;