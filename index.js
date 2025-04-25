// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import firstRoute from './router/firstRoutes.js';
// import mongoose from 'mongoose';


// const app = express();
// // middleware 
// dotenv.config();
// app.use(cors())

// // app.use(cors({
// //     origin: ['http://localhost:5174', 'https://your-netlify-site.netlify.app'],
// //     methods: ['GET', 'POST', 'OPTIONS'],
// //     allowedHeaders: ['Content-Type', 'Authorization'],
// //     credentials: true
// //   }));
  

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

// Load environment variables
dotenv.config();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173'],  // Adjust as needed (localhost or your prod URL)
  methods: ['GET', 'POST', 'OPTIONS'],  // Include OPTIONS for preflight requests
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
  credentials: true,  // Allow cookies if needed
}));

// Middleware for JSON requests
app.use(express.json());

// MongoDB Connection
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

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Main route for "proceed"
app.use('/proceed', firstRoute);

// Export the app for Vercel (since we don't use app.listen() in serverless)
export default app;
