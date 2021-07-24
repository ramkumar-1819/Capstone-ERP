//Creating Routes for Admin Infos
const router=require('express').Router();
const multer=require('multer')
const ObjectId=require('mongoose').Types.ObjectId;
const {TimeTable}=require('../Models/TimeTable');
const path=require('path')
const fs=require('fs');

//multer for saving image in server
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/' )
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })
var upload = multer({ 
    storage: storage
})
//POST a TimeTable
router.post('/addTimeTable',upload.single('timetable'),async(req,res)=>{
    try{
       const exist=await TimeTable.findOne(req.body);
       if(exist!==null){
        const timeTablepath=path.join(__dirname,`../${req.file.path}`);
        console.log(timeTablepath)
        fs.unlinkSync(timeTablepath)
        return res.status(409).send('TimeTable Aready Exist')
       }
        const newTimeTable=await new TimeTable({
            ...req.body,
            timetable:req.file.path
        })
        await newTimeTable.save()
        res.send('TimeTable Uploaded Successfully')
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
//Get timetable
router.post('/getTimeTable',async(req,res)=>{
  try{
    console.log(req.body)
    const timeTable=await TimeTable.find(req.body);
    console.log(timeTable)
    res.send(timeTable)
  }
  catch(err){
    console.log(err)
    res.sendStatus(500)
  }
})
//DELETE
router.delete('/TimeTable/:id',async(req,res)=>{
  try{
    const timetable=await TimeTable.findByIdAndRemove(req.params.id);
    const timeTablepath=path.join(__dirname,`../${timetable.timetable}`);
    console.log(timeTablepath)
    fs.unlinkSync(timeTablepath)
    res.send('TimeTable Deleted SuccessFully')
  }
  catch(err){
    console.log(err)
  }
})
module.exports=router