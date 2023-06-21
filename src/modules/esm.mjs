import path from 'path';
import { release, version } from 'os';
import { createServer } from 'http';
import fs from 'fs';

const __filename = path.basename(import.meta.url);
const __dirname = path.dirname(new URL(import.meta.url).pathname);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const random = Math.random();

let unknownObject;

const readFileAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const readFiles = async () => {
  const filePathA = path.join(__dirname, 'files', 'a.json');
  const filePathB = path.join(__dirname, 'files', 'b.json');

  try {
    const fileContentA = await readFileAsync(filePathA);
    const fileContentB = await readFileAsync(filePathB);

    const objectA = JSON.parse(fileContentA);
    const objectB = JSON.parse(fileContentB);

    if (random > 0.5) {
      unknownObject = objectA;
    } else {
      unknownObject = objectB;
    }

    console.log(unknownObject);
  } catch (err) {
    console.error('Error reading files:', err);
  }
};

readFiles();

const myServer = createServer((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
