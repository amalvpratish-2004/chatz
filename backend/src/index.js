import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';
import { connectDB } from './lib/db.js';
import { app, server } from './lib/socket.js';

dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('/*splat', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

server.listen(PORT, () => {
    console.log('Server listening at port ', + PORT);
    connectDB();
});