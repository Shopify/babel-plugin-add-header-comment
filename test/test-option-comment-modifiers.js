const assert = require('assert');
const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const plugin = require('../src');

it('options commentLineStart, commentStart, commentEnd should work', () => {
  const expect = fs.readFileSync(path.join(__dirname, 'expect-option-comment-modifiers'), 'utf8');

  const result = babel.transform('console.log("HEY GREAT COMMENT")', {
    plugins: [
      [plugin, {
        commentLineStart: '&',
        commentStart: '/*&\n',
        commentEnd: '\n&*/',
        header: [
          'A',
          'B',
          'C'
        ]
      }]
    ]
  });

  assert.equal(result.code, expect, 'output matched expected');
});