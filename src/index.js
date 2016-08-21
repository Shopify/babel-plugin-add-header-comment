import fs from 'fs';
import childProcess from 'child_process';

export default (babel) => {
  const t = babel.types;

  return {
    visitor: {
      Program: function(path, state) {
        const opts = Object.assign(
          {
            commentLineStart: '* ',
            charRead: '?',
            charExec: '!',
            newLineChar: '\n'
          },
          state.opts
        );

        if(!opts.header && !opts.files) {
          throw new Error(
            'Set `babel-plugin-add-header` options pass in an Array of files to read/execute through the `header` variable or pass in `files` which define `header`\n'
          );
        }

        opts.commentStart = opts.commentStart || `/**${opts.newLineChar}`;
        opts.commentEnd = opts.commentEnd || `${opts.newLineChar}**/`;

        // we want to remove the /* and */ from comment start and end
        opts.commentStart = opts.commentStart.substr(2);
        opts.commentEnd = opts.commentEnd.substring(0, opts.commentEnd.length - 2);

        // traverse through header array and generate the comment content
        if(opts.header) {
          insertHeader(t, path, opts, opts.header);
        } else {
          const header = getOptsHeader(state.file.opts.filename, opts);

          if(header) {
            insertHeader(t, path, opts, header);
          }
        }
      }
    }
  };
};

function getOptsHeader(currentFile, opts) {
  const files = Object.keys(opts.files);

  return files.reduce((optsHeader, keyFile) => {
    let newOptsHeader;

    if(currentFile.indexOf(keyFile) !== -1) {
      newOptsHeader = opts.files[ keyFile ].header;
    }

    return optsHeader || newOptsHeader;
  }, null);
}

function insertHeader(t, path, opts, header) {
  const comment = header.map((headerPart) => {
    const charAction = headerPart.charAt(0);
    let lines;

    // check whether we should read in or exec or simply add in
    if(charAction === opts.charExec) {
      lines = getLinesFromExec(headerPart, opts);
    } else if(charAction === opts.charRead) {
      lines = getLinesFromFile(headerPart, opts);
    } else {
      lines = headerPart;
    }

    // split all the lines returned from the file/exec
    return lines.split(opts.newLineChar)
    .map((line) => {
      return `${opts.commentLineStart}${line}`;
    })
    .join(opts.newLineChar);
  })
  .join(opts.newLineChar);

  path.addComment('leading', `${opts.commentStart}${comment}${opts.commentEnd}`);

  path.unshiftContainer('body', t.noop());
  path.unshiftContainer('body', t.noop());
}

function getLinesFromFile(file, opts) {
  // remove the read char
  file = file.substr(1);

  return fs.readFileSync(file, 'utf8');
}

function getLinesFromExec(file, opts) {
  // remove the exec char
  file = file.substr(1);

  return childProcess.execSync(file, { encoding: 'utf8' });
}