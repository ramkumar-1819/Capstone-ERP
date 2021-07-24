const mongoose=require('mongoose'),Schema=mongoose.Schema;

//Defining the Schema
const subjectSchema=new Schema({
    subjectName:{type:String,required:true},
    subjectCode:{type:String,required:true,uppercase:true},
    subjectDepartment:{type:String,required:true},
    subjectYear:{type:Number,required:true},
    subjectSemester:{type:Number,required:true}
})
const Subject=mongoose.model('Subject',subjectSchema);
module.exports={Subject};