import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import authRouter from './routes/auth.route.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

connectDB();

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`server on at http://localhost:${PORT}`);
})