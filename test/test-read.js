const assert = require('assert');
const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const plugin = require('../src');

it('should work using only read', () => {
  const expect = fs.readFileSync(path.join(__dirname, 'expect-read'), 'utf8');

  const result = babel.transform('console.log("HEY GREAT COMMENT")', {
    plugins: [
      [plugin, {
        header: [
          `?${path.resolve(__dirname, 'toInsert.txt')}`
        ]
      }]
    ]
  });

  assert.equal(result.code, expect, 'output matched expected');
});