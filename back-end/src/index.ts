import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Import cors
import userRoutes from './routes/user.routes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10); // Convert PORT to a number

// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['*'], // Allow all methods
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api', userRoutes);

// Catch-all route for 404 errors
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'PAGE 404',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on : ${PORT}`);
});