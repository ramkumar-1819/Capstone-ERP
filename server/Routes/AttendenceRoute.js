//Creating Routes for Student Infos
const router=require('express').Router();
const ObjectId=require('mongoose').Types.ObjectId;
const {Attendence}=require('../Models/Attendence');
const {Student}=require('../Models/Student');
const {Subject}=require('../Models/Subjects');

//POST to post attendence detail
router.post('/addAttendence/',async(req,res)=>{
    try{
        console.log(req.body)
        //allStudent get all student based on department,year,section
        const allStudent=await Student.find({department:req.body.department,year:req.body.year,semester:req.body.semester,section:req.body.section});
        //hold all students id based on department,year,section.
        const allStudentId=[]
        allStudent.forEach((data,index)=>{
            allStudentId.push(String(data._id))
        })
        //Then based on req.body student ids and allStudent ids that
        //we got,we are marking the attendence.
        allStudentId.forEach(async(ids,index)=>{
            if(req.body.studentIds.indexOf(ids)!==-1){ //Means Student is Present
                const exist=await Attendence.findOne({student:ids,subjectCode:req.body.subjectCode});
                if(exist===null){ //Means attendence is marking for the firstTime.
                    const student=await Student.findById(ids);
                    const subject=await Subject.findOne({subjectCode:req.body.subjectCode});
                    const attendence={student:student,subjectCode:req.body.subjectCode,subjectName:subject.subjectName,totalLecturesDone:1,attendedLectures:1,currentSemester:req.body.semester};
                    const newAttendence=await new Attendence(attendence)
                    await newAttendence.save()
                }
                else{            //Means attendence is marking after 1st time.
                    exist.totalLecturesDone+=1
                    exist.attendedLectures+=1
                    await exist.save()
                }
            }
            else{ //Means if Student is Absent
                const exist=await Attendence.findOne({student:ids,subjectCode:req.body.subjectCode});
                if(exist===null){     //Means attendence is marking for the 1st time.
                    const student=await Student.findById(ids);
                    const subject=await Subject.findOne({subjectCode:req.body.subjectCode});
                    const attendence={student:student,subjectCode:req.body.subjectCode,subjectName:subject.subjectName,totalLecturesDone:1,attendedLectures:0,currentSemester:req.body.semester};
                    const newAttendence=await new Attendence(attendence)
                    await newAttendence.save()
                }
                else{   //Means attendence is marking after 1st time.
                    exist.totalLecturesDone+=1
                    await exist.save()
                }
            }
        })
        res.send('Attendence Marked Successfully')
    }
    catch(err){
        res.sendStatus(500)
    }
})
//populate() to get view nested documents
router.post('/getAttendence',async(req,res)=>{
    console.log(req.body)
    try{
        const attendence=await Attendence.find({subjectCode:req.body.subjectCode}).populate(['student']);
        const filtered=[]
        for(let filter of attendence){
            if(filter.student.section===req.body.section && filter.student.year===req.body.year){
                filtered.push(filter)
            }
        }
        console.log(filtered)
        res.send(filtered)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
//VIEW ATTENDENCE by STUDENT
router.post('/ViewAttendence',async(req,res)=>{
    console.log(req.body)
    try{
        const marks=await Attendence.find(req.body).populate(['student']);
        console.log(marks)
        res.send(marks)
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
module.exports=router;