import express from 'express';
import { connectDB } from './config/dbConnection';
import userRoutes from './routes/userRoutes';
import todoRoutes from './routes/todoRoutes';
import { startCronJob } from './cronScheduler';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan('dev')); 

app.use('/user', userRoutes);
app.use('/todo', todoRoutes);

connectDB().then(() => {
  startCronJob();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});