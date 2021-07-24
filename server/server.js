//Importing all the required packages
const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const env=require('dotenv');

const app=express();
env.config()
const port=process.env.port || 8080;
//DB Connection
const {mongoose}=require('./DB/connection');
//Handling CORS

var allowedOrigin = ['http://localhost:3000', /** other domains if any */ ]
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log(origin,!origin)
    if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));
//Getting the Routes
const UserRoutes=require('./Routes/UserRoute');
const AdminRoutes=require('./Routes/AdminRoute');
const StudentRoutes=require('./Routes/StudentRoute');
const FacultyRoutes=require('./Routes/FacultyRoute');
const LibrarianRoute=require('./Routes/LibrarianRoute');
const EventRoute=require('./Routes/EventRoute');
const SubjectRoute=require('./Routes/SubjectRoute');
const attendenceRoute=require('./Routes/AttendenceRoute');
const ResultRoute=require('./Routes/ResultRoute');
const TimeTableRoute=require('./Routes/TimeTableRoute');
const BookRoute=require('./Routes/BookRoute');
app.use('/',UserRoutes)
app.use('/',AdminRoutes)
app.use('/',StudentRoutes)
app.use('/',FacultyRoutes)
app.use('/',LibrarianRoute)
app.use('/',EventRoute)
app.use('/',SubjectRoute)
app.use('/',attendenceRoute)
app.use('/',ResultRoute)
app.use('/',TimeTableRoute)
app.use('/',BookRoute)
app.listen(port,()=>console.log(`Server Started at Port ${port}`))

