import express from 'express';
import * as dotenv from 'dotenv';

const result = dotenv.config({ path: '.env' });
if (result.error) console.error('** .env undefined **');

const app = express();

let isShuttingDown = false;

app.get('/health/ready', (req: express.Request, res: express.Response): any => {
  if (isShuttingDown) {
    return res.status(500).send('Shutting down');
  }
  res.status(200).send('Ready');
});

app.get('/health/live', (req, res) => {
  res.status(200).send('Alive');
});

app.get('/', (req, res) => {
  res.status(200).send(process.env.VERSION);
});

app.listen(3000, () => console.log('App listening on port 3000'));

process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Starting graceful shutdown...');
  isShuttingDown = true;

  // Wait for in-flight requests to complete
  await new Promise((resolve) => setTimeout(resolve, Number(process.env.GRACEFUL_TIMEOUT || 30) * 1000));

  console.log('Graceful shutdown completed. Exiting process.');
  process.exit(0);
});