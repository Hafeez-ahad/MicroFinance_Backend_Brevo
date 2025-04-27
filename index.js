import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import firstRoute from './router/firstRoutes.js';
import mongoose from 'mongoose';


const app = express();
// middleware 
dotenv.config();

// Allow multiple origins
const allowedOrigins = [
    'http://localhost:5173',
    'https://reliable-longma-c24cf8.netlify.app', // Netlify
    'https://micro-finance-front-end.vercel.app/' // Vercel (replace with your actual frontend URL)
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
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