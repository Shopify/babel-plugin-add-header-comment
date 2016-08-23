import assert from 'assert';
import * as babel from 'babel-core';
import plugin from '../src';

export default function() {
  it('option header not defined', () => {
    assert.throws(
      () => {
        babel.transform('console.log("HEY GREAT COMMENT")', {
          plugins: [
            plugin,
          ],
        });
      },
      'should have thrown error'
    );
  });
}
