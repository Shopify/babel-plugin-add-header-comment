import assert from 'assert';
import fs from 'fs';
import path from 'path';
import * as babel from 'babel-core';
import plugin from '../src';

export default function() {
  it('should work using only read', () => {
    const expect = fs.readFileSync(path.join(__dirname, 'expect-read'), 'utf8');

    const result = babel.transform('console.log("HEY GREAT COMMENT")', {
      plugins: [
        [plugin, {
          header: [
            `?${path.resolve(__dirname, 'toInsert.txt')}`,
          ],
        }],
      ],
    });

    assert.equal(result.code, expect, 'output matched expected');
  });
}
