import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    console.log(fileContent);
  } catch (err) {
    console.error('FS operation failed:', err.message);
  }
};

await read();
