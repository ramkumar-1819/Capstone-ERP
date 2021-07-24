//Creating Routes for Student Infos
const router=require('express').Router();
const ObjectId=require('mongoose').Types.ObjectId;
const {Subject}=require('../Models/Subjects')

//POST for adding a subject
router.post('/addSubject',async(req,res)=>{
    try{
        const exist=await Subject.find({subjectDepartment:req.body.subjectDepartment,subjectCode:req.body.subjectCode,subjectYear:req.body.subjectYear,subjectSemester:req.body.subjectSemester})
        if(exist.length!==0){
            return res.status(409).send('SUBJECTCODE Already Taken')
        }
        const newSubject=await new Subject(req.body);
        const document=await newSubject.save();
        res.send({Subject:document})
    }
    catch(err){
        console.log(err)
        if(err.name==='ValidationError'){
            return res.status(409).send(err.message)
        }
        else{
            return res.sendStatus(500)
        }
    }
})

//POST for get the subjects

router.post('/getSubjects',async(req,res)=>{
    try{
        console.log(req.body)
        const subjects=await Subject.find(req.body)
    res.send(subjects)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }      
})

//PATCH for upadating Subjects
router.patch('/updateSubject/:id',async(req,res)=>{
    try{
        if(!ObjectId.isValid(req.params.id)){
            return res.status(409).send("The user with the specified ID does not exist." )
        }
        const updatedSubject=await Subject.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.send(updatedSubject)
    }
    catch(err){
        res.sendStatus(500)
    }
})
//DELETE for deleting a subject
router.delete('/deleteSubject/:id',async(req,res)=>{
    try{
        if(!ObjectId.isValid(req.params.id)){
            return res.status(409).send("The user with the specified ID does not exist." )
        }
        const updatedSubject=await Subject.findByIdAndRemove(req.params.id)
        res.send(updatedSubject)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
//GET to get all the Subjects of requested Department and year
router.get('/getSubjects/:department/:year',async(req,res)=>{
    try{
        const subjects=await Subject.find({subjectDepartment:req.params.department,subjectYear:req.params.year});
        res.send(subjects)
    }
    catch(err){
        res.sendStatus(500)
    }
})
module.exports=router