const mongoose=require('mongoose'),Schema=mongoose.Schema;
const {Subject}=require('./Subjects');
const {Student}=require('./Student');

//Defining the Schema
const attendenceSchema=new Schema({
    subjectCode:{type:String,required:true},
    subjectName:{type:String,required:true},
    student:{type:Schema.Types.ObjectId,ref:'Student',required:true},
    totalLecturesDone:{type:Number,required:true},
    attendedLectures:{type:Number,required:true},
    currentSemester:{type:String,required:true}
})
const Attendence=mongoose.model('Attendence',attendenceSchema);
module.exports={Attendence};

