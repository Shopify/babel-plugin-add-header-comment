const assert = require('assert');
const fs = require('fs');
const path = require('path');
const babel = require('babel-core');
const plugin = require('../src');

it('should work using read, exec, and comment line', () => {
  const expect = fs.readFileSync(path.join(__dirname, 'expect-use-all'), 'utf8');

  const result = babel.transform('console.log("HEY GREAT COMMENT")', {
    plugins: [
      [plugin, {
        header: [
          `?${path.resolve(__dirname, 'toInsert.txt')}`,
          'have to support me and our three children and the dog once it gets ',
          `!node ${path.resolve(__dirname, 'toExec.js')}`
        ]
      }]
    ]
  });

  assert.equal(result.code, expect, 'output matched expected');
});