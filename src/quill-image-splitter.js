import Quill from 'quill';

const IMG_SRC_REGEX = new RegExp('<img.*?src=')

class ImageSplitter {
  constructor(quill, options) {
    this.quill = quill;

    // if on_split defined, use it, else use function that promises null.
    // this allows user to redefine `on_split` later, if desired
    this.on_split = options.on_split || (() => Promise.resolve(null));

    // loop over img tags that have base64 content and call `on_split` on them
    const update = () => this.getBase64Images().forEach(img => {
      let src = img.attributes.src.value;
      Promise.resolve(this.on_split(src))
      .then(href => {
        if (!href) throw new Error("No href returned from `on_split`");
        img.attributes.src.value = href;
      })
      .catch(err => {
        console.log(`Caught error: ${err}`);

        // if an error occurs (e.g. when `on_split` didn't return an href)
        // resolve with null
        return Promise.resolve(null);
      });
    });

    // when a quill updates, check for new images
    quill.on('text-change', update);

    // Check for images when a quill is created
    update();
  }

  getBase64Images() {
    return Array.prototype.slice.call(this.quill.container.querySelectorAll('img[src^="data:"]'), 0);
  }
}

Quill.registerModule('imageSplitter', ImageSplitter);
