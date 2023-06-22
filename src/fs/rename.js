import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const rename = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const folderPath = path.join(__dirname, 'files');
  const sourceFileName = 'wrongFilename.txt';
  const destinationFileName = 'properFilename.md';

  try {
    const sourceFilePath = path.join(folderPath, sourceFileName);
    const destinationFilePath = path.join(folderPath, destinationFileName);

    try {
      await fs.access(sourceFilePath, fs.constants.F_OK);
    } catch (err) {
      throw new Error('Error: Source file does not exist');
    }

    try {
      await fs.access(destinationFilePath, fs.constants.F_OK);
      throw new Error('Error: Destination file already exists');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    await fs.rename(sourceFilePath, destinationFilePath);

  } catch (err) {
    console.error('FS operation failed:', err.message);
  }
};

await rename();
