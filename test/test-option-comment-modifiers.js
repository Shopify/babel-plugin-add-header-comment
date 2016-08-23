import assert from 'assert';
import fs from 'fs';
import path from 'path';
import * as babel from 'babel-core';
import plugin from '../src';

export default function() {
  it('options commentLineStart, commentStart, commentEnd should work', () => {
    const expect = fs.readFileSync(path.join(__dirname, 'fixtures', 'expect-option-comment-modifiers'), 'utf8');

    const result = babel.transform('console.log("HEY GREAT COMMENT")', {
      plugins: [
        [plugin, {
          commentLineStart: '&',
          commentStart: '/*&\n',
          commentEnd: '\n&*/',
          header: [
            'A',
            'B',
            'C',
          ],
        }],
      ],
    });

    assert.equal(result.code, expect, 'output matched expected');
  });
}
