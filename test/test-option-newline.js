import assert from 'assert';
import fs from 'fs';
import path from 'path';
import * as babel from 'babel-core';
import plugin from '../src';

export default function() {
  it('should work using comment line', () => {
    const expect = fs.readFileSync(path.join(__dirname, 'fixtures', 'expect-option-newline'), 'utf8');

    const result = babel.transform('console.log("HEY GREAT COMMENT")', {
      plugins: [
        [plugin, {
          newLineChar: '&',
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
