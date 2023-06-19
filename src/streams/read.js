import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  try {
    const reader = fs.createReadStream(filePath, { encoding: 'utf8' });

    reader.on('data', (data) => {
      process.stdout.write(data);
    });

    reader.on('error', (err) => {
      console.error('Error reading file:', err.message);
    });
  } catch (err) {
    console.error('FS operation failed:', err.message);
  }
};

await read();
