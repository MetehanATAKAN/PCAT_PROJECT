import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import imagesRoute from './routes/imagesRoutes.js';

dotenv.config();
const app = express();
const url = 'mongodb://0.0.0.0:27017/pcat-db';

const port = 8800 ;

const connect = async () => {
    try {
        await mongoose.connect(url);
        console.log("Connected to mongoDB.");
    } catch (error) {
        console.log(error);
    }
}

app.use(cors());
app.use(express.json());

app.use('/images',imagesRoute);

app.listen(port,()=> {
    connect();
    console.log('Connect to backend');
})
