import testCommentLine from './test-comment-line';
import testExec from './test-exec';
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
  testCommentLine();  
  testExec();
  testRead();
  testUseAll();
  testTranspileFile();
});
