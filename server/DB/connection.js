const mongoose=require('mongoose');
//Connection to DB in Cluster
mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
})
.then(ok=>console.log('Connection made to DB'))
.catch(err=>console.log('Failed to Connect the DB'))

module.exports={mongoose}