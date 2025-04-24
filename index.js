// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import firstRoute from './router/firstRoutes.js';
// import mongoose from 'mongoose';


// const app = express();
// // middleware 
// dotenv.config();
// app.use(cors())

// app.use(cors({
//     origin: ['http://localhost:5174', 'https://your-netlify-site.netlify.app'],
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
//   }));
  

// app.use(express.json())



// const PORT = process.env.PORT;
// const MONGO_URI = process.env.MONGO_URI

// const dbConnection = async()=>{
//     try{
//         await mongoose.connect(MONGO_URI);
// console.log('db is connected')   
//  }
//     catch(error){
//         console.log(error)   
//     }
// }

// dbConnection()

// app.get('/',(req,res)=>{
//     res.send(`hello ${PORT} is running`);
// })

// app.use('/proceed', firstRoute );

// app.listen(PORT , ()=>{
//     console.log(`welcome ${PORT} is connected`)
// })

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import firstRoute from './router/firstRoutes.js';
import mongoose from 'mongoose';

const app = express();

// Middleware
dotenv.config();

// Correct CORS middleware
app.use(cors({
  origin: ['http://localhost:5173/'],
  methods: ['GET', 'POST', 'OPTIONS'], // Allow OPTIONS method for preflight
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies if needed
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('DB connected');
  } catch (error) {
    console.log('DB connection error:', error);
  }
};

dbConnection();

app.get('/', (req, res) => {
  res.send(`Backend is running on port ${PORT}`);
});

app.use('/proceed', firstRoute);

// Since this is Vercel, remove the app.listen() because it's not needed in serverless
app.listen(PORT , ()=>{
    console.log(`welcome ${PORT} is connected`)
})
