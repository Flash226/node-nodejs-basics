import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', [join(__dirname, 'files', 'script.js'), ...args], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);

  await new Promise((resolve, reject) => {
    childProcess.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Child process exited with code ${code}`));
      }
    });
  });
};

spawnChildProcess(['someArgument1', 'someArgument2']);
