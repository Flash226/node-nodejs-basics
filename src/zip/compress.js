import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gzipAsync = promisify(zlib.gzip);

const compress = async () => {
  const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');

  const data = fs.readFileSync(filePath);
  const compressedData = await gzipAsync(data);

  fs.writeFileSync(compressedFilePath, compressedData);
};

await compress();
