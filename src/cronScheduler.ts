import { CronJob } from 'cron';
import { Todo } from './models/Todo';

export const startCronJob = () => {
  const job = new CronJob('0 1 * * *', async () => {
    const now = new Date();
    await Todo.updateMany(
      { dueDate: { $lt: now }, completed: false },
      { $set: { completed: true } }
    );
    console.log('CRON: Expired todos marked completed at 1:00 AM');
  }, null, true);
  job.start();
};
