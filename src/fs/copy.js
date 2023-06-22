import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const sourceFolderPath = path.join(__dirname, 'files');
  const destinationFolderPath = path.join(__dirname, 'files_copy');

  try {
    try {
      await fs.access(sourceFolderPath, fs.constants.F_OK);
    } catch (err) {
      throw new Error('Error: Source folder "files" does not exist');
    }

    try {
      await fs.access(destinationFolderPath, fs.constants.F_OK);
      throw new Error('Error: Destination folder "files_copy" already exists');
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    await fs.mkdir(destinationFolderPath);

    const files = await fs.readdir(sourceFolderPath);

    for (const file of files) {
      const sourceFilePath = path.join(sourceFolderPath, file);
      const destinationFilePath = path.join(destinationFolderPath, file);

      await fs.copyFile(sourceFilePath, destinationFilePath);
    }

  } catch (err) {
    console.error('FS operation failed:', err.message);
  }
};

await copy();
