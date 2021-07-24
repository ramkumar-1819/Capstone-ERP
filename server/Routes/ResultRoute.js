//Creating Routes for Student Infos
const router=require('express').Router();
const ObjectId=require('mongoose').Types.ObjectId;
const {Result}=require('../Models/Result');
const {Student}=require('../Models/Student');
const {Subject}=require('../Models/Subjects');

//POST for Add a Result
router.post('/addResult/',async(req,res)=>{
    console.log(req.body)
    try{
        for(let students_Mark in req.body.studentMarks){
            const exist=await Result.findOne({subjectCode:req.body.subjectCode,testName:req.body.testName,student:students_Mark,currentSemester:req.body.semester}).populate('student');
            if(exist!==null){
                return res.status(409).send('Already Mark Entried for this Test and Subject')
            }
        }
        for(let students_Mark in req.body.studentMarks){
            const newResult=await new Result({
                student:students_Mark,
                marksObtained:req.body.studentMarks[students_Mark],
                subjectCode:req.body.subjectCode,
                subjectName:req.body.subjectName,
                testName:req.body.testName,
                totalMark:req.body.totalMark,
                currentSemester:req.body.semester
            })
            await newResult.save()
        }
    res.send('Result Published Successfully')
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
//populate() to get view nested documents
router.post('/getResult',async(req,res)=>{
    console.log(req.body)
    try{
        const result=await Result.find({subjectCode:req.body.subjectCode,testName:req.body.testName}).populate(['student']);
        const filtered=[]
        console.log(result)
        for(let filter of result){
            console.log(filter)
            if(filter.student.section===req.body.section && filter.student.year===req.body.year && filter.student.department===req.body.department && filter.currentSemester===req.body.semester){
                filtered.push(filter)
            }
        }
        res.send(filtered)
    }
    catch(err){
        res.sendStatus(500)
    }
})
//UPDATE 
router.put('/updateResult',async(req,res)=>{
    try{
        for(let ids in req.body.ids_marks){
            if(!ObjectId.isValid(ids)){
                return res.status(409).send("The Event id doesn't exist" )
             }
            const marks={marksObtained:req.body.ids_marks[ids]}
            await Result.findByIdAndUpdate(ids,{$set:marks},{new:true})
        }
        res.send('Marks Updated Successfully')
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
//DELETE
router.post('/deleteResult',async(req,res)=>{
    try{
        for(let id of req.body.ids){
            if(!ObjectId.isValid(id)){
                return res.status(409).send("The Event id doesn't exist" )
            }
            await Result.findByIdAndRemove(id)
        }
        res.send('Result Deleted Successfully')
    }
    catch(err){
        res.sendStatus(500)
    }
})
//VIEW MARK by STUDENT
router.post('/ViewMarks',async(req,res)=>{
    console.log(req.body)
    try{
        const marks=await Result.find(req.body).populate(['student']);
        console.log(marks)
        res.send(marks)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
module.exports=router