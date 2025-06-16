import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/user.route.js';
import promptRoute from './routes/prompt.route.js'
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
dotenv.config();

const app=express();



//parse-middleware

app.use(express.json());
app.use(cookieParser());



const PORT = process.env.PORT || 4001;
const MONGO_URI=process.env.MONGO_URI;


//Db Connection
mongoose.connect(MONGO_URI).then(()=>{
    console.log("Mongoose Connected");
}).catch((error)=>{
    console.log("error :",error);
})


app.get('/', (req, res) => {
  res.send('Hello World!');
}
)

//routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/helpBuddy",promptRoute);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
