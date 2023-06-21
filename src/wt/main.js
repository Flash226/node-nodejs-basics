import { Worker } from 'worker_threads';
import path from 'path';
import os from 'os';

const createWorkers = async (numWorkers) => {
  const currentFilePath = new URL(import.meta.url).pathname;
  const currentDir = path.dirname(currentFilePath);
  const workers = [];

  for (let i = 0; i < numWorkers; i++) {
    const workerFilePath = path.join(currentDir, 'worker.js');
    const worker = new Worker(workerFilePath, { workerData: 10 + i });
    workers.push(worker);
  }

  return workers;
};

const performCalculations = async () => {
    try {
      const numThreads = os.cpus().length;
      const workers = await createWorkers(numThreads);
  
      const results = await Promise.allSettled(
        workers.map((worker) => {
          return new Promise((resolve) => {
            worker.on('message', (result) => {
              resolve({ status: 'resolved', data: result });
            });
            worker.on('error', (error) => {
              resolve({ status: 'error', data: null });
            });
          });
        })
      );
  
      console.log('Results:');
      console.log(results);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  await performCalculations();
  
