import { Transform } from 'stream';

const transform = async () => {
  const passthroughTransform = new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString());
      callback();
    }
  });

  process.stdin.pipe(passthroughTransform).pipe(process.stdout);
};

await transform();
