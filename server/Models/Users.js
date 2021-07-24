const mongoose=require('mongoose'),Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

//Defining the Schema
const userSchema=new Schema({
    _id:{type:String,required:true},
    password:{type:String,required:true,set:bcryptPassword},
    type:{type:String,required:true}
})
//Bcrypt the password
function bcryptPassword(password){
    return bcrypt.hashSync(password,10)
}
//validating the password
userSchema.methods.validatePassword=function(password){
    return bcrypt.compareSync(password,this.password)
}
//Creating a model
const User=mongoose.model('Users',userSchema)
module.exports={User};
