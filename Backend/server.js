import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import userRouter from './routes/user.route.js';
import doctorRouter from './routes/doctor.route.js';
import appointmentRouter from './routes/appointment.route.js';
import chatbotRouter from './routes/chatbot.route.js';
import discussionRouter from './routes/discussion.route.js';


dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/users', userRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/appointments', appointmentRouter);
app.use('/api/chatbot', chatbotRouter);
app.use("/api/discussions", discussionRouter);

app.listen(PORT, () => {
    console.log(`server on at http://localhost:${PORT}`);
})