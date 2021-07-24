const mongoose=require('mongoose'),Schema=mongoose.Schema;


//Defining the Schema
const resultSchema=new Schema({
    student:{type:Schema.Types.ObjectId,ref:'Student',required:true},
    subjectCode:{type:String,required:true},
    subjectName:{type:String,required:true},
    totalMark:{type:String,required:true},
    testName:{type:String,required:true},
    currentSemester:{type:String,required:true},
    marksObtained:{type:String,set:setValue}
})
function setValue(value){
    if(value===""){
        return "AB";
    }
    else{
        return value;
    }
}

const Result=mongoose.model('Result',resultSchema);
module.exports={Result};