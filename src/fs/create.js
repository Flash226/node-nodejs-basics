import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const create = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const folderPath = path.resolve(__dirname, 'files');
  const filePath = path.join(folderPath, 'fresh.txt');
  const fileContent = 'I am fresh and young';

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    if (fs.existsSync(filePath)) {
      throw new Error('Error: File already exists');
    }

    await fs.promises.writeFile(filePath, fileContent);
  } catch (err) {
    console.error('FS operation failed:', err.message);
  }
};

await create();
