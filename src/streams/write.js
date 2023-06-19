import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

  const writer = fs.createWriteStream(filePath, { encoding: 'utf8' });

  process.stdin.pipe(writer);

  process.stdin.on('end', () => {
    console.log('Writing to file complete');
  });

  process.stdin.on('error', (err) => {
    console.error('Error reading input:', err.message);
  });
};

await write();
