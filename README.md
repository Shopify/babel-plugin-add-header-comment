# babel-plugin-add-header-comment

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Will add a comment to the start of the transpiled code.

## Usage

[![NPM](https://nodei.co/npm/babel-plugin-add-header-comment.png)](https://www.npmjs.com/package/babel-plugin-add-header-comment)

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
        "This string will be inserted in",
        "!node executeThisOutputAddedToHeader.js",
        "?readInTheContentsOfThisFile.txt"
      ]
    }]
  ]
}
```

## License

MIT, see [LICENSE.md](http://github.com/mikkoh/babel-plugin-add-header-comment/blob/master/LICENSE.md) for details.
