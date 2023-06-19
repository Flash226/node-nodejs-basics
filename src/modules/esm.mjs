import path from 'path';
import { release, version } from 'os';
import { createServer } from 'http';
import './files/c.js';
import * as a from './files/a.json' assert { type: 'json' };
import * as b from './files/b.json' assert { type: 'json' };

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = a;
} else {
    unknownObject = b;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${new URL(import.meta.url).pathname}`);
console.log(`Path to current directory is ${path.dirname(new URL(import.meta.url).pathname)}`);

const myServer = createServer((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};
