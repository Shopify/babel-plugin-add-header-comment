import assert from 'assert';
import fs from 'fs';
import path from 'path';
import * as babel from 'babel-core';
import plugin from '../src';

export default function() {
  it('should work using read, exec, and comment line', () => {
    const expect = fs.readFileSync(path.join(__dirname, 'fixtures', 'expect-use-all'), 'utf8');

    const result = babel.transform('console.log("HEY GREAT COMMENT")', {
      plugins: [
        [plugin, {
          header: [
            `?${path.resolve(__dirname, 'toInsert.txt')}`,
            'have to support me and our three children and the dog once it gets ',
            `!node ${path.resolve(__dirname, 'toExec.js')}`,
          ],
        }],
      ],
    });

    assert.equal(result.code, expect, 'output matched expected');
  });
}
