const mongoose=require('mongoose'),Schema=mongoose.Schema;

//Defining the Schema
const timetableSchema=new Schema({
    timetable:{type:String,required:true},
    department:{type:String,required:true},
    year:{type:String,required:true},
    semester:{type:String,required:true},
    testName:{type:String,required:true}
})
const TimeTable=mongoose.model('TimeTable',timetableSchema);
module.exports={TimeTable};