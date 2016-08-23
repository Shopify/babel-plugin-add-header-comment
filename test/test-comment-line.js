import assert from 'assert';
import fs from 'fs';
import path from 'path';
import * as babel from 'babel-core';
import plugin from '../src';

export default function() {
  it('should work using comment line', () => {
    const expect = fs.readFileSync(path.join(__dirname, 'fixtures', 'expect-comment-line'), 'utf8');

    const result = babel.transform('console.log("HEY GREAT COMMENT")', {
      plugins: [
        [plugin, {
          header: [
            'have to support me and our three children and the dog once it gets ',
          ],
        }],
      ],
    });

    assert.equal(result.code, expect, 'output matched expected');
  });
}
