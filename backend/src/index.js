import express from 'express';
import dotenv from 'dotenv';

import authRouter from './routes/auth.route.js';
import { connectDB } from './lib/db.js';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log('Server listening at port ', + PORT);
    connectDB();
});