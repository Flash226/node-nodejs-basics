import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = () => {
  const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
  const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');

  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(compressedFilePath);
  const gzipStream = zlib.createGzip();

  readStream.pipe(gzipStream).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
};

await compress();
