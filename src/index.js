import dotenv from 'dotenv';
import connectDB from './db/index.js';


dotenv.config(); // or dotenv.config({ path: './.env' })

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(' Error starting the server:', error);
    process.exit(1);
  });

// <<<<<<<<< First Approach >>>>>>>>>>

// import express from 'express';
// const app = express();
// //IIFE
// (async () =>{
//     try {
//         await mongoose.connect('${process.env.MONGODB_URI} / $(DB_NAME)');
//         app.on('error', (err) => {
//             console.error('Error connecting to MongoDB:', err);
//         });

//         app.listen(process.env.PORT, () => {
//             console.log('Server is running on port 3000');
//         });
//     }
//     catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }   
// })()