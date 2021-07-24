const mongoose=require('mongoose'),Schema=mongoose.Schema;

//Defining the Schema
const bookSchema=new Schema({
    bookCode:{type:String,required:true},
    bookName:{type:String,required:true},
    issueDate:{type:String,required:true},
    returnDate:{type:String,required:true},
    student:{type:Schema.Types.ObjectId,ref:'Student',required:true},
})
const Book=mongoose.model('Book',bookSchema);
module.exports={Book};

