
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import * as babel from 'babel-core';
import plugin from '../src';

const RAND_FILE_PATH = path.join(__dirname, 'toReadRand.txt');

export default function() {
  it('option cache read should work', (done) => {
    writeReadFile(Date.now());

    const resultExec1 = babel.transform('console.log("HEY GREAT COMMENT")', {
      plugins: [
        [plugin, {
          cache: '?',
          header: [
            `?${RAND_FILE_PATH}`,
          ],
        }],
      ],
    });

    setTimeout(() => {
      writeReadFile(Date.now());

      const resultExec2 = babel.transform('console.log("HEY GREAT COMMENT")', {
        plugins: [
          [plugin, {
            cache: '?',
            header: [
              `?${RAND_FILE_PATH}`,
            ],
          }],
        ],
      });

      const resultExecNonCache = babel.transform('console.log("HEY GREAT COMMENT")', {
        plugins: [
          [plugin, {
            cache: '',
            header: [
              `?${RAND_FILE_PATH}`,
            ],
          }],
        ],
      });

      assert.equal(resultExec1.code, resultExec2.code, 'cached exec versions matched');
      assert.notEqual(resultExec1.code, resultExecNonCache.code, 'non-cached exec versions did not match');
      done();
      rmReadFile();
    }, 33);
  });
}

function writeReadFile(contents) {
  fs.writeFileSync(RAND_FILE_PATH, contents, 'utf8');
}

function rmReadFile() {
  fs.unlinkSync(RAND_FILE_PATH);
}
