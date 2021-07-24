const mongoose=require('mongoose'),Schema=mongoose.Schema;

//Defining the Schema
const studentSchema=new Schema({
    name:{type:String,required:true},
    register_number:{type:String,required:true},
    date_of_birth:{type:String,required:true},
    email:{type:String,required:true},
    contact_number:{type:String,set:setValue},
    department:{type:String,required:true},
    year:{type:String,required:true},
    semester:{type:String,required:true},
    section:{type:String,required:true},
    fathername:{type:String,set:setValue},
    address:{type:String,set:setValue},
    gender:{type:String,required:true},
    type:{type:String,default:'Student'},
    dp:{type:String,default:'uploads\\default_dp.jpg'}
})
function setValue(value){
    if(value===""){
        return "N/A";
    }
    else{
        return value;
    }
}
const Student=mongoose.model('Student',studentSchema);
module.exports={Student};