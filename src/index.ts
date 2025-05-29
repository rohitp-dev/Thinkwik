import express from 'express';
import { connectDB } from './config/dbConnection';
import userRoutes from './routes/userRoutes';
import todoRoutes from './routes/todoRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

connectDB();

app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
