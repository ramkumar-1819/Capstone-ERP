const mongoose=require('mongoose'),Schema=mongoose.Schema;

//Defining the Schema
const librarianSchema=new Schema({
    dp:{type:String,default:'uploads\\default_dp.jpg'},
    name:{type:String,required:true},
    register_number:{type:String,required:true},
    date_of_birth:{type:String,required:true},
    email:{type:String,required:true},
    contact_number:{type:String,set:setValue},
    joining_year:{type:String,required:true},
    address:{type:String,set:setValue},
    gender:{type:String,required:true},
    type:{type:String,default:'Librarian'}
})
function setValue(value){
    if(value===""){
        return "N/A";
    }
    else{
        return value;
    }
}
const Librarian=mongoose.model('Librarian',librarianSchema);
module.exports={Librarian};