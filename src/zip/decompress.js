import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gunzipAsync = promisify(zlib.gunzip);

const decompress = async () => {
  const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');
  const decompressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

  const compressedData = fs.readFileSync(compressedFilePath);
  const decompressedData = await gunzipAsync(compressedData);

  fs.writeFileSync(decompressedFilePath, decompressedData);
};

await decompress();
