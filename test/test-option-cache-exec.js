
import assert from 'assert';
import path from 'path';
import * as babel from 'babel-core';
import plugin from '../src';

export default function() {
  it('option cache exec should work', (done) => {
    let resultExec1;
    let resultExec2;
    let resultExecNonCache;

    resultExec1 = babel.transform('console.log("HEY GREAT COMMENT")', {
      plugins: [
        [plugin, {
          cache: '!',
          header: [
            `!node ${path.resolve(__dirname, 'toExecRandom.js')}`
          ]
        }]
      ]
    });

    setTimeout(() => {
      resultExec2 = babel.transform('console.log("HEY GREAT COMMENT")', {
        plugins: [
          [plugin, {
            cache: '!',
            header: [
              `!node ${path.resolve(__dirname, 'toExecRandom.js')}`
            ]
          }]
        ]
      });

      resultExecNonCache = babel.transform('console.log("HEY GREAT COMMENT")', {
        plugins: [
          [plugin, {
            header: [
              `!node ${path.resolve(__dirname, 'toExecRandom.js')}`
            ]
          }]
        ]
      });

      assert.equal(resultExec1.code, resultExec2.code, 'cached exec versions matched');
      assert.notEqual(resultExec1.code, resultExecNonCache.code, 'non-cached exec versions did not match');

      done();
    }, 33);
  });
};
