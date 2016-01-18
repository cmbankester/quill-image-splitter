/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _quill = __webpack_require__(1);

	var _quill2 = _interopRequireDefault(_quill);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var IMG_SRC_REGEX = new RegExp('<img.*?src=');

	var ImageSplitter = function () {
	  function ImageSplitter(quill, options) {
	    var _this = this;

	    _classCallCheck(this, ImageSplitter);

	    this.quill = quill;

	    // if on_split defined, use it, else use function that promises null.
	    // this allows user to redefine `on_split` later, if desired
	    this.on_split = options.on_split || function () {
	      return Promise.resolve(null);
	    };

	    // loop over img tags that have base64 content and call `on_split` on them
	    var update = function update() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        var _loop = function _loop() {
	          var img = _step.value;

	          var src = img.attributes.src.value;
	          Promise.resolve(_this.on_split(src)).then(function (href) {
	            if (!href) throw new Error("No href returned from `on_split`");
	            img.attributes.src.value = href;
	          }).catch(function (err) {
	            console.log('Caught error: ' + err);

	            // if an error occurs (e.g. when `on_split` didn't return an href)
	            // resolve with null
	            return Promise.resolve(null);
	          });
	        };

	        for (var _iterator = _this.getBase64Images()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          _loop();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    };

	    // when a quill updates, check for new images
	    quill.on('text-change', update);

	    // Check for images when a quill is created
	    update();
	  }

	  _createClass(ImageSplitter, [{
	    key: 'getBase64Images',
	    value: function getBase64Images() {
	      return this.quill.container.querySelectorAll('img[src^="data:"]');
	    }
	  }]);

	  return ImageSplitter;
	}();

	_quill2.default.registerModule('imageSplitter', ImageSplitter);

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = Quill;

/***/ }
/******/ ]);