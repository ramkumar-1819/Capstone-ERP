//Creating the Routes for Users
const {User}=require('../Models/Users');
const router=require('express').Router();
const jwt=require('jsonwebtoken');

//POST for User[Admin,Faculty,Student,Librarian]
router.post('/Signup',async(req,res)=>{
    try{
        const docs=await User.findOne({_id:req.body._id});
        if(docs!==null){
            return res.status(409).send({Error:`User already Exist`})
        }
        else{
            const newUser=await new User(req.body)
            const docs=await newUser.save()
            return res.status(200).send({message:"Account Created"})
        }
    }
    catch(err){
        console.log(err.message)
        if(err.name==="ValidationError"){
            res.status(409).send({Error:err.message})
        }
        else{
            res.sendStatus(500)
        }
    }
})

router.post('/Signin',async(req,res)=>{
    try{
        const docs=await User.findOne({_id:req.body._id});
        if(docs===null){
            return res.status(409).send({Error:`User not Exist`})
        }
        else{
            if(req.body.type){
                if(docs.type!==req.body.type){
                    return res.status(409).send({Error:"No User Found"})
                }
            }
            else{
                return res.status(409).send({Error:"User Type Required"})
            }
        }
        if(await docs.validatePassword(req.body.password)){
            const token=jwt.sign({_id:docs._id,type:docs.type},process.env.SECRET);
            //Storing the jwt in httpOnly cookie for security purpose
            return res.cookie('token', token, {
                expires: new Date(new Date().getTime()+3600*1000*24),
                sameSite:'strict', 
                httpOnly: true
              }).send({token:token});
        }
        else{
            return res.status(409).send({Error:"Incorrect Password"})
        }
    }
    catch(err){
            console.log(err)
            res.sendStatus(500)
    }
})
//verifying the jwt in the cookies 
router.get('/VerifyUser',async(req,res)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(409).send({error:"You need to login"})
        }
        jwt.verify(token, process.env.SECRET , function(err, decoded) {
            if(err){
                return res.status(409).send({error:"Invalid token"})
            }
            else{
                return res.send({message:token,type:decoded.type,_id:decoded._id})
            }   
        });
    }
    catch(err){
        res.sendStatus(500)
    }
})
//Logout user
router.get('/Logout',async(req,res)=>{
    try{
        res.status(200).clearCookie('token').send({message:"Logout Success"})
    }
    catch(err){
        res.sendStatus(500)
    }
})

module.exports=router;