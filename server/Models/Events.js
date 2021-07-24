const mongoose=require('mongoose'),Schema=mongoose.Schema;

//Defining the Schema
const eventSchema=new Schema({
    name:{type:String,required:true},
    date_of_event:{type:String,required:true},
    event_image:{type:String,required:true}
})
const Event=mongoose.model('Event',eventSchema);
module.exports={Event};

