import express from 'express';
import authRouter from './routes/auth.route.js';


const app = express();
const PORT = 3000;

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
    console.log(`server on at http://localhost:${PORT}`);
})