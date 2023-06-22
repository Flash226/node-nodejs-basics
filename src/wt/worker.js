import { parentPort, workerData } from 'worker_threads';

// Function to calculate the nth Fibonacci number
const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

// Function to send the result of nthFibonacci computation to the main thread
const sendResult = () => {
  const result = nthFibonacci(workerData);
  parentPort.postMessage(result);
};

sendResult();
