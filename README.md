# babel-plugin-add-header-comment

Will add a comment to the start of the transpiled code. Since transpiling via Babel is becoming one of the last steps of the build process it's handy to add some tooling around this final step. For instance could be used:
- to add in license info 
- add in version numbers to builds
- etc.

## Installation
```bash
$ npm install babel-plugin-add-header-comment
```

## Example

The following is an example `.babelrc` file. Using the following settings the comment will be created using 3 different features:

1. Adding a hardcoded string (`"This string will be inserted in"`)
2. By executing a script and injecting the output (`node executeThisOutputAddedToHeader.js`)
3. By reading in the contents of a file (`readInTheContentsOfThisFile.txt`)
```javascript
{
  "presets": ["es2015"],
  "plugins": [
    ["add-header-comment", {
      "header": [
        "This string will be inserted in a comment header",
        "!node executeThisOutputAddedToHeader.js",
        "?readInTheContentsOfThisFile.txt"
      ]
    }]
  ]
}
```

Sometimes you may want to just add headers to specific files. In this case you can do the following:
```javascript
{
  "presets": ["es2015"],
  "plugins": [
    ["add-header-comment", {
      "files": {
        "src/index.js": {
          "header": [
            "This string will be inserted in a comment header"
          ]
        }
      }
    }]
  ]
}
```

## Plugin Options

- `newLineChar`- This is the newline char that should be used by the plugin. Default value: `'\n'`
- `cache` - This is a string which represents what type of operations should be cached. For instance if you wanted to cache both read and command executions you could pass in `?!`. Default value: `'?'`
- `commentStart`- This is a string which describes how the comment is started/opened. For instance if you'd like you're comment to start with `/*COMMENT START` pass in `'COMMENT START'`. Default value: `'*\n'`
- `commentEnd`- This is a string which describes how the comment is ended/closed. For example if you'd like your comment to end with `COMMENT END*/` pass in `'COMMENT END'`. Default value: `'\n*'`
- `commentLineStart`- A string which is the leading charachter before a comment. Default value: `'* '`

## License

MIT, see [LICENSE.md](http://github.com/shopify/babel-plugin-add-header-comment/blob/master/LICENSE.md) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
