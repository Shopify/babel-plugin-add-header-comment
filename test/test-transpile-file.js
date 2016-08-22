import assert from 'assert';
import fs from 'fs';
import path from 'path';
import childProcess from 'child_process';
import * as babel from 'babel-core';
import plugin from '../src';

export default function() {
  it('should only add comment to one file', () => {
    const expect = fs.readFileSync(path.join(__dirname, 'expect-transpile-file'), 'utf8');

    const code = childProcess.execSync('BABEL_ENV=test-plugin node_modules/.bin/babel test/toTranspile/', { encoding: 'utf8' });

    assert.equal(code, expect, 'Added comment only to one file');
  });
};
