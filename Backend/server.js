import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import authRouter from './routes/auth.route.js';


dotenv.config();
const app = express();
const PORT = 3000;

connectDB();

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`server on at http://localhost:${PORT}`);
})