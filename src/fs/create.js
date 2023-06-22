import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const folderPath = path.resolve(__dirname, 'files');
  const filePath = path.join(folderPath, 'fresh.txt');
  const fileContent = 'I am fresh and young';

  try {
    await fs.mkdir(folderPath, { recursive: true });

    try {
      await fs.access(filePath);
      throw new Error('Error: File already exists');
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(filePath, fileContent);
        console.log('File created successfully!');
      } else {
        throw err;
      }
    }
  } catch (err) {
    console.error('FS operation failed:', err.message);
  }
};

await create();
