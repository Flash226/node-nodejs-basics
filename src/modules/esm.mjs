import { release, version } from 'os';
import { createServer } from 'http';
import path from 'path';

const __filename = path.basename(new URL(import.meta.url).pathname);
const __dirname = path.dirname(new URL(import.meta.url).pathname);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const random = Math.random();

const readFiles = async () => {
  const filePathA = new URL('./files/a.json', import.meta.url);
  const filePathB = new URL('./files/b.json', import.meta.url);

  try {
    const moduleA = await import(filePathA.href, { assert: { type: 'json' } });
    const moduleB = await import(filePathB.href, { assert: { type: 'json' } });

    const objectA = moduleA.default;
    const objectB = moduleB.default;

    const unknownObject = random > 0.5 ? objectA : objectB;

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
