import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import firstRoute from './router/firstRoutes.js';
import mongoose from 'mongoose';


const app = express();
// middleware 
dotenv.config();
// app.use(cors())


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

app.use(express.json())



const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI

const dbConnection = async()=>{
    try{
        await mongoose.connect(MONGO_URI);
console.log('db is connected')   
 }
    catch(error){
        console.log(error)   
    }
}

dbConnection()

app.get('/',(req,res)=>{
    res.send(`hello ${PORT} is running`);
})

app.use('/proceed', firstRoute );

app.listen(PORT , ()=>{
    console.log(`welcome ${PORT} is connected`)
})