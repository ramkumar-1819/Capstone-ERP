const mongoose=require('mongoose'),Schema=mongoose.Schema;

//Defining the Schema
const adminSchema=new Schema({
    name:{type:String,required:true},
    register_number:{type:String,required:true},
    date_of_birth:{type:String,required:true},
    email:{type:String,set:setValue},
    phone_number:{type:String,set:setValue},
    joining_year:{type:String,required:true},
    type:{type:String,default:'Admin'},
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
const Admin=mongoose.model('Admin',adminSchema);
module.exports={Admin};