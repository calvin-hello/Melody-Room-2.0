import 'dotenv/config'; 
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import mainRouter from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev')) // Log all requests to the console

app.use('/', mainRouter);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/melody-app';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🎵 Melody Server running on port ${PORT}`);
});