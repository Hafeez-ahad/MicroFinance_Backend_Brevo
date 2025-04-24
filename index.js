// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import firstRoute from './router/firstRoutes.js';
// import mongoose from 'mongoose';


// const app = express();
// // middleware 
// dotenv.config();
// // app.use(cors())

// app.use(cors({
//     origin: 'http://localhost:5173', // or '*' for all origins during dev
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
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

// backend/api/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import firstRoute from '../router/firstRoutes.js'; // adjust the path if needed

dotenv.config();

const app = express();

// Apply CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Adjust as needed for prod
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('DB connected');
  } catch (error) {
    console.log('DB connection error: ', error);
  }
};

dbConnection();

// Routes
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/proceed', firstRoute);

// Export the app (Important for Vercel)
export default app; // This tells Vercel to use this app in the serverless environment
