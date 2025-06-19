import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();
app.use(cors());                                        

dotenv.config();    


export{app}