import testCommentLine from './test-comment-line';
import testExec from './test-exec';
import testOptionCacheExec from './test-option-cache-exec';
import testOptionCacheRead from './test-option-cache-read';
import testOptionCommentModifiers from './test-option-comment-modifiers';
import testOptionNewline from './test-option-newline';
import testOptionNoHeader from './test-option-no-header';
import testRead from './test-read';
import testTranspileFile from './test-transpile-file';
import testUseAll from './test-use-all';

describe('Using plugin in different ways', () => {
  testOptionCommentModifiers();
  testOptionNewline();
  testOptionNoHeader();
  testOptionCacheExec();
  testOptionCacheRead();
  testCommentLine();  
  testExec();
  testRead();
  testUseAll();
  testTranspileFile();
});
