import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = () => {
  const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');
  const decompressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

  const readStream = fs.createReadStream(compressedFilePath);
  const writeStream = fs.createWriteStream(decompressedFilePath);
  const gunzipStream = zlib.createGunzip();

  readStream.pipe(gunzipStream).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
};

await decompress();
