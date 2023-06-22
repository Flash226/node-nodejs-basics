import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const folderPath = path.join(__dirname, 'files');
  const fileName = 'fileToCalculateHashFor.txt';
  const filePath = path.join(folderPath, fileName);

  try {
    const fileData = fs.readFileSync(filePath);

    const hash = crypto.createHash('sha256');

    hash.update(fileData);
    
    const hexHash = hash.digest('hex');

    console.log(hexHash);
  } catch (err) {
    console.error('FS operation failed:', err.message);
  }
};

await calculateHash();
