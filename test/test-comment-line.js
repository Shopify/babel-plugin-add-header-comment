const assert = require('assert');
const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const plugin = require('../src');

it('should work using comment line', () => {
  const expect = fs.readFileSync(path.join(__dirname, 'expect-comment-line'), 'utf8');

  const result = babel.transform('console.log("HEY GREAT COMMENT")', {
    plugins: [
      [plugin, {
        header: [
          'have to support me and our three children and the dog once it gets '
        ]
      }]
    ]
  });

  assert.equal(result.code, expect, 'output matched expected');
});