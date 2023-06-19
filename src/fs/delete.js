import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const remove = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const folderPath = path.join(__dirname, 'files');
  const fileName = 'fileToRemove.txt';

  try {
    const filePath = path.join(folderPath, fileName);

    try {
      await fs.access(filePath, fs.constants.F_OK);
    } catch (err) {
      throw new Error('Error: File does not exist');
    }

    await fs.unlink(filePath);

  } catch (err) {
    console.error('FS operation failed:', err.message);
  }
};

await remove();
