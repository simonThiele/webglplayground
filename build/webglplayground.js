(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["webglplayground"] = factory();
	else
		root["webglplayground"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Renderer = undefined;

	var _Renderer2 = __webpack_require__(2);

	var _Renderer3 = _interopRequireDefault(_Renderer2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Renderer = exports.Renderer = _Renderer3.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _fragmentShader = __webpack_require__(3);

	var _fragmentShader2 = _interopRequireDefault(_fragmentShader);

	var _vertexShader = __webpack_require__(4);

	var _vertexShader2 = _interopRequireDefault(_vertexShader);

	var _WebGL = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Renderer = function () {
	  function Renderer(canvas) {
	    _classCallCheck(this, Renderer);

	    var e = this.initGL(canvas);
	    if (!this.gl) {
	      console.log(e);
	      return;
	    }
	    console.log('renderer v 0.0.1');

	    var vertexShader = this.createShader(this.gl.VERTEX_SHADER, _vertexShader2.default);
	    var fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, _fragmentShader2.default);

	    var vertexPositionAttribute = this.createProgram(vertexShader, fragmentShader);

	    var vertexPositionBuffer = this.createBuffer();

	    this.draw(vertexPositionBuffer, vertexPositionAttribute);

	    this.deleteBuffer(vertexPositionBuffer);
	  }

	  _createClass(Renderer, [{
	    key: 'initGL',
	    value: function initGL(canvas) {
	      try {
	        this.gl = (0, _WebGL.getWebGLCanvasContext)(canvas);
	        this.gl.viewportWidth = canvas.width;
	        this.gl.viewportHeight = canvas.height;
	      } catch (e) {
	        return e;
	      }
	    }
	  }, {
	    key: 'createShader',
	    value: function createShader(type, source) {
	      var gl = this.gl;

	      var shader = gl.createShader(type);

	      gl.shaderSource(shader, source);
	      gl.compileShader(shader);

	      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	        console.log(gl.getShaderInfoLog(shader));
	        return null;
	      }

	      return shader;
	    }
	  }, {
	    key: 'createProgram',
	    value: function createProgram(vertexShader, fragmentShader) {
	      var gl = this.gl;

	      var shaderProgram = gl.createProgram();
	      gl.attachShader(shaderProgram, vertexShader);
	      gl.attachShader(shaderProgram, fragmentShader);
	      gl.linkProgram(shaderProgram);

	      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
	        console.log("Could not initialise shaders");
	        return null;
	      }

	      gl.useProgram(shaderProgram);

	      var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	      gl.enableVertexAttribArray(vertexPositionAttribute);

	      return vertexPositionAttribute;
	    }
	  }, {
	    key: 'createBuffer',
	    value: function createBuffer() {
	      var gl = this.gl;

	      var vertexPositionBuffer = gl.createBuffer();
	      gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
	      var vertices = [0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, -0.5];
	      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	      vertexPositionBuffer.itemSize = 2;
	      vertexPositionBuffer.numItems = 4;

	      return vertexPositionBuffer;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(vertexPositionBuffer, vertexPositionAttribute) {
	      var gl = this.gl;

	      gl.clearColor(0.0, 0.0, 0.0, 1.0);

	      gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	      gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
	      gl.vertexAttribPointer(vertexPositionAttribute, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

	      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	    }
	  }, {
	    key: 'deleteBuffer',
	    value: function deleteBuffer(buffer) {
	      this.gl.deleteBuffer(buffer);
	    }
	  }]);

	  return Renderer;
	}();

	exports.default = Renderer;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "precision mediump float;\n\nvoid main(void) {\n  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n}\n"

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = "attribute vec2 aVertexPosition;\n\nvoid main(void) {\n  gl_Position = vec4(aVertexPosition, 1.0, 1.0);\n}\n"

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getWebGLCanvasContext = getWebGLCanvasContext;
	// https://www.khronos.org/webgl/wiki/FAQ
	// it is recommended that you check for success or failure to initialize.
	// if WebGL fails to initialize it is recommended you distinguish between failure
	// because the browser doesn't support WebGL and failure for some other reason.
	// if the browser does not support WebGL then the map will not be rendered.
	// you can determine if the browser supports WebGL by checking for the existence of WebGLRenderingContext.
	function getWebGLCanvasContext(canvas) {
	  var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
	  var context = null;
	  for (var ii = 0; ii < names.length; ++ii) {
	    try {
	      context = canvas.getContext(names[ii]);
	    } catch (e) {
	      continue;
	    }
	    if (context) {
	      break;
	    }
	  }
	  return context;
	}

/***/ }
/******/ ])
});
;