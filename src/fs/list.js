import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const list = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const folderPath = path.join(__dirname, 'files');

  try {
    await fs.access(folderPath, fs.constants.F_OK);

    const files = await fs.readdir(folderPath);
    console.log(files);
  } catch (err) {
    console.error('FS operation failed:', err.message);
  }
};

await list();
