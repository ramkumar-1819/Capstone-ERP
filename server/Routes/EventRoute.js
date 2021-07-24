//Creating Routes for Student Infos
const router=require('express').Router();
const multer=require('multer')
const ObjectId=require('mongoose').Types.ObjectId;
const {Librarian}=require('../Models/Librarian');
const {Admin}=require('../Models/Admin');
const {Student}=require('../Models/Student');
const {Faculty}=require('../Models/Faculty');
const {Event}=require('../Models/Events')
const nodemailer=require('nodemailer');

//multer for saving image in server
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads/' )
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype==='image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
var upload = multer({ 
    storage: storage,
    fileFilter:fileFilter
 })
//POST AdminDetails and Create Admin
router.post('/addEvents',upload.single('event_image'),async(req,res)=>{
    try{
        const newEvent=await new Event({
                name:req.body.name,
                date_of_event:req.body.date_of_event,
                event_image:req.file.path
        })
        const mailIds=[];
        const students=await Student.find({})
        const faculties=await Faculty.find({});
        const admins=await Admin.find({});
        const librarians=await Librarian.find({});
        
        students.forEach(value=>mailIds.push(value.email))
        faculties.forEach(value=>mailIds.push(value.email))
        admins.forEach(value=>mailIds.push(value.email))
        librarians.forEach(value=>mailIds.push(value.email))
        const allMails=mailIds.toString();
        const transporter =nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.user,
            pass: process.env.pass
          }
        });
        
        const mailOptions = {
          from: 'rohitramkumar007@gmail.com',
          to: allMails,
          subject: `${req.body.name} Event`,
          attachments: [{
            filename: req.file.filename,
            path: req.file.path,
            cid:'unique@kreata.ee'
        }],
          html: `<h1>${req.body.name}</h1>
                <p>Hey Jeppiaarites,we are happy to inform that ${req.body.name} event is going to 
                 held on ${req.body.date_of_event} in our College so Kindly participate and Enjoy.</p>
                 <img src="cid:unique@kreata.ee" style="width:200px;height:200px" alt='Event_Image'></img>`
        };
        await transporter.sendMail(mailOptions);
        try{
          await newEvent.save();
          return res.send("Event Created and mail sent to all")
        }
        catch(err){
            if(err.name==='ValidationError'){
              return res.status(409).send(err.message)
            }
            else{
                return res.sendStatus(500)
            }
        }
    }
    catch(err){
      console.log(err)
        res.status(404).send("Failed to Send mail please try later")
    }
})
        
    
//GET for GETEVENTS
router.get('/viewEvents',async(req,res)=>{
    try{
        const events=await Event.find({})
        events.sort(function(event_1,event_2){
            return new Date(event_1.date_of_event) - new Date(event_2.date_of_event);
        });
        res.send(events)
    }
    catch(err){
        res.sendStatus(500)
    }
})
//DELETE for cancel Event
router.delete('/cancelEvent/:id',async(req,res)=>{
  try{
          if(!ObjectId.isValid(req.params.id)){
            return res.status(409).send("The Event id doesn't exist" )
        }
        const cancellingEvent=await Event.findById(req.params.id)
        const mailIds=[];
        const students=await Student.find({})
        const faculties=await Faculty.find({});
        const admins=await Admin.find({});
        const librarians=await Librarian.find({});
        
        students.forEach(value=>mailIds.push(value.email))
        faculties.forEach(value=>mailIds.push(value.email))
        admins.forEach(value=>mailIds.push(value.email))
        librarians.forEach(value=>mailIds.push(value.email))
        const allMails=mailIds.toString();
        const transporter =nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.user,
            pass: process.env.pass
          }
        });
        
        const mailOptions = {
          from: 'rohitramkumar007@gmail.com',
          to: allMails,
          subject: `Cancelling ${cancellingEvent.name} Event`,
          attachments: [{
            path: cancellingEvent.event_image,
            cid:'unique@kreata.ee'
        }],
          html: `<h1>${cancellingEvent.name} Event Cancelling</h1>
                <p>Hey Jeppiaarites,we are sad to inform that ${cancellingEvent.name} event arranged 
                 on ${cancellingEvent.date_of_event} in our College is cancelled due to some reasons.</p>
                 <img src="cid:unique@kreata.ee" style="width:200px;height:200px" alt='Event_Image'></img>`
        };
        await transporter.sendMail(mailOptions);
        try{
          const deletedEvent=await Event.findByIdAndRemove(req.params.id);
          res.send('Event Deleted and mail sent to all')
        }
        catch(err){
          res.sendStatus(500)
        }
  }
  catch(err){
    console.log(err)
    res.status(404).send("Failed to Send mail please try later")
  }
})


//DELETE for delete Event
router.delete('/deleteEvent/:id',async(req,res)=>{
  try{
    if(!ObjectId.isValid(req.params.id)){
      return res.status(409).send("The Event id doesn't exist" )
   }
   const deletedEvent=await Event.findByIdAndRemove(req.params.id);
   res.send(deletedEvent)
  }
  catch(err){
    res.sendStatus(500)
  }
})
module.exports=router;