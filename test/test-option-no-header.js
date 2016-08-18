const assert = require('assert');
const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const plugin = require('../src');

it('option newline should work', () => {
  const expect = fs.readFileSync(path.join(__dirname, 'expect-option-comment-modifiers'), 'utf8');

  assert.throws(
    () => {
      babel.transform('console.log("HEY GREAT COMMENT")', {
        plugins: [
          plugin
        ]
      });
    },
    'should have thrown error'
  );
});