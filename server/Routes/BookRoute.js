const router=require('express').Router();
const {Book}=require('../Models/Books');
const {Student}=require('../Models/Student');
const ObjectId=require('mongoose').Types.ObjectId;
//POST for adding Book to user
router.post('/issueBook',async(req,res)=>{
    try{
        console.log(req.body)
        for(let books of req.body.books){
            const existId=await Book.findOne({bookCode:books.bookCode});
            if(existId!==null){
                return res.status(409).send(`Book ID already Issued ID:${existId.bookCode}`)
            }
        }
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0 so need to add 1 to make it 1!
        const yyyy = today.getFullYear();
        if(dd<10){
        dd='0'+dd
        } 
        if(mm<10){
        mm='0'+mm
        } 
        today = yyyy+'-'+mm+'-'+dd;
        console.log('today',today)
        const todayms=new Date(today).getTime();
        console.log('tms',todayms)
        const booksStudentHave=await Book.find({student:req.body.student});
        console.log(booksStudentHave)
        for(let book of booksStudentHave){
            if(new Date(book.returnDate).getTime()<todayms){
                return res.status(409).send('Requested Student need to return some Books')
            }
        }
        for(let books of req.body.books){
            const newBook=await new Book({...books,issueDate:today,student:req.body.student})
            await newBook.save()
        }
        res.send('Books Issued to Student Successfully')
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
//GET books for the Student
router.get('/books/:id',async(req,res)=>{
    try{
        console.log(req.params.id)
        const exist=await Student.findById(req.params.id)
        if(exist===null){
            return res.status(409).send('The Student that you are requesting is not exist')
        }
        const books=await Book.find({student:req.params.id}).populate('student');
        res.send(books)

    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
//PATCH to update the books
router.patch('/books/:id',async(req,res)=>{
    try{
        console.log(req.body)
        const exist=await Book.findById(req.params.id)
        if(exist===null){
            return res.status(409).send('The Book that you are Updating is not exist')
        }
        const alreadyIssued=await Book.findOne({bookCode:req.body.bookCode});
        console.log(alreadyIssued)
        if(alreadyIssued!==null){
            if(exist.bookCode!==alreadyIssued.bookCode){
                return res.status(409).send('The Book Code is already Issued')
            }
        }
        const books=await Book.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.send(books)

    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
//POST to DELETE BOOKS
router.post('/deleteBooks',async(req,res)=>{
    console.log(req.body)
    try{
        for(let id of req.body.Ids){
            if(!ObjectId.isValid(id)){
                return res.status(409).send("The Event id doesn't exist" )
            }
            const book=await Book.findByIdAndRemove(id)
            console.log(book)
        }
        res.send('Returned Successfully')
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})
module.exports=router