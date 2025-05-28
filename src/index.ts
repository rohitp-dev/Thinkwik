import express from 'express';
import { connectDB } from './config/dbConnection';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
