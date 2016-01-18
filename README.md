# Quill Image Splitter Module

Quill module to parse html and extract `<img src="data:...">` tags and replace them with uploaded file URLs.

## Installation

The Quill ImageSplitter module is available as a [Bower](http://bower.io/) package and as an [npm](https://www.npmjs.com/) package.

To install with Bower:

`bower install quill-image-splitter`

Or, to install with npm:

`npm install --save quill-image-splitter`

## Usage

Load the `quill-image-splitter.js` file (after loading Quill), and add the `imageSplitter` module configuration:

```javascript
var quill = new Quill('.basic-wrapper .editor-container', {
  modules: {
    ...
    imageSplitter: {
      on_split: function(base64_content) {
        return new Promise((resolve, reject) => {
          resolve('file:///Users/cbankester/Desktop/Screen%20Shot%202016-01-11%20at%207.34.22%20AM.png');
        });
      }
    }
  },
  ...
});
```

The return value of `on_split` will be used to replace the `img` tag's src value. If a promise is returned, it will be awaited and the resolved value of that promise will be used for the `img` tag's src value.

## Building

To build quill-image-splitter from the ECMAScript2015 source, do the following in a Node.js enabled environment:

```bash
npm install
npm run compile
```

## License

The quill-image-splitter source code is released under the MIT License. Please see the [LICENSE](LICENSE) file for details.
