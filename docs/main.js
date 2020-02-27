/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");

var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");

var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");

var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");

var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");

var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js"); // Add xsrf header


      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");

var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");

var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios.prototype, context); // Copy context to instance

  utils.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults); // Expose Axios class to allow class inheritance

axios.Axios = Axios; // Factory for creating new instances

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
}; // Expose Cancel & CancelToken


axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js"); // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");
module.exports = axios; // Allow use of default import syntax in TypeScript

module.exports.default = axios;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */

function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");

var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");

var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */


function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  } // Hook up interceptors middleware


  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
module.exports = Axios;

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");

var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */


module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");

var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
/**
 * Throws a `Cancel` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */

module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;

  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function () {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };

  return error;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};
  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = ['baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'];
  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys);
  var otherKeys = Object.keys(config2).filter(function filterAxiosKeys(key) {
    return axiosKeys.indexOf(key) === -1;
  });
  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });
  return config;
};

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });
  return data;
};

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");

var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        /* Ignore */
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js"); // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
/*global toString:true*/
// utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */

function isArray(val) {
  return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */


function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


function isDate(val) {
  return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */


function isFile(val) {
  return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */


function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */


function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */


function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function merge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function deepMerge()
/* obj1, obj2, obj3, ... */
{
  var result = {};

  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
  return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;

if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
};

function EventEmitter() {
  EventEmitter.init.call(this);
}

module.exports = EventEmitter; // Backwards-compat with node 0.10.x

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function () {
    return defaultMaxListeners;
  },
  set: function (arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }

    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function () {
  if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.


EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }

  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];

  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);

  var doError = type === 'error';
  var events = this._events;
  if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

  if (doError) {
    var er;
    if (args.length > 0) er = args[0];

    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    } // At least give some kind of context to the user


    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];
  if (handler === undefined) return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);

    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;
  checkListener(listener);
  events = target._events;

  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object

      events = target._events;
    }

    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    } // Check for listener leak


    m = _getMaxListeners(target);

    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true; // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax

      var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0) return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = {
    fired: false,
    wrapFn: undefined,
    target: target,
    type: type,
    listener: listener
  };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
}; // Emits a 'removeListener' event if and only if the listener was removed.


EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events, position, i, originalListener;
  checkListener(listener);
  events = this._events;
  if (events === undefined) return this;
  list = events[type];
  if (list === undefined) return this;

  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0) this._events = Object.create(null);else {
      delete events[type];
      if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
    }
  } else if (typeof list !== 'function') {
    position = -1;

    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position = i;
        break;
      }
    }

    if (position < 0) return this;
    if (position === 0) list.shift();else {
      spliceOne(list, position);
    }
    if (list.length === 1) events[type] = list[0];
    if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
  }

  return this;
};

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners, events, i;
  events = this._events;
  if (events === undefined) return this; // not listening for removeListener, no need to emit

  if (events.removeListener === undefined) {
    if (arguments.length === 0) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    } else if (events[type] !== undefined) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


  if (arguments.length === 0) {
    var keys = Object.keys(events);
    var key;

    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }

    this.removeAllListeners('removeListener');
    this._events = Object.create(null);
    this._eventsCount = 0;
    return this;
  }

  listeners = events[type];

  if (typeof listeners === 'function') {
    this.removeListener(type, listeners);
  } else if (listeners !== undefined) {
    // LIFO order
    for (i = listeners.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners[i]);
    }
  }

  return this;
};

function _listeners(target, type, unwrap) {
  var events = target._events;
  if (events === undefined) return [];
  var evlistener = events[type];
  if (evlistener === undefined) return [];
  if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function (emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;

function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);

  for (var i = 0; i < n; ++i) copy[i] = arr[i];

  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++) list[index] = list[index + 1];

  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);

  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }

  return ret;
}

/***/ }),

/***/ "./node_modules/js-base64/base64.js":
/*!******************************************!*\
  !*** ./node_modules/js-base64/base64.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 *  base64.js
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */
;

(function (global, factory) {
   true ? module.exports = factory(global) : undefined;
})(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this, function (global) {
  'use strict'; // existing version for noConflict()

  global = global || {};
  var _Base64 = global.Base64;
  var version = "2.5.2"; // if node.js and NOT React Native, we use Buffer

  var buffer;

  if ( true && module.exports) {
    try {
      buffer = eval("require('buffer').Buffer");
    } catch (err) {
      buffer = undefined;
    }
  } // constants


  var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  var b64tab = function (bin) {
    var t = {};

    for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;

    return t;
  }(b64chars);

  var fromCharCode = String.fromCharCode; // encoder stuff

  var cb_utob = function (c) {
    if (c.length < 2) {
      var cc = c.charCodeAt(0);
      return cc < 0x80 ? c : cc < 0x800 ? fromCharCode(0xc0 | cc >>> 6) + fromCharCode(0x80 | cc & 0x3f) : fromCharCode(0xe0 | cc >>> 12 & 0x0f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
    } else {
      var cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00);
      return fromCharCode(0xf0 | cc >>> 18 & 0x07) + fromCharCode(0x80 | cc >>> 12 & 0x3f) + fromCharCode(0x80 | cc >>> 6 & 0x3f) + fromCharCode(0x80 | cc & 0x3f);
    }
  };

  var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;

  var utob = function (u) {
    return u.replace(re_utob, cb_utob);
  };

  var cb_encode = function (ccc) {
    var padlen = [0, 2, 1][ccc.length % 3],
        ord = ccc.charCodeAt(0) << 16 | (ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8 | (ccc.length > 2 ? ccc.charCodeAt(2) : 0),
        chars = [b64chars.charAt(ord >>> 18), b64chars.charAt(ord >>> 12 & 63), padlen >= 2 ? '=' : b64chars.charAt(ord >>> 6 & 63), padlen >= 1 ? '=' : b64chars.charAt(ord & 63)];
    return chars.join('');
  };

  var btoa = global.btoa ? function (b) {
    return global.btoa(b);
  } : function (b) {
    return b.replace(/[\s\S]{1,3}/g, cb_encode);
  };

  var _encode = function (u) {
    var isUint8Array = Object.prototype.toString.call(u) === '[object Uint8Array]';
    return isUint8Array ? u.toString('base64') : btoa(utob(String(u)));
  };

  var encode = function (u, urisafe) {
    return !urisafe ? _encode(u) : _encode(String(u)).replace(/[+\/]/g, function (m0) {
      return m0 == '+' ? '-' : '_';
    }).replace(/=/g, '');
  };

  var encodeURI = function (u) {
    return encode(u, true);
  }; // decoder stuff


  var re_btou = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;

  var cb_btou = function (cccc) {
    switch (cccc.length) {
      case 4:
        var cp = (0x07 & cccc.charCodeAt(0)) << 18 | (0x3f & cccc.charCodeAt(1)) << 12 | (0x3f & cccc.charCodeAt(2)) << 6 | 0x3f & cccc.charCodeAt(3),
            offset = cp - 0x10000;
        return fromCharCode((offset >>> 10) + 0xD800) + fromCharCode((offset & 0x3FF) + 0xDC00);

      case 3:
        return fromCharCode((0x0f & cccc.charCodeAt(0)) << 12 | (0x3f & cccc.charCodeAt(1)) << 6 | 0x3f & cccc.charCodeAt(2));

      default:
        return fromCharCode((0x1f & cccc.charCodeAt(0)) << 6 | 0x3f & cccc.charCodeAt(1));
    }
  };

  var btou = function (b) {
    return b.replace(re_btou, cb_btou);
  };

  var cb_decode = function (cccc) {
    var len = cccc.length,
        padlen = len % 4,
        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) | (len > 3 ? b64tab[cccc.charAt(3)] : 0),
        chars = [fromCharCode(n >>> 16), fromCharCode(n >>> 8 & 0xff), fromCharCode(n & 0xff)];
    chars.length -= [0, 0, 2, 1][padlen];
    return chars.join('');
  };

  var _atob = global.atob ? function (a) {
    return global.atob(a);
  } : function (a) {
    return a.replace(/\S{1,4}/g, cb_decode);
  };

  var atob = function (a) {
    return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ''));
  };

  var _decode = buffer ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from ? function (a) {
    return (a.constructor === buffer.constructor ? a : buffer.from(a, 'base64')).toString();
  } : function (a) {
    return (a.constructor === buffer.constructor ? a : new buffer(a, 'base64')).toString();
  } : function (a) {
    return btou(_atob(a));
  };

  var decode = function (a) {
    return _decode(String(a).replace(/[-_]/g, function (m0) {
      return m0 == '-' ? '+' : '/';
    }).replace(/[^A-Za-z0-9\+\/]/g, ''));
  };

  var noConflict = function () {
    var Base64 = global.Base64;
    global.Base64 = _Base64;
    return Base64;
  }; // export Base64


  global.Base64 = {
    VERSION: version,
    atob: atob,
    btoa: btoa,
    fromBase64: decode,
    toBase64: encode,
    utob: utob,
    encode: encode,
    encodeURI: encodeURI,
    btou: btou,
    decode: decode,
    noConflict: noConflict,
    __buffer__: buffer
  }; // if ES5 is available, make Base64.extendString() available

  if (typeof Object.defineProperty === 'function') {
    var noEnum = function (v) {
      return {
        value: v,
        enumerable: false,
        writable: true,
        configurable: true
      };
    };

    global.Base64.extendString = function () {
      Object.defineProperty(String.prototype, 'fromBase64', noEnum(function () {
        return decode(this);
      }));
      Object.defineProperty(String.prototype, 'toBase64', noEnum(function (urisafe) {
        return encode(this, urisafe);
      }));
      Object.defineProperty(String.prototype, 'toBase64URI', noEnum(function () {
        return encode(this, true);
      }));
    };
  } //
  // export Base64 to the namespace
  //


  if (global['Meteor']) {
    // Meteor.js
    Base64 = global.Base64;
  } // module.exports and AMD are mutually exclusive.
  // module.exports has precedence.


  if ( true && module.exports) {
    module.exports.Base64 = global.Base64;
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return global.Base64;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } // that's it!


  return {
    Base64: global.Base64
  };
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/localforage/dist/localforage.js":
/*!******************************************************!*\
  !*** ./node_modules/localforage/dist/localforage.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/*!
    localForage -- Offline Storage, Improved
    Version 1.7.3
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function (f) {
  if (true) {
    module.exports = f();
  } else { var g; }
})(function () {
  var define, module, exports;
  return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return require(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }

        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }

      return n[o].exports;
    }

    var i = typeof require == "function" && require;

    for (var o = 0; o < r.length; o++) s(r[o]);

    return s;
  }({
    1: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        var Mutation = global.MutationObserver || global.WebKitMutationObserver;
        var scheduleDrain;
        {
          if (Mutation) {
            var called = 0;
            var observer = new Mutation(nextTick);
            var element = global.document.createTextNode('');
            observer.observe(element, {
              characterData: true
            });

            scheduleDrain = function () {
              element.data = called = ++called % 2;
            };
          } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
            var channel = new global.MessageChannel();
            channel.port1.onmessage = nextTick;

            scheduleDrain = function () {
              channel.port2.postMessage(0);
            };
          } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
            scheduleDrain = function () {
              // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
              // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
              var scriptEl = global.document.createElement('script');

              scriptEl.onreadystatechange = function () {
                nextTick();
                scriptEl.onreadystatechange = null;
                scriptEl.parentNode.removeChild(scriptEl);
                scriptEl = null;
              };

              global.document.documentElement.appendChild(scriptEl);
            };
          } else {
            scheduleDrain = function () {
              setTimeout(nextTick, 0);
            };
          }
        }
        var draining;
        var queue = []; //named nextTick for less confusing stack traces

        function nextTick() {
          draining = true;
          var i, oldQueue;
          var len = queue.length;

          while (len) {
            oldQueue = queue;
            queue = [];
            i = -1;

            while (++i < len) {
              oldQueue[i]();
            }

            len = queue.length;
          }

          draining = false;
        }

        module.exports = immediate;

        function immediate(task) {
          if (queue.push(task) === 1 && !draining) {
            scheduleDrain();
          }
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    2: [function (_dereq_, module, exports) {
      'use strict';

      var immediate = _dereq_(1);
      /* istanbul ignore next */


      function INTERNAL() {}

      var handlers = {};
      var REJECTED = ['REJECTED'];
      var FULFILLED = ['FULFILLED'];
      var PENDING = ['PENDING'];
      module.exports = Promise;

      function Promise(resolver) {
        if (typeof resolver !== 'function') {
          throw new TypeError('resolver must be a function');
        }

        this.state = PENDING;
        this.queue = [];
        this.outcome = void 0;

        if (resolver !== INTERNAL) {
          safelyResolveThenable(this, resolver);
        }
      }

      Promise.prototype["catch"] = function (onRejected) {
        return this.then(null, onRejected);
      };

      Promise.prototype.then = function (onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function' && this.state === FULFILLED || typeof onRejected !== 'function' && this.state === REJECTED) {
          return this;
        }

        var promise = new this.constructor(INTERNAL);

        if (this.state !== PENDING) {
          var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
          unwrap(promise, resolver, this.outcome);
        } else {
          this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
        }

        return promise;
      };

      function QueueItem(promise, onFulfilled, onRejected) {
        this.promise = promise;

        if (typeof onFulfilled === 'function') {
          this.onFulfilled = onFulfilled;
          this.callFulfilled = this.otherCallFulfilled;
        }

        if (typeof onRejected === 'function') {
          this.onRejected = onRejected;
          this.callRejected = this.otherCallRejected;
        }
      }

      QueueItem.prototype.callFulfilled = function (value) {
        handlers.resolve(this.promise, value);
      };

      QueueItem.prototype.otherCallFulfilled = function (value) {
        unwrap(this.promise, this.onFulfilled, value);
      };

      QueueItem.prototype.callRejected = function (value) {
        handlers.reject(this.promise, value);
      };

      QueueItem.prototype.otherCallRejected = function (value) {
        unwrap(this.promise, this.onRejected, value);
      };

      function unwrap(promise, func, value) {
        immediate(function () {
          var returnValue;

          try {
            returnValue = func(value);
          } catch (e) {
            return handlers.reject(promise, e);
          }

          if (returnValue === promise) {
            handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
          } else {
            handlers.resolve(promise, returnValue);
          }
        });
      }

      handlers.resolve = function (self, value) {
        var result = tryCatch(getThen, value);

        if (result.status === 'error') {
          return handlers.reject(self, result.value);
        }

        var thenable = result.value;

        if (thenable) {
          safelyResolveThenable(self, thenable);
        } else {
          self.state = FULFILLED;
          self.outcome = value;
          var i = -1;
          var len = self.queue.length;

          while (++i < len) {
            self.queue[i].callFulfilled(value);
          }
        }

        return self;
      };

      handlers.reject = function (self, error) {
        self.state = REJECTED;
        self.outcome = error;
        var i = -1;
        var len = self.queue.length;

        while (++i < len) {
          self.queue[i].callRejected(error);
        }

        return self;
      };

      function getThen(obj) {
        // Make sure we only access the accessor once as required by the spec
        var then = obj && obj.then;

        if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
          return function appyThen() {
            then.apply(obj, arguments);
          };
        }
      }

      function safelyResolveThenable(self, thenable) {
        // Either fulfill, reject or reject with error
        var called = false;

        function onError(value) {
          if (called) {
            return;
          }

          called = true;
          handlers.reject(self, value);
        }

        function onSuccess(value) {
          if (called) {
            return;
          }

          called = true;
          handlers.resolve(self, value);
        }

        function tryToUnwrap() {
          thenable(onSuccess, onError);
        }

        var result = tryCatch(tryToUnwrap);

        if (result.status === 'error') {
          onError(result.value);
        }
      }

      function tryCatch(func, value) {
        var out = {};

        try {
          out.value = func(value);
          out.status = 'success';
        } catch (e) {
          out.status = 'error';
          out.value = e;
        }

        return out;
      }

      Promise.resolve = resolve;

      function resolve(value) {
        if (value instanceof this) {
          return value;
        }

        return handlers.resolve(new this(INTERNAL), value);
      }

      Promise.reject = reject;

      function reject(reason) {
        var promise = new this(INTERNAL);
        return handlers.reject(promise, reason);
      }

      Promise.all = all;

      function all(iterable) {
        var self = this;

        if (Object.prototype.toString.call(iterable) !== '[object Array]') {
          return this.reject(new TypeError('must be an array'));
        }

        var len = iterable.length;
        var called = false;

        if (!len) {
          return this.resolve([]);
        }

        var values = new Array(len);
        var resolved = 0;
        var i = -1;
        var promise = new this(INTERNAL);

        while (++i < len) {
          allResolver(iterable[i], i);
        }

        return promise;

        function allResolver(value, i) {
          self.resolve(value).then(resolveFromAll, function (error) {
            if (!called) {
              called = true;
              handlers.reject(promise, error);
            }
          });

          function resolveFromAll(outValue) {
            values[i] = outValue;

            if (++resolved === len && !called) {
              called = true;
              handlers.resolve(promise, values);
            }
          }
        }
      }

      Promise.race = race;

      function race(iterable) {
        var self = this;

        if (Object.prototype.toString.call(iterable) !== '[object Array]') {
          return this.reject(new TypeError('must be an array'));
        }

        var len = iterable.length;
        var called = false;

        if (!len) {
          return this.resolve([]);
        }

        var i = -1;
        var promise = new this(INTERNAL);

        while (++i < len) {
          resolver(iterable[i]);
        }

        return promise;

        function resolver(value) {
          self.resolve(value).then(function (response) {
            if (!called) {
              called = true;
              handlers.resolve(promise, response);
            }
          }, function (error) {
            if (!called) {
              called = true;
              handlers.reject(promise, error);
            }
          });
        }
      }
    }, {
      "1": 1
    }],
    3: [function (_dereq_, module, exports) {
      (function (global) {
        'use strict';

        if (typeof global.Promise !== 'function') {
          global.Promise = _dereq_(2);
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "2": 2
    }],
    4: [function (_dereq_, module, exports) {
      'use strict';

      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      function getIDB() {
        /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
        try {
          if (typeof indexedDB !== 'undefined') {
            return indexedDB;
          }

          if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
          }

          if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
          }

          if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
          }

          if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
          }
        } catch (e) {
          return;
        }
      }

      var idb = getIDB();

      function isIndexedDBValid() {
        try {
          // Initialize IndexedDB; fall back to vendor-prefixed versions
          // if needed.
          if (!idb) {
            return false;
          } // We mimic PouchDB here;
          //
          // We test for openDatabase because IE Mobile identifies itself
          // as Safari. Oh the lulz...


          var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
          var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1; // Safari <10.1 does not meet our requirements for IDB support (#5572)
          // since Safari 10.1 shipped with fetch, we can use that to detect it

          return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' && // some outdated implementations of IDB that appear on Samsung
          // and HTC Android devices <4.4 are missing IDBKeyRange
          // See: https://github.com/mozilla/localForage/issues/128
          // See: https://github.com/mozilla/localForage/issues/272
          typeof IDBKeyRange !== 'undefined';
        } catch (e) {
          return false;
        }
      } // Abstracts constructing a Blob object, so it also works in older
      // browsers that don't support the native Blob constructor. (i.e.
      // old QtWebKit versions, at least).
      // Abstracts constructing a Blob object, so it also works in older
      // browsers that don't support the native Blob constructor. (i.e.
      // old QtWebKit versions, at least).


      function createBlob(parts, properties) {
        /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
        parts = parts || [];
        properties = properties || {};

        try {
          return new Blob(parts, properties);
        } catch (e) {
          if (e.name !== 'TypeError') {
            throw e;
          }

          var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
          var builder = new Builder();

          for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
          }

          return builder.getBlob(properties.type);
        }
      } // This is CommonJS because lie is an external dependency, so Rollup
      // can just ignore it.


      if (typeof Promise === 'undefined') {
        // In the "nopromises" build this will just throw if you don't have
        // a global promise object, but it would throw anyway later.
        _dereq_(3);
      }

      var Promise$1 = Promise;

      function executeCallback(promise, callback) {
        if (callback) {
          promise.then(function (result) {
            callback(null, result);
          }, function (error) {
            callback(error);
          });
        }
      }

      function executeTwoCallbacks(promise, callback, errorCallback) {
        if (typeof callback === 'function') {
          promise.then(callback);
        }

        if (typeof errorCallback === 'function') {
          promise["catch"](errorCallback);
        }
      }

      function normalizeKey(key) {
        // Cast the key to a string, as that's all we can set as a key.
        if (typeof key !== 'string') {
          console.warn(key + ' used as a key, but it is not a string.');
          key = String(key);
        }

        return key;
      }

      function getCallback() {
        if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
          return arguments[arguments.length - 1];
        }
      } // Some code originally from async_storage.js in
      // [Gaia](https://github.com/mozilla-b2g/gaia).


      var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
      var supportsBlobs = void 0;
      var dbContexts = {};
      var toString = Object.prototype.toString; // Transaction Modes

      var READ_ONLY = 'readonly';
      var READ_WRITE = 'readwrite'; // Transform a binary string to an array buffer, because otherwise
      // weird stuff happens when you try to work with the binary string directly.
      // It is known.
      // From http://stackoverflow.com/questions/14967647/ (continues on next line)
      // encode-decode-image-with-base64-breaks-image (2013-04-21)

      function _binStringToArrayBuffer(bin) {
        var length = bin.length;
        var buf = new ArrayBuffer(length);
        var arr = new Uint8Array(buf);

        for (var i = 0; i < length; i++) {
          arr[i] = bin.charCodeAt(i);
        }

        return buf;
      } //
      // Blobs are not supported in all versions of IndexedDB, notably
      // Chrome <37 and Android <5. In those versions, storing a blob will throw.
      //
      // Various other blob bugs exist in Chrome v37-42 (inclusive).
      // Detecting them is expensive and confusing to users, and Chrome 37-42
      // is at very low usage worldwide, so we do a hacky userAgent check instead.
      //
      // content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
      // 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
      // FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
      //
      // Code borrowed from PouchDB. See:
      // https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
      //


      function _checkBlobSupportWithoutCaching(idb) {
        return new Promise$1(function (resolve) {
          var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
          var blob = createBlob(['']);
          txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

          txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
          };

          txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//); // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx

            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
          };
        })["catch"](function () {
          return false; // error, so assume unsupported
        });
      }

      function _checkBlobSupport(idb) {
        if (typeof supportsBlobs === 'boolean') {
          return Promise$1.resolve(supportsBlobs);
        }

        return _checkBlobSupportWithoutCaching(idb).then(function (value) {
          supportsBlobs = value;
          return supportsBlobs;
        });
      }

      function _deferReadiness(dbInfo) {
        var dbContext = dbContexts[dbInfo.name]; // Create a deferred object representing the current database operation.

        var deferredOperation = {};
        deferredOperation.promise = new Promise$1(function (resolve, reject) {
          deferredOperation.resolve = resolve;
          deferredOperation.reject = reject;
        }); // Enqueue the deferred operation.

        dbContext.deferredOperations.push(deferredOperation); // Chain its promise to the database readiness.

        if (!dbContext.dbReady) {
          dbContext.dbReady = deferredOperation.promise;
        } else {
          dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
          });
        }
      }

      function _advanceReadiness(dbInfo) {
        var dbContext = dbContexts[dbInfo.name]; // Dequeue a deferred operation.

        var deferredOperation = dbContext.deferredOperations.pop(); // Resolve its promise (which is part of the database readiness
        // chain of promises).

        if (deferredOperation) {
          deferredOperation.resolve();
          return deferredOperation.promise;
        }
      }

      function _rejectReadiness(dbInfo, err) {
        var dbContext = dbContexts[dbInfo.name]; // Dequeue a deferred operation.

        var deferredOperation = dbContext.deferredOperations.pop(); // Reject its promise (which is part of the database readiness
        // chain of promises).

        if (deferredOperation) {
          deferredOperation.reject(err);
          return deferredOperation.promise;
        }
      }

      function _getConnection(dbInfo, upgradeNeeded) {
        return new Promise$1(function (resolve, reject) {
          dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

          if (dbInfo.db) {
            if (upgradeNeeded) {
              _deferReadiness(dbInfo);

              dbInfo.db.close();
            } else {
              return resolve(dbInfo.db);
            }
          }

          var dbArgs = [dbInfo.name];

          if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
          }

          var openreq = idb.open.apply(idb, dbArgs);

          if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
              var db = openreq.result;

              try {
                db.createObjectStore(dbInfo.storeName);

                if (e.oldVersion <= 1) {
                  // Added when support for blob shims was added
                  db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                }
              } catch (ex) {
                if (ex.name === 'ConstraintError') {
                  console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                } else {
                  throw ex;
                }
              }
            };
          }

          openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
          };

          openreq.onsuccess = function () {
            resolve(openreq.result);

            _advanceReadiness(dbInfo);
          };
        });
      }

      function _getOriginalConnection(dbInfo) {
        return _getConnection(dbInfo, false);
      }

      function _getUpgradedConnection(dbInfo) {
        return _getConnection(dbInfo, true);
      }

      function _isUpgradeNeeded(dbInfo, defaultVersion) {
        if (!dbInfo.db) {
          return true;
        }

        var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
        var isDowngrade = dbInfo.version < dbInfo.db.version;
        var isUpgrade = dbInfo.version > dbInfo.db.version;

        if (isDowngrade) {
          // If the version is not the default one
          // then warn for impossible downgrade.
          if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
          } // Align the versions to prevent errors.


          dbInfo.version = dbInfo.db.version;
        }

        if (isUpgrade || isNewStore) {
          // If the store is new then increment the version (if needed).
          // This will trigger an "upgradeneeded" event which is required
          // for creating a store.
          if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;

            if (incVersion > dbInfo.version) {
              dbInfo.version = incVersion;
            }
          }

          return true;
        }

        return false;
      } // encode a blob for indexeddb engines that don't support blobs


      function _encodeBlob(blob) {
        return new Promise$1(function (resolve, reject) {
          var reader = new FileReader();
          reader.onerror = reject;

          reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
              __local_forage_encoded_blob: true,
              data: base64,
              type: blob.type
            });
          };

          reader.readAsBinaryString(blob);
        });
      } // decode an encoded blob


      function _decodeBlob(encodedBlob) {
        var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));

        return createBlob([arrayBuff], {
          type: encodedBlob.type
        });
      } // is this one of our fancy encoded blobs?


      function _isEncodedBlob(value) {
        return value && value.__local_forage_encoded_blob;
      } // Specialize the default `ready()` function by making it dependent
      // on the current database operations. Thus, the driver will be actually
      // ready when it's been initialized (default) *and* there are no pending
      // operations on the database (initiated by some other instances).


      function _fullyReady(callback) {
        var self = this;

        var promise = self._initReady().then(function () {
          var dbContext = dbContexts[self._dbInfo.name];

          if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
          }
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
      } // Try to establish a new db connection to replace the
      // current one which is broken (i.e. experiencing
      // InvalidStateError while creating a transaction).


      function _tryReconnect(dbInfo) {
        _deferReadiness(dbInfo);

        var dbContext = dbContexts[dbInfo.name];
        var forages = dbContext.forages;

        for (var i = 0; i < forages.length; i++) {
          var forage = forages[i];

          if (forage._dbInfo.db) {
            forage._dbInfo.db.close();

            forage._dbInfo.db = null;
          }
        }

        dbInfo.db = null;
        return _getOriginalConnection(dbInfo).then(function (db) {
          dbInfo.db = db;

          if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
          }

          return db;
        }).then(function (db) {
          // store the latest db reference
          // in case the db was upgraded
          dbInfo.db = dbContext.db = db;

          for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
          }
        })["catch"](function (err) {
          _rejectReadiness(dbInfo, err);

          throw err;
        });
      } // FF doesn't like Promises (micro-tasks) and IDDB store operations,
      // so we have to do it with callbacks


      function createTransaction(dbInfo, mode, callback, retries) {
        if (retries === undefined) {
          retries = 1;
        }

        try {
          var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
          callback(null, tx);
        } catch (err) {
          if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
              if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                // increase the db version, to create the new ObjectStore
                if (dbInfo.db) {
                  dbInfo.version = dbInfo.db.version + 1;
                } // Reopen the database for upgrading.


                return _getUpgradedConnection(dbInfo);
              }
            }).then(function () {
              return _tryReconnect(dbInfo).then(function () {
                createTransaction(dbInfo, mode, callback, retries - 1);
              });
            })["catch"](callback);
          }

          callback(err);
        }
      }

      function createDbContext() {
        return {
          // Running localForages sharing a database.
          forages: [],
          // Shared database.
          db: null,
          // Database readiness (promise).
          dbReady: null,
          // Deferred operations on the database.
          deferredOperations: []
        };
      } // Open the IndexedDB database (automatically creates one if one didn't
      // previously exist), using any options set in the config.


      function _initStorage(options) {
        var self = this;
        var dbInfo = {
          db: null
        };

        if (options) {
          for (var i in options) {
            dbInfo[i] = options[i];
          }
        } // Get the current context of the database;


        var dbContext = dbContexts[dbInfo.name]; // ...or create a new context.

        if (!dbContext) {
          dbContext = createDbContext(); // Register the new context in the global container.

          dbContexts[dbInfo.name] = dbContext;
        } // Register itself as a running localForage in the current context.


        dbContext.forages.push(self); // Replace the default `ready()` function with the specialized one.

        if (!self._initReady) {
          self._initReady = self.ready;
          self.ready = _fullyReady;
        } // Create an array of initialization states of the related localForages.


        var initPromises = [];

        function ignoreErrors() {
          // Don't handle errors here,
          // just makes sure related localForages aren't pending.
          return Promise$1.resolve();
        }

        for (var j = 0; j < dbContext.forages.length; j++) {
          var forage = dbContext.forages[j];

          if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
          }
        } // Take a snapshot of the related localForages.


        var forages = dbContext.forages.slice(0); // Initialize the connection process only when
        // all the related localForages aren't pending.

        return Promise$1.all(initPromises).then(function () {
          dbInfo.db = dbContext.db; // Get the connection or open a new one without upgrade.

          return _getOriginalConnection(dbInfo);
        }).then(function (db) {
          dbInfo.db = db;

          if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
          }

          return db;
        }).then(function (db) {
          dbInfo.db = dbContext.db = db;
          self._dbInfo = dbInfo; // Share the final connection amongst related localForages.

          for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];

            if (forage !== self) {
              // Self is already up-to-date.
              forage._dbInfo.db = dbInfo.db;
              forage._dbInfo.version = dbInfo.version;
            }
          }
        });
      }

      function getItem(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
              if (err) {
                return reject(err);
              }

              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var req = store.get(key);

                req.onsuccess = function () {
                  var value = req.result;

                  if (value === undefined) {
                    value = null;
                  }

                  if (_isEncodedBlob(value)) {
                    value = _decodeBlob(value);
                  }

                  resolve(value);
                };

                req.onerror = function () {
                  reject(req.error);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      } // Iterate over all items stored in database.


      function iterate(iterator, callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
              if (err) {
                return reject(err);
              }

              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var req = store.openCursor();
                var iterationNumber = 1;

                req.onsuccess = function () {
                  var cursor = req.result;

                  if (cursor) {
                    var value = cursor.value;

                    if (_isEncodedBlob(value)) {
                      value = _decodeBlob(value);
                    }

                    var result = iterator(value, cursor.key, iterationNumber++); // when the iterator callback retuns any
                    // (non-`undefined`) value, then we stop
                    // the iteration immediately

                    if (result !== void 0) {
                      resolve(result);
                    } else {
                      cursor["continue"]();
                    }
                  } else {
                    resolve();
                  }
                };

                req.onerror = function () {
                  reject(req.error);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }

      function setItem(key, value, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          var dbInfo;
          self.ready().then(function () {
            dbInfo = self._dbInfo;

            if (toString.call(value) === '[object Blob]') {
              return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                if (blobSupport) {
                  return value;
                }

                return _encodeBlob(value);
              });
            }

            return value;
          }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
              if (err) {
                return reject(err);
              }

              try {
                var store = transaction.objectStore(self._dbInfo.storeName); // The reason we don't _save_ null is because IE 10 does
                // not support saving the `null` type in IndexedDB. How
                // ironic, given the bug below!
                // See: https://github.com/mozilla/localForage/issues/161

                if (value === null) {
                  value = undefined;
                }

                var req = store.put(value, key);

                transaction.oncomplete = function () {
                  // Cast to undefined so the value passed to
                  // callback/promise is the same as what one would get out
                  // of `getItem()` later. This leads to some weirdness
                  // (setItem('foo', undefined) will return `null`), but
                  // it's not my fault localStorage is our baseline and that
                  // it's weird.
                  if (value === undefined) {
                    value = null;
                  }

                  resolve(value);
                };

                transaction.onabort = transaction.onerror = function () {
                  var err = req.error ? req.error : req.transaction.error;
                  reject(err);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }

      function removeItem(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
              if (err) {
                return reject(err);
              }

              try {
                var store = transaction.objectStore(self._dbInfo.storeName); // We use a Grunt task to make this safe for IE and some
                // versions of Android (including those used by Cordova).
                // Normally IE won't like `.delete()` and will insist on
                // using `['delete']()`, but we have a build step that
                // fixes this for us now.

                var req = store["delete"](key);

                transaction.oncomplete = function () {
                  resolve();
                };

                transaction.onerror = function () {
                  reject(req.error);
                }; // The request will be also be aborted if we've exceeded our storage
                // space.


                transaction.onabort = function () {
                  var err = req.error ? req.error : req.transaction.error;
                  reject(err);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }

      function clear(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
              if (err) {
                return reject(err);
              }

              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var req = store.clear();

                transaction.oncomplete = function () {
                  resolve();
                };

                transaction.onabort = transaction.onerror = function () {
                  var err = req.error ? req.error : req.transaction.error;
                  reject(err);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }

      function length(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
              if (err) {
                return reject(err);
              }

              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var req = store.count();

                req.onsuccess = function () {
                  resolve(req.result);
                };

                req.onerror = function () {
                  reject(req.error);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }

      function key(n, callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          if (n < 0) {
            resolve(null);
            return;
          }

          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
              if (err) {
                return reject(err);
              }

              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var advanced = false;
                var req = store.openCursor();

                req.onsuccess = function () {
                  var cursor = req.result;

                  if (!cursor) {
                    // this means there weren't enough keys
                    resolve(null);
                    return;
                  }

                  if (n === 0) {
                    // We have the first key, return it if that's what they
                    // wanted.
                    resolve(cursor.key);
                  } else {
                    if (!advanced) {
                      // Otherwise, ask the cursor to skip ahead n
                      // records.
                      advanced = true;
                      cursor.advance(n);
                    } else {
                      // When we get here, we've got the nth key.
                      resolve(cursor.key);
                    }
                  }
                };

                req.onerror = function () {
                  reject(req.error);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }

      function keys(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
              if (err) {
                return reject(err);
              }

              try {
                var store = transaction.objectStore(self._dbInfo.storeName);
                var req = store.openCursor();
                var keys = [];

                req.onsuccess = function () {
                  var cursor = req.result;

                  if (!cursor) {
                    resolve(keys);
                    return;
                  }

                  keys.push(cursor.key);
                  cursor["continue"]();
                };

                req.onerror = function () {
                  reject(req.error);
                };
              } catch (e) {
                reject(e);
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }

      function dropInstance(options, callback) {
        callback = getCallback.apply(this, arguments);
        var currentConfig = this.config();
        options = typeof options !== 'function' && options || {};

        if (!options.name) {
          options.name = options.name || currentConfig.name;
          options.storeName = options.storeName || currentConfig.storeName;
        }

        var self = this;
        var promise;

        if (!options.name) {
          promise = Promise$1.reject('Invalid arguments');
        } else {
          var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;
          var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;

            for (var i = 0; i < forages.length; i++) {
              forages[i]._dbInfo.db = db;
            }

            return db;
          });

          if (!options.storeName) {
            promise = dbPromise.then(function (db) {
              _deferReadiness(options);

              var dbContext = dbContexts[options.name];
              var forages = dbContext.forages;
              db.close();

              for (var i = 0; i < forages.length; i++) {
                var forage = forages[i];
                forage._dbInfo.db = null;
              }

              var dropDBPromise = new Promise$1(function (resolve, reject) {
                var req = idb.deleteDatabase(options.name);

                req.onerror = req.onblocked = function (err) {
                  var db = req.result;

                  if (db) {
                    db.close();
                  }

                  reject(err);
                };

                req.onsuccess = function () {
                  var db = req.result;

                  if (db) {
                    db.close();
                  }

                  resolve(db);
                };
              });
              return dropDBPromise.then(function (db) {
                dbContext.db = db;

                for (var i = 0; i < forages.length; i++) {
                  var _forage = forages[i];

                  _advanceReadiness(_forage._dbInfo);
                }
              })["catch"](function (err) {
                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                throw err;
              });
            });
          } else {
            promise = dbPromise.then(function (db) {
              if (!db.objectStoreNames.contains(options.storeName)) {
                return;
              }

              var newVersion = db.version + 1;

              _deferReadiness(options);

              var dbContext = dbContexts[options.name];
              var forages = dbContext.forages;
              db.close();

              for (var i = 0; i < forages.length; i++) {
                var forage = forages[i];
                forage._dbInfo.db = null;
                forage._dbInfo.version = newVersion;
              }

              var dropObjectPromise = new Promise$1(function (resolve, reject) {
                var req = idb.open(options.name, newVersion);

                req.onerror = function (err) {
                  var db = req.result;
                  db.close();
                  reject(err);
                };

                req.onupgradeneeded = function () {
                  var db = req.result;
                  db.deleteObjectStore(options.storeName);
                };

                req.onsuccess = function () {
                  var db = req.result;
                  db.close();
                  resolve(db);
                };
              });
              return dropObjectPromise.then(function (db) {
                dbContext.db = db;

                for (var j = 0; j < forages.length; j++) {
                  var _forage2 = forages[j];
                  _forage2._dbInfo.db = db;

                  _advanceReadiness(_forage2._dbInfo);
                }
              })["catch"](function (err) {
                (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                throw err;
              });
            });
          }
        }

        executeCallback(promise, callback);
        return promise;
      }

      var asyncStorage = {
        _driver: 'asyncStorage',
        _initStorage: _initStorage,
        _support: isIndexedDBValid(),
        iterate: iterate,
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        clear: clear,
        length: length,
        key: key,
        keys: keys,
        dropInstance: dropInstance
      };

      function isWebSQLValid() {
        return typeof openDatabase === 'function';
      } // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
      // it to Base64, so this is how we store it to prevent very strange errors with less
      // verbose ways of binary <-> string data storage.


      var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      var BLOB_TYPE_PREFIX = '~~local_forage_type~';
      var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
      var SERIALIZED_MARKER = '__lfsc__:';
      var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length; // OMG the serializations!

      var TYPE_ARRAYBUFFER = 'arbf';
      var TYPE_BLOB = 'blob';
      var TYPE_INT8ARRAY = 'si08';
      var TYPE_UINT8ARRAY = 'ui08';
      var TYPE_UINT8CLAMPEDARRAY = 'uic8';
      var TYPE_INT16ARRAY = 'si16';
      var TYPE_INT32ARRAY = 'si32';
      var TYPE_UINT16ARRAY = 'ur16';
      var TYPE_UINT32ARRAY = 'ui32';
      var TYPE_FLOAT32ARRAY = 'fl32';
      var TYPE_FLOAT64ARRAY = 'fl64';
      var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
      var toString$1 = Object.prototype.toString;

      function stringToBuffer(serializedString) {
        // Fill the string into a ArrayBuffer.
        var bufferLength = serializedString.length * 0.75;
        var len = serializedString.length;
        var i;
        var p = 0;
        var encoded1, encoded2, encoded3, encoded4;

        if (serializedString[serializedString.length - 1] === '=') {
          bufferLength--;

          if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
          }
        }

        var buffer = new ArrayBuffer(bufferLength);
        var bytes = new Uint8Array(buffer);

        for (i = 0; i < len; i += 4) {
          encoded1 = BASE_CHARS.indexOf(serializedString[i]);
          encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
          encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
          encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
          /*jslint bitwise: true */

          bytes[p++] = encoded1 << 2 | encoded2 >> 4;
          bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
          bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
        }

        return buffer;
      } // Converts a buffer to a string to store, serialized, in the backend
      // storage library.


      function bufferToString(buffer) {
        // base64-arraybuffer
        var bytes = new Uint8Array(buffer);
        var base64String = '';
        var i;

        for (i = 0; i < bytes.length; i += 3) {
          /*jslint bitwise: true */
          base64String += BASE_CHARS[bytes[i] >> 2];
          base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
          base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
          base64String += BASE_CHARS[bytes[i + 2] & 63];
        }

        if (bytes.length % 3 === 2) {
          base64String = base64String.substring(0, base64String.length - 1) + '=';
        } else if (bytes.length % 3 === 1) {
          base64String = base64String.substring(0, base64String.length - 2) + '==';
        }

        return base64String;
      } // Serialize a value, afterwards executing a callback (which usually
      // instructs the `setItem()` callback/promise to be executed). This is how
      // we store binary data with localStorage.


      function serialize(value, callback) {
        var valueType = '';

        if (value) {
          valueType = toString$1.call(value);
        } // Cannot use `value instanceof ArrayBuffer` or such here, as these
        // checks fail when running the tests using casper.js...
        //
        // TODO: See why those tests fail and use a better solution.


        if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
          // Convert binary arrays to a string and prefix the string with
          // a special marker.
          var buffer;
          var marker = SERIALIZED_MARKER;

          if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
          } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
              marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
              marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
              marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
              marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
              marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
              marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
              marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
              marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
              marker += TYPE_FLOAT64ARRAY;
            } else {
              callback(new Error('Failed to get type for BinaryArray'));
            }
          }

          callback(marker + bufferToString(buffer));
        } else if (valueType === '[object Blob]') {
          // Conver the blob to a binaryArray and then to a string.
          var fileReader = new FileReader();

          fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
          };

          fileReader.readAsArrayBuffer(value);
        } else {
          try {
            callback(JSON.stringify(value));
          } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);
            callback(null, e);
          }
        }
      } // Deserialize data we've inserted into a value column/field. We place
      // special markers into our strings to mark them as encoded; this isn't
      // as nice as a meta field, but it's the only sane thing we can do whilst
      // keeping localStorage support intact.
      //
      // Oftentimes this will just deserialize JSON content, but if we have a
      // special marker (SERIALIZED_MARKER, defined above), we will extract
      // some kind of arraybuffer/binary data/typed array out of the string.


      function deserialize(value) {
        // If we haven't marked this string as being specially serialized (i.e.
        // something other than serialized JSON), we can just return it and be
        // done with it.
        if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
          return JSON.parse(value);
        } // The following code deals with deserializing some kind of Blob or
        // TypedArray. First we separate out the type of data we're dealing
        // with from the data itself.


        var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
        var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
        var blobType; // Backwards-compatible blob type serialization strategy.
        // DBs created with older versions of localForage will simply not have the blob type.

        if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
          var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
          blobType = matcher[1];
          serializedString = serializedString.substring(matcher[0].length);
        }

        var buffer = stringToBuffer(serializedString); // Return the right type based on the code/type set during
        // serialization.

        switch (type) {
          case TYPE_ARRAYBUFFER:
            return buffer;

          case TYPE_BLOB:
            return createBlob([buffer], {
              type: blobType
            });

          case TYPE_INT8ARRAY:
            return new Int8Array(buffer);

          case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);

          case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);

          case TYPE_INT16ARRAY:
            return new Int16Array(buffer);

          case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);

          case TYPE_INT32ARRAY:
            return new Int32Array(buffer);

          case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);

          case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);

          case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);

          default:
            throw new Error('Unkown type: ' + type);
        }
      }

      var localforageSerializer = {
        serialize: serialize,
        deserialize: deserialize,
        stringToBuffer: stringToBuffer,
        bufferToString: bufferToString
      };
      /*
       * Includes code from:
       *
       * base64-arraybuffer
       * https://github.com/niklasvh/base64-arraybuffer
       *
       * Copyright (c) 2012 Niklas von Hertzen
       * Licensed under the MIT license.
       */

      function createDbTable(t, dbInfo, callback, errorCallback) {
        t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
      } // Open the WebSQL database (automatically creates one if one didn't
      // previously exist), using any options set in the config.


      function _initStorage$1(options) {
        var self = this;
        var dbInfo = {
          db: null
        };

        if (options) {
          for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
          }
        }

        var dbInfoPromise = new Promise$1(function (resolve, reject) {
          // Open the database; the openDatabase API will automatically
          // create it for us if it doesn't exist.
          try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
          } catch (e) {
            return reject(e);
          } // Create our key/value table if it doesn't exist.


          dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
              self._dbInfo = dbInfo;
              resolve();
            }, function (t, error) {
              reject(error);
            });
          }, reject);
        });
        dbInfo.serializer = localforageSerializer;
        return dbInfoPromise;
      }

      function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
        t.executeSql(sqlStatement, args, callback, function (t, error) {
          if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
              if (!results.rows.length) {
                // if the table is missing (was deleted)
                // re-create it table and retry
                createDbTable(t, dbInfo, function () {
                  t.executeSql(sqlStatement, args, callback, errorCallback);
                }, errorCallback);
              } else {
                errorCallback(t, error);
              }
            }, errorCallback);
          } else {
            errorCallback(t, error);
          }
        }, errorCallback);
      }

      function getItem$1(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                var result = results.rows.length ? results.rows.item(0).value : null; // Check to see if this is serialized content we need to
                // unpack.

                if (result) {
                  result = dbInfo.serializer.deserialize(result);
                }

                resolve(result);
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }

      function iterate$1(iterator, callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                var rows = results.rows;
                var length = rows.length;

                for (var i = 0; i < length; i++) {
                  var item = rows.item(i);
                  var result = item.value; // Check to see if this is serialized content
                  // we need to unpack.

                  if (result) {
                    result = dbInfo.serializer.deserialize(result);
                  }

                  result = iterator(result, item.key, i + 1); // void(0) prevents problems with redefinition
                  // of `undefined`.

                  if (result !== void 0) {
                    resolve(result);
                    return;
                  }
                }

                resolve();
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }

      function _setItem(key, value, callback, retriesLeft) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
              value = null;
            } // Save the original value to pass to the callback.


            var originalValue = value;
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
              if (error) {
                reject(error);
              } else {
                dbInfo.db.transaction(function (t) {
                  tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                    resolve(originalValue);
                  }, function (t, error) {
                    reject(error);
                  });
                }, function (sqlError) {
                  // The transaction failed; check
                  // to see if it's a quota error.
                  if (sqlError.code === sqlError.QUOTA_ERR) {
                    // We reject the callback outright for now, but
                    // it's worth trying to re-run the transaction.
                    // Even if the user accepts the prompt to use
                    // more storage on Safari, this error will
                    // be called.
                    //
                    // Try to re-run the transaction.
                    if (retriesLeft > 0) {
                      resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                      return;
                    }

                    reject(sqlError);
                  }
                });
              }
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }

      function setItem$1(key, value, callback) {
        return _setItem.apply(this, [key, value, callback, 1]);
      }

      function removeItem$1(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                resolve();
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      } // Deletes every item in the table.
      // TODO: Find out if this resets the AUTO_INCREMENT number.


      function clear$1(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                resolve();
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      } // Does a simple `COUNT(key)` to get the number of items stored in
      // localForage.


      function length$1(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              // Ahhh, SQL makes this one soooooo easy.
              tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                var result = results.rows.item(0).c;
                resolve(result);
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      } // Return the key located at key index X; essentially gets the key from a
      // `WHERE id = ?`. This is the most efficient way I can think to implement
      // this rarely-used (in my experience) part of the API, but it can seem
      // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
      // the ID of each key will change every time it's updated. Perhaps a stored
      // procedure for the `setItem()` SQL would solve this problem?
      // TODO: Don't change ID on `setItem()`.


      function key$1(n, callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                var result = results.rows.length ? results.rows.item(0).key : null;
                resolve(result);
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      }

      function keys$1(callback) {
        var self = this;
        var promise = new Promise$1(function (resolve, reject) {
          self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
              tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                var keys = [];

                for (var i = 0; i < results.rows.length; i++) {
                  keys.push(results.rows.item(i).key);
                }

                resolve(keys);
              }, function (t, error) {
                reject(error);
              });
            });
          })["catch"](reject);
        });
        executeCallback(promise, callback);
        return promise;
      } // https://www.w3.org/TR/webdatabase/#databases
      // > There is no way to enumerate or delete the databases available for an origin from this API.


      function getAllStoreNames(db) {
        return new Promise$1(function (resolve, reject) {
          db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
              var storeNames = [];

              for (var i = 0; i < results.rows.length; i++) {
                storeNames.push(results.rows.item(i).name);
              }

              resolve({
                db: db,
                storeNames: storeNames
              });
            }, function (t, error) {
              reject(error);
            });
          }, function (sqlError) {
            reject(sqlError);
          });
        });
      }

      function dropInstance$1(options, callback) {
        callback = getCallback.apply(this, arguments);
        var currentConfig = this.config();
        options = typeof options !== 'function' && options || {};

        if (!options.name) {
          options.name = options.name || currentConfig.name;
          options.storeName = options.storeName || currentConfig.storeName;
        }

        var self = this;
        var promise;

        if (!options.name) {
          promise = Promise$1.reject('Invalid arguments');
        } else {
          promise = new Promise$1(function (resolve) {
            var db;

            if (options.name === currentConfig.name) {
              // use the db reference of the current instance
              db = self._dbInfo.db;
            } else {
              db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
              // drop all database tables
              resolve(getAllStoreNames(db));
            } else {
              resolve({
                db: db,
                storeNames: [options.storeName]
              });
            }
          }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
              operationInfo.db.transaction(function (t) {
                function dropTable(storeName) {
                  return new Promise$1(function (resolve, reject) {
                    t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                      resolve();
                    }, function (t, error) {
                      reject(error);
                    });
                  });
                }

                var operations = [];

                for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                  operations.push(dropTable(operationInfo.storeNames[i]));
                }

                Promise$1.all(operations).then(function () {
                  resolve();
                })["catch"](function (e) {
                  reject(e);
                });
              }, function (sqlError) {
                reject(sqlError);
              });
            });
          });
        }

        executeCallback(promise, callback);
        return promise;
      }

      var webSQLStorage = {
        _driver: 'webSQLStorage',
        _initStorage: _initStorage$1,
        _support: isWebSQLValid(),
        iterate: iterate$1,
        getItem: getItem$1,
        setItem: setItem$1,
        removeItem: removeItem$1,
        clear: clear$1,
        length: length$1,
        key: key$1,
        keys: keys$1,
        dropInstance: dropInstance$1
      };

      function isLocalStorageValid() {
        try {
          return typeof localStorage !== 'undefined' && 'setItem' in localStorage && // in IE8 typeof localStorage.setItem === 'object'
          !!localStorage.setItem;
        } catch (e) {
          return false;
        }
      }

      function _getKeyPrefix(options, defaultConfig) {
        var keyPrefix = options.name + '/';

        if (options.storeName !== defaultConfig.storeName) {
          keyPrefix += options.storeName + '/';
        }

        return keyPrefix;
      } // Check if localStorage throws when saving an item


      function checkIfLocalStorageThrows() {
        var localStorageTestKey = '_localforage_support_test';

        try {
          localStorage.setItem(localStorageTestKey, true);
          localStorage.removeItem(localStorageTestKey);
          return false;
        } catch (e) {
          return true;
        }
      } // Check if localStorage is usable and allows to save an item
      // This method checks if localStorage is usable in Safari Private Browsing
      // mode, or in any other case where the available quota for localStorage
      // is 0 and there wasn't any saved items yet.


      function _isLocalStorageUsable() {
        return !checkIfLocalStorageThrows() || localStorage.length > 0;
      } // Config the localStorage backend, using options set in the config.


      function _initStorage$2(options) {
        var self = this;
        var dbInfo = {};

        if (options) {
          for (var i in options) {
            dbInfo[i] = options[i];
          }
        }

        dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

        if (!_isLocalStorageUsable()) {
          return Promise$1.reject();
        }

        self._dbInfo = dbInfo;
        dbInfo.serializer = localforageSerializer;
        return Promise$1.resolve();
      } // Remove all keys from the datastore, effectively destroying all data in
      // the app's key/value store!


      function clear$2(callback) {
        var self = this;
        var promise = self.ready().then(function () {
          var keyPrefix = self._dbInfo.keyPrefix;

          for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
              localStorage.removeItem(key);
            }
          }
        });
        executeCallback(promise, callback);
        return promise;
      } // Retrieve an item from the store. Unlike the original async_storage
      // library in Gaia, we don't modify return values at all. If a key's value
      // is `undefined`, we pass that value to the callback function.


      function getItem$2(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = self.ready().then(function () {
          var dbInfo = self._dbInfo;
          var result = localStorage.getItem(dbInfo.keyPrefix + key); // If a result was found, parse it from the serialized
          // string into a JS object. If result isn't truthy, the key
          // is likely undefined and we'll pass it straight to the
          // callback.

          if (result) {
            result = dbInfo.serializer.deserialize(result);
          }

          return result;
        });
        executeCallback(promise, callback);
        return promise;
      } // Iterate over all items in the store.


      function iterate$2(iterator, callback) {
        var self = this;
        var promise = self.ready().then(function () {
          var dbInfo = self._dbInfo;
          var keyPrefix = dbInfo.keyPrefix;
          var keyPrefixLength = keyPrefix.length;
          var length = localStorage.length; // We use a dedicated iterator instead of the `i` variable below
          // so other keys we fetch in localStorage aren't counted in
          // the `iterationNumber` argument passed to the `iterate()`
          // callback.
          //
          // See: github.com/mozilla/localForage/pull/435#discussion_r38061530

          var iterationNumber = 1;

          for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) !== 0) {
              continue;
            }

            var value = localStorage.getItem(key); // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.

            if (value) {
              value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
              return value;
            }
          }
        });
        executeCallback(promise, callback);
        return promise;
      } // Same as localStorage's key() method, except takes a callback.


      function key$2(n, callback) {
        var self = this;
        var promise = self.ready().then(function () {
          var dbInfo = self._dbInfo;
          var result;

          try {
            result = localStorage.key(n);
          } catch (error) {
            result = null;
          } // Remove the prefix from the key, if a key is found.


          if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
          }

          return result;
        });
        executeCallback(promise, callback);
        return promise;
      }

      function keys$2(callback) {
        var self = this;
        var promise = self.ready().then(function () {
          var dbInfo = self._dbInfo;
          var length = localStorage.length;
          var keys = [];

          for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);

            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
              keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
          }

          return keys;
        });
        executeCallback(promise, callback);
        return promise;
      } // Supply the number of keys in the datastore to the callback function.


      function length$2(callback) {
        var self = this;
        var promise = self.keys().then(function (keys) {
          return keys.length;
        });
        executeCallback(promise, callback);
        return promise;
      } // Remove an item from the store, nice and simple.


      function removeItem$2(key, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = self.ready().then(function () {
          var dbInfo = self._dbInfo;
          localStorage.removeItem(dbInfo.keyPrefix + key);
        });
        executeCallback(promise, callback);
        return promise;
      } // Set a key's value and run an optional callback once the value is set.
      // Unlike Gaia's implementation, the callback function is passed the value,
      // in case you want to operate on that value only after you're sure it
      // saved, or something like that.


      function setItem$2(key, value, callback) {
        var self = this;
        key = normalizeKey(key);
        var promise = self.ready().then(function () {
          // Convert undefined values to null.
          // https://github.com/mozilla/localForage/pull/42
          if (value === undefined) {
            value = null;
          } // Save the original value to pass to the callback.


          var originalValue = value;
          return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
              if (error) {
                reject(error);
              } else {
                try {
                  localStorage.setItem(dbInfo.keyPrefix + key, value);
                  resolve(originalValue);
                } catch (e) {
                  // localStorage capacity exceeded.
                  // TODO: Make this a specific error/event.
                  if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                    reject(e);
                  }

                  reject(e);
                }
              }
            });
          });
        });
        executeCallback(promise, callback);
        return promise;
      }

      function dropInstance$2(options, callback) {
        callback = getCallback.apply(this, arguments);
        options = typeof options !== 'function' && options || {};

        if (!options.name) {
          var currentConfig = this.config();
          options.name = options.name || currentConfig.name;
          options.storeName = options.storeName || currentConfig.storeName;
        }

        var self = this;
        var promise;

        if (!options.name) {
          promise = Promise$1.reject('Invalid arguments');
        } else {
          promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
              resolve(options.name + '/');
            } else {
              resolve(_getKeyPrefix(options, self._defaultConfig));
            }
          }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
              var key = localStorage.key(i);

              if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
              }
            }
          });
        }

        executeCallback(promise, callback);
        return promise;
      }

      var localStorageWrapper = {
        _driver: 'localStorageWrapper',
        _initStorage: _initStorage$2,
        _support: isLocalStorageValid(),
        iterate: iterate$2,
        getItem: getItem$2,
        setItem: setItem$2,
        removeItem: removeItem$2,
        clear: clear$2,
        length: length$2,
        key: key$2,
        keys: keys$2,
        dropInstance: dropInstance$2
      };

      var sameValue = function sameValue(x, y) {
        return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
      };

      var includes = function includes(array, searchElement) {
        var len = array.length;
        var i = 0;

        while (i < len) {
          if (sameValue(array[i], searchElement)) {
            return true;
          }

          i++;
        }

        return false;
      };

      var isArray = Array.isArray || function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      }; // Drivers are stored here when `defineDriver()` is called.
      // They are shared across all instances of localForage.


      var DefinedDrivers = {};
      var DriverSupport = {};
      var DefaultDrivers = {
        INDEXEDDB: asyncStorage,
        WEBSQL: webSQLStorage,
        LOCALSTORAGE: localStorageWrapper
      };
      var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
      var OptionalDriverMethods = ['dropInstance'];
      var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);
      var DefaultConfig = {
        description: '',
        driver: DefaultDriverOrder.slice(),
        name: 'localforage',
        // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
        // we can use without a prompt.
        size: 4980736,
        storeName: 'keyvaluepairs',
        version: 1.0
      };

      function callWhenReady(localForageInstance, libraryMethod) {
        localForageInstance[libraryMethod] = function () {
          var _args = arguments;
          return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
          });
        };
      }

      function extend() {
        for (var i = 1; i < arguments.length; i++) {
          var arg = arguments[i];

          if (arg) {
            for (var _key in arg) {
              if (arg.hasOwnProperty(_key)) {
                if (isArray(arg[_key])) {
                  arguments[0][_key] = arg[_key].slice();
                } else {
                  arguments[0][_key] = arg[_key];
                }
              }
            }
          }
        }

        return arguments[0];
      }

      var LocalForage = function () {
        function LocalForage(options) {
          _classCallCheck(this, LocalForage);

          for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
              var driver = DefaultDrivers[driverTypeKey];
              var driverName = driver._driver;
              this[driverTypeKey] = driverName;

              if (!DefinedDrivers[driverName]) {
                // we don't need to wait for the promise,
                // since the default drivers can be defined
                // in a blocking manner
                this.defineDriver(driver);
              }
            }
          }

          this._defaultConfig = extend({}, DefaultConfig);
          this._config = extend({}, this._defaultConfig, options);
          this._driverSet = null;
          this._initDriver = null;
          this._ready = false;
          this._dbInfo = null;

          this._wrapLibraryMethodsWithReady();

          this.setDriver(this._config.driver)["catch"](function () {});
        } // Set any config values for localForage; can be called anytime before
        // the first API call (e.g. `getItem`, `setItem`).
        // We loop through options so we don't overwrite existing config
        // values.


        LocalForage.prototype.config = function config(options) {
          // If the options argument is an object, we use it to set values.
          // Otherwise, we return either a specified config value or all
          // config values.
          if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
              return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
              if (i === 'storeName') {
                options[i] = options[i].replace(/\W/g, '_');
              }

              if (i === 'version' && typeof options[i] !== 'number') {
                return new Error('Database version must be a number.');
              }

              this._config[i] = options[i];
            } // after all config options are set and
            // the driver option is used, try setting it


            if ('driver' in options && options.driver) {
              return this.setDriver(this._config.driver);
            }

            return true;
          } else if (typeof options === 'string') {
            return this._config[options];
          } else {
            return this._config;
          }
        }; // Used to define a custom driver, shared across all instances of
        // localForage.


        LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
          var promise = new Promise$1(function (resolve, reject) {
            try {
              var driverName = driverObject._driver;
              var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver'); // A driver name should be defined and not overlap with the
              // library-defined, default drivers.

              if (!driverObject._driver) {
                reject(complianceError);
                return;
              }

              var driverMethods = LibraryMethods.concat('_initStorage');

              for (var i = 0, len = driverMethods.length; i < len; i++) {
                var driverMethodName = driverMethods[i]; // when the property is there,
                // it should be a method even when optional

                var isRequired = !includes(OptionalDriverMethods, driverMethodName);

                if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                  reject(complianceError);
                  return;
                }
              }

              var configureMissingMethods = function configureMissingMethods() {
                var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                  return function () {
                    var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                    var promise = Promise$1.reject(error);
                    executeCallback(promise, arguments[arguments.length - 1]);
                    return promise;
                  };
                };

                for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                  var optionalDriverMethod = OptionalDriverMethods[_i];

                  if (!driverObject[optionalDriverMethod]) {
                    driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                  }
                }
              };

              configureMissingMethods();

              var setDriverSupport = function setDriverSupport(support) {
                if (DefinedDrivers[driverName]) {
                  console.info('Redefining LocalForage driver: ' + driverName);
                }

                DefinedDrivers[driverName] = driverObject;
                DriverSupport[driverName] = support; // don't use a then, so that we can define
                // drivers that have simple _support methods
                // in a blocking manner

                resolve();
              };

              if ('_support' in driverObject) {
                if (driverObject._support && typeof driverObject._support === 'function') {
                  driverObject._support().then(setDriverSupport, reject);
                } else {
                  setDriverSupport(!!driverObject._support);
                }
              } else {
                setDriverSupport(true);
              }
            } catch (e) {
              reject(e);
            }
          });
          executeTwoCallbacks(promise, callback, errorCallback);
          return promise;
        };

        LocalForage.prototype.driver = function driver() {
          return this._driver || null;
        };

        LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
          var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));
          executeTwoCallbacks(getDriverPromise, callback, errorCallback);
          return getDriverPromise;
        };

        LocalForage.prototype.getSerializer = function getSerializer(callback) {
          var serializerPromise = Promise$1.resolve(localforageSerializer);
          executeTwoCallbacks(serializerPromise, callback);
          return serializerPromise;
        };

        LocalForage.prototype.ready = function ready(callback) {
          var self = this;

          var promise = self._driverSet.then(function () {
            if (self._ready === null) {
              self._ready = self._initDriver();
            }

            return self._ready;
          });

          executeTwoCallbacks(promise, callback, callback);
          return promise;
        };

        LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
          var self = this;

          if (!isArray(drivers)) {
            drivers = [drivers];
          }

          var supportedDrivers = this._getSupportedDrivers(drivers);

          function setDriverToConfig() {
            self._config.driver = self.driver();
          }

          function extendSelfWithDriver(driver) {
            self._extend(driver);

            setDriverToConfig();
            self._ready = self._initStorage(self._config);
            return self._ready;
          }

          function initDriver(supportedDrivers) {
            return function () {
              var currentDriverIndex = 0;

              function driverPromiseLoop() {
                while (currentDriverIndex < supportedDrivers.length) {
                  var driverName = supportedDrivers[currentDriverIndex];
                  currentDriverIndex++;
                  self._dbInfo = null;
                  self._ready = null;
                  return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                }

                setDriverToConfig();
                var error = new Error('No available storage method found.');
                self._driverSet = Promise$1.reject(error);
                return self._driverSet;
              }

              return driverPromiseLoop();
            };
          } // There might be a driver initialization in progress
          // so wait for it to finish in order to avoid a possible
          // race condition to set _dbInfo


          var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
          }) : Promise$1.resolve();
          this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;
            return self.getDriver(driverName).then(function (driver) {
              self._driver = driver._driver;
              setDriverToConfig();

              self._wrapLibraryMethodsWithReady();

              self._initDriver = initDriver(supportedDrivers);
            });
          })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
          });
          executeTwoCallbacks(this._driverSet, callback, errorCallback);
          return this._driverSet;
        };

        LocalForage.prototype.supports = function supports(driverName) {
          return !!DriverSupport[driverName];
        };

        LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
          extend(this, libraryMethodsAndProperties);
        };

        LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
          var supportedDrivers = [];

          for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];

            if (this.supports(driverName)) {
              supportedDrivers.push(driverName);
            }
          }

          return supportedDrivers;
        };

        LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
          // Add a stub for each driver API method that delays the call to the
          // corresponding driver method until localForage is ready. These stubs
          // will be replaced by the driver methods as soon as the driver is
          // loaded, so there is no performance impact.
          for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
          }
        };

        LocalForage.prototype.createInstance = function createInstance(options) {
          return new LocalForage(options);
        };

        return LocalForage;
      }(); // The actual localForage object that we expose as a module or via a
      // global. It's extended by pulling in one of our other libraries.


      var localforage_js = new LocalForage();
      module.exports = localforage_js;
    }, {
      "3": 3
    }]
  }, {}, [4])(4);
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/multipart-mixed-parser/index.js":
/*!******************************************************!*\
  !*** ./node_modules/multipart-mixed-parser/index.js ***!
  \******************************************************/
/*! exports provided: parse, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
const parse = data => {
  const separator = data.trim().split('\n')[0].trim();
  const parts = data.split(separator).map(part => part.trim()).filter(part => part !== '' && part !== '--');
  return parts.map(part => JSON.parse(part.split('\n')[3]));
};
/* harmony default export */ __webpack_exports__["default"] = ({
  parse
});

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ "./node_modules/querystring-es3/decode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/decode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
 // If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1000;

  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

/***/ }),

/***/ "./node_modules/querystring-es3/encode.js":
/*!************************************************!*\
  !*** ./node_modules/querystring-es3/encode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


var stringifyPrimitive = function (v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';

  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

      if (isArray(obj[k])) {
        return map(obj[k], function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map(xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];

  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }

  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }

  return res;
};

/***/ }),

/***/ "./node_modules/querystring-es3/index.js":
/*!***********************************************!*\
  !*** ./node_modules/querystring-es3/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring-es3/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring-es3/encode.js");

/***/ }),

/***/ "./node_modules/ramda/es/F.js":
/*!************************************!*\
  !*** ./node_modules/ramda/es/F.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * A function that always returns `false`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.T
 * @example
 *
 *      R.F(); //=> false
 */
var F = function () {
  return false;
};

/* harmony default export */ __webpack_exports__["default"] = (F);

/***/ }),

/***/ "./node_modules/ramda/es/T.js":
/*!************************************!*\
  !*** ./node_modules/ramda/es/T.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * A function that always returns `true`. Any passed in parameters are ignored.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig * -> Boolean
 * @param {*}
 * @return {Boolean}
 * @see R.F
 * @example
 *
 *      R.T(); //=> true
 */
var T = function () {
  return true;
};

/* harmony default export */ __webpack_exports__["default"] = (T);

/***/ }),

/***/ "./node_modules/ramda/es/__.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/__.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * A special placeholder value used to specify "gaps" within curried functions,
 * allowing partial application of any combination of arguments, regardless of
 * their positions.
 *
 * If `g` is a curried ternary function and `_` is `R.__`, the following are
 * equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2, _)(1, 3)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @name __
 * @constant
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @example
 *
 *      const greet = R.replace('{name}', R.__, 'Hello, {name}!');
 *      greet('Alice'); //=> 'Hello, Alice!'
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  '@@functional/placeholder': true
});

/***/ }),

/***/ "./node_modules/ramda/es/add.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/add.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Adds two values.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */

var add =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function add(a, b) {
  return Number(a) + Number(b);
});

/* harmony default export */ __webpack_exports__["default"] = (add);

/***/ }),

/***/ "./node_modules/ramda/es/addIndex.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/addIndex.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");



/**
 * Creates a new list iteration function from an existing one by adding two new
 * parameters to its callback function: the current index, and the entire list.
 *
 * This would turn, for instance, [`R.map`](#map) function into one that
 * more closely resembles `Array.prototype.map`. Note that this will only work
 * for functions in which the iteration callback function is the first
 * parameter, and where the list is the last parameter. (This latter might be
 * unimportant if the list parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Function
 * @category List
 * @sig ((a ... -> b) ... -> [a] -> *) -> ((a ..., Int, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A list iteration function that does not pass index or list to its callback
 * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
 * @example
 *
 *      const mapIndexed = R.addIndex(R.map);
 *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */

var addIndex =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function addIndex(fn) {
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fn.length, function () {
    var idx = 0;
    var origFn = arguments[0];
    var list = arguments[arguments.length - 1];
    var args = Array.prototype.slice.call(arguments, 0);

    args[0] = function () {
      var result = origFn.apply(this, Object(_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arguments, [idx, list]));
      idx += 1;
      return result;
    };

    return fn.apply(this, args);
  });
});

/* harmony default export */ __webpack_exports__["default"] = (addIndex);

/***/ }),

/***/ "./node_modules/ramda/es/adjust.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/adjust.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");


/**
 * Applies a function to the value at the given index of an array, returning a
 * new copy of the array with the element at the given index replaced with the
 * result of the function application.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> (a -> a) -> [a] -> [a]
 * @param {Number} idx The index.
 * @param {Function} fn The function to apply.
 * @param {Array|Arguments} list An array-like object whose value
 *        at the supplied index will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element at index `idx` replaced with the value
 *         returned by applying `fn` to the existing element.
 * @see R.update
 * @example
 *
 *      R.adjust(1, R.toUpper, ['a', 'b', 'c', 'd']);      //=> ['a', 'B', 'c', 'd']
 *      R.adjust(-1, R.toUpper, ['a', 'b', 'c', 'd']);     //=> ['a', 'b', 'c', 'D']
 * @symb R.adjust(-1, f, [a, b]) = [a, f(b)]
 * @symb R.adjust(0, f, [a, b]) = [f(a), b]
 */

var adjust =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function adjust(idx, fn, list) {
  if (idx >= list.length || idx < -list.length) {
    return list;
  }

  var start = idx < 0 ? list.length : 0;

  var _idx = start + idx;

  var _list = Object(_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list);

  _list[_idx] = fn(list[_idx]);
  return _list;
});

/* harmony default export */ __webpack_exports__["default"] = (adjust);

/***/ }),

/***/ "./node_modules/ramda/es/all.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/all.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xall_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xall.js */ "./node_modules/ramda/es/internal/_xall.js");



/**
 * Returns `true` if all elements of the list match the predicate, `false` if
 * there are any that don't.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @see R.any, R.none, R.transduce
 * @example
 *
 *      const equals3 = R.equals(3);
 *      R.all(equals3)([3, 3, 3, 3]); //=> true
 *      R.all(equals3)([3, 3, 1, 3]); //=> false
 */

var all =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['all'], _internal_xall_js__WEBPACK_IMPORTED_MODULE_2__["default"], function all(fn, list) {
  var idx = 0;

  while (idx < list.length) {
    if (!fn(list[idx])) {
      return false;
    }

    idx += 1;
  }

  return true;
}));

/* harmony default export */ __webpack_exports__["default"] = (all);

/***/ }),

/***/ "./node_modules/ramda/es/allPass.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/allPass.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/es/pluck.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");





/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if every one of the provided predicates is satisfied
 * by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.anyPass
 * @example
 *
 *      const isQueen = R.propEq('rank', 'Q');
 *      const isSpade = R.propEq('suit', '♠︎');
 *      const isQueenOfSpades = R.allPass([isQueen, isSpade]);
 *
 *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
 *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
 */

var allPass =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function allPass(preds) {
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_reduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_2__["default"], 0, Object(_pluck_js__WEBPACK_IMPORTED_MODULE_3__["default"])('length', preds)), function () {
    var idx = 0;
    var len = preds.length;

    while (idx < len) {
      if (!preds[idx].apply(this, arguments)) {
        return false;
      }

      idx += 1;
    }

    return true;
  });
});

/* harmony default export */ __webpack_exports__["default"] = (allPass);

/***/ }),

/***/ "./node_modules/ramda/es/always.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/always.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Returns a function that always returns the given value. Note that for
 * non-primitives the value returned is a reference to the original value.
 *
 * This function is known as `const`, `constant`, or `K` (for K combinator) in
 * other languages and libraries.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> (* -> a)
 * @param {*} val The value to wrap in a function
 * @return {Function} A Function :: * -> val.
 * @example
 *
 *      const t = R.always('Tee');
 *      t(); //=> 'Tee'
 */

var always =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function always(val) {
  return function () {
    return val;
  };
});

/* harmony default export */ __webpack_exports__["default"] = (always);

/***/ }),

/***/ "./node_modules/ramda/es/and.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/and.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns `true` if both arguments are `true`; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if it is falsy, otherwise the second argument.
 * @see R.both, R.xor
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */

var and =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function and(a, b) {
  return a && b;
});

/* harmony default export */ __webpack_exports__["default"] = (and);

/***/ }),

/***/ "./node_modules/ramda/es/andThen.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/andThen.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_assertPromise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_assertPromise.js */ "./node_modules/ramda/es/internal/_assertPromise.js");


/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @since v0.27.0
 * @category Function
 * @sig (a -> b) -> (Promise e a) -> (Promise e b)
 * @sig (a -> (Promise e b)) -> (Promise e a) -> (Promise e b)
 * @param {Function} onSuccess The function to apply. Can return a value or a promise of a value.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(onSuccess)`
 * @see R.otherwise
 * @example
 *
 *      var makeQuery = (email) => ({ query: { email }});
 *
 *      //getMemberName :: String -> Promise ({firstName, lastName})
 *      var getMemberName = R.pipe(
 *        makeQuery,
 *        fetchMember,
 *        R.andThen(R.pick(['firstName', 'lastName']))
 *      );
 */

var andThen =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function andThen(f, p) {
  Object(_internal_assertPromise_js__WEBPACK_IMPORTED_MODULE_1__["default"])('andThen', p);

  return p.then(f);
});

/* harmony default export */ __webpack_exports__["default"] = (andThen);

/***/ }),

/***/ "./node_modules/ramda/es/any.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/any.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xany_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xany.js */ "./node_modules/ramda/es/internal/_xany.js");



/**
 * Returns `true` if at least one of the elements of the list match the predicate,
 * `false` otherwise.
 *
 * Dispatches to the `any` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @see R.all, R.none, R.transduce
 * @example
 *
 *      const lessThan0 = R.flip(R.lt)(0);
 *      const lessThan2 = R.flip(R.lt)(2);
 *      R.any(lessThan0)([1, 2]); //=> false
 *      R.any(lessThan2)([1, 2]); //=> true
 */

var any =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['any'], _internal_xany_js__WEBPACK_IMPORTED_MODULE_2__["default"], function any(fn, list) {
  var idx = 0;

  while (idx < list.length) {
    if (fn(list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}));

/* harmony default export */ __webpack_exports__["default"] = (any);

/***/ }),

/***/ "./node_modules/ramda/es/anyPass.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/anyPass.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/es/pluck.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");





/**
 * Takes a list of predicates and returns a predicate that returns true for a
 * given list of arguments if at least one of the provided predicates is
 * satisfied by those arguments.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see R.allPass
 * @example
 *
 *      const isClub = R.propEq('suit', '♣');
 *      const isSpade = R.propEq('suit', '♠');
 *      const isBlackCard = R.anyPass([isClub, isSpade]);
 *
 *      isBlackCard({rank: '10', suit: '♣'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
 *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
 */

var anyPass =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function anyPass(preds) {
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_reduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_2__["default"], 0, Object(_pluck_js__WEBPACK_IMPORTED_MODULE_3__["default"])('length', preds)), function () {
    var idx = 0;
    var len = preds.length;

    while (idx < len) {
      if (preds[idx].apply(this, arguments)) {
        return true;
      }

      idx += 1;
    }

    return false;
  });
});

/* harmony default export */ __webpack_exports__["default"] = (anyPass);

/***/ }),

/***/ "./node_modules/ramda/es/ap.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/ap.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");




/**
 * ap applies a list of functions to a list of values.
 *
 * Dispatches to the `ap` method of the second argument, if present. Also
 * treats curried functions as applicatives.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig [a -> b] -> [a] -> [b]
 * @sig Apply f => f (a -> b) -> f a -> f b
 * @sig (r -> a -> b) -> (r -> a) -> (r -> b)
 * @param {*} applyF
 * @param {*} applyX
 * @return {*}
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 *      R.ap([R.concat('tasty '), R.toUpper], ['pizza', 'salad']); //=> ["tasty pizza", "tasty salad", "PIZZA", "SALAD"]
 *
 *      // R.ap can also be used as S combinator
 *      // when only two functions are passed
 *      R.ap(R.concat, R.toUpper)('Ramda') //=> 'RamdaRAMDA'
 * @symb R.ap([f, g], [a, b]) = [f(a), f(b), g(a), g(b)]
 */

var ap =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function ap(applyF, applyX) {
  return typeof applyX['fantasy-land/ap'] === 'function' ? applyX['fantasy-land/ap'](applyF) : typeof applyF.ap === 'function' ? applyF.ap(applyX) : typeof applyF === 'function' ? function (x) {
    return applyF(x)(applyX(x));
  } : Object(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (acc, f) {
    return Object(_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(acc, Object(_map_js__WEBPACK_IMPORTED_MODULE_3__["default"])(f, applyX));
  }, [], applyF);
});

/* harmony default export */ __webpack_exports__["default"] = (ap);

/***/ }),

/***/ "./node_modules/ramda/es/aperture.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/aperture.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_aperture_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_aperture.js */ "./node_modules/ramda/es/internal/_aperture.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xaperture_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xaperture.js */ "./node_modules/ramda/es/internal/_xaperture.js");




/**
 * Returns a new list, composed of n-tuples of consecutive elements. If `n` is
 * greater than the length of the list, an empty list is returned.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @param {Number} n The size of the tuples to create
 * @param {Array} list The list to split into `n`-length tuples
 * @return {Array} The resulting list of `n`-length tuples
 * @see R.transduce
 * @example
 *
 *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
 *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
 */

var aperture =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_2__["default"])([], _internal_xaperture_js__WEBPACK_IMPORTED_MODULE_3__["default"], _internal_aperture_js__WEBPACK_IMPORTED_MODULE_0__["default"]));

/* harmony default export */ __webpack_exports__["default"] = (aperture);

/***/ }),

/***/ "./node_modules/ramda/es/append.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/append.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns a new list containing the contents of the given list, followed by
 * the given element.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The element to add to the end of the new list.
 * @param {Array} list The list of elements to add a new item to.
 *        list.
 * @return {Array} A new list containing the elements of the old list followed by `el`.
 * @see R.prepend
 * @example
 *
 *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
 *      R.append('tests', []); //=> ['tests']
 *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
 */

var append =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function append(el, list) {
  return Object(_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list, [el]);
});

/* harmony default export */ __webpack_exports__["default"] = (append);

/***/ }),

/***/ "./node_modules/ramda/es/apply.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/apply.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Applies function `fn` to the argument list `args`. This is useful for
 * creating a fixed-arity function from a variadic function. `fn` should be a
 * bound function if context is significant.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> a) -> [*] -> a
 * @param {Function} fn The function which will be called with `args`
 * @param {Array} args The arguments to call `fn` with
 * @return {*} result The result, equivalent to `fn(...args)`
 * @see R.call, R.unapply
 * @example
 *
 *      const nums = [1, 2, 3, -99, 42, 6, 7];
 *      R.apply(Math.max, nums); //=> 42
 * @symb R.apply(f, [a, b, c]) = f(a, b, c)
 */

var apply =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function apply(fn, args) {
  return fn.apply(this, args);
});

/* harmony default export */ __webpack_exports__["default"] = (apply);

/***/ }),

/***/ "./node_modules/ramda/es/applySpec.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/applySpec.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _apply_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apply.js */ "./node_modules/ramda/es/apply.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/es/pluck.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");
/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./values.js */ "./node_modules/ramda/es/values.js");







 // Use custom mapValues function to avoid issues with specs that include a "map" key and R.map
// delegating calls to .map

function mapValues(fn, obj) {
  return Object(_keys_js__WEBPACK_IMPORTED_MODULE_6__["default"])(obj).reduce(function (acc, key) {
    acc[key] = fn(obj[key]);
    return acc;
  }, {});
}
/**
 * Given a spec object recursively mapping properties to functions, creates a
 * function producing an object of the same structure, by mapping each property
 * to the result of calling its associated function with the supplied arguments.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig {k: ((a, b, ..., m) -> v)} -> ((a, b, ..., m) -> {k: v})
 * @param {Object} spec an object recursively mapping properties to functions for
 *        producing the values for these properties.
 * @return {Function} A function that returns an object of the same structure
 * as `spec', with each property set to the value returned by calling its
 * associated function with the supplied arguments.
 * @see R.converge, R.juxt
 * @example
 *
 *      const getMetrics = R.applySpec({
 *        sum: R.add,
 *        nested: { mul: R.multiply }
 *      });
 *      getMetrics(2, 4); // => { sum: 6, nested: { mul: 8 } }
 * @symb R.applySpec({ x: f, y: { z: g } })(a, b) = { x: f(a, b), y: { z: g(a, b) } }
 */


var applySpec =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function applySpec(spec) {
  spec = mapValues(function (v) {
    return typeof v == 'function' ? v : applySpec(v);
  }, spec);
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_reduce_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_3__["default"], 0, Object(_pluck_js__WEBPACK_IMPORTED_MODULE_4__["default"])('length', Object(_values_js__WEBPACK_IMPORTED_MODULE_7__["default"])(spec))), function () {
    var args = arguments;
    return mapValues(function (f) {
      return Object(_apply_js__WEBPACK_IMPORTED_MODULE_1__["default"])(f, args);
    }, spec);
  });
});

/* harmony default export */ __webpack_exports__["default"] = (applySpec);

/***/ }),

/***/ "./node_modules/ramda/es/applyTo.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/applyTo.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Takes a value and applies a function to it.
 *
 * This function is also known as the `thrush` combinator.
 *
 * @func
 * @memberOf R
 * @since v0.25.0
 * @category Function
 * @sig a -> (a -> b) -> b
 * @param {*} x The value
 * @param {Function} f The function to apply
 * @return {*} The result of applying `f` to `x`
 * @example
 *
 *      const t42 = R.applyTo(42);
 *      t42(R.identity); //=> 42
 *      t42(R.add(1)); //=> 43
 */

var applyTo =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function applyTo(x, f) {
  return f(x);
});

/* harmony default export */ __webpack_exports__["default"] = (applyTo);

/***/ }),

/***/ "./node_modules/ramda/es/ascend.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/ascend.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Makes an ascending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) < fn(b), `1` if fn(b) < fn(a), otherwise `0`
 * @see R.descend
 * @example
 *
 *      const byAge = R.ascend(R.prop('age'));
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByYoungestFirst = R.sort(byAge, people);
 *        //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 */

var ascend =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function ascend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});

/* harmony default export */ __webpack_exports__["default"] = (ascend);

/***/ }),

/***/ "./node_modules/ramda/es/assoc.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/assoc.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc, R.pick
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */

var assoc =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function assoc(prop, val, obj) {
  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  result[prop] = val;
  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (assoc);

/***/ }),

/***/ "./node_modules/ramda/es/assocPath.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/assocPath.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");
/* harmony import */ var _assoc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./assoc.js */ "./node_modules/ramda/es/assoc.js");
/* harmony import */ var _isNil_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isNil.js */ "./node_modules/ramda/es/isNil.js");






/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and placing the specific value at the tail end of
 * that path. Note that this copies and flattens prototype properties onto the
 * new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> {a}
 * @param {Array} path the path to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.dissocPath
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      // Any missing or non-object keys in path will be overridden
 *      R.assocPath(['a', 'b', 'c'], 42, {a: 5}); //=> {a: {b: {c: 42}}}
 */

var assocPath =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function assocPath(path, val, obj) {
  if (path.length === 0) {
    return val;
  }

  var idx = path[0];

  if (path.length > 1) {
    var nextObj = !Object(_isNil_js__WEBPACK_IMPORTED_MODULE_5__["default"])(obj) && Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(idx, obj) ? obj[idx] : Object(_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_3__["default"])(path[1]) ? [] : {};
    val = assocPath(Array.prototype.slice.call(path, 1), val, nextObj);
  }

  if (Object(_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_3__["default"])(idx) && Object(_internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj)) {
    var arr = [].concat(obj);
    arr[idx] = val;
    return arr;
  } else {
    return Object(_assoc_js__WEBPACK_IMPORTED_MODULE_4__["default"])(idx, val, obj);
  }
});

/* harmony default export */ __webpack_exports__["default"] = (assocPath);

/***/ }),

/***/ "./node_modules/ramda/es/binary.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/binary.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _nAry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nAry.js */ "./node_modules/ramda/es/nAry.js");


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 2 parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> c) -> (a, b -> c)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 2.
 * @see R.nAry, R.unary
 * @example
 *
 *      const takesThreeArgs = function(a, b, c) {
 *        return [a, b, c];
 *      };
 *      takesThreeArgs.length; //=> 3
 *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
 *
 *      const takesTwoArgs = R.binary(takesThreeArgs);
 *      takesTwoArgs.length; //=> 2
 *      // Only 2 arguments are passed to the wrapped function
 *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
 * @symb R.binary(f)(a, b, c) = f(a, b)
 */

var binary =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function binary(fn) {
  return Object(_nAry_js__WEBPACK_IMPORTED_MODULE_1__["default"])(2, fn);
});

/* harmony default export */ __webpack_exports__["default"] = (binary);

/***/ }),

/***/ "./node_modules/ramda/es/bind.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/bind.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      const log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */

var bind =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function bind(fn, thisObj) {
  return Object(_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});

/* harmony default export */ __webpack_exports__["default"] = (bind);

/***/ }),

/***/ "./node_modules/ramda/es/both.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/both.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isFunction.js */ "./node_modules/ramda/es/internal/_isFunction.js");
/* harmony import */ var _and_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./and.js */ "./node_modules/ramda/es/and.js");
/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lift.js */ "./node_modules/ramda/es/lift.js");




/**
 * A function which calls the two provided functions and returns the `&&`
 * of the results.
 * It returns the result of the first function if it is false-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * false-y value.
 *
 * In addition to functions, `R.both` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.and
 * @example
 *
 *      const gt10 = R.gt(R.__, 10)
 *      const lt20 = R.lt(R.__, 20)
 *      const f = R.both(gt10, lt20);
 *      f(15); //=> true
 *      f(30); //=> false
 *
 *      R.both(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(false)
 *      R.both([false, false, 'a'], [11]); //=> [false, false, 11]
 */

var both =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function both(f, g) {
  return Object(_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(f) ? function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  } : Object(_lift_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_and_js__WEBPACK_IMPORTED_MODULE_2__["default"])(f, g);
});

/* harmony default export */ __webpack_exports__["default"] = (both);

/***/ }),

/***/ "./node_modules/ramda/es/call.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/call.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./curry.js */ "./node_modules/ramda/es/curry.js");

/**
 * Returns the result of calling its first argument with the remaining
 * arguments. This is occasionally useful as a converging function for
 * [`R.converge`](#converge): the first branch can produce a function while the
 * remaining branches produce values to be passed to that function as its
 * arguments.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig (*... -> a),*... -> a
 * @param {Function} fn The function to apply to the remaining arguments.
 * @param {...*} args Any number of positional arguments.
 * @return {*}
 * @see R.apply
 * @example
 *
 *      R.call(R.add, 1, 2); //=> 3
 *
 *      const indentN = R.pipe(R.repeat(' '),
 *                           R.join(''),
 *                           R.replace(/^(?!$)/gm));
 *
 *      const format = R.converge(R.call, [
 *                                  R.pipe(R.prop('indent'), indentN),
 *                                  R.prop('value')
 *                              ]);
 *
 *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
 * @symb R.call(f, a, b) = f(a, b)
 */

var call =
/*#__PURE__*/
Object(_curry_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function call(fn) {
  return fn.apply(this, Array.prototype.slice.call(arguments, 1));
});
/* harmony default export */ __webpack_exports__["default"] = (call);

/***/ }),

/***/ "./node_modules/ramda/es/chain.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/chain.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_makeFlat.js */ "./node_modules/ramda/es/internal/_makeFlat.js");
/* harmony import */ var _internal_xchain_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xchain.js */ "./node_modules/ramda/es/internal/_xchain.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");





/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries.
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 *
 * If second argument is a function, `chain(f, g)(x)` is equivalent to `f(g(x), x)`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      const duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      R.chain(R.append, R.head)([1, 2, 3]); //=> [1, 2, 3, 1]
 */

var chain =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['fantasy-land/chain', 'chain'], _internal_xchain_js__WEBPACK_IMPORTED_MODULE_3__["default"], function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function (x) {
      return fn(monad(x))(x);
    };
  }

  return Object(_internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_2__["default"])(false)(Object(_map_js__WEBPACK_IMPORTED_MODULE_4__["default"])(fn, monad));
}));

/* harmony default export */ __webpack_exports__["default"] = (chain);

/***/ }),

/***/ "./node_modules/ramda/es/clamp.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/clamp.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Restricts a number to be within a range.
 *
 * Also works for other ordered types such as Strings and Dates.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Relation
 * @sig Ord a => a -> a -> a -> a
 * @param {Number} minimum The lower limit of the clamp (inclusive)
 * @param {Number} maximum The upper limit of the clamp (inclusive)
 * @param {Number} value Value to be clamped
 * @return {Number} Returns `minimum` when `val < minimum`, `maximum` when `val > maximum`, returns `val` otherwise
 * @example
 *
 *      R.clamp(1, 10, -5) // => 1
 *      R.clamp(1, 10, 15) // => 10
 *      R.clamp(1, 10, 4)  // => 4
 */

var clamp =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function clamp(min, max, value) {
  if (min > max) {
    throw new Error('min must not be greater than max in clamp(min, max, value)');
  }

  return value < min ? min : value > max ? max : value;
});

/* harmony default export */ __webpack_exports__["default"] = (clamp);

/***/ }),

/***/ "./node_modules/ramda/es/clone.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/clone.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_clone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_clone.js */ "./node_modules/ramda/es/internal/_clone.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");


/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * assigned by reference rather than copied
 *
 * Dispatches to a `clone` method if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A deeply cloned copy of `val`
 * @example
 *
 *      const objects = [{}, {}, {}];
 *      const objectsClone = R.clone(objects);
 *      objects === objectsClone; //=> false
 *      objects[0] === objectsClone[0]; //=> false
 */

var clone =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function clone(value) {
  return value != null && typeof value.clone === 'function' ? value.clone() : Object(_internal_clone_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, [], [], true);
});

/* harmony default export */ __webpack_exports__["default"] = (clone);

/***/ }),

/***/ "./node_modules/ramda/es/comparator.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/comparator.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Makes a comparator function out of a function that reports whether the first
 * element is less than the second.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b) -> Boolean) -> ((a, b) -> Number)
 * @param {Function} pred A predicate function of arity two which will return `true` if the first argument
 * is less than the second, `false` otherwise
 * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`
 * @example
 *
 *      const byAge = R.comparator((a, b) => a.age < b.age);
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByIncreasingAge = R.sort(byAge, people);
 *        //=> [{ name: 'Mikhail', age: 62 },{ name: 'Emma', age: 70 }, { name: 'Peter', age: 78 }]
 */

var comparator =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function comparator(pred) {
  return function (a, b) {
    return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
  };
});

/* harmony default export */ __webpack_exports__["default"] = (comparator);

/***/ }),

/***/ "./node_modules/ramda/es/complement.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/complement.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lift.js */ "./node_modules/ramda/es/lift.js");
/* harmony import */ var _not_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./not.js */ "./node_modules/ramda/es/not.js");


/**
 * Takes a function `f` and returns a function `g` such that if called with the same arguments
 * when `f` returns a "truthy" value, `g` returns `false` and when `f` returns a "falsy" value `g` returns `true`.
 *
 * `R.complement` may be applied to any functor
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> *) -> (*... -> Boolean)
 * @param {Function} f
 * @return {Function}
 * @see R.not
 * @example
 *
 *      const isNotNil = R.complement(R.isNil);
 *      isNil(null); //=> true
 *      isNotNil(null); //=> false
 *      isNil(7); //=> false
 *      isNotNil(7); //=> true
 */

var complement =
/*#__PURE__*/
Object(_lift_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_not_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (complement);

/***/ }),

/***/ "./node_modules/ramda/es/compose.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/compose.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return compose; });
/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipe.js */ "./node_modules/ramda/es/pipe.js");
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/ramda/es/reverse.js");


/**
 * Performs right-to-left function composition. The last argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      const classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      const yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */

function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }

  return _pipe_js__WEBPACK_IMPORTED_MODULE_0__["default"].apply(this, Object(_reverse_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arguments));
}

/***/ }),

/***/ "./node_modules/ramda/es/composeK.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/composeK.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return composeK; });
/* harmony import */ var _chain_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chain.js */ "./node_modules/ramda/es/chain.js");
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compose.js */ "./node_modules/ramda/es/compose.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");



/**
 * Returns the right-to-left Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (a -> m z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipeK
 * @deprecated since v0.26.0
 * @example
 *
 *       //  get :: String -> Object -> Maybe *
 *       const get = R.curry((propName, obj) => Maybe(obj[propName]))
 *
 *       //  getStateCode :: Maybe String -> Maybe String
 *       const getStateCode = R.composeK(
 *         R.compose(Maybe.of, R.toUpper),
 *         get('state'),
 *         get('address'),
 *         get('user'),
 *       );
 *       getStateCode({"user":{"address":{"state":"ny"}}}); //=> Maybe.Just("NY")
 *       getStateCode({}); //=> Maybe.Nothing()
 * @symb R.composeK(f, g, h)(a) = R.chain(f, R.chain(g, h(a)))
 */

function composeK() {
  if (arguments.length === 0) {
    throw new Error('composeK requires at least one argument');
  }

  var init = Array.prototype.slice.call(arguments);
  var last = init.pop();
  return Object(_compose_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_compose_js__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, Object(_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_chain_js__WEBPACK_IMPORTED_MODULE_0__["default"], init)), last);
}

/***/ }),

/***/ "./node_modules/ramda/es/composeP.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/composeP.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return composeP; });
/* harmony import */ var _pipeP_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipeP.js */ "./node_modules/ramda/es/pipeP.js");
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/ramda/es/reverse.js");


/**
 * Performs right-to-left composition of one or more Promise-returning
 * functions. The last arguments may have any arity; the remaining
 * arguments must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
 * @param {...Function} functions The functions to compose
 * @return {Function}
 * @see R.pipeP
 * @deprecated since v0.26.0
 * @example
 *
 *      const db = {
 *        users: {
 *          JOE: {
 *            name: 'Joe',
 *            followers: ['STEVE', 'SUZY']
 *          }
 *        }
 *      }
 *
 *      // We'll pretend to do a db lookup which returns a promise
 *      const lookupUser = (userId) => Promise.resolve(db.users[userId])
 *      const lookupFollowers = (user) => Promise.resolve(user.followers)
 *      lookupUser('JOE').then(lookupFollowers)
 *
 *      //  followersForUser :: String -> Promise [UserId]
 *      const followersForUser = R.composeP(lookupFollowers, lookupUser);
 *      followersForUser('JOE').then(followers => console.log('Followers:', followers))
 *      // Followers: ["STEVE","SUZY"]
 */

function composeP() {
  if (arguments.length === 0) {
    throw new Error('composeP requires at least one argument');
  }

  return _pipeP_js__WEBPACK_IMPORTED_MODULE_0__["default"].apply(this, Object(_reverse_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arguments));
}

/***/ }),

/***/ "./node_modules/ramda/es/composeWith.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/composeWith.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _pipeWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pipeWith.js */ "./node_modules/ramda/es/pipeWith.js");
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/ramda/es/reverse.js");



/**
 * Performs right-to-left function composition using transforming function. The last argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of compose is not automatically curried. Transforming function is not used on the
 * last argument.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((* -> *), [(y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)]) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.compose, R.pipeWith
 * @example
 *
 *      const composeWhileNotNil = R.composeWith((f, res) => R.isNil(res) ? res : f(res));
 *
 *      composeWhileNotNil([R.inc, R.prop('age')])({age: 1}) //=> 2
 *      composeWhileNotNil([R.inc, R.prop('age')])({}) //=> undefined
 *
 * @symb R.composeWith(f)([g, h, i])(...args) = f(g, f(h, i(...args)))
 */

var composeWith =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function composeWith(xf, list) {
  return _pipeWith_js__WEBPACK_IMPORTED_MODULE_1__["default"].apply(this, [xf, Object(_reverse_js__WEBPACK_IMPORTED_MODULE_2__["default"])(list)]);
});

/* harmony default export */ __webpack_exports__["default"] = (composeWith);

/***/ }),

/***/ "./node_modules/ramda/es/concat.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/concat.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isFunction.js */ "./node_modules/ramda/es/internal/_isFunction.js");
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isString.js */ "./node_modules/ramda/es/internal/_isString.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./toString.js */ "./node_modules/ramda/es/toString.js");





/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: `R.concat` expects both arguments to be of the same type,
 * unlike the native `Array.prototype.concat` method. It will throw
 * an error if you `concat` an Array with a non-Array value.
 *
 * Dispatches to the `concat` method of the first argument, if present.
 * Can also concatenate two members of a [fantasy-land
 * compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `firstList` followed by the elements of
 * `secondList`.
 *
 * @example
 *
 *      R.concat('ABC', 'DEF'); // 'ABCDEF'
 *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 *      R.concat([], []); //=> []
 */

var concat =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function concat(a, b) {
  if (Object(_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a)) {
    if (Object(_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b)) {
      return a.concat(b);
    }

    throw new TypeError(Object(_toString_js__WEBPACK_IMPORTED_MODULE_4__["default"])(b) + ' is not an array');
  }

  if (Object(_internal_isString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(a)) {
    if (Object(_internal_isString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(b)) {
      return a + b;
    }

    throw new TypeError(Object(_toString_js__WEBPACK_IMPORTED_MODULE_4__["default"])(b) + ' is not a string');
  }

  if (a != null && Object(_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a['fantasy-land/concat'])) {
    return a['fantasy-land/concat'](b);
  }

  if (a != null && Object(_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a.concat)) {
    return a.concat(b);
  }

  throw new TypeError(Object(_toString_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a) + ' does not have a method named "concat" or "fantasy-land/concat"');
});

/* harmony default export */ __webpack_exports__["default"] = (concat);

/***/ }),

/***/ "./node_modules/ramda/es/cond.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/cond.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");





/**
 * Returns a function, `fn`, which encapsulates `if/else, if/else, ...` logic.
 * `R.cond` takes a list of [predicate, transformer] pairs. All of the arguments
 * to `fn` are applied to each of the predicates in turn until one returns a
 * "truthy" value, at which point `fn` returns the result of applying its
 * arguments to the corresponding transformer. If none of the predicates
 * matches, `fn` returns undefined.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Logic
 * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
 * @param {Array} pairs A list of [predicate, transformer]
 * @return {Function}
 * @see R.ifElse, R.unless, R.when
 * @example
 *
 *      const fn = R.cond([
 *        [R.equals(0),   R.always('water freezes at 0°C')],
 *        [R.equals(100), R.always('water boils at 100°C')],
 *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
 *      ]);
 *      fn(0); //=> 'water freezes at 0°C'
 *      fn(50); //=> 'nothing special happens at 50°C'
 *      fn(100); //=> 'water boils at 100°C'
 */

var cond =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function cond(pairs) {
  var arity = Object(_reduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_3__["default"], 0, Object(_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (pair) {
    return pair[0].length;
  }, pairs));
  return Object(_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arity, function () {
    var idx = 0;

    while (idx < pairs.length) {
      if (pairs[idx][0].apply(this, arguments)) {
        return pairs[idx][1].apply(this, arguments);
      }

      idx += 1;
    }
  });
});

/* harmony default export */ __webpack_exports__["default"] = (cond);

/***/ }),

/***/ "./node_modules/ramda/es/construct.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/construct.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _constructN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constructN.js */ "./node_modules/ramda/es/constructN.js");


/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> {*}) -> (* -> {*})
 * @param {Function} fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @see R.invoker
 * @example
 *
 *      // Constructor function
 *      function Animal(kind) {
 *        this.kind = kind;
 *      };
 *      Animal.prototype.sighting = function() {
 *        return "It's a " + this.kind + "!";
 *      }
 *
 *      const AnimalConstructor = R.construct(Animal)
 *
 *      // Notice we no longer need the 'new' keyword:
 *      AnimalConstructor('Pig'); //=> {"kind": "Pig", "sighting": function (){...}};
 *
 *      const animalTypes = ["Lion", "Tiger", "Bear"];
 *      const animalSighting = R.invoker(0, 'sighting');
 *      const sightNewAnimal = R.compose(animalSighting, AnimalConstructor);
 *      R.map(sightNewAnimal, animalTypes); //=> ["It's a Lion!", "It's a Tiger!", "It's a Bear!"]
 */

var construct =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function construct(Fn) {
  return Object(_constructN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Fn.length, Fn);
});

/* harmony default export */ __webpack_exports__["default"] = (construct);

/***/ }),

/***/ "./node_modules/ramda/es/constructN.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/constructN.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curry.js */ "./node_modules/ramda/es/curry.js");
/* harmony import */ var _nAry_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nAry.js */ "./node_modules/ramda/es/nAry.js");



/**
 * Wraps a constructor function inside a curried function that can be called
 * with the same arguments and returns the same type. The arity of the function
 * returned is specified to allow using variadic constructor functions.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Function
 * @sig Number -> (* -> {*}) -> (* -> {*})
 * @param {Number} n The arity of the constructor function.
 * @param {Function} Fn The constructor function to wrap.
 * @return {Function} A wrapped, curried constructor function.
 * @example
 *
 *      // Variadic Constructor function
 *      function Salad() {
 *        this.ingredients = arguments;
 *      }
 *
 *      Salad.prototype.recipe = function() {
 *        const instructions = R.map(ingredient => 'Add a dollop of ' + ingredient, this.ingredients);
 *        return R.join('\n', instructions);
 *      };
 *
 *      const ThreeLayerSalad = R.constructN(3, Salad);
 *
 *      // Notice we no longer need the 'new' keyword, and the constructor is curried for 3 arguments.
 *      const salad = ThreeLayerSalad('Mayonnaise')('Potato Chips')('Ketchup');
 *
 *      console.log(salad.recipe());
 *      // Add a dollop of Mayonnaise
 *      // Add a dollop of Potato Chips
 *      // Add a dollop of Ketchup
 */

var constructN =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function constructN(n, Fn) {
  if (n > 10) {
    throw new Error('Constructor with greater than ten arguments');
  }

  if (n === 0) {
    return function () {
      return new Fn();
    };
  }

  return Object(_curry_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_nAry_js__WEBPACK_IMPORTED_MODULE_2__["default"])(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
    switch (arguments.length) {
      case 1:
        return new Fn($0);

      case 2:
        return new Fn($0, $1);

      case 3:
        return new Fn($0, $1, $2);

      case 4:
        return new Fn($0, $1, $2, $3);

      case 5:
        return new Fn($0, $1, $2, $3, $4);

      case 6:
        return new Fn($0, $1, $2, $3, $4, $5);

      case 7:
        return new Fn($0, $1, $2, $3, $4, $5, $6);

      case 8:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7);

      case 9:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);

      case 10:
        return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
    }
  }));
});

/* harmony default export */ __webpack_exports__["default"] = (constructN);

/***/ }),

/***/ "./node_modules/ramda/es/contains.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/contains.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includes.js */ "./node_modules/ramda/es/internal/_includes.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Works also with strings.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.includes
 * @deprecated since v0.26.0
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 *      R.contains('ba', 'banana'); //=>true
 */

var contains =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_internal_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (contains);

/***/ }),

/***/ "./node_modules/ramda/es/converge.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/converge.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/es/pluck.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");






/**
 * Accepts a converging function and a list of branching functions and returns
 * a new function. The arity of the new function is the same as the arity of
 * the longest branching function. When invoked, this new function is applied
 * to some arguments, and each branching function is applied to those same
 * arguments. The results of each branching function are passed as arguments
 * to the converging function to produce the return value.
 *
 * @func
 * @memberOf R
 * @since v0.4.2
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [((a, b, ...) -> x1), ((a, b, ...) -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} after A function. `after` will be invoked with the return values of
 *        `fn1` and `fn2` as its arguments.
 * @param {Array} functions A list of functions.
 * @return {Function} A new function.
 * @see R.useWith
 * @example
 *
 *      const average = R.converge(R.divide, [R.sum, R.length])
 *      average([1, 2, 3, 4, 5, 6, 7]) //=> 4
 *
 *      const strangeConcat = R.converge(R.concat, [R.toUpper, R.toLower])
 *      strangeConcat("Yodel") //=> "YODELyodel"
 *
 * @symb R.converge(f, [g, h])(a, b) = f(g(a, b), h(a, b))
 */

var converge =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function converge(after, fns) {
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_reduce_js__WEBPACK_IMPORTED_MODULE_5__["default"])(_max_js__WEBPACK_IMPORTED_MODULE_3__["default"], 0, Object(_pluck_js__WEBPACK_IMPORTED_MODULE_4__["default"])('length', fns)), function () {
    var args = arguments;
    var context = this;
    return after.apply(context, Object(_internal_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (fn) {
      return fn.apply(context, args);
    }, fns));
  });
});

/* harmony default export */ __webpack_exports__["default"] = (converge);

/***/ }),

/***/ "./node_modules/ramda/es/countBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/countBy.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reduceBy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reduceBy.js */ "./node_modules/ramda/es/reduceBy.js");

/**
 * Counts the elements of a list according to how many match each value of a
 * key generated by the supplied function. Returns an object mapping the keys
 * produced by `fn` to the number of occurrences in the list. Note that all
 * keys are coerced to strings because of how JavaScript objects work.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig (a -> String) -> [a] -> {*}
 * @param {Function} fn The function used to map values to keys.
 * @param {Array} list The list to count elements from.
 * @return {Object} An object mapping keys to number of occurrences in the list.
 * @example
 *
 *      const numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
 *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
 *
 *      const letters = ['a', 'b', 'A', 'a', 'B', 'c'];
 *      R.countBy(R.toLower)(letters);   //=> {'a': 3, 'b': 2, 'c': 1}
 */

var countBy =
/*#__PURE__*/
Object(_reduceBy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (acc, elem) {
  return acc + 1;
}, 0);
/* harmony default export */ __webpack_exports__["default"] = (countBy);

/***/ }),

/***/ "./node_modules/ramda/es/curry.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/curry.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");


/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN, R.partial
 * @example
 *
 *      const addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      const curriedAddFourNumbers = R.curry(addFourNumbers);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */

var curry =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function curry(fn) {
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, fn);
});

/* harmony default export */ __webpack_exports__["default"] = (curry);

/***/ }),

/***/ "./node_modules/ramda/es/curryN.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/curryN.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_curryN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_curryN.js */ "./node_modules/ramda/es/internal/_curryN.js");




/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      const sumArgs = (...args) => R.sum(args);
 *
 *      const curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      const f = curriedAddFourNumbers(1, 2);
 *      const g = f(3);
 *      g(4); //=> 10
 */

var curryN =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function curryN(length, fn) {
  if (length === 1) {
    return Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn);
  }

  return Object(_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(length, Object(_internal_curryN_js__WEBPACK_IMPORTED_MODULE_3__["default"])(length, [], fn));
});

/* harmony default export */ __webpack_exports__["default"] = (curryN);

/***/ }),

/***/ "./node_modules/ramda/es/dec.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/dec.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add.js */ "./node_modules/ramda/es/add.js");

/**
 * Decrements its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n - 1
 * @see R.inc
 * @example
 *
 *      R.dec(42); //=> 41
 */

var dec =
/*#__PURE__*/
Object(_add_js__WEBPACK_IMPORTED_MODULE_0__["default"])(-1);
/* harmony default export */ __webpack_exports__["default"] = (dec);

/***/ }),

/***/ "./node_modules/ramda/es/defaultTo.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/defaultTo.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns the second argument if it is not `null`, `undefined` or `NaN`;
 * otherwise the first argument is returned.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {a} default The default value.
 * @param {b} val `val` will be returned instead of `default` unless `val` is `null`, `undefined` or `NaN`.
 * @return {*} The second value if it is not `null`, `undefined` or `NaN`, otherwise the default value
 * @example
 *
 *      const defaultTo42 = R.defaultTo(42);
 *
 *      defaultTo42(null);  //=> 42
 *      defaultTo42(undefined);  //=> 42
 *      defaultTo42(false);  //=> false
 *      defaultTo42('Ramda');  //=> 'Ramda'
 *      // parseInt('string') results in NaN
 *      defaultTo42(parseInt('string')); //=> 42
 */

var defaultTo =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function defaultTo(d, v) {
  return v == null || v !== v ? d : v;
});

/* harmony default export */ __webpack_exports__["default"] = (defaultTo);

/***/ }),

/***/ "./node_modules/ramda/es/descend.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/descend.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Makes a descending comparator function out of a function that returns a value
 * that can be compared with `<` and `>`.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Function
 * @sig Ord b => (a -> b) -> a -> a -> Number
 * @param {Function} fn A function of arity one that returns a value that can be compared
 * @param {*} a The first item to be compared.
 * @param {*} b The second item to be compared.
 * @return {Number} `-1` if fn(a) > fn(b), `1` if fn(b) > fn(a), otherwise `0`
 * @see R.ascend
 * @example
 *
 *      const byAge = R.descend(R.prop('age'));
 *      const people = [
 *        { name: 'Emma', age: 70 },
 *        { name: 'Peter', age: 78 },
 *        { name: 'Mikhail', age: 62 },
 *      ];
 *      const peopleByOldestFirst = R.sort(byAge, people);
 *        //=> [{ name: 'Peter', age: 78 }, { name: 'Emma', age: 70 }, { name: 'Mikhail', age: 62 }]
 */

var descend =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function descend(fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa > bb ? -1 : aa < bb ? 1 : 0;
});

/* harmony default export */ __webpack_exports__["default"] = (descend);

/***/ }),

/***/ "./node_modules/ramda/es/difference.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/difference.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_Set_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_Set.js */ "./node_modules/ramda/es/internal/_Set.js");


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Objects and Arrays are compared in terms of
 * value equality, not reference equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.differenceWith, R.symmetricDifference, R.symmetricDifferenceWith, R.without
 * @example
 *
 *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
 *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
 *      R.difference([{a: 1}, {b: 2}], [{a: 1}, {c: 3}]) //=> [{b: 2}]
 */

var difference =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function difference(first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;
  var secondLen = second.length;
  var toFilterOut = new _internal_Set_js__WEBPACK_IMPORTED_MODULE_1__["default"]();

  for (var i = 0; i < secondLen; i += 1) {
    toFilterOut.add(second[i]);
  }

  while (idx < firstLen) {
    if (toFilterOut.add(first[idx])) {
      out[out.length] = first[idx];
    }

    idx += 1;
  }

  return out;
});

/* harmony default export */ __webpack_exports__["default"] = (difference);

/***/ }),

/***/ "./node_modules/ramda/es/differenceWith.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/differenceWith.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includesWith.js */ "./node_modules/ramda/es/internal/_includesWith.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");


/**
 * Finds the set (i.e. no duplicates) of all elements in the first list not
 * contained in the second list. Duplication is determined according to the
 * value returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` that are not in `list2`.
 * @see R.difference, R.symmetricDifference, R.symmetricDifferenceWith
 * @example
 *
 *      const cmp = (x, y) => x.a === y.a;
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}];
 *      const l2 = [{a: 3}, {a: 4}];
 *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
 */

var differenceWith =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function differenceWith(pred, first, second) {
  var out = [];
  var idx = 0;
  var firstLen = first.length;

  while (idx < firstLen) {
    if (!Object(_internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__["default"])(pred, first[idx], second) && !Object(_internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__["default"])(pred, first[idx], out)) {
      out.push(first[idx]);
    }

    idx += 1;
  }

  return out;
});

/* harmony default export */ __webpack_exports__["default"] = (differenceWith);

/***/ }),

/***/ "./node_modules/ramda/es/dissoc.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/dissoc.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns a new object that does not contain a `prop` property.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Object
 * @sig String -> {k: v} -> {k: v}
 * @param {String} prop The name of the property to dissociate
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original but without the specified property
 * @see R.assoc, R.omit
 * @example
 *
 *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
 */

var dissoc =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function dissoc(prop, obj) {
  var result = {};

  for (var p in obj) {
    result[p] = obj[p];
  }

  delete result[prop];
  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (dissoc);

/***/ }),

/***/ "./node_modules/ramda/es/dissocPath.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/dissocPath.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _assoc_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assoc.js */ "./node_modules/ramda/es/assoc.js");
/* harmony import */ var _dissoc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dissoc.js */ "./node_modules/ramda/es/dissoc.js");
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./remove.js */ "./node_modules/ramda/es/remove.js");
/* harmony import */ var _update_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./update.js */ "./node_modules/ramda/es/update.js");







/**
 * Makes a shallow clone of an object, omitting the property at the given path.
 * Note that this copies and flattens prototype properties onto the new object
 * as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.11.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {Array} path The path to the value to omit
 * @param {Object} obj The object to clone
 * @return {Object} A new object without the property at path
 * @see R.assocPath
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */

var dissocPath =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function dissocPath(path, obj) {
  switch (path.length) {
    case 0:
      return obj;

    case 1:
      return Object(_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(path[0]) && Object(_internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj) ? Object(_remove_js__WEBPACK_IMPORTED_MODULE_5__["default"])(path[0], 1, obj) : Object(_dissoc_js__WEBPACK_IMPORTED_MODULE_4__["default"])(path[0], obj);

    default:
      var head = path[0];
      var tail = Array.prototype.slice.call(path, 1);

      if (obj[head] == null) {
        return obj;
      } else if (Object(_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(head) && Object(_internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj)) {
        return Object(_update_js__WEBPACK_IMPORTED_MODULE_6__["default"])(head, dissocPath(tail, obj[head]), obj);
      } else {
        return Object(_assoc_js__WEBPACK_IMPORTED_MODULE_3__["default"])(head, dissocPath(tail, obj[head]), obj);
      }

  }
});

/* harmony default export */ __webpack_exports__["default"] = (dissocPath);

/***/ }),

/***/ "./node_modules/ramda/es/divide.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/divide.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Divides two numbers. Equivalent to `a / b`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a / b`.
 * @see R.multiply
 * @example
 *
 *      R.divide(71, 100); //=> 0.71
 *
 *      const half = R.divide(R.__, 2);
 *      half(42); //=> 21
 *
 *      const reciprocal = R.divide(1);
 *      reciprocal(4);   //=> 0.25
 */

var divide =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function divide(a, b) {
  return a / b;
});

/* harmony default export */ __webpack_exports__["default"] = (divide);

/***/ }),

/***/ "./node_modules/ramda/es/drop.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/drop.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xdrop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdrop.js */ "./node_modules/ramda/es/internal/_xdrop.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");




/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */

var drop =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['drop'], _internal_xdrop_js__WEBPACK_IMPORTED_MODULE_2__["default"], function drop(n, xs) {
  return Object(_slice_js__WEBPACK_IMPORTED_MODULE_3__["default"])(Math.max(0, n), Infinity, xs);
}));

/* harmony default export */ __webpack_exports__["default"] = (drop);

/***/ }),

/***/ "./node_modules/ramda/es/dropLast.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/dropLast.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_dropLast_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dropLast.js */ "./node_modules/ramda/es/internal/_dropLast.js");
/* harmony import */ var _internal_xdropLast_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xdropLast.js */ "./node_modules/ramda/es/internal/_xdropLast.js");




/**
 * Returns a list containing all but the last `n` elements of the given `list`.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The list of elements to consider.
 * @return {Array} A copy of the list with only the first `list.length - n` elements
 * @see R.takeLast, R.drop, R.dropWhile, R.dropLastWhile
 * @example
 *
 *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
 *      R.dropLast(3, 'ramda');               //=> 'ra'
 */

var dropLast =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xdropLast_js__WEBPACK_IMPORTED_MODULE_3__["default"], _internal_dropLast_js__WEBPACK_IMPORTED_MODULE_2__["default"]));

/* harmony default export */ __webpack_exports__["default"] = (dropLast);

/***/ }),

/***/ "./node_modules/ramda/es/dropLastWhile.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/dropLastWhile.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_dropLastWhile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dropLastWhile.js */ "./node_modules/ramda/es/internal/_dropLastWhile.js");
/* harmony import */ var _internal_xdropLastWhile_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_xdropLastWhile.js */ "./node_modules/ramda/es/internal/_xdropLastWhile.js");




/**
 * Returns a new list excluding all the tailing elements of a given list which
 * satisfy the supplied predicate function. It passes each value from the right
 * to the supplied predicate function, skipping elements until the predicate
 * function returns a `falsy` value. The predicate function is applied to one argument:
 * *(value)*.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} predicate The function to be called on each element
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array without any trailing elements that return `falsy` values from the `predicate`.
 * @see R.takeLastWhile, R.addIndex, R.drop, R.dropWhile
 * @example
 *
 *      const lteThree = x => x <= 3;
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
 *
 *      R.dropLastWhile(x => x !== 'd' , 'Ramda'); //=> 'Ramd'
 */

var dropLastWhile =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xdropLastWhile_js__WEBPACK_IMPORTED_MODULE_3__["default"], _internal_dropLastWhile_js__WEBPACK_IMPORTED_MODULE_2__["default"]));

/* harmony default export */ __webpack_exports__["default"] = (dropLastWhile);

/***/ }),

/***/ "./node_modules/ramda/es/dropRepeats.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/dropRepeats.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xdropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdropRepeatsWith.js */ "./node_modules/ramda/es/internal/_xdropRepeatsWith.js");
/* harmony import */ var _dropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropRepeatsWith.js */ "./node_modules/ramda/es/dropRepeatsWith.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");





/**
 * Returns a new list without any consecutively repeating elements.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
 */

var dropRepeats =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([],
/*#__PURE__*/
Object(_internal_xdropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_equals_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/*#__PURE__*/
Object(_dropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_equals_js__WEBPACK_IMPORTED_MODULE_4__["default"])));

/* harmony default export */ __webpack_exports__["default"] = (dropRepeats);

/***/ }),

/***/ "./node_modules/ramda/es/dropRepeatsWith.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/dropRepeatsWith.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xdropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdropRepeatsWith.js */ "./node_modules/ramda/es/internal/_xdropRepeatsWith.js");
/* harmony import */ var _last_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./last.js */ "./node_modules/ramda/es/last.js");




/**
 * Returns a new list without any consecutively repeating elements. Equality is
 * determined by applying the supplied predicate to each pair of consecutive elements. The
 * first element in a series of equal elements will be preserved.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} `list` without repeating elements.
 * @see R.transduce
 * @example
 *
 *      const l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
 *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
 */

var dropRepeatsWith =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xdropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_2__["default"], function dropRepeatsWith(pred, list) {
  var result = [];
  var idx = 1;
  var len = list.length;

  if (len !== 0) {
    result[0] = list[0];

    while (idx < len) {
      if (!pred(Object(_last_js__WEBPACK_IMPORTED_MODULE_3__["default"])(result), list[idx])) {
        result[result.length] = list[idx];
      }

      idx += 1;
    }
  }

  return result;
}));

/* harmony default export */ __webpack_exports__["default"] = (dropRepeatsWith);

/***/ }),

/***/ "./node_modules/ramda/es/dropWhile.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/dropWhile.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xdropWhile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xdropWhile.js */ "./node_modules/ramda/es/internal/_xdropWhile.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");




/**
 * Returns a new list excluding the leading elements of a given list which
 * satisfy the supplied predicate function. It passes each value to the supplied
 * predicate function, skipping elements while the predicate function returns
 * `true`. The predicate function is applied to one argument: *(value)*.
 *
 * Dispatches to the `dropWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeWhile, R.transduce, R.addIndex
 * @example
 *
 *      const lteTwo = x => x <= 2;
 *
 *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
 *
 *      R.dropWhile(x => x !== 'd' , 'Ramda'); //=> 'da'
 */

var dropWhile =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['dropWhile'], _internal_xdropWhile_js__WEBPACK_IMPORTED_MODULE_2__["default"], function dropWhile(pred, xs) {
  var idx = 0;
  var len = xs.length;

  while (idx < len && pred(xs[idx])) {
    idx += 1;
  }

  return Object(_slice_js__WEBPACK_IMPORTED_MODULE_3__["default"])(idx, Infinity, xs);
}));

/* harmony default export */ __webpack_exports__["default"] = (dropWhile);

/***/ }),

/***/ "./node_modules/ramda/es/either.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/either.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isFunction.js */ "./node_modules/ramda/es/internal/_isFunction.js");
/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lift.js */ "./node_modules/ramda/es/lift.js");
/* harmony import */ var _or_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./or.js */ "./node_modules/ramda/es/or.js");




/**
 * A function wrapping calls to the two functions in an `||` operation,
 * returning the result of the first function if it is truth-y and the result
 * of the second function otherwise. Note that this is short-circuited,
 * meaning that the second function will not be invoked if the first returns a
 * truth-y value.
 *
 * In addition to functions, `R.either` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
 * @see R.or
 * @example
 *
 *      const gt10 = x => x > 10;
 *      const even = x => x % 2 === 0;
 *      const f = R.either(gt10, even);
 *      f(101); //=> true
 *      f(8); //=> true
 *
 *      R.either(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(55)
 *      R.either([false, false, 'a'], [11]) // => [11, 11, "a"]
 */

var either =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function either(f, g) {
  return Object(_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(f) ? function _either() {
    return f.apply(this, arguments) || g.apply(this, arguments);
  } : Object(_lift_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_or_js__WEBPACK_IMPORTED_MODULE_3__["default"])(f, g);
});

/* harmony default export */ __webpack_exports__["default"] = (either);

/***/ }),

/***/ "./node_modules/ramda/es/empty.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/empty.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_isArguments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArguments.js */ "./node_modules/ramda/es/internal/_isArguments.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isObject.js */ "./node_modules/ramda/es/internal/_isObject.js");
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_isString.js */ "./node_modules/ramda/es/internal/_isString.js");





/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty`,
 * `<Type>.prototype.empty` or implement the
 * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */

var empty =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : Object(_internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x) ? [] : Object(_internal_isString_js__WEBPACK_IMPORTED_MODULE_4__["default"])(x) ? '' : Object(_internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(x) ? {} : Object(_internal_isArguments_js__WEBPACK_IMPORTED_MODULE_1__["default"])(x) ? function () {
    return arguments;
  }() : void 0 // else
  ;
});

/* harmony default export */ __webpack_exports__["default"] = (empty);

/***/ }),

/***/ "./node_modules/ramda/es/endsWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/endsWith.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");
/* harmony import */ var _takeLast_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./takeLast.js */ "./node_modules/ramda/es/takeLast.js");



/**
 * Checks if a list ends with the provided sublist.
 *
 * Similarly, checks if a string ends with the provided substring.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> [a] -> Boolean
 * @sig String -> String -> Boolean
 * @param {*} suffix
 * @param {*} list
 * @return {Boolean}
 * @see R.startsWith
 * @example
 *
 *      R.endsWith('c', 'abc')                //=> true
 *      R.endsWith('b', 'abc')                //=> false
 *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */

var endsWith =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (suffix, list) {
  return Object(_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_takeLast_js__WEBPACK_IMPORTED_MODULE_2__["default"])(suffix.length, list), suffix);
});

/* harmony default export */ __webpack_exports__["default"] = (endsWith);

/***/ }),

/***/ "./node_modules/ramda/es/eqBy.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/eqBy.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");


/**
 * Takes a function and two values in its domain and returns `true` if the
 * values map to the same value in the codomain; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Relation
 * @sig (a -> b) -> a -> a -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {*} y
 * @return {Boolean}
 * @example
 *
 *      R.eqBy(Math.abs, 5, -5); //=> true
 */

var eqBy =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function eqBy(f, x, y) {
  return Object(_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(f(x), f(y));
});

/* harmony default export */ __webpack_exports__["default"] = (eqBy);

/***/ }),

/***/ "./node_modules/ramda/es/eqProps.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/eqProps.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");


/**
 * Reports whether two objects have the same value, in [`R.equals`](#equals)
 * terms, for the specified property. Useful as a curried predicate.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      const o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      const o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */

var eqProps =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function eqProps(prop, obj1, obj2) {
  return Object(_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj1[prop], obj2[prop]);
});

/* harmony default export */ __webpack_exports__["default"] = (eqProps);

/***/ }),

/***/ "./node_modules/ramda/es/equals.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/equals.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_equals.js */ "./node_modules/ramda/es/internal/_equals.js");


/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      const a = {}; a.v = a;
 *      const b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */

var equals =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function equals(a, b) {
  return Object(_internal_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a, b, [], []);
});

/* harmony default export */ __webpack_exports__["default"] = (equals);

/***/ }),

/***/ "./node_modules/ramda/es/evolve.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/evolve.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Creates a new object by recursively evolving a shallow copy of `object`,
 * according to the `transformation` functions. All non-primitive properties
 * are copied by reference.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      const tomato = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
 *      const transformations = {
 *        firstName: R.trim,
 *        lastName: R.trim, // Will not get invoked.
 *        data: {elapsed: R.add(1), remaining: R.add(-1)}
 *      };
 *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
 */

var evolve =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function evolve(transformations, object) {
  var result = object instanceof Array ? [] : {};
  var transformation, key, type;

  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function' ? transformation(object[key]) : transformation && type === 'object' ? evolve(transformation, object[key]) : object[key];
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (evolve);

/***/ }),

/***/ "./node_modules/ramda/es/filter.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/filter.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_filter.js */ "./node_modules/ramda/es/internal/_filter.js");
/* harmony import */ var _internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_isObject.js */ "./node_modules/ramda/es/internal/_isObject.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_xfilter_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/_xfilter.js */ "./node_modules/ramda/es/internal/_xfilter.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");







/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */

var filter =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['filter'], _internal_xfilter_js__WEBPACK_IMPORTED_MODULE_5__["default"], function (pred, filterable) {
  return Object(_internal_isObject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(filterable) ? Object(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }

    return acc;
  }, {}, Object(_keys_js__WEBPACK_IMPORTED_MODULE_6__["default"])(filterable)) : // else
  Object(_internal_filter_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pred, filterable);
}));

/* harmony default export */ __webpack_exports__["default"] = (filter);

/***/ }),

/***/ "./node_modules/ramda/es/find.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/find.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xfind_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfind.js */ "./node_modules/ramda/es/internal/_xfind.js");



/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Dispatches to the `find` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */

var find =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['find'], _internal_xfind_js__WEBPACK_IMPORTED_MODULE_2__["default"], function find(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return list[idx];
    }

    idx += 1;
  }
}));

/* harmony default export */ __webpack_exports__["default"] = (find);

/***/ }),

/***/ "./node_modules/ramda/es/findIndex.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/findIndex.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xfindIndex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfindIndex.js */ "./node_modules/ramda/es/internal/_xfindIndex.js");



/**
 * Returns the index of the first element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
 *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
 */

var findIndex =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xfindIndex_js__WEBPACK_IMPORTED_MODULE_2__["default"], function findIndex(fn, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (fn(list[idx])) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}));

/* harmony default export */ __webpack_exports__["default"] = (findIndex);

/***/ }),

/***/ "./node_modules/ramda/es/findLast.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/findLast.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xfindLast_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfindLast.js */ "./node_modules/ramda/es/internal/_xfindLast.js");



/**
 * Returns the last element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */

var findLast =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xfindLast_js__WEBPACK_IMPORTED_MODULE_2__["default"], function findLast(fn, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    if (fn(list[idx])) {
      return list[idx];
    }

    idx -= 1;
  }
}));

/* harmony default export */ __webpack_exports__["default"] = (findLast);

/***/ }),

/***/ "./node_modules/ramda/es/findLastIndex.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/findLastIndex.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xfindLastIndex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xfindLastIndex.js */ "./node_modules/ramda/es/internal/_xfindLastIndex.js");



/**
 * Returns the index of the last element of the list which matches the
 * predicate, or `-1` if no element matches.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @see R.transduce
 * @example
 *
 *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */

var findLastIndex =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xfindLastIndex_js__WEBPACK_IMPORTED_MODULE_2__["default"], function findLastIndex(fn, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    if (fn(list[idx])) {
      return idx;
    }

    idx -= 1;
  }

  return -1;
}));

/* harmony default export */ __webpack_exports__["default"] = (findLastIndex);

/***/ }),

/***/ "./node_modules/ramda/es/flatten.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/flatten.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_makeFlat.js */ "./node_modules/ramda/es/internal/_makeFlat.js");


/**
 * Returns a new list by pulling every item out of it (and all its sub-arrays)
 * and putting them in a new array, depth-first.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @see R.unnest
 * @example
 *
 *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
 *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
 */

var flatten =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_makeFlat_js__WEBPACK_IMPORTED_MODULE_1__["default"])(true));

/* harmony default export */ __webpack_exports__["default"] = (flatten);

/***/ }),

/***/ "./node_modules/ramda/es/flip.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/flip.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");


/**
 * Returns a new function much like the supplied one, except that the first two
 * arguments' order is reversed.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
 * @param {Function} fn The function to invoke with its first two parameters reversed.
 * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
 * @example
 *
 *      const mergeThree = (a, b, c) => [].concat(a, b, c);
 *
 *      mergeThree(1, 2, 3); //=> [1, 2, 3]
 *
 *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
 * @symb R.flip(f)(a, b, c) = f(b, a, c)
 */

var flip =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function flip(fn) {
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, function (a, b) {
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = b;
    args[1] = a;
    return fn.apply(this, args);
  });
});

/* harmony default export */ __webpack_exports__["default"] = (flip);

/***/ }),

/***/ "./node_modules/ramda/es/forEach.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/forEach.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Iterate over an input `list`, calling a provided function `fn` for each
 * element in the list.
 *
 * `fn` receives one argument: *(value)*.
 *
 * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.forEach` method. For more
 * details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
 *
 * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
 * the original array. In some libraries this function is named `each`.
 *
 * Dispatches to the `forEach` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig (a -> *) -> [a] -> [a]
 * @param {Function} fn The function to invoke. Receives one argument, `value`.
 * @param {Array} list The list to iterate over.
 * @return {Array} The original list.
 * @see R.addIndex
 * @example
 *
 *      const printXPlusFive = x => console.log(x + 5);
 *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
 *      // logs 6
 *      // logs 7
 *      // logs 8
 * @symb R.forEach(f, [a, b, c]) = [a, b, c]
 */

var forEach =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
Object(_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__["default"])('forEach', function forEach(fn, list) {
  var len = list.length;
  var idx = 0;

  while (idx < len) {
    fn(list[idx]);
    idx += 1;
  }

  return list;
}));

/* harmony default export */ __webpack_exports__["default"] = (forEach);

/***/ }),

/***/ "./node_modules/ramda/es/forEachObjIndexed.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/forEachObjIndexed.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");


/**
 * Iterate over an input `object`, calling a provided function `fn` for each
 * key and value in the object.
 *
 * `fn` receives three argument: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Object
 * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
 * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
 * @param {Object} obj The object to iterate over.
 * @return {Object} The original object.
 * @example
 *
 *      const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
 *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
 *      // logs x:1
 *      // logs y:2
 * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
 */

var forEachObjIndexed =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function forEachObjIndexed(fn, obj) {
  var keyList = Object(_keys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj);
  var idx = 0;

  while (idx < keyList.length) {
    var key = keyList[idx];
    fn(obj[key], key, obj);
    idx += 1;
  }

  return obj;
});

/* harmony default export */ __webpack_exports__["default"] = (forEachObjIndexed);

/***/ }),

/***/ "./node_modules/ramda/es/fromPairs.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/fromPairs.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Creates a new object from a list key-value pairs. If a key appears in
 * multiple pairs, the rightmost pair is included in the object.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [[k,v]] -> {k: v}
 * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
 * @return {Object} The object made by pairing up `keys` and `values`.
 * @see R.toPairs, R.pair
 * @example
 *
 *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
 */

var fromPairs =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function fromPairs(pairs) {
  var result = {};
  var idx = 0;

  while (idx < pairs.length) {
    result[pairs[idx][0]] = pairs[idx][1];
    idx += 1;
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (fromPairs);

/***/ }),

/***/ "./node_modules/ramda/es/groupBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/groupBy.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduceBy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reduceBy.js */ "./node_modules/ramda/es/reduceBy.js");



/**
 * Splits a list into sub-lists stored in an object, based on the result of
 * calling a String-returning function on each element, and grouping the
 * results according to values returned.
 *
 * Dispatches to the `groupBy` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> String) -> [a] -> {String: [a]}
 * @param {Function} fn Function :: a -> String
 * @param {Array} list The array to group
 * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
 *         that produced that key when passed to `fn`.
 * @see R.reduceBy, R.transduce
 * @example
 *
 *      const byGrade = R.groupBy(function(student) {
 *        const score = student.score;
 *        return score < 65 ? 'F' :
 *               score < 70 ? 'D' :
 *               score < 80 ? 'C' :
 *               score < 90 ? 'B' : 'A';
 *      });
 *      const students = [{name: 'Abby', score: 84},
 *                      {name: 'Eddy', score: 58},
 *                      // ...
 *                      {name: 'Jack', score: 69}];
 *      byGrade(students);
 *      // {
 *      //   'A': [{name: 'Dianne', score: 99}],
 *      //   'B': [{name: 'Abby', score: 84}]
 *      //   // ...,
 *      //   'F': [{name: 'Eddy', score: 58}]
 *      // }
 */

var groupBy =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
Object(_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__["default"])('groupBy',
/*#__PURE__*/
Object(_reduceBy_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (acc, item) {
  if (acc == null) {
    acc = [];
  }

  acc.push(item);
  return acc;
}, null)));

/* harmony default export */ __webpack_exports__["default"] = (groupBy);

/***/ }),

/***/ "./node_modules/ramda/es/groupWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/groupWith.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Takes a list and returns a list of lists where each sublist's elements are
 * all satisfied pairwise comparison according to the provided function.
 * Only adjacent elements are passed to the comparison function.
 *
 * @func
 * @memberOf R
 * @since v0.21.0
 * @category List
 * @sig ((a, a) → Boolean) → [a] → [[a]]
 * @param {Function} fn Function for determining whether two given (adjacent)
 *        elements should be in the same group
 * @param {Array} list The array to group. Also accepts a string, which will be
 *        treated as a list of characters.
 * @return {List} A list that contains sublists of elements,
 *         whose concatenations are equal to the original list.
 * @example
 *
 * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
 *
 * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
 * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
 *
 * R.groupWith(R.eqBy(isVowel), 'aestiou')
 * //=> ['ae', 'st', 'iou']
 */

var groupWith =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (fn, list) {
  var res = [];
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    var nextidx = idx + 1;

    while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
      nextidx += 1;
    }

    res.push(list.slice(idx, nextidx));
    idx = nextidx;
  }

  return res;
});

/* harmony default export */ __webpack_exports__["default"] = (groupWith);

/***/ }),

/***/ "./node_modules/ramda/es/gt.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/gt.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns `true` if the first argument is greater than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.lt
 * @example
 *
 *      R.gt(2, 1); //=> true
 *      R.gt(2, 2); //=> false
 *      R.gt(2, 3); //=> false
 *      R.gt('a', 'z'); //=> false
 *      R.gt('z', 'a'); //=> true
 */

var gt =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function gt(a, b) {
  return a > b;
});

/* harmony default export */ __webpack_exports__["default"] = (gt);

/***/ }),

/***/ "./node_modules/ramda/es/gte.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/gte.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns `true` if the first argument is greater than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.lte
 * @example
 *
 *      R.gte(2, 1); //=> true
 *      R.gte(2, 2); //=> true
 *      R.gte(2, 3); //=> false
 *      R.gte('a', 'z'); //=> false
 *      R.gte('z', 'a'); //=> true
 */

var gte =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function gte(a, b) {
  return a >= b;
});

/* harmony default export */ __webpack_exports__["default"] = (gte);

/***/ }),

/***/ "./node_modules/ramda/es/has.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/has.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _hasPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hasPath.js */ "./node_modules/ramda/es/hasPath.js");


/**
 * Returns whether or not an object has an own property with the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      const hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      const point = {x: 0, y: 0};
 *      const pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */

var has =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function has(prop, obj) {
  return Object(_hasPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])([prop], obj);
});

/* harmony default export */ __webpack_exports__["default"] = (has);

/***/ }),

/***/ "./node_modules/ramda/es/hasIn.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/hasIn.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns whether or not an object or its prototype chain has a property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      function Rectangle(width, height) {
 *        this.width = width;
 *        this.height = height;
 *      }
 *      Rectangle.prototype.area = function() {
 *        return this.width * this.height;
 *      };
 *
 *      const square = new Rectangle(2, 2);
 *      R.hasIn('width', square);  //=> true
 *      R.hasIn('area', square);  //=> true
 */

var hasIn =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function hasIn(prop, obj) {
  return prop in obj;
});

/* harmony default export */ __webpack_exports__["default"] = (hasIn);

/***/ }),

/***/ "./node_modules/ramda/es/hasPath.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/hasPath.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _isNil_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isNil.js */ "./node_modules/ramda/es/isNil.js");



/**
 * Returns whether or not a path exists in an object. Only the object's
 * own properties are checked.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array} path The path to use.
 * @param {Object} obj The object to check the path in.
 * @return {Boolean} Whether the path exists.
 * @see R.has
 * @example
 *
 *      R.hasPath(['a', 'b'], {a: {b: 2}});         // => true
 *      R.hasPath(['a', 'b'], {a: {b: undefined}}); // => true
 *      R.hasPath(['a', 'b'], {a: {c: 2}});         // => false
 *      R.hasPath(['a', 'b'], {});                  // => false
 */

var hasPath =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function hasPath(_path, obj) {
  if (_path.length === 0 || Object(_isNil_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj)) {
    return false;
  }

  var val = obj;
  var idx = 0;

  while (idx < _path.length) {
    if (!Object(_isNil_js__WEBPACK_IMPORTED_MODULE_2__["default"])(val) && Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_path[idx], val)) {
      val = val[_path[idx]];
      idx += 1;
    } else {
      return false;
    }
  }

  return true;
});

/* harmony default export */ __webpack_exports__["default"] = (hasPath);

/***/ }),

/***/ "./node_modules/ramda/es/head.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/head.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */

var head =
/*#__PURE__*/
Object(_nth_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0);
/* harmony default export */ __webpack_exports__["default"] = (head);

/***/ }),

/***/ "./node_modules/ramda/es/identical.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/identical.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_objectIs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_objectIs.js */ "./node_modules/ramda/es/internal/_objectIs.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * Note this is merely a curried version of ES6 `Object.is`.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      const o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */

var identical =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_internal_objectIs_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (identical);

/***/ }),

/***/ "./node_modules/ramda/es/identity.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/identity.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_identity.js */ "./node_modules/ramda/es/internal/_identity.js");


/**
 * A function that does nothing but return the parameter supplied to it. Good
 * as a default or placeholder function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig a -> a
 * @param {*} x The value to return.
 * @return {*} The input value, `x`.
 * @example
 *
 *      R.identity(1); //=> 1
 *
 *      const obj = {};
 *      R.identity(obj) === obj; //=> true
 * @symb R.identity(a) = a
 */

var identity =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (identity);

/***/ }),

/***/ "./node_modules/ramda/es/ifElse.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/ifElse.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");


/**
 * Creates a function that will process either the `onTrue` or the `onFalse`
 * function depending upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @see R.unless, R.when, R.cond
 * @example
 *
 *      const incCount = R.ifElse(
 *        R.has('count'),
 *        R.over(R.lensProp('count'), R.inc),
 *        R.assoc('count', 1)
 *      );
 *      incCount({});           //=> { count: 1 }
 *      incCount({ count: 1 }); //=> { count: 2 }
 */

var ifElse =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function ifElse(condition, onTrue, onFalse) {
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
    return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
  });
});

/* harmony default export */ __webpack_exports__["default"] = (ifElse);

/***/ }),

/***/ "./node_modules/ramda/es/inc.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/inc.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add.js */ "./node_modules/ramda/es/add.js");

/**
 * Increments its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number} n + 1
 * @see R.dec
 * @example
 *
 *      R.inc(42); //=> 43
 */

var inc =
/*#__PURE__*/
Object(_add_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1);
/* harmony default export */ __webpack_exports__["default"] = (inc);

/***/ }),

/***/ "./node_modules/ramda/es/includes.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/includes.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includes.js */ "./node_modules/ramda/es/internal/_includes.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 * Works also with strings.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.includes(3, [1, 2, 3]); //=> true
 *      R.includes(4, [1, 2, 3]); //=> false
 *      R.includes({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.includes([42], [[42]]); //=> true
 *      R.includes('ba', 'banana'); //=>true
 */

var includes =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_internal_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (includes);

/***/ }),

/***/ "./node_modules/ramda/es/index.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/index.js ***!
  \****************************************/
/*! exports provided: F, T, __, add, addIndex, adjust, all, allPass, always, and, any, anyPass, ap, aperture, append, apply, applySpec, applyTo, ascend, assoc, assocPath, binary, bind, both, call, chain, clamp, clone, comparator, complement, compose, composeK, composeP, composeWith, concat, cond, construct, constructN, contains, converge, countBy, curry, curryN, dec, defaultTo, descend, difference, differenceWith, dissoc, dissocPath, divide, drop, dropLast, dropLastWhile, dropRepeats, dropRepeatsWith, dropWhile, either, empty, endsWith, eqBy, eqProps, equals, evolve, filter, find, findIndex, findLast, findLastIndex, flatten, flip, forEach, forEachObjIndexed, fromPairs, groupBy, groupWith, gt, gte, has, hasIn, hasPath, head, identical, identity, ifElse, inc, includes, indexBy, indexOf, init, innerJoin, insert, insertAll, intersection, intersperse, into, invert, invertObj, invoker, is, isEmpty, isNil, join, juxt, keys, keysIn, last, lastIndexOf, length, lens, lensIndex, lensPath, lensProp, lift, liftN, lt, lte, map, mapAccum, mapAccumRight, mapObjIndexed, match, mathMod, max, maxBy, mean, median, memoizeWith, merge, mergeAll, mergeDeepLeft, mergeDeepRight, mergeDeepWith, mergeDeepWithKey, mergeLeft, mergeRight, mergeWith, mergeWithKey, min, minBy, modulo, move, multiply, nAry, negate, none, not, nth, nthArg, o, objOf, of, omit, once, or, otherwise, over, pair, partial, partialRight, partition, path, paths, pathEq, pathOr, pathSatisfies, pick, pickAll, pickBy, pipe, pipeK, pipeP, pipeWith, pluck, prepend, product, project, prop, propEq, propIs, propOr, propSatisfies, props, range, reduce, reduceBy, reduceRight, reduceWhile, reduced, reject, remove, repeat, replace, reverse, scan, sequence, set, slice, sort, sortBy, sortWith, split, splitAt, splitEvery, splitWhen, startsWith, subtract, sum, symmetricDifference, symmetricDifferenceWith, tail, take, takeLast, takeLastWhile, takeWhile, tap, test, andThen, times, toLower, toPairs, toPairsIn, toString, toUpper, transduce, transpose, traverse, trim, tryCatch, type, unapply, unary, uncurryN, unfold, union, unionWith, uniq, uniqBy, uniqWith, unless, unnest, until, update, useWith, values, valuesIn, view, when, where, whereEq, without, xor, xprod, zip, zipObj, zipWith, thunkify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _F_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./F.js */ "./node_modules/ramda/es/F.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "F", function() { return _F_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _T_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./T.js */ "./node_modules/ramda/es/T.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "T", function() { return _T_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./__.js */ "./node_modules/ramda/es/__.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__", function() { return _js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./add.js */ "./node_modules/ramda/es/add.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "add", function() { return _add_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _addIndex_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addIndex.js */ "./node_modules/ramda/es/addIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addIndex", function() { return _addIndex_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _adjust_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./adjust.js */ "./node_modules/ramda/es/adjust.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "adjust", function() { return _adjust_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _all_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./all.js */ "./node_modules/ramda/es/all.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "all", function() { return _all_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _allPass_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./allPass.js */ "./node_modules/ramda/es/allPass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "allPass", function() { return _allPass_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _always_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./always.js */ "./node_modules/ramda/es/always.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "always", function() { return _always_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _and_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./and.js */ "./node_modules/ramda/es/and.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "and", function() { return _and_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _any_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./any.js */ "./node_modules/ramda/es/any.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "any", function() { return _any_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _anyPass_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./anyPass.js */ "./node_modules/ramda/es/anyPass.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "anyPass", function() { return _anyPass_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _ap_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ap.js */ "./node_modules/ramda/es/ap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ap", function() { return _ap_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _aperture_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./aperture.js */ "./node_modules/ramda/es/aperture.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "aperture", function() { return _aperture_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _append_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./append.js */ "./node_modules/ramda/es/append.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "append", function() { return _append_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _apply_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./apply.js */ "./node_modules/ramda/es/apply.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return _apply_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _applySpec_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./applySpec.js */ "./node_modules/ramda/es/applySpec.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applySpec", function() { return _applySpec_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _applyTo_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./applyTo.js */ "./node_modules/ramda/es/applyTo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "applyTo", function() { return _applyTo_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _ascend_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ascend.js */ "./node_modules/ramda/es/ascend.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ascend", function() { return _ascend_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _assoc_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./assoc.js */ "./node_modules/ramda/es/assoc.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assoc", function() { return _assoc_js__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _assocPath_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./assocPath.js */ "./node_modules/ramda/es/assocPath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "assocPath", function() { return _assocPath_js__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _binary_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./binary.js */ "./node_modules/ramda/es/binary.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "binary", function() { return _binary_js__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./bind.js */ "./node_modules/ramda/es/bind.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return _bind_js__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _both_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./both.js */ "./node_modules/ramda/es/both.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "both", function() { return _both_js__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _call_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./call.js */ "./node_modules/ramda/es/call.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "call", function() { return _call_js__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _chain_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./chain.js */ "./node_modules/ramda/es/chain.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "chain", function() { return _chain_js__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _clamp_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./clamp.js */ "./node_modules/ramda/es/clamp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _clamp_js__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _clone_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./clone.js */ "./node_modules/ramda/es/clone.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clone", function() { return _clone_js__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _comparator_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./comparator.js */ "./node_modules/ramda/es/comparator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "comparator", function() { return _comparator_js__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _complement_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./complement.js */ "./node_modules/ramda/es/complement.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "complement", function() { return _complement_js__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./compose.js */ "./node_modules/ramda/es/compose.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return _compose_js__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony import */ var _composeK_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./composeK.js */ "./node_modules/ramda/es/composeK.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "composeK", function() { return _composeK_js__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony import */ var _composeP_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./composeP.js */ "./node_modules/ramda/es/composeP.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "composeP", function() { return _composeP_js__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony import */ var _composeWith_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./composeWith.js */ "./node_modules/ramda/es/composeWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "composeWith", function() { return _composeWith_js__WEBPACK_IMPORTED_MODULE_33__["default"]; });

/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./concat.js */ "./node_modules/ramda/es/concat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "concat", function() { return _concat_js__WEBPACK_IMPORTED_MODULE_34__["default"]; });

/* harmony import */ var _cond_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./cond.js */ "./node_modules/ramda/es/cond.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cond", function() { return _cond_js__WEBPACK_IMPORTED_MODULE_35__["default"]; });

/* harmony import */ var _construct_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./construct.js */ "./node_modules/ramda/es/construct.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "construct", function() { return _construct_js__WEBPACK_IMPORTED_MODULE_36__["default"]; });

/* harmony import */ var _constructN_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./constructN.js */ "./node_modules/ramda/es/constructN.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "constructN", function() { return _constructN_js__WEBPACK_IMPORTED_MODULE_37__["default"]; });

/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./contains.js */ "./node_modules/ramda/es/contains.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "contains", function() { return _contains_js__WEBPACK_IMPORTED_MODULE_38__["default"]; });

/* harmony import */ var _converge_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./converge.js */ "./node_modules/ramda/es/converge.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "converge", function() { return _converge_js__WEBPACK_IMPORTED_MODULE_39__["default"]; });

/* harmony import */ var _countBy_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./countBy.js */ "./node_modules/ramda/es/countBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "countBy", function() { return _countBy_js__WEBPACK_IMPORTED_MODULE_40__["default"]; });

/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./curry.js */ "./node_modules/ramda/es/curry.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curry", function() { return _curry_js__WEBPACK_IMPORTED_MODULE_41__["default"]; });

/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curryN", function() { return _curryN_js__WEBPACK_IMPORTED_MODULE_42__["default"]; });

/* harmony import */ var _dec_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./dec.js */ "./node_modules/ramda/es/dec.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dec", function() { return _dec_js__WEBPACK_IMPORTED_MODULE_43__["default"]; });

/* harmony import */ var _defaultTo_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./defaultTo.js */ "./node_modules/ramda/es/defaultTo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultTo", function() { return _defaultTo_js__WEBPACK_IMPORTED_MODULE_44__["default"]; });

/* harmony import */ var _descend_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./descend.js */ "./node_modules/ramda/es/descend.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "descend", function() { return _descend_js__WEBPACK_IMPORTED_MODULE_45__["default"]; });

/* harmony import */ var _difference_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./difference.js */ "./node_modules/ramda/es/difference.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "difference", function() { return _difference_js__WEBPACK_IMPORTED_MODULE_46__["default"]; });

/* harmony import */ var _differenceWith_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./differenceWith.js */ "./node_modules/ramda/es/differenceWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "differenceWith", function() { return _differenceWith_js__WEBPACK_IMPORTED_MODULE_47__["default"]; });

/* harmony import */ var _dissoc_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./dissoc.js */ "./node_modules/ramda/es/dissoc.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dissoc", function() { return _dissoc_js__WEBPACK_IMPORTED_MODULE_48__["default"]; });

/* harmony import */ var _dissocPath_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./dissocPath.js */ "./node_modules/ramda/es/dissocPath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dissocPath", function() { return _dissocPath_js__WEBPACK_IMPORTED_MODULE_49__["default"]; });

/* harmony import */ var _divide_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./divide.js */ "./node_modules/ramda/es/divide.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return _divide_js__WEBPACK_IMPORTED_MODULE_50__["default"]; });

/* harmony import */ var _drop_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./drop.js */ "./node_modules/ramda/es/drop.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drop", function() { return _drop_js__WEBPACK_IMPORTED_MODULE_51__["default"]; });

/* harmony import */ var _dropLast_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./dropLast.js */ "./node_modules/ramda/es/dropLast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dropLast", function() { return _dropLast_js__WEBPACK_IMPORTED_MODULE_52__["default"]; });

/* harmony import */ var _dropLastWhile_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./dropLastWhile.js */ "./node_modules/ramda/es/dropLastWhile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dropLastWhile", function() { return _dropLastWhile_js__WEBPACK_IMPORTED_MODULE_53__["default"]; });

/* harmony import */ var _dropRepeats_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./dropRepeats.js */ "./node_modules/ramda/es/dropRepeats.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dropRepeats", function() { return _dropRepeats_js__WEBPACK_IMPORTED_MODULE_54__["default"]; });

/* harmony import */ var _dropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./dropRepeatsWith.js */ "./node_modules/ramda/es/dropRepeatsWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dropRepeatsWith", function() { return _dropRepeatsWith_js__WEBPACK_IMPORTED_MODULE_55__["default"]; });

/* harmony import */ var _dropWhile_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./dropWhile.js */ "./node_modules/ramda/es/dropWhile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dropWhile", function() { return _dropWhile_js__WEBPACK_IMPORTED_MODULE_56__["default"]; });

/* harmony import */ var _either_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./either.js */ "./node_modules/ramda/es/either.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "either", function() { return _either_js__WEBPACK_IMPORTED_MODULE_57__["default"]; });

/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./empty.js */ "./node_modules/ramda/es/empty.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "empty", function() { return _empty_js__WEBPACK_IMPORTED_MODULE_58__["default"]; });

/* harmony import */ var _endsWith_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./endsWith.js */ "./node_modules/ramda/es/endsWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "endsWith", function() { return _endsWith_js__WEBPACK_IMPORTED_MODULE_59__["default"]; });

/* harmony import */ var _eqBy_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./eqBy.js */ "./node_modules/ramda/es/eqBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eqBy", function() { return _eqBy_js__WEBPACK_IMPORTED_MODULE_60__["default"]; });

/* harmony import */ var _eqProps_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./eqProps.js */ "./node_modules/ramda/es/eqProps.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "eqProps", function() { return _eqProps_js__WEBPACK_IMPORTED_MODULE_61__["default"]; });

/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "equals", function() { return _equals_js__WEBPACK_IMPORTED_MODULE_62__["default"]; });

/* harmony import */ var _evolve_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./evolve.js */ "./node_modules/ramda/es/evolve.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "evolve", function() { return _evolve_js__WEBPACK_IMPORTED_MODULE_63__["default"]; });

/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./filter.js */ "./node_modules/ramda/es/filter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return _filter_js__WEBPACK_IMPORTED_MODULE_64__["default"]; });

/* harmony import */ var _find_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./find.js */ "./node_modules/ramda/es/find.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "find", function() { return _find_js__WEBPACK_IMPORTED_MODULE_65__["default"]; });

/* harmony import */ var _findIndex_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./findIndex.js */ "./node_modules/ramda/es/findIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return _findIndex_js__WEBPACK_IMPORTED_MODULE_66__["default"]; });

/* harmony import */ var _findLast_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./findLast.js */ "./node_modules/ramda/es/findLast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findLast", function() { return _findLast_js__WEBPACK_IMPORTED_MODULE_67__["default"]; });

/* harmony import */ var _findLastIndex_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./findLastIndex.js */ "./node_modules/ramda/es/findLastIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findLastIndex", function() { return _findLastIndex_js__WEBPACK_IMPORTED_MODULE_68__["default"]; });

/* harmony import */ var _flatten_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./flatten.js */ "./node_modules/ramda/es/flatten.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return _flatten_js__WEBPACK_IMPORTED_MODULE_69__["default"]; });

/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./flip.js */ "./node_modules/ramda/es/flip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flip", function() { return _flip_js__WEBPACK_IMPORTED_MODULE_70__["default"]; });

/* harmony import */ var _forEach_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./forEach.js */ "./node_modules/ramda/es/forEach.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return _forEach_js__WEBPACK_IMPORTED_MODULE_71__["default"]; });

/* harmony import */ var _forEachObjIndexed_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./forEachObjIndexed.js */ "./node_modules/ramda/es/forEachObjIndexed.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forEachObjIndexed", function() { return _forEachObjIndexed_js__WEBPACK_IMPORTED_MODULE_72__["default"]; });

/* harmony import */ var _fromPairs_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./fromPairs.js */ "./node_modules/ramda/es/fromPairs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fromPairs", function() { return _fromPairs_js__WEBPACK_IMPORTED_MODULE_73__["default"]; });

/* harmony import */ var _groupBy_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./groupBy.js */ "./node_modules/ramda/es/groupBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "groupBy", function() { return _groupBy_js__WEBPACK_IMPORTED_MODULE_74__["default"]; });

/* harmony import */ var _groupWith_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./groupWith.js */ "./node_modules/ramda/es/groupWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "groupWith", function() { return _groupWith_js__WEBPACK_IMPORTED_MODULE_75__["default"]; });

/* harmony import */ var _gt_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./gt.js */ "./node_modules/ramda/es/gt.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "gt", function() { return _gt_js__WEBPACK_IMPORTED_MODULE_76__["default"]; });

/* harmony import */ var _gte_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./gte.js */ "./node_modules/ramda/es/gte.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "gte", function() { return _gte_js__WEBPACK_IMPORTED_MODULE_77__["default"]; });

/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./has.js */ "./node_modules/ramda/es/has.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "has", function() { return _has_js__WEBPACK_IMPORTED_MODULE_78__["default"]; });

/* harmony import */ var _hasIn_js__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./hasIn.js */ "./node_modules/ramda/es/hasIn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasIn", function() { return _hasIn_js__WEBPACK_IMPORTED_MODULE_79__["default"]; });

/* harmony import */ var _hasPath_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./hasPath.js */ "./node_modules/ramda/es/hasPath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasPath", function() { return _hasPath_js__WEBPACK_IMPORTED_MODULE_80__["default"]; });

/* harmony import */ var _head_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./head.js */ "./node_modules/ramda/es/head.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "head", function() { return _head_js__WEBPACK_IMPORTED_MODULE_81__["default"]; });

/* harmony import */ var _identical_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./identical.js */ "./node_modules/ramda/es/identical.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "identical", function() { return _identical_js__WEBPACK_IMPORTED_MODULE_82__["default"]; });

/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./identity.js */ "./node_modules/ramda/es/identity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return _identity_js__WEBPACK_IMPORTED_MODULE_83__["default"]; });

/* harmony import */ var _ifElse_js__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./ifElse.js */ "./node_modules/ramda/es/ifElse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ifElse", function() { return _ifElse_js__WEBPACK_IMPORTED_MODULE_84__["default"]; });

/* harmony import */ var _inc_js__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./inc.js */ "./node_modules/ramda/es/inc.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "inc", function() { return _inc_js__WEBPACK_IMPORTED_MODULE_85__["default"]; });

/* harmony import */ var _includes_js__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./includes.js */ "./node_modules/ramda/es/includes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "includes", function() { return _includes_js__WEBPACK_IMPORTED_MODULE_86__["default"]; });

/* harmony import */ var _indexBy_js__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./indexBy.js */ "./node_modules/ramda/es/indexBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "indexBy", function() { return _indexBy_js__WEBPACK_IMPORTED_MODULE_87__["default"]; });

/* harmony import */ var _indexOf_js__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./indexOf.js */ "./node_modules/ramda/es/indexOf.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "indexOf", function() { return _indexOf_js__WEBPACK_IMPORTED_MODULE_88__["default"]; });

/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./init.js */ "./node_modules/ramda/es/init.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "init", function() { return _init_js__WEBPACK_IMPORTED_MODULE_89__["default"]; });

/* harmony import */ var _innerJoin_js__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./innerJoin.js */ "./node_modules/ramda/es/innerJoin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "innerJoin", function() { return _innerJoin_js__WEBPACK_IMPORTED_MODULE_90__["default"]; });

/* harmony import */ var _insert_js__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./insert.js */ "./node_modules/ramda/es/insert.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "insert", function() { return _insert_js__WEBPACK_IMPORTED_MODULE_91__["default"]; });

/* harmony import */ var _insertAll_js__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./insertAll.js */ "./node_modules/ramda/es/insertAll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "insertAll", function() { return _insertAll_js__WEBPACK_IMPORTED_MODULE_92__["default"]; });

/* harmony import */ var _intersection_js__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./intersection.js */ "./node_modules/ramda/es/intersection.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intersection", function() { return _intersection_js__WEBPACK_IMPORTED_MODULE_93__["default"]; });

/* harmony import */ var _intersperse_js__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./intersperse.js */ "./node_modules/ramda/es/intersperse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "intersperse", function() { return _intersperse_js__WEBPACK_IMPORTED_MODULE_94__["default"]; });

/* harmony import */ var _into_js__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./into.js */ "./node_modules/ramda/es/into.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "into", function() { return _into_js__WEBPACK_IMPORTED_MODULE_95__["default"]; });

/* harmony import */ var _invert_js__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./invert.js */ "./node_modules/ramda/es/invert.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invert", function() { return _invert_js__WEBPACK_IMPORTED_MODULE_96__["default"]; });

/* harmony import */ var _invertObj_js__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./invertObj.js */ "./node_modules/ramda/es/invertObj.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invertObj", function() { return _invertObj_js__WEBPACK_IMPORTED_MODULE_97__["default"]; });

/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./invoker.js */ "./node_modules/ramda/es/invoker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "invoker", function() { return _invoker_js__WEBPACK_IMPORTED_MODULE_98__["default"]; });

/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./is.js */ "./node_modules/ramda/es/is.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "is", function() { return _is_js__WEBPACK_IMPORTED_MODULE_99__["default"]; });

/* harmony import */ var _isEmpty_js__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./isEmpty.js */ "./node_modules/ramda/es/isEmpty.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return _isEmpty_js__WEBPACK_IMPORTED_MODULE_100__["default"]; });

/* harmony import */ var _isNil_js__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./isNil.js */ "./node_modules/ramda/es/isNil.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNil", function() { return _isNil_js__WEBPACK_IMPORTED_MODULE_101__["default"]; });

/* harmony import */ var _join_js__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./join.js */ "./node_modules/ramda/es/join.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "join", function() { return _join_js__WEBPACK_IMPORTED_MODULE_102__["default"]; });

/* harmony import */ var _juxt_js__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./juxt.js */ "./node_modules/ramda/es/juxt.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "juxt", function() { return _juxt_js__WEBPACK_IMPORTED_MODULE_103__["default"]; });

/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return _keys_js__WEBPACK_IMPORTED_MODULE_104__["default"]; });

/* harmony import */ var _keysIn_js__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./keysIn.js */ "./node_modules/ramda/es/keysIn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "keysIn", function() { return _keysIn_js__WEBPACK_IMPORTED_MODULE_105__["default"]; });

/* harmony import */ var _last_js__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./last.js */ "./node_modules/ramda/es/last.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "last", function() { return _last_js__WEBPACK_IMPORTED_MODULE_106__["default"]; });

/* harmony import */ var _lastIndexOf_js__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./lastIndexOf.js */ "./node_modules/ramda/es/lastIndexOf.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lastIndexOf", function() { return _lastIndexOf_js__WEBPACK_IMPORTED_MODULE_107__["default"]; });

/* harmony import */ var _length_js__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./length.js */ "./node_modules/ramda/es/length.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "length", function() { return _length_js__WEBPACK_IMPORTED_MODULE_108__["default"]; });

/* harmony import */ var _lens_js__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./lens.js */ "./node_modules/ramda/es/lens.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lens", function() { return _lens_js__WEBPACK_IMPORTED_MODULE_109__["default"]; });

/* harmony import */ var _lensIndex_js__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./lensIndex.js */ "./node_modules/ramda/es/lensIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lensIndex", function() { return _lensIndex_js__WEBPACK_IMPORTED_MODULE_110__["default"]; });

/* harmony import */ var _lensPath_js__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./lensPath.js */ "./node_modules/ramda/es/lensPath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lensPath", function() { return _lensPath_js__WEBPACK_IMPORTED_MODULE_111__["default"]; });

/* harmony import */ var _lensProp_js__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./lensProp.js */ "./node_modules/ramda/es/lensProp.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lensProp", function() { return _lensProp_js__WEBPACK_IMPORTED_MODULE_112__["default"]; });

/* harmony import */ var _lift_js__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./lift.js */ "./node_modules/ramda/es/lift.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lift", function() { return _lift_js__WEBPACK_IMPORTED_MODULE_113__["default"]; });

/* harmony import */ var _liftN_js__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./liftN.js */ "./node_modules/ramda/es/liftN.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "liftN", function() { return _liftN_js__WEBPACK_IMPORTED_MODULE_114__["default"]; });

/* harmony import */ var _lt_js__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./lt.js */ "./node_modules/ramda/es/lt.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lt", function() { return _lt_js__WEBPACK_IMPORTED_MODULE_115__["default"]; });

/* harmony import */ var _lte_js__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./lte.js */ "./node_modules/ramda/es/lte.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lte", function() { return _lte_js__WEBPACK_IMPORTED_MODULE_116__["default"]; });

/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "map", function() { return _map_js__WEBPACK_IMPORTED_MODULE_117__["default"]; });

/* harmony import */ var _mapAccum_js__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./mapAccum.js */ "./node_modules/ramda/es/mapAccum.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapAccum", function() { return _mapAccum_js__WEBPACK_IMPORTED_MODULE_118__["default"]; });

/* harmony import */ var _mapAccumRight_js__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./mapAccumRight.js */ "./node_modules/ramda/es/mapAccumRight.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapAccumRight", function() { return _mapAccumRight_js__WEBPACK_IMPORTED_MODULE_119__["default"]; });

/* harmony import */ var _mapObjIndexed_js__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./mapObjIndexed.js */ "./node_modules/ramda/es/mapObjIndexed.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapObjIndexed", function() { return _mapObjIndexed_js__WEBPACK_IMPORTED_MODULE_120__["default"]; });

/* harmony import */ var _match_js__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./match.js */ "./node_modules/ramda/es/match.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "match", function() { return _match_js__WEBPACK_IMPORTED_MODULE_121__["default"]; });

/* harmony import */ var _mathMod_js__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./mathMod.js */ "./node_modules/ramda/es/mathMod.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mathMod", function() { return _mathMod_js__WEBPACK_IMPORTED_MODULE_122__["default"]; });

/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./max.js */ "./node_modules/ramda/es/max.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "max", function() { return _max_js__WEBPACK_IMPORTED_MODULE_123__["default"]; });

/* harmony import */ var _maxBy_js__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./maxBy.js */ "./node_modules/ramda/es/maxBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "maxBy", function() { return _maxBy_js__WEBPACK_IMPORTED_MODULE_124__["default"]; });

/* harmony import */ var _mean_js__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./mean.js */ "./node_modules/ramda/es/mean.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mean", function() { return _mean_js__WEBPACK_IMPORTED_MODULE_125__["default"]; });

/* harmony import */ var _median_js__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! ./median.js */ "./node_modules/ramda/es/median.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "median", function() { return _median_js__WEBPACK_IMPORTED_MODULE_126__["default"]; });

/* harmony import */ var _memoizeWith_js__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! ./memoizeWith.js */ "./node_modules/ramda/es/memoizeWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "memoizeWith", function() { return _memoizeWith_js__WEBPACK_IMPORTED_MODULE_127__["default"]; });

/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! ./merge.js */ "./node_modules/ramda/es/merge.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return _merge_js__WEBPACK_IMPORTED_MODULE_128__["default"]; });

/* harmony import */ var _mergeAll_js__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! ./mergeAll.js */ "./node_modules/ramda/es/mergeAll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeAll", function() { return _mergeAll_js__WEBPACK_IMPORTED_MODULE_129__["default"]; });

/* harmony import */ var _mergeDeepLeft_js__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! ./mergeDeepLeft.js */ "./node_modules/ramda/es/mergeDeepLeft.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeDeepLeft", function() { return _mergeDeepLeft_js__WEBPACK_IMPORTED_MODULE_130__["default"]; });

/* harmony import */ var _mergeDeepRight_js__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! ./mergeDeepRight.js */ "./node_modules/ramda/es/mergeDeepRight.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeDeepRight", function() { return _mergeDeepRight_js__WEBPACK_IMPORTED_MODULE_131__["default"]; });

/* harmony import */ var _mergeDeepWith_js__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! ./mergeDeepWith.js */ "./node_modules/ramda/es/mergeDeepWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeDeepWith", function() { return _mergeDeepWith_js__WEBPACK_IMPORTED_MODULE_132__["default"]; });

/* harmony import */ var _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! ./mergeDeepWithKey.js */ "./node_modules/ramda/es/mergeDeepWithKey.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeDeepWithKey", function() { return _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_133__["default"]; });

/* harmony import */ var _mergeLeft_js__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! ./mergeLeft.js */ "./node_modules/ramda/es/mergeLeft.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeLeft", function() { return _mergeLeft_js__WEBPACK_IMPORTED_MODULE_134__["default"]; });

/* harmony import */ var _mergeRight_js__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! ./mergeRight.js */ "./node_modules/ramda/es/mergeRight.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeRight", function() { return _mergeRight_js__WEBPACK_IMPORTED_MODULE_135__["default"]; });

/* harmony import */ var _mergeWith_js__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! ./mergeWith.js */ "./node_modules/ramda/es/mergeWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeWith", function() { return _mergeWith_js__WEBPACK_IMPORTED_MODULE_136__["default"]; });

/* harmony import */ var _mergeWithKey_js__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(/*! ./mergeWithKey.js */ "./node_modules/ramda/es/mergeWithKey.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mergeWithKey", function() { return _mergeWithKey_js__WEBPACK_IMPORTED_MODULE_137__["default"]; });

/* harmony import */ var _min_js__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(/*! ./min.js */ "./node_modules/ramda/es/min.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "min", function() { return _min_js__WEBPACK_IMPORTED_MODULE_138__["default"]; });

/* harmony import */ var _minBy_js__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(/*! ./minBy.js */ "./node_modules/ramda/es/minBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "minBy", function() { return _minBy_js__WEBPACK_IMPORTED_MODULE_139__["default"]; });

/* harmony import */ var _modulo_js__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(/*! ./modulo.js */ "./node_modules/ramda/es/modulo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "modulo", function() { return _modulo_js__WEBPACK_IMPORTED_MODULE_140__["default"]; });

/* harmony import */ var _move_js__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(/*! ./move.js */ "./node_modules/ramda/es/move.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "move", function() { return _move_js__WEBPACK_IMPORTED_MODULE_141__["default"]; });

/* harmony import */ var _multiply_js__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(/*! ./multiply.js */ "./node_modules/ramda/es/multiply.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return _multiply_js__WEBPACK_IMPORTED_MODULE_142__["default"]; });

/* harmony import */ var _nAry_js__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(/*! ./nAry.js */ "./node_modules/ramda/es/nAry.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nAry", function() { return _nAry_js__WEBPACK_IMPORTED_MODULE_143__["default"]; });

/* harmony import */ var _negate_js__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(/*! ./negate.js */ "./node_modules/ramda/es/negate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return _negate_js__WEBPACK_IMPORTED_MODULE_144__["default"]; });

/* harmony import */ var _none_js__WEBPACK_IMPORTED_MODULE_145__ = __webpack_require__(/*! ./none.js */ "./node_modules/ramda/es/none.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "none", function() { return _none_js__WEBPACK_IMPORTED_MODULE_145__["default"]; });

/* harmony import */ var _not_js__WEBPACK_IMPORTED_MODULE_146__ = __webpack_require__(/*! ./not.js */ "./node_modules/ramda/es/not.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "not", function() { return _not_js__WEBPACK_IMPORTED_MODULE_146__["default"]; });

/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_147__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nth", function() { return _nth_js__WEBPACK_IMPORTED_MODULE_147__["default"]; });

/* harmony import */ var _nthArg_js__WEBPACK_IMPORTED_MODULE_148__ = __webpack_require__(/*! ./nthArg.js */ "./node_modules/ramda/es/nthArg.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "nthArg", function() { return _nthArg_js__WEBPACK_IMPORTED_MODULE_148__["default"]; });

/* harmony import */ var _o_js__WEBPACK_IMPORTED_MODULE_149__ = __webpack_require__(/*! ./o.js */ "./node_modules/ramda/es/o.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "o", function() { return _o_js__WEBPACK_IMPORTED_MODULE_149__["default"]; });

/* harmony import */ var _objOf_js__WEBPACK_IMPORTED_MODULE_150__ = __webpack_require__(/*! ./objOf.js */ "./node_modules/ramda/es/objOf.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "objOf", function() { return _objOf_js__WEBPACK_IMPORTED_MODULE_150__["default"]; });

/* harmony import */ var _of_js__WEBPACK_IMPORTED_MODULE_151__ = __webpack_require__(/*! ./of.js */ "./node_modules/ramda/es/of.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "of", function() { return _of_js__WEBPACK_IMPORTED_MODULE_151__["default"]; });

/* harmony import */ var _omit_js__WEBPACK_IMPORTED_MODULE_152__ = __webpack_require__(/*! ./omit.js */ "./node_modules/ramda/es/omit.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "omit", function() { return _omit_js__WEBPACK_IMPORTED_MODULE_152__["default"]; });

/* harmony import */ var _once_js__WEBPACK_IMPORTED_MODULE_153__ = __webpack_require__(/*! ./once.js */ "./node_modules/ramda/es/once.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "once", function() { return _once_js__WEBPACK_IMPORTED_MODULE_153__["default"]; });

/* harmony import */ var _or_js__WEBPACK_IMPORTED_MODULE_154__ = __webpack_require__(/*! ./or.js */ "./node_modules/ramda/es/or.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "or", function() { return _or_js__WEBPACK_IMPORTED_MODULE_154__["default"]; });

/* harmony import */ var _otherwise_js__WEBPACK_IMPORTED_MODULE_155__ = __webpack_require__(/*! ./otherwise.js */ "./node_modules/ramda/es/otherwise.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "otherwise", function() { return _otherwise_js__WEBPACK_IMPORTED_MODULE_155__["default"]; });

/* harmony import */ var _over_js__WEBPACK_IMPORTED_MODULE_156__ = __webpack_require__(/*! ./over.js */ "./node_modules/ramda/es/over.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "over", function() { return _over_js__WEBPACK_IMPORTED_MODULE_156__["default"]; });

/* harmony import */ var _pair_js__WEBPACK_IMPORTED_MODULE_157__ = __webpack_require__(/*! ./pair.js */ "./node_modules/ramda/es/pair.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pair", function() { return _pair_js__WEBPACK_IMPORTED_MODULE_157__["default"]; });

/* harmony import */ var _partial_js__WEBPACK_IMPORTED_MODULE_158__ = __webpack_require__(/*! ./partial.js */ "./node_modules/ramda/es/partial.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "partial", function() { return _partial_js__WEBPACK_IMPORTED_MODULE_158__["default"]; });

/* harmony import */ var _partialRight_js__WEBPACK_IMPORTED_MODULE_159__ = __webpack_require__(/*! ./partialRight.js */ "./node_modules/ramda/es/partialRight.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "partialRight", function() { return _partialRight_js__WEBPACK_IMPORTED_MODULE_159__["default"]; });

/* harmony import */ var _partition_js__WEBPACK_IMPORTED_MODULE_160__ = __webpack_require__(/*! ./partition.js */ "./node_modules/ramda/es/partition.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "partition", function() { return _partition_js__WEBPACK_IMPORTED_MODULE_160__["default"]; });

/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_161__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "path", function() { return _path_js__WEBPACK_IMPORTED_MODULE_161__["default"]; });

/* harmony import */ var _paths_js__WEBPACK_IMPORTED_MODULE_162__ = __webpack_require__(/*! ./paths.js */ "./node_modules/ramda/es/paths.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "paths", function() { return _paths_js__WEBPACK_IMPORTED_MODULE_162__["default"]; });

/* harmony import */ var _pathEq_js__WEBPACK_IMPORTED_MODULE_163__ = __webpack_require__(/*! ./pathEq.js */ "./node_modules/ramda/es/pathEq.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pathEq", function() { return _pathEq_js__WEBPACK_IMPORTED_MODULE_163__["default"]; });

/* harmony import */ var _pathOr_js__WEBPACK_IMPORTED_MODULE_164__ = __webpack_require__(/*! ./pathOr.js */ "./node_modules/ramda/es/pathOr.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pathOr", function() { return _pathOr_js__WEBPACK_IMPORTED_MODULE_164__["default"]; });

/* harmony import */ var _pathSatisfies_js__WEBPACK_IMPORTED_MODULE_165__ = __webpack_require__(/*! ./pathSatisfies.js */ "./node_modules/ramda/es/pathSatisfies.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pathSatisfies", function() { return _pathSatisfies_js__WEBPACK_IMPORTED_MODULE_165__["default"]; });

/* harmony import */ var _pick_js__WEBPACK_IMPORTED_MODULE_166__ = __webpack_require__(/*! ./pick.js */ "./node_modules/ramda/es/pick.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return _pick_js__WEBPACK_IMPORTED_MODULE_166__["default"]; });

/* harmony import */ var _pickAll_js__WEBPACK_IMPORTED_MODULE_167__ = __webpack_require__(/*! ./pickAll.js */ "./node_modules/ramda/es/pickAll.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pickAll", function() { return _pickAll_js__WEBPACK_IMPORTED_MODULE_167__["default"]; });

/* harmony import */ var _pickBy_js__WEBPACK_IMPORTED_MODULE_168__ = __webpack_require__(/*! ./pickBy.js */ "./node_modules/ramda/es/pickBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pickBy", function() { return _pickBy_js__WEBPACK_IMPORTED_MODULE_168__["default"]; });

/* harmony import */ var _pipe_js__WEBPACK_IMPORTED_MODULE_169__ = __webpack_require__(/*! ./pipe.js */ "./node_modules/ramda/es/pipe.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return _pipe_js__WEBPACK_IMPORTED_MODULE_169__["default"]; });

/* harmony import */ var _pipeK_js__WEBPACK_IMPORTED_MODULE_170__ = __webpack_require__(/*! ./pipeK.js */ "./node_modules/ramda/es/pipeK.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipeK", function() { return _pipeK_js__WEBPACK_IMPORTED_MODULE_170__["default"]; });

/* harmony import */ var _pipeP_js__WEBPACK_IMPORTED_MODULE_171__ = __webpack_require__(/*! ./pipeP.js */ "./node_modules/ramda/es/pipeP.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipeP", function() { return _pipeP_js__WEBPACK_IMPORTED_MODULE_171__["default"]; });

/* harmony import */ var _pipeWith_js__WEBPACK_IMPORTED_MODULE_172__ = __webpack_require__(/*! ./pipeWith.js */ "./node_modules/ramda/es/pipeWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pipeWith", function() { return _pipeWith_js__WEBPACK_IMPORTED_MODULE_172__["default"]; });

/* harmony import */ var _pluck_js__WEBPACK_IMPORTED_MODULE_173__ = __webpack_require__(/*! ./pluck.js */ "./node_modules/ramda/es/pluck.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pluck", function() { return _pluck_js__WEBPACK_IMPORTED_MODULE_173__["default"]; });

/* harmony import */ var _prepend_js__WEBPACK_IMPORTED_MODULE_174__ = __webpack_require__(/*! ./prepend.js */ "./node_modules/ramda/es/prepend.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prepend", function() { return _prepend_js__WEBPACK_IMPORTED_MODULE_174__["default"]; });

/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_175__ = __webpack_require__(/*! ./product.js */ "./node_modules/ramda/es/product.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "product", function() { return _product_js__WEBPACK_IMPORTED_MODULE_175__["default"]; });

/* harmony import */ var _project_js__WEBPACK_IMPORTED_MODULE_176__ = __webpack_require__(/*! ./project.js */ "./node_modules/ramda/es/project.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "project", function() { return _project_js__WEBPACK_IMPORTED_MODULE_176__["default"]; });

/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_177__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/es/prop.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "prop", function() { return _prop_js__WEBPACK_IMPORTED_MODULE_177__["default"]; });

/* harmony import */ var _propEq_js__WEBPACK_IMPORTED_MODULE_178__ = __webpack_require__(/*! ./propEq.js */ "./node_modules/ramda/es/propEq.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "propEq", function() { return _propEq_js__WEBPACK_IMPORTED_MODULE_178__["default"]; });

/* harmony import */ var _propIs_js__WEBPACK_IMPORTED_MODULE_179__ = __webpack_require__(/*! ./propIs.js */ "./node_modules/ramda/es/propIs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "propIs", function() { return _propIs_js__WEBPACK_IMPORTED_MODULE_179__["default"]; });

/* harmony import */ var _propOr_js__WEBPACK_IMPORTED_MODULE_180__ = __webpack_require__(/*! ./propOr.js */ "./node_modules/ramda/es/propOr.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "propOr", function() { return _propOr_js__WEBPACK_IMPORTED_MODULE_180__["default"]; });

/* harmony import */ var _propSatisfies_js__WEBPACK_IMPORTED_MODULE_181__ = __webpack_require__(/*! ./propSatisfies.js */ "./node_modules/ramda/es/propSatisfies.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "propSatisfies", function() { return _propSatisfies_js__WEBPACK_IMPORTED_MODULE_181__["default"]; });

/* harmony import */ var _props_js__WEBPACK_IMPORTED_MODULE_182__ = __webpack_require__(/*! ./props.js */ "./node_modules/ramda/es/props.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "props", function() { return _props_js__WEBPACK_IMPORTED_MODULE_182__["default"]; });

/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_183__ = __webpack_require__(/*! ./range.js */ "./node_modules/ramda/es/range.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "range", function() { return _range_js__WEBPACK_IMPORTED_MODULE_183__["default"]; });

/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_184__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return _reduce_js__WEBPACK_IMPORTED_MODULE_184__["default"]; });

/* harmony import */ var _reduceBy_js__WEBPACK_IMPORTED_MODULE_185__ = __webpack_require__(/*! ./reduceBy.js */ "./node_modules/ramda/es/reduceBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reduceBy", function() { return _reduceBy_js__WEBPACK_IMPORTED_MODULE_185__["default"]; });

/* harmony import */ var _reduceRight_js__WEBPACK_IMPORTED_MODULE_186__ = __webpack_require__(/*! ./reduceRight.js */ "./node_modules/ramda/es/reduceRight.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reduceRight", function() { return _reduceRight_js__WEBPACK_IMPORTED_MODULE_186__["default"]; });

/* harmony import */ var _reduceWhile_js__WEBPACK_IMPORTED_MODULE_187__ = __webpack_require__(/*! ./reduceWhile.js */ "./node_modules/ramda/es/reduceWhile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reduceWhile", function() { return _reduceWhile_js__WEBPACK_IMPORTED_MODULE_187__["default"]; });

/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_188__ = __webpack_require__(/*! ./reduced.js */ "./node_modules/ramda/es/reduced.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reduced", function() { return _reduced_js__WEBPACK_IMPORTED_MODULE_188__["default"]; });

/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_189__ = __webpack_require__(/*! ./reject.js */ "./node_modules/ramda/es/reject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reject", function() { return _reject_js__WEBPACK_IMPORTED_MODULE_189__["default"]; });

/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_190__ = __webpack_require__(/*! ./remove.js */ "./node_modules/ramda/es/remove.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return _remove_js__WEBPACK_IMPORTED_MODULE_190__["default"]; });

/* harmony import */ var _repeat_js__WEBPACK_IMPORTED_MODULE_191__ = __webpack_require__(/*! ./repeat.js */ "./node_modules/ramda/es/repeat.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "repeat", function() { return _repeat_js__WEBPACK_IMPORTED_MODULE_191__["default"]; });

/* harmony import */ var _replace_js__WEBPACK_IMPORTED_MODULE_192__ = __webpack_require__(/*! ./replace.js */ "./node_modules/ramda/es/replace.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return _replace_js__WEBPACK_IMPORTED_MODULE_192__["default"]; });

/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_193__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/ramda/es/reverse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "reverse", function() { return _reverse_js__WEBPACK_IMPORTED_MODULE_193__["default"]; });

/* harmony import */ var _scan_js__WEBPACK_IMPORTED_MODULE_194__ = __webpack_require__(/*! ./scan.js */ "./node_modules/ramda/es/scan.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return _scan_js__WEBPACK_IMPORTED_MODULE_194__["default"]; });

/* harmony import */ var _sequence_js__WEBPACK_IMPORTED_MODULE_195__ = __webpack_require__(/*! ./sequence.js */ "./node_modules/ramda/es/sequence.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sequence", function() { return _sequence_js__WEBPACK_IMPORTED_MODULE_195__["default"]; });

/* harmony import */ var _set_js__WEBPACK_IMPORTED_MODULE_196__ = __webpack_require__(/*! ./set.js */ "./node_modules/ramda/es/set.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "set", function() { return _set_js__WEBPACK_IMPORTED_MODULE_196__["default"]; });

/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_197__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return _slice_js__WEBPACK_IMPORTED_MODULE_197__["default"]; });

/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_198__ = __webpack_require__(/*! ./sort.js */ "./node_modules/ramda/es/sort.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sort", function() { return _sort_js__WEBPACK_IMPORTED_MODULE_198__["default"]; });

/* harmony import */ var _sortBy_js__WEBPACK_IMPORTED_MODULE_199__ = __webpack_require__(/*! ./sortBy.js */ "./node_modules/ramda/es/sortBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sortBy", function() { return _sortBy_js__WEBPACK_IMPORTED_MODULE_199__["default"]; });

/* harmony import */ var _sortWith_js__WEBPACK_IMPORTED_MODULE_200__ = __webpack_require__(/*! ./sortWith.js */ "./node_modules/ramda/es/sortWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sortWith", function() { return _sortWith_js__WEBPACK_IMPORTED_MODULE_200__["default"]; });

/* harmony import */ var _split_js__WEBPACK_IMPORTED_MODULE_201__ = __webpack_require__(/*! ./split.js */ "./node_modules/ramda/es/split.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "split", function() { return _split_js__WEBPACK_IMPORTED_MODULE_201__["default"]; });

/* harmony import */ var _splitAt_js__WEBPACK_IMPORTED_MODULE_202__ = __webpack_require__(/*! ./splitAt.js */ "./node_modules/ramda/es/splitAt.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "splitAt", function() { return _splitAt_js__WEBPACK_IMPORTED_MODULE_202__["default"]; });

/* harmony import */ var _splitEvery_js__WEBPACK_IMPORTED_MODULE_203__ = __webpack_require__(/*! ./splitEvery.js */ "./node_modules/ramda/es/splitEvery.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "splitEvery", function() { return _splitEvery_js__WEBPACK_IMPORTED_MODULE_203__["default"]; });

/* harmony import */ var _splitWhen_js__WEBPACK_IMPORTED_MODULE_204__ = __webpack_require__(/*! ./splitWhen.js */ "./node_modules/ramda/es/splitWhen.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "splitWhen", function() { return _splitWhen_js__WEBPACK_IMPORTED_MODULE_204__["default"]; });

/* harmony import */ var _startsWith_js__WEBPACK_IMPORTED_MODULE_205__ = __webpack_require__(/*! ./startsWith.js */ "./node_modules/ramda/es/startsWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "startsWith", function() { return _startsWith_js__WEBPACK_IMPORTED_MODULE_205__["default"]; });

/* harmony import */ var _subtract_js__WEBPACK_IMPORTED_MODULE_206__ = __webpack_require__(/*! ./subtract.js */ "./node_modules/ramda/es/subtract.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subtract", function() { return _subtract_js__WEBPACK_IMPORTED_MODULE_206__["default"]; });

/* harmony import */ var _sum_js__WEBPACK_IMPORTED_MODULE_207__ = __webpack_require__(/*! ./sum.js */ "./node_modules/ramda/es/sum.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sum", function() { return _sum_js__WEBPACK_IMPORTED_MODULE_207__["default"]; });

/* harmony import */ var _symmetricDifference_js__WEBPACK_IMPORTED_MODULE_208__ = __webpack_require__(/*! ./symmetricDifference.js */ "./node_modules/ramda/es/symmetricDifference.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symmetricDifference", function() { return _symmetricDifference_js__WEBPACK_IMPORTED_MODULE_208__["default"]; });

/* harmony import */ var _symmetricDifferenceWith_js__WEBPACK_IMPORTED_MODULE_209__ = __webpack_require__(/*! ./symmetricDifferenceWith.js */ "./node_modules/ramda/es/symmetricDifferenceWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "symmetricDifferenceWith", function() { return _symmetricDifferenceWith_js__WEBPACK_IMPORTED_MODULE_209__["default"]; });

/* harmony import */ var _tail_js__WEBPACK_IMPORTED_MODULE_210__ = __webpack_require__(/*! ./tail.js */ "./node_modules/ramda/es/tail.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tail", function() { return _tail_js__WEBPACK_IMPORTED_MODULE_210__["default"]; });

/* harmony import */ var _take_js__WEBPACK_IMPORTED_MODULE_211__ = __webpack_require__(/*! ./take.js */ "./node_modules/ramda/es/take.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "take", function() { return _take_js__WEBPACK_IMPORTED_MODULE_211__["default"]; });

/* harmony import */ var _takeLast_js__WEBPACK_IMPORTED_MODULE_212__ = __webpack_require__(/*! ./takeLast.js */ "./node_modules/ramda/es/takeLast.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "takeLast", function() { return _takeLast_js__WEBPACK_IMPORTED_MODULE_212__["default"]; });

/* harmony import */ var _takeLastWhile_js__WEBPACK_IMPORTED_MODULE_213__ = __webpack_require__(/*! ./takeLastWhile.js */ "./node_modules/ramda/es/takeLastWhile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "takeLastWhile", function() { return _takeLastWhile_js__WEBPACK_IMPORTED_MODULE_213__["default"]; });

/* harmony import */ var _takeWhile_js__WEBPACK_IMPORTED_MODULE_214__ = __webpack_require__(/*! ./takeWhile.js */ "./node_modules/ramda/es/takeWhile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "takeWhile", function() { return _takeWhile_js__WEBPACK_IMPORTED_MODULE_214__["default"]; });

/* harmony import */ var _tap_js__WEBPACK_IMPORTED_MODULE_215__ = __webpack_require__(/*! ./tap.js */ "./node_modules/ramda/es/tap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return _tap_js__WEBPACK_IMPORTED_MODULE_215__["default"]; });

/* harmony import */ var _test_js__WEBPACK_IMPORTED_MODULE_216__ = __webpack_require__(/*! ./test.js */ "./node_modules/ramda/es/test.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "test", function() { return _test_js__WEBPACK_IMPORTED_MODULE_216__["default"]; });

/* harmony import */ var _andThen_js__WEBPACK_IMPORTED_MODULE_217__ = __webpack_require__(/*! ./andThen.js */ "./node_modules/ramda/es/andThen.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "andThen", function() { return _andThen_js__WEBPACK_IMPORTED_MODULE_217__["default"]; });

/* harmony import */ var _times_js__WEBPACK_IMPORTED_MODULE_218__ = __webpack_require__(/*! ./times.js */ "./node_modules/ramda/es/times.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "times", function() { return _times_js__WEBPACK_IMPORTED_MODULE_218__["default"]; });

/* harmony import */ var _toLower_js__WEBPACK_IMPORTED_MODULE_219__ = __webpack_require__(/*! ./toLower.js */ "./node_modules/ramda/es/toLower.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toLower", function() { return _toLower_js__WEBPACK_IMPORTED_MODULE_219__["default"]; });

/* harmony import */ var _toPairs_js__WEBPACK_IMPORTED_MODULE_220__ = __webpack_require__(/*! ./toPairs.js */ "./node_modules/ramda/es/toPairs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toPairs", function() { return _toPairs_js__WEBPACK_IMPORTED_MODULE_220__["default"]; });

/* harmony import */ var _toPairsIn_js__WEBPACK_IMPORTED_MODULE_221__ = __webpack_require__(/*! ./toPairsIn.js */ "./node_modules/ramda/es/toPairsIn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toPairsIn", function() { return _toPairsIn_js__WEBPACK_IMPORTED_MODULE_221__["default"]; });

/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_222__ = __webpack_require__(/*! ./toString.js */ "./node_modules/ramda/es/toString.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toString", function() { return _toString_js__WEBPACK_IMPORTED_MODULE_222__["default"]; });

/* harmony import */ var _toUpper_js__WEBPACK_IMPORTED_MODULE_223__ = __webpack_require__(/*! ./toUpper.js */ "./node_modules/ramda/es/toUpper.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toUpper", function() { return _toUpper_js__WEBPACK_IMPORTED_MODULE_223__["default"]; });

/* harmony import */ var _transduce_js__WEBPACK_IMPORTED_MODULE_224__ = __webpack_require__(/*! ./transduce.js */ "./node_modules/ramda/es/transduce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transduce", function() { return _transduce_js__WEBPACK_IMPORTED_MODULE_224__["default"]; });

/* harmony import */ var _transpose_js__WEBPACK_IMPORTED_MODULE_225__ = __webpack_require__(/*! ./transpose.js */ "./node_modules/ramda/es/transpose.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return _transpose_js__WEBPACK_IMPORTED_MODULE_225__["default"]; });

/* harmony import */ var _traverse_js__WEBPACK_IMPORTED_MODULE_226__ = __webpack_require__(/*! ./traverse.js */ "./node_modules/ramda/es/traverse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "traverse", function() { return _traverse_js__WEBPACK_IMPORTED_MODULE_226__["default"]; });

/* harmony import */ var _trim_js__WEBPACK_IMPORTED_MODULE_227__ = __webpack_require__(/*! ./trim.js */ "./node_modules/ramda/es/trim.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "trim", function() { return _trim_js__WEBPACK_IMPORTED_MODULE_227__["default"]; });

/* harmony import */ var _tryCatch_js__WEBPACK_IMPORTED_MODULE_228__ = __webpack_require__(/*! ./tryCatch.js */ "./node_modules/ramda/es/tryCatch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tryCatch", function() { return _tryCatch_js__WEBPACK_IMPORTED_MODULE_228__["default"]; });

/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_229__ = __webpack_require__(/*! ./type.js */ "./node_modules/ramda/es/type.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "type", function() { return _type_js__WEBPACK_IMPORTED_MODULE_229__["default"]; });

/* harmony import */ var _unapply_js__WEBPACK_IMPORTED_MODULE_230__ = __webpack_require__(/*! ./unapply.js */ "./node_modules/ramda/es/unapply.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unapply", function() { return _unapply_js__WEBPACK_IMPORTED_MODULE_230__["default"]; });

/* harmony import */ var _unary_js__WEBPACK_IMPORTED_MODULE_231__ = __webpack_require__(/*! ./unary.js */ "./node_modules/ramda/es/unary.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unary", function() { return _unary_js__WEBPACK_IMPORTED_MODULE_231__["default"]; });

/* harmony import */ var _uncurryN_js__WEBPACK_IMPORTED_MODULE_232__ = __webpack_require__(/*! ./uncurryN.js */ "./node_modules/ramda/es/uncurryN.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uncurryN", function() { return _uncurryN_js__WEBPACK_IMPORTED_MODULE_232__["default"]; });

/* harmony import */ var _unfold_js__WEBPACK_IMPORTED_MODULE_233__ = __webpack_require__(/*! ./unfold.js */ "./node_modules/ramda/es/unfold.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unfold", function() { return _unfold_js__WEBPACK_IMPORTED_MODULE_233__["default"]; });

/* harmony import */ var _union_js__WEBPACK_IMPORTED_MODULE_234__ = __webpack_require__(/*! ./union.js */ "./node_modules/ramda/es/union.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "union", function() { return _union_js__WEBPACK_IMPORTED_MODULE_234__["default"]; });

/* harmony import */ var _unionWith_js__WEBPACK_IMPORTED_MODULE_235__ = __webpack_require__(/*! ./unionWith.js */ "./node_modules/ramda/es/unionWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unionWith", function() { return _unionWith_js__WEBPACK_IMPORTED_MODULE_235__["default"]; });

/* harmony import */ var _uniq_js__WEBPACK_IMPORTED_MODULE_236__ = __webpack_require__(/*! ./uniq.js */ "./node_modules/ramda/es/uniq.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uniq", function() { return _uniq_js__WEBPACK_IMPORTED_MODULE_236__["default"]; });

/* harmony import */ var _uniqBy_js__WEBPACK_IMPORTED_MODULE_237__ = __webpack_require__(/*! ./uniqBy.js */ "./node_modules/ramda/es/uniqBy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uniqBy", function() { return _uniqBy_js__WEBPACK_IMPORTED_MODULE_237__["default"]; });

/* harmony import */ var _uniqWith_js__WEBPACK_IMPORTED_MODULE_238__ = __webpack_require__(/*! ./uniqWith.js */ "./node_modules/ramda/es/uniqWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "uniqWith", function() { return _uniqWith_js__WEBPACK_IMPORTED_MODULE_238__["default"]; });

/* harmony import */ var _unless_js__WEBPACK_IMPORTED_MODULE_239__ = __webpack_require__(/*! ./unless.js */ "./node_modules/ramda/es/unless.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unless", function() { return _unless_js__WEBPACK_IMPORTED_MODULE_239__["default"]; });

/* harmony import */ var _unnest_js__WEBPACK_IMPORTED_MODULE_240__ = __webpack_require__(/*! ./unnest.js */ "./node_modules/ramda/es/unnest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unnest", function() { return _unnest_js__WEBPACK_IMPORTED_MODULE_240__["default"]; });

/* harmony import */ var _until_js__WEBPACK_IMPORTED_MODULE_241__ = __webpack_require__(/*! ./until.js */ "./node_modules/ramda/es/until.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "until", function() { return _until_js__WEBPACK_IMPORTED_MODULE_241__["default"]; });

/* harmony import */ var _update_js__WEBPACK_IMPORTED_MODULE_242__ = __webpack_require__(/*! ./update.js */ "./node_modules/ramda/es/update.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "update", function() { return _update_js__WEBPACK_IMPORTED_MODULE_242__["default"]; });

/* harmony import */ var _useWith_js__WEBPACK_IMPORTED_MODULE_243__ = __webpack_require__(/*! ./useWith.js */ "./node_modules/ramda/es/useWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useWith", function() { return _useWith_js__WEBPACK_IMPORTED_MODULE_243__["default"]; });

/* harmony import */ var _values_js__WEBPACK_IMPORTED_MODULE_244__ = __webpack_require__(/*! ./values.js */ "./node_modules/ramda/es/values.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "values", function() { return _values_js__WEBPACK_IMPORTED_MODULE_244__["default"]; });

/* harmony import */ var _valuesIn_js__WEBPACK_IMPORTED_MODULE_245__ = __webpack_require__(/*! ./valuesIn.js */ "./node_modules/ramda/es/valuesIn.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "valuesIn", function() { return _valuesIn_js__WEBPACK_IMPORTED_MODULE_245__["default"]; });

/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_246__ = __webpack_require__(/*! ./view.js */ "./node_modules/ramda/es/view.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "view", function() { return _view_js__WEBPACK_IMPORTED_MODULE_246__["default"]; });

/* harmony import */ var _when_js__WEBPACK_IMPORTED_MODULE_247__ = __webpack_require__(/*! ./when.js */ "./node_modules/ramda/es/when.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "when", function() { return _when_js__WEBPACK_IMPORTED_MODULE_247__["default"]; });

/* harmony import */ var _where_js__WEBPACK_IMPORTED_MODULE_248__ = __webpack_require__(/*! ./where.js */ "./node_modules/ramda/es/where.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "where", function() { return _where_js__WEBPACK_IMPORTED_MODULE_248__["default"]; });

/* harmony import */ var _whereEq_js__WEBPACK_IMPORTED_MODULE_249__ = __webpack_require__(/*! ./whereEq.js */ "./node_modules/ramda/es/whereEq.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "whereEq", function() { return _whereEq_js__WEBPACK_IMPORTED_MODULE_249__["default"]; });

/* harmony import */ var _without_js__WEBPACK_IMPORTED_MODULE_250__ = __webpack_require__(/*! ./without.js */ "./node_modules/ramda/es/without.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "without", function() { return _without_js__WEBPACK_IMPORTED_MODULE_250__["default"]; });

/* harmony import */ var _xor_js__WEBPACK_IMPORTED_MODULE_251__ = __webpack_require__(/*! ./xor.js */ "./node_modules/ramda/es/xor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "xor", function() { return _xor_js__WEBPACK_IMPORTED_MODULE_251__["default"]; });

/* harmony import */ var _xprod_js__WEBPACK_IMPORTED_MODULE_252__ = __webpack_require__(/*! ./xprod.js */ "./node_modules/ramda/es/xprod.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "xprod", function() { return _xprod_js__WEBPACK_IMPORTED_MODULE_252__["default"]; });

/* harmony import */ var _zip_js__WEBPACK_IMPORTED_MODULE_253__ = __webpack_require__(/*! ./zip.js */ "./node_modules/ramda/es/zip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return _zip_js__WEBPACK_IMPORTED_MODULE_253__["default"]; });

/* harmony import */ var _zipObj_js__WEBPACK_IMPORTED_MODULE_254__ = __webpack_require__(/*! ./zipObj.js */ "./node_modules/ramda/es/zipObj.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zipObj", function() { return _zipObj_js__WEBPACK_IMPORTED_MODULE_254__["default"]; });

/* harmony import */ var _zipWith_js__WEBPACK_IMPORTED_MODULE_255__ = __webpack_require__(/*! ./zipWith.js */ "./node_modules/ramda/es/zipWith.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zipWith", function() { return _zipWith_js__WEBPACK_IMPORTED_MODULE_255__["default"]; });

/* harmony import */ var _thunkify_js__WEBPACK_IMPORTED_MODULE_256__ = __webpack_require__(/*! ./thunkify.js */ "./node_modules/ramda/es/thunkify.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "thunkify", function() { return _thunkify_js__WEBPACK_IMPORTED_MODULE_256__["default"]; });



































































































































































































































































/***/ }),

/***/ "./node_modules/ramda/es/indexBy.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/indexBy.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _reduceBy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reduceBy.js */ "./node_modules/ramda/es/reduceBy.js");

/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
 * @param {Function} fn Function :: a -> String
 * @param {Array} array The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @example
 *
 *      const list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      R.indexBy(R.prop('id'), list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */

var indexBy =
/*#__PURE__*/
Object(_reduceBy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (acc, elem) {
  return elem;
}, null);
/* harmony default export */ __webpack_exports__["default"] = (indexBy);

/***/ }),

/***/ "./node_modules/ramda/es/indexOf.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/indexOf.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_indexOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_indexOf.js */ "./node_modules/ramda/es/internal/_indexOf.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");



/**
 * Returns the position of the first occurrence of an item in an array, or -1
 * if the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.lastIndexOf
 * @example
 *
 *      R.indexOf(3, [1,2,3,4]); //=> 2
 *      R.indexOf(10, [1,2,3,4]); //=> -1
 */

var indexOf =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function indexOf(target, xs) {
  return typeof xs.indexOf === 'function' && !Object(_internal_isArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(xs) ? xs.indexOf(target) : Object(_internal_indexOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(xs, target, 0);
});

/* harmony default export */ __webpack_exports__["default"] = (indexOf);

/***/ }),

/***/ "./node_modules/ramda/es/init.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/init.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");

/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R.init([1, 2, 3]);  //=> [1, 2]
 *      R.init([1, 2]);     //=> [1]
 *      R.init([1]);        //=> []
 *      R.init([]);         //=> []
 *
 *      R.init('abc');  //=> 'ab'
 *      R.init('ab');   //=> 'a'
 *      R.init('a');    //=> ''
 *      R.init('');     //=> ''
 */

var init =
/*#__PURE__*/
Object(_slice_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0, -1);
/* harmony default export */ __webpack_exports__["default"] = (init);

/***/ }),

/***/ "./node_modules/ramda/es/innerJoin.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/innerJoin.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includesWith.js */ "./node_modules/ramda/es/internal/_includesWith.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_filter.js */ "./node_modules/ramda/es/internal/_filter.js");



/**
 * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
 * `xs'` comprising each of the elements of `xs` which is equal to one or more
 * elements of `ys` according to `pred`.
 *
 * `pred` must be a binary function expecting an element from each list.
 *
 * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
 * not be significant, but since `xs'` is ordered the implementation guarantees
 * that its values are in the same order as they appear in `xs`. Duplicates are
 * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Relation
 * @sig ((a, b) -> Boolean) -> [a] -> [b] -> [a]
 * @param {Function} pred
 * @param {Array} xs
 * @param {Array} ys
 * @return {Array}
 * @see R.intersection
 * @example
 *
 *      R.innerJoin(
 *        (record, id) => record.id === id,
 *        [{id: 824, name: 'Richie Furay'},
 *         {id: 956, name: 'Dewey Martin'},
 *         {id: 313, name: 'Bruce Palmer'},
 *         {id: 456, name: 'Stephen Stills'},
 *         {id: 177, name: 'Neil Young'}],
 *        [177, 456, 999]
 *      );
 *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
 */

var innerJoin =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function innerJoin(pred, xs, ys) {
  return Object(_internal_filter_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (x) {
    return Object(_internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__["default"])(pred, x, ys);
  }, xs);
});

/* harmony default export */ __webpack_exports__["default"] = (innerJoin);

/***/ }),

/***/ "./node_modules/ramda/es/insert.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/insert.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Inserts the supplied element into the list, at the specified `index`. _Note that

 * this is not destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} index The position to insert the element
 * @param {*} elt The element to insert into the Array
 * @param {Array} list The list to insert into
 * @return {Array} A new Array with `elt` inserted at `index`.
 * @example
 *
 *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
 */

var insert =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function insert(idx, elt, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  var result = Array.prototype.slice.call(list, 0);
  result.splice(idx, 0, elt);
  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (insert);

/***/ }),

/***/ "./node_modules/ramda/es/insertAll.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/insertAll.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
 * destructive_: it returns a copy of the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig Number -> [a] -> [a] -> [a]
 * @param {Number} index The position to insert the sub-list
 * @param {Array} elts The sub-list to insert into the Array
 * @param {Array} list The list to insert the sub-list into
 * @return {Array} A new Array with `elts` inserted starting at `index`.
 * @example
 *
 *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
 */

var insertAll =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function insertAll(idx, elts, list) {
  idx = idx < list.length && idx >= 0 ? idx : list.length;
  return [].concat(Array.prototype.slice.call(list, 0, idx), elts, Array.prototype.slice.call(list, idx));
});

/* harmony default export */ __webpack_exports__["default"] = (insertAll);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_Set.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_Set.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_includes.js */ "./node_modules/ramda/es/internal/_includes.js");


var _Set =
/*#__PURE__*/
function () {
  function _Set() {
    /* globals Set */
    this._nativeSet = typeof Set === 'function' ? new Set() : null;
    this._items = {};
  } // until we figure out why jsdoc chokes on this
  // @param item The item to add to the Set
  // @returns {boolean} true if the item did not exist prior, otherwise false
  //


  _Set.prototype.add = function (item) {
    return !hasOrAdd(item, true, this);
  }; //
  // @param item The item to check for existence in the Set
  // @returns {boolean} true if the item exists in the Set, otherwise false
  //


  _Set.prototype.has = function (item) {
    return hasOrAdd(item, false, this);
  }; //
  // Combines the logic for checking whether an item is a member of the set and
  // for adding a new item to the set.
  //
  // @param item       The item to check or add to the Set instance.
  // @param shouldAdd  If true, the item will be added to the set if it doesn't
  //                   already exist.
  // @param set        The set instance to check or add to.
  // @return {boolean} true if the item already existed, otherwise false.
  //


  return _Set;
}();

function hasOrAdd(item, shouldAdd, set) {
  var type = typeof item;
  var prevSize, newSize;

  switch (type) {
    case 'string':
    case 'number':
      // distinguish between +0 and -0
      if (item === 0 && 1 / item === -Infinity) {
        if (set._items['-0']) {
          return true;
        } else {
          if (shouldAdd) {
            set._items['-0'] = true;
          }

          return false;
        }
      } // these types can all utilise the native Set


      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;

          set._nativeSet.add(item);

          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = {};
            set._items[type][item] = true;
          }

          return false;
        } else if (item in set._items[type]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][item] = true;
          }

          return false;
        }
      }

    case 'boolean':
      // set._items['boolean'] holds a two element array
      // representing [ falseExists, trueExists ]
      if (type in set._items) {
        var bIdx = item ? 1 : 0;

        if (set._items[type][bIdx]) {
          return true;
        } else {
          if (shouldAdd) {
            set._items[type][bIdx] = true;
          }

          return false;
        }
      } else {
        if (shouldAdd) {
          set._items[type] = item ? [false, true] : [true, false];
        }

        return false;
      }

    case 'function':
      // compare functions for reference equality
      if (set._nativeSet !== null) {
        if (shouldAdd) {
          prevSize = set._nativeSet.size;

          set._nativeSet.add(item);

          newSize = set._nativeSet.size;
          return newSize === prevSize;
        } else {
          return set._nativeSet.has(item);
        }
      } else {
        if (!(type in set._items)) {
          if (shouldAdd) {
            set._items[type] = [item];
          }

          return false;
        }

        if (!Object(_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(item, set._items[type])) {
          if (shouldAdd) {
            set._items[type].push(item);
          }

          return false;
        }

        return true;
      }

    case 'undefined':
      if (set._items[type]) {
        return true;
      } else {
        if (shouldAdd) {
          set._items[type] = true;
        }

        return false;
      }

    case 'object':
      if (item === null) {
        if (!set._items['null']) {
          if (shouldAdd) {
            set._items['null'] = true;
          }

          return false;
        }

        return true;
      }

    /* falls through */

    default:
      // reduce the search size of heterogeneous sets by creating buckets
      // for each type.
      type = Object.prototype.toString.call(item);

      if (!(type in set._items)) {
        if (shouldAdd) {
          set._items[type] = [item];
        }

        return false;
      } // scan through all previously applied items


      if (!Object(_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(item, set._items[type])) {
        if (shouldAdd) {
          set._items[type].push(item);
        }

        return false;
      }

      return true;
  }
} // A simple Set type that honours R.equals semantics


/* harmony default export */ __webpack_exports__["default"] = (_Set);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_aperture.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_aperture.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _aperture; });
function _aperture(n, list) {
  var idx = 0;
  var limit = list.length - (n - 1);
  var acc = new Array(limit >= 0 ? limit : 0);

  while (idx < limit) {
    acc[idx] = Array.prototype.slice.call(list, idx, idx + n);
    idx += 1;
  }

  return acc;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_arity.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_arity.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arity; });
function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };

    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };

    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };

    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_arrayFromIterator.js":
/*!**************************************************************!*\
  !*** ./node_modules/ramda/es/internal/_arrayFromIterator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayFromIterator; });
function _arrayFromIterator(iter) {
  var list = [];
  var next;

  while (!(next = iter.next()).done) {
    list.push(next.value);
  }

  return list;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_assertPromise.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_assertPromise.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _assertPromise; });
/* harmony import */ var _isFunction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isFunction.js */ "./node_modules/ramda/es/internal/_isFunction.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_toString.js */ "./node_modules/ramda/es/internal/_toString.js");


function _assertPromise(name, p) {
  if (p == null || !Object(_isFunction_js__WEBPACK_IMPORTED_MODULE_0__["default"])(p.then)) {
    throw new TypeError('`' + name + '` expected a Promise, received ' + Object(_toString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p, []));
  }
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_checkForMethod.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_checkForMethod.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _checkForMethod; });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");

/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */

function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;

    if (length === 0) {
      return fn();
    }

    var obj = arguments[length - 1];
    return Object(_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_clone.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_clone.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _clone; });
/* harmony import */ var _cloneRegExp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_cloneRegExp.js */ "./node_modules/ramda/es/internal/_cloneRegExp.js");
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../type.js */ "./node_modules/ramda/es/type.js");


/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @param {Boolean} deep Whether or not to perform deep cloning.
 * @return {*} The copied value.
 */

function _clone(value, refFrom, refTo, deep) {
  var copy = function copy(copiedValue) {
    var len = refFrom.length;
    var idx = 0;

    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }

      idx += 1;
    }

    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;

    for (var key in value) {
      copiedValue[key] = deep ? _clone(value[key], refFrom, refTo, true) : value[key];
    }

    return copiedValue;
  };

  switch (Object(_type_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value)) {
    case 'Object':
      return copy({});

    case 'Array':
      return copy([]);

    case 'Date':
      return new Date(value.valueOf());

    case 'RegExp':
      return Object(_cloneRegExp_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value);

    default:
      return value;
  }
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_cloneRegExp.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_cloneRegExp.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _cloneRegExp; });
function _cloneRegExp(pattern) {
  return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_complement.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_complement.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _complement; });
function _complement(f) {
  return function () {
    return !f.apply(this, arguments);
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_concat.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_concat.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _concat; });
/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
function _concat(set1, set2) {
  set1 = set1 || [];
  set2 = set2 || [];
  var idx;
  var len1 = set1.length;
  var len2 = set2.length;
  var result = [];
  idx = 0;

  while (idx < len1) {
    result[result.length] = set1[idx];
    idx += 1;
  }

  idx = 0;

  while (idx < len2) {
    result[result.length] = set2[idx];
    idx += 1;
  }

  return result;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_createPartialApplicator.js":
/*!********************************************************************!*\
  !*** ./node_modules/ramda/es/internal/_createPartialApplicator.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _createPartialApplicator; });
/* harmony import */ var _arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


function _createPartialApplicator(concat) {
  return Object(_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (fn, args) {
    return Object(_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Math.max(0, fn.length - args.length), function () {
      return fn.apply(this, concat(args, arguments));
    });
  });
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry1.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry1.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _curry1; });
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");

/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry2.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry2.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _curry2; });
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a) ? f2 : Object(_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_b) {
          return fn(a, _b);
        });

      default:
        return Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a) && Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b) ? f2 : Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(a) ? Object(_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_a) {
          return fn(_a, b);
        }) : Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b) ? Object(_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curry3.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curry3.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _curry3; });
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");



/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;

      case 1:
        return Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) ? f3 : Object(_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_b, _c) {
          return fn(a, _b, _c);
        });

      case 2:
        return Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) && Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) ? f3 : Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) ? Object(_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a, _c) {
          return fn(_a, b, _c);
        }) : Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) ? Object(_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_b, _c) {
          return fn(a, _b, _c);
        }) : Object(_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_c) {
          return fn(a, b, _c);
        });

      default:
        return Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) && Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) && Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(c) ? f3 : Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) && Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) ? Object(_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a, _b) {
          return fn(_a, _b, c);
        }) : Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) && Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(c) ? Object(_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a, _c) {
          return fn(_a, b, _c);
        }) : Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) && Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(c) ? Object(_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_b, _c) {
          return fn(a, _b, _c);
        }) : Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a) ? Object(_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_a) {
          return fn(_a, b, c);
        }) : Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(b) ? Object(_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_b) {
          return fn(a, _b, c);
        }) : Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_2__["default"])(c) ? Object(_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_curryN.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_curryN.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _curryN; });
/* harmony import */ var _arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isPlaceholder.js */ "./node_modules/ramda/es/internal/_isPlaceholder.js");


/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;

    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;

      if (combinedIdx < received.length && (!Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }

      combined[combinedIdx] = result;

      if (!Object(_isPlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"])(result)) {
        left -= 1;
      }

      combinedIdx += 1;
    }

    return left <= 0 ? fn.apply(this, combined) : Object(_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(left, _curryN(length, combined, fn));
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dispatchable.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dispatchable.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _dispatchable; });
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _isTransformer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isTransformer.js */ "./node_modules/ramda/es/internal/_isTransformer.js");


/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */

function _dispatchable(methodNames, xf, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }

    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();

    if (!Object(_isArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(obj)) {
      var idx = 0;

      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }

        idx += 1;
      }

      if (Object(_isTransformer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }

    return fn.apply(this, arguments);
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dropLast.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dropLast.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dropLast; });
/* harmony import */ var _take_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../take.js */ "./node_modules/ramda/es/take.js");

function dropLast(n, xs) {
  return Object(_take_js__WEBPACK_IMPORTED_MODULE_0__["default"])(n < xs.length ? xs.length - n : 0, xs);
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_dropLastWhile.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_dropLastWhile.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dropLastWhile; });
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../slice.js */ "./node_modules/ramda/es/slice.js");

function dropLastWhile(pred, xs) {
  var idx = xs.length - 1;

  while (idx >= 0 && pred(xs[idx])) {
    idx -= 1;
  }

  return Object(_slice_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0, idx + 1, xs);
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_equals.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_equals.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _equals; });
/* harmony import */ var _arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_arrayFromIterator.js */ "./node_modules/ramda/es/internal/_arrayFromIterator.js");
/* harmony import */ var _includesWith_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_includesWith.js */ "./node_modules/ramda/es/internal/_includesWith.js");
/* harmony import */ var _functionName_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_functionName.js */ "./node_modules/ramda/es/internal/_functionName.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _objectIs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_objectIs.js */ "./node_modules/ramda/es/internal/_objectIs.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../keys.js */ "./node_modules/ramda/es/keys.js");
/* harmony import */ var _type_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../type.js */ "./node_modules/ramda/es/type.js");







/**
 * private _uniqContentEquals function.
 * That function is checking equality of 2 iterator contents with 2 assumptions
 * - iterators lengths are the same
 * - iterators values are unique
 *
 * false-positive result will be returned for comparision of, e.g.
 * - [1,2,3] and [1,2,3,4]
 * - [1,1,1] and [1,2,3]
 * */

function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
  var a = Object(_arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(aIterator);

  var b = Object(_arrayFromIterator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bIterator);

  function eq(_a, _b) {
    return _equals(_a, _b, stackA.slice(), stackB.slice());
  } // if *a* array contains any element that is not included in *b*


  return !Object(_includesWith_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (b, aItem) {
    return !Object(_includesWith_js__WEBPACK_IMPORTED_MODULE_1__["default"])(eq, aItem, b);
  }, b, a);
}

function _equals(a, b, stackA, stackB) {
  if (Object(_objectIs_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a, b)) {
    return true;
  }

  var typeA = Object(_type_js__WEBPACK_IMPORTED_MODULE_6__["default"])(a);

  if (typeA !== Object(_type_js__WEBPACK_IMPORTED_MODULE_6__["default"])(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (typeA) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && Object(_functionName_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a.constructor) === 'Promise') {
        return a === b;
      }

      break;

    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && Object(_objectIs_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a.valueOf(), b.valueOf()))) {
        return false;
      }

      break;

    case 'Date':
      if (!Object(_objectIs_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a.valueOf(), b.valueOf())) {
        return false;
      }

      break;

    case 'Error':
      return a.name === b.name && a.message === b.message;

    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }

      break;
  }

  var idx = stackA.length - 1;

  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }

    idx -= 1;
  }

  switch (typeA) {
    case 'Map':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));

    case 'Set':
      if (a.size !== b.size) {
        return false;
      }

      return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));

    case 'Arguments':
    case 'Array':
    case 'Object':
    case 'Boolean':
    case 'Number':
    case 'String':
    case 'Date':
    case 'Error':
    case 'RegExp':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'ArrayBuffer':
      break;

    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = Object(_keys_js__WEBPACK_IMPORTED_MODULE_5__["default"])(a);

  if (keysA.length !== Object(_keys_js__WEBPACK_IMPORTED_MODULE_5__["default"])(b).length) {
    return false;
  }

  var extendedStackA = stackA.concat([a]);
  var extendedStackB = stackB.concat([b]);
  idx = keysA.length - 1;

  while (idx >= 0) {
    var key = keysA[idx];

    if (!(Object(_has_js__WEBPACK_IMPORTED_MODULE_3__["default"])(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
      return false;
    }

    idx -= 1;
  }

  return true;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_filter.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_filter.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _filter; });
function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }

    idx += 1;
  }

  return result;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_flatCat.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_flatCat.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _forceReduced_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_forceReduced.js */ "./node_modules/ramda/es/internal/_forceReduced.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/ramda/es/internal/_isArrayLike.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");





var preservingReduced = function (xf) {
  return {
    '@@transducer/init': _xfBase_js__WEBPACK_IMPORTED_MODULE_3__["default"].init,
    '@@transducer/result': function (result) {
      return xf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      var ret = xf['@@transducer/step'](result, input);
      return ret['@@transducer/reduced'] ? Object(_forceReduced_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ret) : ret;
    }
  };
};

var _flatCat = function _xcat(xf) {
  var rxf = preservingReduced(xf);
  return {
    '@@transducer/init': _xfBase_js__WEBPACK_IMPORTED_MODULE_3__["default"].init,
    '@@transducer/result': function (result) {
      return rxf['@@transducer/result'](result);
    },
    '@@transducer/step': function (result, input) {
      return !Object(_isArrayLike_js__WEBPACK_IMPORTED_MODULE_1__["default"])(input) ? Object(_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(rxf, result, [input]) : Object(_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(rxf, result, input);
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (_flatCat);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_forceReduced.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_forceReduced.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _forceReduced; });
function _forceReduced(x) {
  return {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_functionName.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_functionName.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _functionName; });
function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_has.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_has.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _has; });
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_identity.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_identity.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _identity; });
function _identity(x) {
  return x;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_includes.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_includes.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _includes; });
/* harmony import */ var _indexOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_indexOf.js */ "./node_modules/ramda/es/internal/_indexOf.js");

function _includes(a, list) {
  return Object(_indexOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list, a, 0) >= 0;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_includesWith.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_includesWith.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _includesWith; });
function _includesWith(pred, x, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    if (pred(x, list[idx])) {
      return true;
    }

    idx += 1;
  }

  return false;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_indexOf.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_indexOf.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _indexOf; });
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../equals.js */ "./node_modules/ramda/es/equals.js");

function _indexOf(list, a, idx) {
  var inf, item; // Array.prototype.indexOf doesn't exist below IE9

  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;

          while (idx < list.length) {
            item = list[idx];

            if (item === 0 && 1 / item === inf) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];

            if (typeof item === 'number' && item !== item) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } // non-zero numbers can utilise Set


        return list.indexOf(a, idx);
      // all these types can utilise Set

      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }

    }
  } // anything else not covered above, defer to R.equals


  while (idx < list.length) {
    if (Object(_equals_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list[idx], a)) {
      return idx;
    }

    idx += 1;
  }

  return -1;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArguments.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArguments.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_has.js */ "./node_modules/ramda/es/internal/_has.js");

var toString = Object.prototype.toString;

var _isArguments =
/*#__PURE__*/
function () {
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return Object(_has_js__WEBPACK_IMPORTED_MODULE_0__["default"])('callee', x);
  };
}();

/* harmony default export */ __webpack_exports__["default"] = (_isArguments);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArray.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArray.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
/* harmony default export */ __webpack_exports__["default"] = (Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
});

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isArrayLike.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isArrayLike.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _isString_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isString.js */ "./node_modules/ramda/es/internal/_isString.js");



/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */

var _isArrayLike =
/*#__PURE__*/
Object(_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function isArrayLike(x) {
  if (Object(_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(x)) {
    return true;
  }

  if (!x) {
    return false;
  }

  if (typeof x !== 'object') {
    return false;
  }

  if (Object(_isString_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x)) {
    return false;
  }

  if (x.nodeType === 1) {
    return !!x.length;
  }

  if (x.length === 0) {
    return true;
  }

  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }

  return false;
});

/* harmony default export */ __webpack_exports__["default"] = (_isArrayLike);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isFunction.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isFunction.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _isFunction; });
function _isFunction(x) {
  var type = Object.prototype.toString.call(x);
  return type === '[object Function]' || type === '[object AsyncFunction]' || type === '[object GeneratorFunction]' || type === '[object AsyncGeneratorFunction]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isInteger.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isInteger.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Determine if the passed argument is an integer.
 *
 * @private
 * @param {*} n
 * @category Type
 * @return {Boolean}
 */
/* harmony default export */ __webpack_exports__["default"] = (Number.isInteger || function _isInteger(n) {
  return n << 0 === n;
});

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isNumber.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isNumber.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _isNumber; });
function _isNumber(x) {
  return Object.prototype.toString.call(x) === '[object Number]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isObject.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isObject.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _isObject; });
function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isPlaceholder.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isPlaceholder.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _isPlaceholder; });
function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isRegExp.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isRegExp.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _isRegExp; });
function _isRegExp(x) {
  return Object.prototype.toString.call(x) === '[object RegExp]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isString.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isString.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _isString; });
function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_isTransformer.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_isTransformer.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _isTransformer; });
function _isTransformer(obj) {
  return obj != null && typeof obj['@@transducer/step'] === 'function';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_makeFlat.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_makeFlat.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _makeFlat; });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/ramda/es/internal/_isArrayLike.js");

/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @private
 */

function _makeFlat(recursive) {
  return function flatt(list) {
    var value, jlen, j;
    var result = [];
    var idx = 0;
    var ilen = list.length;

    while (idx < ilen) {
      if (Object(_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;

        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }

      idx += 1;
    }

    return result;
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_map.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/internal/_map.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _map; });
function _map(fn, functor) {
  var idx = 0;
  var len = functor.length;
  var result = Array(len);

  while (idx < len) {
    result[idx] = fn(functor[idx]);
    idx += 1;
  }

  return result;
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_objectAssign.js":
/*!*********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_objectAssign.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_has.js */ "./node_modules/ramda/es/internal/_has.js");
 // Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign

function _objectAssign(target) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);
  var idx = 1;
  var length = arguments.length;

  while (idx < length) {
    var source = arguments[idx];

    if (source != null) {
      for (var nextKey in source) {
        if (Object(_has_js__WEBPACK_IMPORTED_MODULE_0__["default"])(nextKey, source)) {
          output[nextKey] = source[nextKey];
        }
      }
    }

    idx += 1;
  }

  return output;
}

/* harmony default export */ __webpack_exports__["default"] = (typeof Object.assign === 'function' ? Object.assign : _objectAssign);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_objectIs.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_objectIs.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function _objectIs(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (typeof Object.is === 'function' ? Object.is : _objectIs);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_of.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/internal/_of.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _of; });
function _of(x) {
  return [x];
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_pipe.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_pipe.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _pipe; });
function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_pipeP.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_pipeP.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _pipeP; });
function _pipeP(f, g) {
  return function () {
    var ctx = this;
    return f.apply(ctx, arguments).then(function (x) {
      return g.call(ctx, x);
    });
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_quote.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_quote.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _quote; });
function _quote(s) {
  var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b') // \b matches word boundary; [\b] matches backspace
  .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');
  return '"' + escaped.replace(/"/g, '\\"') + '"';
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_reduce.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_reduce.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _reduce; });
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/ramda/es/internal/_isArrayLike.js");
/* harmony import */ var _xwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xwrap.js */ "./node_modules/ramda/es/internal/_xwrap.js");
/* harmony import */ var _bind_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bind.js */ "./node_modules/ramda/es/bind.js");




function _arrayReduce(xf, acc, list) {
  var idx = 0;
  var len = list.length;

  while (idx < len) {
    acc = xf['@@transducer/step'](acc, list[idx]);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    idx += 1;
  }

  return xf['@@transducer/result'](acc);
}

function _iterableReduce(xf, acc, iter) {
  var step = iter.next();

  while (!step.done) {
    acc = xf['@@transducer/step'](acc, step.value);

    if (acc && acc['@@transducer/reduced']) {
      acc = acc['@@transducer/value'];
      break;
    }

    step = iter.next();
  }

  return xf['@@transducer/result'](acc);
}

function _methodReduce(xf, acc, obj, methodName) {
  return xf['@@transducer/result'](obj[methodName](Object(_bind_js__WEBPACK_IMPORTED_MODULE_2__["default"])(xf['@@transducer/step'], xf), acc));
}

var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
function _reduce(fn, acc, list) {
  if (typeof fn === 'function') {
    fn = Object(_xwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn);
  }

  if (Object(_isArrayLike_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list)) {
    return _arrayReduce(fn, acc, list);
  }

  if (typeof list['fantasy-land/reduce'] === 'function') {
    return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
  }

  if (list[symIterator] != null) {
    return _iterableReduce(fn, acc, list[symIterator]());
  }

  if (typeof list.next === 'function') {
    return _iterableReduce(fn, acc, list);
  }

  if (typeof list.reduce === 'function') {
    return _methodReduce(fn, acc, list, 'reduce');
  }

  throw new TypeError('reduce: list must be array or iterable');
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_reduced.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_reduced.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _reduced; });
function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_stepCat.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_stepCat.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _stepCat; });
/* harmony import */ var _objectAssign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_objectAssign.js */ "./node_modules/ramda/es/internal/_objectAssign.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_identity.js */ "./node_modules/ramda/es/internal/_identity.js");
/* harmony import */ var _isArrayLike_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_isArrayLike.js */ "./node_modules/ramda/es/internal/_isArrayLike.js");
/* harmony import */ var _isTransformer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_isTransformer.js */ "./node_modules/ramda/es/internal/_isTransformer.js");
/* harmony import */ var _objOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../objOf.js */ "./node_modules/ramda/es/objOf.js");





var _stepCatArray = {
  '@@transducer/init': Array,
  '@@transducer/step': function (xs, x) {
    xs.push(x);
    return xs;
  },
  '@@transducer/result': _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]
};
var _stepCatString = {
  '@@transducer/init': String,
  '@@transducer/step': function (a, b) {
    return a + b;
  },
  '@@transducer/result': _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]
};
var _stepCatObject = {
  '@@transducer/init': Object,
  '@@transducer/step': function (result, input) {
    return Object(_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__["default"])(result, Object(_isArrayLike_js__WEBPACK_IMPORTED_MODULE_2__["default"])(input) ? Object(_objOf_js__WEBPACK_IMPORTED_MODULE_4__["default"])(input[0], input[1]) : input);
  },
  '@@transducer/result': _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]
};
function _stepCat(obj) {
  if (Object(_isTransformer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(obj)) {
    return obj;
  }

  if (Object(_isArrayLike_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj)) {
    return _stepCatArray;
  }

  if (typeof obj === 'string') {
    return _stepCatString;
  }

  if (typeof obj === 'object') {
    return _stepCatObject;
  }

  throw new Error('Cannot create transformer for ' + obj);
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_toISOString.js":
/*!********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_toISOString.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
 */
var pad = function pad(n) {
  return (n < 10 ? '0' : '') + n;
};

var _toISOString = typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
  return d.toISOString();
} : function _toISOString(d) {
  return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
};

/* harmony default export */ __webpack_exports__["default"] = (_toISOString);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_toString.js":
/*!*****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_toString.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _toString; });
/* harmony import */ var _includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_includes.js */ "./node_modules/ramda/es/internal/_includes.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _quote_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_quote.js */ "./node_modules/ramda/es/internal/_quote.js");
/* harmony import */ var _toISOString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_toISOString.js */ "./node_modules/ramda/es/internal/_toISOString.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../keys.js */ "./node_modules/ramda/es/keys.js");
/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reject.js */ "./node_modules/ramda/es/reject.js");






function _toString(x, seen) {
  var recur = function recur(y) {
    var xs = seen.concat([x]);
    return Object(_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(y, xs) ? '<Circular>' : _toString(y, xs);
  }; //  mapPairs :: (Object, [String]) -> [String]


  var mapPairs = function (obj, keys) {
    return Object(_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (k) {
      return Object(_quote_js__WEBPACK_IMPORTED_MODULE_2__["default"])(k) + ': ' + recur(obj[k]);
    }, keys.slice().sort());
  };

  switch (Object.prototype.toString.call(x)) {
    case '[object Arguments]':
      return '(function() { return arguments; }(' + Object(_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(recur, x).join(', ') + '))';

    case '[object Array]':
      return '[' + Object(_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(recur, x).concat(mapPairs(x, Object(_reject_js__WEBPACK_IMPORTED_MODULE_5__["default"])(function (k) {
        return /^\d+$/.test(k);
      }, Object(_keys_js__WEBPACK_IMPORTED_MODULE_4__["default"])(x)))).join(', ') + ']';

    case '[object Boolean]':
      return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();

    case '[object Date]':
      return 'new Date(' + (isNaN(x.valueOf()) ? recur(NaN) : Object(_quote_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_toISOString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(x))) + ')';

    case '[object Null]':
      return 'null';

    case '[object Number]':
      return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);

    case '[object String]':
      return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : Object(_quote_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x);

    case '[object Undefined]':
      return 'undefined';

    default:
      if (typeof x.toString === 'function') {
        var repr = x.toString();

        if (repr !== '[object Object]') {
          return repr;
        }
      }

      return '{' + mapPairs(x, Object(_keys_js__WEBPACK_IMPORTED_MODULE_4__["default"])(x)).join(', ') + '}';
  }
}

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xall.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xall.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XAll =
/*#__PURE__*/
function () {
  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }

  XAll.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XAll.prototype['@@transducer/result'] = function (result) {
    if (this.all) {
      result = this.xf['@@transducer/step'](result, true);
    }

    return this.xf['@@transducer/result'](result);
  };

  XAll.prototype['@@transducer/step'] = function (result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = Object(_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'](result, false));
    }

    return result;
  };

  return XAll;
}();

var _xall =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xall(f, xf) {
  return new XAll(f, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xall);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xany.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xany.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XAny =
/*#__PURE__*/
function () {
  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }

  XAny.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XAny.prototype['@@transducer/result'] = function (result) {
    if (!this.any) {
      result = this.xf['@@transducer/step'](result, false);
    }

    return this.xf['@@transducer/result'](result);
  };

  XAny.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.any = true;
      result = Object(_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'](result, true));
    }

    return result;
  };

  return XAny;
}();

var _xany =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xany(f, xf) {
  return new XAny(f, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xany);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xaperture.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xaperture.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XAperture =
/*#__PURE__*/
function () {
  function XAperture(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }

  XAperture.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XAperture.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };

  XAperture.prototype['@@transducer/step'] = function (result, input) {
    this.store(input);
    return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
  };

  XAperture.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;

    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  XAperture.prototype.getCopy = function () {
    return Object(_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Array.prototype.slice.call(this.acc, this.pos), Array.prototype.slice.call(this.acc, 0, this.pos));
  };

  return XAperture;
}();

var _xaperture =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function _xaperture(n, xf) {
  return new XAperture(n, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xaperture);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xchain.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xchain.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _flatCat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_flatCat.js */ "./node_modules/ramda/es/internal/_flatCat.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../map.js */ "./node_modules/ramda/es/map.js");




var _xchain =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xchain(f, xf) {
  return Object(_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(f, Object(_flatCat_js__WEBPACK_IMPORTED_MODULE_1__["default"])(xf));
});

/* harmony default export */ __webpack_exports__["default"] = (_xchain);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdrop.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdrop.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XDrop =
/*#__PURE__*/
function () {
  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }

  XDrop.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XDrop.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDrop;
}();

var _xdrop =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xdrop(n, xf) {
  return new XDrop(n, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xdrop);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropLast.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropLast.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XDropLast =
/*#__PURE__*/
function () {
  function XDropLast(n, xf) {
    this.xf = xf;
    this.pos = 0;
    this.full = false;
    this.acc = new Array(n);
  }

  XDropLast.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;

  XDropLast.prototype['@@transducer/result'] = function (result) {
    this.acc = null;
    return this.xf['@@transducer/result'](result);
  };

  XDropLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.full) {
      result = this.xf['@@transducer/step'](result, this.acc[this.pos]);
    }

    this.store(input);
    return result;
  };

  XDropLast.prototype.store = function (input) {
    this.acc[this.pos] = input;
    this.pos += 1;

    if (this.pos === this.acc.length) {
      this.pos = 0;
      this.full = true;
    }
  };

  return XDropLast;
}();

var _xdropLast =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xdropLast(n, xf) {
  return new XDropLast(n, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xdropLast);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropLastWhile.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropLastWhile.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XDropLastWhile =
/*#__PURE__*/
function () {
  function XDropLastWhile(fn, xf) {
    this.f = fn;
    this.retained = [];
    this.xf = xf;
  }

  XDropLastWhile.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XDropLastWhile.prototype['@@transducer/result'] = function (result) {
    this.retained = null;
    return this.xf['@@transducer/result'](result);
  };

  XDropLastWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.retain(result, input) : this.flush(result, input);
  };

  XDropLastWhile.prototype.flush = function (result, input) {
    result = Object(_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'], result, this.retained);
    this.retained = [];
    return this.xf['@@transducer/step'](result, input);
  };

  XDropLastWhile.prototype.retain = function (result, input) {
    this.retained.push(input);
    return result;
  };

  return XDropLastWhile;
}();

var _xdropLastWhile =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xdropLastWhile(fn, xf) {
  return new XDropLastWhile(fn, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xdropLastWhile);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropRepeatsWith.js":
/*!*************************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropRepeatsWith.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XDropRepeatsWith =
/*#__PURE__*/
function () {
  function XDropRepeatsWith(pred, xf) {
    this.xf = xf;
    this.pred = pred;
    this.lastValue = undefined;
    this.seenFirstValue = false;
  }

  XDropRepeatsWith.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XDropRepeatsWith.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
    var sameAsLast = false;

    if (!this.seenFirstValue) {
      this.seenFirstValue = true;
    } else if (this.pred(this.lastValue, input)) {
      sameAsLast = true;
    }

    this.lastValue = input;
    return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
  };

  return XDropRepeatsWith;
}();

var _xdropRepeatsWith =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xdropRepeatsWith(pred, xf) {
  return new XDropRepeatsWith(pred, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xdropRepeatsWith);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xdropWhile.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xdropWhile.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XDropWhile =
/*#__PURE__*/
function () {
  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XDropWhile.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XDropWhile.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XDropWhile.prototype['@@transducer/step'] = function (result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }

      this.f = null;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return XDropWhile;
}();

var _xdropWhile =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xdropWhile(f, xf) {
  return new XDropWhile(f, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xdropWhile);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfBase.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfBase.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  init: function () {
    return this.xf['@@transducer/init']();
  },
  result: function (result) {
    return this.xf['@@transducer/result'](result);
  }
});

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfilter.js":
/*!****************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfilter.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XFilter =
/*#__PURE__*/
function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFilter.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XFilter.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return XFilter;
}();

var _xfilter =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xfilter(f, xf) {
  return new XFilter(f, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xfilter);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfind.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfind.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XFind =
/*#__PURE__*/
function () {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }

  XFind.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true;
      result = Object(_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'](result, input));
    }

    return result;
  };

  return XFind;
}();

var _xfind =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xfind(f, xf) {
  return new XFind(f, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xfind);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfindIndex.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfindIndex.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XFindIndex =
/*#__PURE__*/
function () {
  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }

  XFindIndex.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XFindIndex.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1);
    }

    return this.xf['@@transducer/result'](result);
  };

  XFindIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;

    if (this.f(input)) {
      this.found = true;
      result = Object(_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.xf['@@transducer/step'](result, this.idx));
    }

    return result;
  };

  return XFindIndex;
}();

var _xfindIndex =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xfindIndex(f, xf) {
  return new XFindIndex(f, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xfindIndex);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfindLast.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfindLast.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XFindLast =
/*#__PURE__*/
function () {
  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFindLast.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;

  XFindLast.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
  };

  XFindLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.last = input;
    }

    return result;
  };

  return XFindLast;
}();

var _xfindLast =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xfindLast(f, xf) {
  return new XFindLast(f, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xfindLast);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xfindLastIndex.js":
/*!***********************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xfindLastIndex.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XFindLastIndex =
/*#__PURE__*/
function () {
  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }

  XFindLastIndex.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;

  XFindLastIndex.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
  };

  XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1;

    if (this.f(input)) {
      this.lastIdx = this.idx;
    }

    return result;
  };

  return XFindLastIndex;
}();

var _xfindLastIndex =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xfindLastIndex(f, xf) {
  return new XFindLastIndex(f, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xfindLastIndex);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xmap.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xmap.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XMap =
/*#__PURE__*/
function () {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XMap.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XMap.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XMap.prototype['@@transducer/step'] = function (result, input) {
    return this.xf['@@transducer/step'](result, this.f(input));
  };

  return XMap;
}();

var _xmap =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xmap(f, xf) {
  return new XMap(f, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xmap);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xreduceBy.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xreduceBy.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curryN.js */ "./node_modules/ramda/es/internal/_curryN.js");
/* harmony import */ var _has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XReduceBy =
/*#__PURE__*/
function () {
  function XReduceBy(valueFn, valueAcc, keyFn, xf) {
    this.valueFn = valueFn;
    this.valueAcc = valueAcc;
    this.keyFn = keyFn;
    this.xf = xf;
    this.inputs = {};
  }

  XReduceBy.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;

  XReduceBy.prototype['@@transducer/result'] = function (result) {
    var key;

    for (key in this.inputs) {
      if (Object(_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(key, this.inputs)) {
        result = this.xf['@@transducer/step'](result, this.inputs[key]);

        if (result['@@transducer/reduced']) {
          result = result['@@transducer/value'];
          break;
        }
      }
    }

    this.inputs = null;
    return this.xf['@@transducer/result'](result);
  };

  XReduceBy.prototype['@@transducer/step'] = function (result, input) {
    var key = this.keyFn(input);
    this.inputs[key] = this.inputs[key] || [key, this.valueAcc];
    this.inputs[key][1] = this.valueFn(this.inputs[key][1], input);
    return result;
  };

  return XReduceBy;
}();

var _xreduceBy =
/*#__PURE__*/
Object(_curryN_js__WEBPACK_IMPORTED_MODULE_0__["default"])(4, [], function _xreduceBy(valueFn, valueAcc, keyFn, xf) {
  return new XReduceBy(valueFn, valueAcc, keyFn, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xreduceBy);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xtake.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xtake.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XTake =
/*#__PURE__*/
function () {
  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }

  XTake.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;
  XTake.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].result;

  XTake.prototype['@@transducer/step'] = function (result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.n >= 0 && this.i >= this.n ? Object(_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ret) : ret;
  };

  return XTake;
}();

var _xtake =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xtake(n, xf) {
  return new XTake(n, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xtake);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xtakeWhile.js":
/*!*******************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xtakeWhile.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");




var XTakeWhile =
/*#__PURE__*/
function () {
  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XTakeWhile.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].init;
  XTakeWhile.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_2__["default"].result;

  XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : Object(_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"])(result);
  };

  return XTakeWhile;
}();

var _xtakeWhile =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xtakeWhile(f, xf) {
  return new XTakeWhile(f, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xtakeWhile);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xtap.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xtap.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _xfBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_xfBase.js */ "./node_modules/ramda/es/internal/_xfBase.js");



var XTap =
/*#__PURE__*/
function () {
  function XTap(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XTap.prototype['@@transducer/init'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].init;
  XTap.prototype['@@transducer/result'] = _xfBase_js__WEBPACK_IMPORTED_MODULE_1__["default"].result;

  XTap.prototype['@@transducer/step'] = function (result, input) {
    this.f(input);
    return this.xf['@@transducer/step'](result, input);
  };

  return XTap;
}();

var _xtap =
/*#__PURE__*/
Object(_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function _xtap(f, xf) {
  return new XTap(f, xf);
});

/* harmony default export */ __webpack_exports__["default"] = (_xtap);

/***/ }),

/***/ "./node_modules/ramda/es/internal/_xwrap.js":
/*!**************************************************!*\
  !*** ./node_modules/ramda/es/internal/_xwrap.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _xwrap; });
var XWrap =
/*#__PURE__*/
function () {
  function XWrap(fn) {
    this.f = fn;
  }

  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };

  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };

  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return XWrap;
}();

function _xwrap(fn) {
  return new XWrap(fn);
}

/***/ }),

/***/ "./node_modules/ramda/es/intersection.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/intersection.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includes.js */ "./node_modules/ramda/es/internal/_includes.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_filter.js */ "./node_modules/ramda/es/internal/_filter.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flip.js */ "./node_modules/ramda/es/flip.js");
/* harmony import */ var _uniq_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./uniq.js */ "./node_modules/ramda/es/uniq.js");





/**
 * Combines two lists into a set (i.e. no duplicates) composed of those
 * elements common to both lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The list of elements found in both `list1` and `list2`.
 * @see R.innerJoin
 * @example
 *
 *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
 */

var intersection =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function intersection(list1, list2) {
  var lookupList, filteredList;

  if (list1.length > list2.length) {
    lookupList = list1;
    filteredList = list2;
  } else {
    lookupList = list2;
    filteredList = list1;
  }

  return Object(_uniq_js__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_internal_filter_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_flip_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_internal_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(lookupList), filteredList));
});

/* harmony default export */ __webpack_exports__["default"] = (intersection);

/***/ }),

/***/ "./node_modules/ramda/es/intersperse.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/intersperse.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('a', ['b', 'n', 'n', 's']); //=> ['b', 'a', 'n', 'a', 'n', 'a', 's']
 */

var intersperse =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
Object(_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__["default"])('intersperse', function intersperse(separator, list) {
  var out = [];
  var idx = 0;
  var length = list.length;

  while (idx < length) {
    if (idx === length - 1) {
      out.push(list[idx]);
    } else {
      out.push(list[idx], separator);
    }

    idx += 1;
  }

  return out;
}));

/* harmony default export */ __webpack_exports__["default"] = (intersperse);

/***/ }),

/***/ "./node_modules/ramda/es/into.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/into.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_clone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_clone.js */ "./node_modules/ramda/es/internal/_clone.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_isTransformer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isTransformer.js */ "./node_modules/ramda/es/internal/_isTransformer.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_stepCat_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_stepCat.js */ "./node_modules/ramda/es/internal/_stepCat.js");





/**
 * Transforms the items of the list with the transducer and appends the
 * transformed items to the accumulator using an appropriate iterator function
 * based on the accumulator type.
 *
 * The accumulator can be an array, string, object or a transformer. Iterated
 * items will be appended to arrays and concatenated to strings. Objects will
 * be merged directly or 2-item arrays will be merged as key, value pairs.
 *
 * The accumulator can also be a transformer object that provides a 2-arity
 * reducing iterator function, step, 0-arity initial value function, init, and
 * 1-arity result extraction function result. The step function is used as the
 * iterator function in reduce. The result function is used to convert the
 * final accumulator into the return type and in most cases is R.identity. The
 * init function is used to provide the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the
 * transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig a -> (b -> b) -> [c] -> a
 * @param {*} acc The initial accumulator value.
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.transduce
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *
 *      R.into([], transducer, numbers); //=> [2, 3]
 *
 *      const intoArray = R.into([]);
 *      intoArray(transducer, numbers); //=> [2, 3]
 */

var into =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function into(acc, xf, list) {
  return Object(_internal_isTransformer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(acc) ? Object(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__["default"])(xf(acc), acc['@@transducer/init'](), list) : Object(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__["default"])(xf(Object(_internal_stepCat_js__WEBPACK_IMPORTED_MODULE_4__["default"])(acc)), Object(_internal_clone_js__WEBPACK_IMPORTED_MODULE_0__["default"])(acc, [], [], false), list);
});

/* harmony default export */ __webpack_exports__["default"] = (into);

/***/ }),

/***/ "./node_modules/ramda/es/invert.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/invert.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");



/**
 * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
 * duplicate values by putting the values into an array.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys in an array.
 * @see R.invertObj
 * @example
 *
 *      const raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 */

var invert =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function invert(obj) {
  var props = Object(_keys_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    var val = obj[key];
    var list = Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val, out) ? out[val] : out[val] = [];
    list[list.length] = key;
    idx += 1;
  }

  return out;
});

/* harmony default export */ __webpack_exports__["default"] = (invert);

/***/ }),

/***/ "./node_modules/ramda/es/invertObj.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/invertObj.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");


/**
 * Returns a new object with the keys of the given object as values, and the
 * values of the given object, which are coerced to strings, as keys. Note
 * that the last key found is preferred when handling the same value.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @see R.invert
 * @example
 *
 *      const raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      const raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */

var invertObj =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function invertObj(obj) {
  var props = Object(_keys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj);
  var len = props.length;
  var idx = 0;
  var out = {};

  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }

  return out;
});

/* harmony default export */ __webpack_exports__["default"] = (invertObj);

/***/ }),

/***/ "./node_modules/ramda/es/invoker.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/invoker.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isFunction.js */ "./node_modules/ramda/es/internal/_isFunction.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toString.js */ "./node_modules/ramda/es/toString.js");




/**
 * Turns a named method with a specified arity into a function that can be
 * called directly supplied with arguments and a target object.
 *
 * The returned function is curried and accepts `arity + 1` parameters where
 * the final parameter is the target object.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
 * @param {Number} arity Number of arguments the returned function should take
 *        before the target object.
 * @param {String} method Name of any of the target object's methods to call.
 * @return {Function} A new curried function.
 * @see R.construct
 * @example
 *
 *      const sliceFrom = R.invoker(1, 'slice');
 *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
 *      const sliceFrom6 = R.invoker(2, 'slice')(6);
 *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
 *
 *      const dog = {
 *        speak: async () => 'Woof!'
 *      };
 *      const speak = R.invoker(0, 'speak');
 *      speak(dog).then(console.log) //~> 'Woof!'
 *
 * @symb R.invoker(0, 'method')(o) = o['method']()
 * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
 * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
 */

var invoker =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function invoker(arity, method) {
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arity + 1, function () {
    var target = arguments[arity];

    if (target != null && Object(_internal_isFunction_js__WEBPACK_IMPORTED_MODULE_1__["default"])(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }

    throw new TypeError(Object(_toString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target) + ' does not have a method named "' + method + '"');
  });
});

/* harmony default export */ __webpack_exports__["default"] = (invoker);

/***/ }),

/***/ "./node_modules/ramda/es/is.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/is.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * See if an object (`val`) is an instance of the supplied constructor. This
 * function will check up the inheritance chain, if any.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Type
 * @sig (* -> {*}) -> a -> Boolean
 * @param {Object} ctor A constructor
 * @param {*} val The value to test
 * @return {Boolean}
 * @example
 *
 *      R.is(Object, {}); //=> true
 *      R.is(Number, 1); //=> true
 *      R.is(Object, 1); //=> false
 *      R.is(String, 's'); //=> true
 *      R.is(String, new String('')); //=> true
 *      R.is(Object, new String('')); //=> true
 *      R.is(Object, 's'); //=> false
 *      R.is(Number, {}); //=> false
 */

var is =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function is(Ctor, val) {
  return val != null && val.constructor === Ctor || val instanceof Ctor;
});

/* harmony default export */ __webpack_exports__["default"] = (is);

/***/ }),

/***/ "./node_modules/ramda/es/isEmpty.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/isEmpty.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty.js */ "./node_modules/ramda/es/empty.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");



/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */

var isEmpty =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function isEmpty(x) {
  return x != null && Object(_equals_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x, Object(_empty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(x));
});

/* harmony default export */ __webpack_exports__["default"] = (isEmpty);

/***/ }),

/***/ "./node_modules/ramda/es/isNil.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/isNil.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */

var isNil =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function isNil(x) {
  return x == null;
});

/* harmony default export */ __webpack_exports__["default"] = (isNil);

/***/ }),

/***/ "./node_modules/ramda/es/join.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/join.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker.js */ "./node_modules/ramda/es/invoker.js");

/**
 * Returns a string made by inserting the `separator` between each element and
 * concatenating all the elements into a single string.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig String -> [a] -> String
 * @param {Number|String} separator The string used to separate the elements.
 * @param {Array} xs The elements to join into a string.
 * @return {String} str The string made by concatenating `xs` with `separator`.
 * @see R.split
 * @example
 *
 *      const spacer = R.join(' ');
 *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
 *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
 */

var join =
/*#__PURE__*/
Object(_invoker_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 'join');
/* harmony default export */ __webpack_exports__["default"] = (join);

/***/ }),

/***/ "./node_modules/ramda/es/juxt.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/juxt.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _converge_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./converge.js */ "./node_modules/ramda/es/converge.js");


/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @see R.applySpec
 * @example
 *
 *      const getRange = R.juxt([Math.min, Math.max]);
 *      getRange(3, 4, 9, -3); //=> [-3, 9]
 * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
 */

var juxt =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function juxt(fns) {
  return Object(_converge_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function () {
    return Array.prototype.slice.call(arguments, 0);
  }, fns);
});

/* harmony default export */ __webpack_exports__["default"] = (juxt);

/***/ }),

/***/ "./node_modules/ramda/es/keys.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/keys.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _internal_isArguments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isArguments.js */ "./node_modules/ramda/es/internal/_isArguments.js");


 // cover IE < 9 keys issues

var hasEnumBug = !
/*#__PURE__*/
{
  toString: null
}.propertyIsEnumerable('toString');
var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug

var hasArgsEnumBug =
/*#__PURE__*/
function () {
  'use strict';

  return arguments.propertyIsEnumerable('length');
}();

var contains = function contains(list, item) {
  var idx = 0;

  while (idx < list.length) {
    if (list[idx] === item) {
      return true;
    }

    idx += 1;
  }

  return false;
};
/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */


var keys = typeof Object.keys === 'function' && !hasArgsEnumBug ?
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function keys(obj) {
  return Object(obj) !== obj ? [] : Object.keys(obj);
}) :
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function keys(obj) {
  if (Object(obj) !== obj) {
    return [];
  }

  var prop, nIdx;
  var ks = [];

  var checkArgsLength = hasArgsEnumBug && Object(_internal_isArguments_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj);

  for (prop in obj) {
    if (Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop, obj) && (!checkArgsLength || prop !== 'length')) {
      ks[ks.length] = prop;
    }
  }

  if (hasEnumBug) {
    nIdx = nonEnumerableProps.length - 1;

    while (nIdx >= 0) {
      prop = nonEnumerableProps[nIdx];

      if (Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop, obj) && !contains(ks, prop)) {
        ks[ks.length] = prop;
      }

      nIdx -= 1;
    }
  }

  return ks;
});
/* harmony default export */ __webpack_exports__["default"] = (keys);

/***/ }),

/***/ "./node_modules/ramda/es/keysIn.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/keysIn.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Returns a list containing the names of all the properties of the supplied
 * object, including prototype properties.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own and prototype properties.
 * @see R.keys, R.valuesIn
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.keysIn(f); //=> ['x', 'y']
 */

var keysIn =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function keysIn(obj) {
  var prop;
  var ks = [];

  for (prop in obj) {
    ks[ks.length] = prop;
  }

  return ks;
});

/* harmony default export */ __webpack_exports__["default"] = (keysIn);

/***/ }),

/***/ "./node_modules/ramda/es/last.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/last.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");

/**
 * Returns the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.init, R.head, R.tail
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 *
 *      R.last('abc'); //=> 'c'
 *      R.last(''); //=> ''
 */

var last =
/*#__PURE__*/
Object(_nth_js__WEBPACK_IMPORTED_MODULE_0__["default"])(-1);
/* harmony default export */ __webpack_exports__["default"] = (last);

/***/ }),

/***/ "./node_modules/ramda/es/lastIndexOf.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/lastIndexOf.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isArray.js */ "./node_modules/ramda/es/internal/_isArray.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");



/**
 * Returns the position of the last occurrence of an item in an array, or -1 if
 * the item is not included in the array. [`R.equals`](#equals) is used to
 * determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Number
 * @param {*} target The item to find.
 * @param {Array} xs The array to search in.
 * @return {Number} the index of the target, or -1 if the target is not found.
 * @see R.indexOf
 * @example
 *
 *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
 *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
 */

var lastIndexOf =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lastIndexOf(target, xs) {
  if (typeof xs.lastIndexOf === 'function' && !Object(_internal_isArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(xs)) {
    return xs.lastIndexOf(target);
  } else {
    var idx = xs.length - 1;

    while (idx >= 0) {
      if (Object(_equals_js__WEBPACK_IMPORTED_MODULE_2__["default"])(xs[idx], target)) {
        return idx;
      }

      idx -= 1;
    }

    return -1;
  }
});

/* harmony default export */ __webpack_exports__["default"] = (lastIndexOf);

/***/ }),

/***/ "./node_modules/ramda/es/length.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/length.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isNumber.js */ "./node_modules/ramda/es/internal/_isNumber.js");


/**
 * Returns the number of elements in the array by returning `list.length`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {Array} list The array to inspect.
 * @return {Number} The length of the array.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 */

var length =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function length(list) {
  return list != null && Object(_internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list.length) ? list.length : NaN;
});

/* harmony default export */ __webpack_exports__["default"] = (length);

/***/ }),

/***/ "./node_modules/ramda/es/lens.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/lens.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");


/**
 * Returns a lens for the given getter and setter functions. The getter "gets"
 * the value of the focus; the setter "sets" the value of the focus. The setter
 * should not mutate the data structure.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
 * @param {Function} getter
 * @param {Function} setter
 * @return {Lens}
 * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
 * @example
 *
 *      const xLens = R.lens(R.prop('x'), R.assoc('x'));
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */

var lens =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lens(getter, setter) {
  return function (toFunctorFn) {
    return function (target) {
      return Object(_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (focus) {
        return setter(focus, target);
      }, toFunctorFn(getter(target)));
    };
  };
});

/* harmony default export */ __webpack_exports__["default"] = (lens);

/***/ }),

/***/ "./node_modules/ramda/es/lensIndex.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/lensIndex.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _lens_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lens.js */ "./node_modules/ramda/es/lens.js");
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");
/* harmony import */ var _update_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./update.js */ "./node_modules/ramda/es/update.js");




/**
 * Returns a lens whose focus is the specified index.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Number -> Lens s a
 * @param {Number} n
 * @return {Lens}
 * @see R.view, R.set, R.over, R.nth
 * @example
 *
 *      const headLens = R.lensIndex(0);
 *
 *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
 *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
 *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
 */

var lensIndex =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lensIndex(n) {
  return Object(_lens_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_nth_js__WEBPACK_IMPORTED_MODULE_2__["default"])(n), Object(_update_js__WEBPACK_IMPORTED_MODULE_3__["default"])(n));
});

/* harmony default export */ __webpack_exports__["default"] = (lensIndex);

/***/ }),

/***/ "./node_modules/ramda/es/lensPath.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/lensPath.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _assocPath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assocPath.js */ "./node_modules/ramda/es/assocPath.js");
/* harmony import */ var _lens_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lens.js */ "./node_modules/ramda/es/lens.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");




/**
 * Returns a lens whose focus is the specified path.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @typedefn Idx = String | Int
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig [Idx] -> Lens s a
 * @param {Array} path The path to use.
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      const xHeadYLens = R.lensPath(['x', 0, 'y']);
 *
 *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> 2
 *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
 *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
 *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
 */

var lensPath =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lensPath(p) {
  return Object(_lens_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_path_js__WEBPACK_IMPORTED_MODULE_3__["default"])(p), Object(_assocPath_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p));
});

/* harmony default export */ __webpack_exports__["default"] = (lensPath);

/***/ }),

/***/ "./node_modules/ramda/es/lensProp.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/lensProp.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _assoc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assoc.js */ "./node_modules/ramda/es/assoc.js");
/* harmony import */ var _lens_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lens.js */ "./node_modules/ramda/es/lens.js");
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/es/prop.js");




/**
 * Returns a lens whose focus is the specified property.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig String -> Lens s a
 * @param {String} k
 * @return {Lens}
 * @see R.view, R.set, R.over
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});            //=> 1
 *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
 *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
 */

var lensProp =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lensProp(k) {
  return Object(_lens_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_prop_js__WEBPACK_IMPORTED_MODULE_3__["default"])(k), Object(_assoc_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k));
});

/* harmony default export */ __webpack_exports__["default"] = (lensProp);

/***/ }),

/***/ "./node_modules/ramda/es/lift.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/lift.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _liftN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./liftN.js */ "./node_modules/ramda/es/liftN.js");


/**
 * "lifts" a function of arity > 1 so that it may "map over" a list, Function or other
 * object that satisfies the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.liftN
 * @example
 *
 *      const madd3 = R.lift((a, b, c) => a + b + c);
 *
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 *
 *      const madd5 = R.lift((a, b, c, d, e) => a + b + c + d + e);
 *
 *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
 */

var lift =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lift(fn) {
  return Object(_liftN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn.length, fn);
});

/* harmony default export */ __webpack_exports__["default"] = (lift);

/***/ }),

/***/ "./node_modules/ramda/es/liftN.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/liftN.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _ap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ap.js */ "./node_modules/ramda/es/ap.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");





/**
 * "lifts" a function to be the specified arity, so that it may "map over" that
 * many lists, Functions or other objects that satisfy the [FantasyLand Apply spec](https://github.com/fantasyland/fantasy-land#apply).
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function.
 * @see R.lift, R.ap
 * @example
 *
 *      const madd3 = R.liftN(3, (...args) => R.sum(args));
 *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */

var liftN =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function liftN(arity, fn) {
  var lifted = Object(_curryN_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arity, fn);
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arity, function () {
    return Object(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_ap_js__WEBPACK_IMPORTED_MODULE_2__["default"], Object(_map_js__WEBPACK_IMPORTED_MODULE_4__["default"])(lifted, arguments[0]), Array.prototype.slice.call(arguments, 1));
  });
});

/* harmony default export */ __webpack_exports__["default"] = (liftN);

/***/ }),

/***/ "./node_modules/ramda/es/lt.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/lt.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns `true` if the first argument is less than the second; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see R.gt
 * @example
 *
 *      R.lt(2, 1); //=> false
 *      R.lt(2, 2); //=> false
 *      R.lt(2, 3); //=> true
 *      R.lt('a', 'z'); //=> true
 *      R.lt('z', 'a'); //=> false
 */

var lt =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lt(a, b) {
  return a < b;
});

/* harmony default export */ __webpack_exports__["default"] = (lt);

/***/ }),

/***/ "./node_modules/ramda/es/lte.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/lte.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns `true` if the first argument is less than or equal to the second;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> Boolean
 * @param {Number} a
 * @param {Number} b
 * @return {Boolean}
 * @see R.gte
 * @example
 *
 *      R.lte(2, 1); //=> false
 *      R.lte(2, 2); //=> true
 *      R.lte(2, 3); //=> true
 *      R.lte('a', 'z'); //=> true
 *      R.lte('z', 'a'); //=> false
 */

var lte =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function lte(a, b) {
  return a <= b;
});

/* harmony default export */ __webpack_exports__["default"] = (lte);

/***/ }),

/***/ "./node_modules/ramda/es/map.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/map.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_xmap_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_xmap.js */ "./node_modules/ramda/es/internal/_xmap.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");







/**
 * Takes a function and
 * a [functor](https://github.com/fantasyland/fantasy-land#functor),
 * applies the function to each of the functor's values, and returns
 * a functor of the same shape.
 *
 * Ramda provides suitable `map` implementations for `Array` and `Object`,
 * so this function may be applied to `[1, 2, 3]` or `{x: 1, y: 2, z: 3}`.
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce, R.addIndex
 * @example
 *
 *      const double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 * @symb R.map(f, [a, b]) = [f(a), f(b)]
 * @symb R.map(f, { x: a, y: b }) = { x: f(a), y: f(b) }
 * @symb R.map(f, functor_o) = functor_o.map(f)
 */

var map =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['fantasy-land/map', 'map'], _internal_xmap_js__WEBPACK_IMPORTED_MODULE_4__["default"], function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_5__["default"])(functor.length, function () {
        return fn.call(this, functor.apply(this, arguments));
      });

    case '[object Object]':
      return Object(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__["default"])(function (acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, Object(_keys_js__WEBPACK_IMPORTED_MODULE_6__["default"])(functor));

    default:
      return Object(_internal_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(fn, functor);
  }
}));

/* harmony default export */ __webpack_exports__["default"] = (map);

/***/ }),

/***/ "./node_modules/ramda/es/mapAccum.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/mapAccum.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * The `mapAccum` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from left to right, and returning a final value of this
 * accumulator together with the new list.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.scan, R.addIndex, R.mapAccumRight
 * @example
 *
 *      const digits = ['1', '2', '3', '4'];
 *      const appender = (a, b) => [a + b, a + b];
 *
 *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
 * @symb R.mapAccum(f, a, [b, c, d]) = [
 *   f(f(f(a, b)[0], c)[0], d)[0],
 *   [
 *     f(a, b)[1],
 *     f(f(a, b)[0], c)[1],
 *     f(f(f(a, b)[0], c)[0], d)[1]
 *   ]
 * ]
 */

var mapAccum =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mapAccum(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var tuple = [acc];

  while (idx < len) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx += 1;
  }

  return [tuple[0], result];
});

/* harmony default export */ __webpack_exports__["default"] = (mapAccum);

/***/ }),

/***/ "./node_modules/ramda/es/mapAccumRight.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mapAccumRight.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * The `mapAccumRight` function behaves like a combination of map and reduce; it
 * applies a function to each element of a list, passing an accumulating
 * parameter from right to left, and returning a final value of this
 * accumulator together with the new list.
 *
 * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
 * the right to the left.
 *
 * The iterator function receives two arguments, *acc* and *value*, and should
 * return a tuple *[acc, value]*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.addIndex, R.mapAccum
 * @example
 *
 *      const digits = ['1', '2', '3', '4'];
 *      const appender = (a, b) => [b + a, b + a];
 *
 *      R.mapAccumRight(appender, 5, digits); //=> ['12345', ['12345', '2345', '345', '45']]
 * @symb R.mapAccumRight(f, a, [b, c, d]) = [
 *   f(f(f(a, d)[0], c)[0], b)[0],
 *   [
 *     f(a, d)[1],
 *     f(f(a, d)[0], c)[1],
 *     f(f(f(a, d)[0], c)[0], b)[1]
 *   ]
 * ]
 */

var mapAccumRight =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mapAccumRight(fn, acc, list) {
  var idx = list.length - 1;
  var result = [];
  var tuple = [acc];

  while (idx >= 0) {
    tuple = fn(tuple[0], list[idx]);
    result[idx] = tuple[1];
    idx -= 1;
  }

  return [tuple[0], result];
});

/* harmony default export */ __webpack_exports__["default"] = (mapAccumRight);

/***/ }),

/***/ "./node_modules/ramda/es/mapObjIndexed.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mapObjIndexed.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");



/**
 * An Object-specific version of [`map`](#map). The function is applied to three
 * arguments: *(value, key, obj)*. If only the value is significant, use
 * [`map`](#map) instead.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig ((*, String, Object) -> *) -> Object -> Object
 * @param {Function} fn
 * @param {Object} obj
 * @return {Object}
 * @see R.map
 * @example
 *
 *      const xyz = { x: 1, y: 2, z: 3 };
 *      const prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, xyz); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */

var mapObjIndexed =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mapObjIndexed(fn, obj) {
  return Object(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, Object(_keys_js__WEBPACK_IMPORTED_MODULE_2__["default"])(obj));
});

/* harmony default export */ __webpack_exports__["default"] = (mapObjIndexed);

/***/ }),

/***/ "./node_modules/ramda/es/match.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/match.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Tests a regular expression against a String. Note that this function will
 * return an empty array when there are no matches. This differs from
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */

var match =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function match(rx, str) {
  return str.match(rx) || [];
});

/* harmony default export */ __webpack_exports__["default"] = (match);

/***/ }),

/***/ "./node_modules/ramda/es/mathMod.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/mathMod.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");


/**
 * `mathMod` behaves like the modulo operator should mathematically, unlike the
 * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
 * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
 * arguments, and returns NaN when the modulus is zero or negative.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} m The dividend.
 * @param {Number} p the modulus.
 * @return {Number} The result of `b mod a`.
 * @see R.modulo
 * @example
 *
 *      R.mathMod(-17, 5);  //=> 3
 *      R.mathMod(17, 5);   //=> 2
 *      R.mathMod(17, -5);  //=> NaN
 *      R.mathMod(17, 0);   //=> NaN
 *      R.mathMod(17.2, 5); //=> NaN
 *      R.mathMod(17, 5.3); //=> NaN
 *
 *      const clock = R.mathMod(R.__, 12);
 *      clock(15); //=> 3
 *      clock(24); //=> 0
 *
 *      const seventeenMod = R.mathMod(17);
 *      seventeenMod(3);  //=> 2
 *      seventeenMod(4);  //=> 1
 *      seventeenMod(10); //=> 7
 */

var mathMod =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mathMod(m, p) {
  if (!Object(_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(m)) {
    return NaN;
  }

  if (!Object(_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p) || p < 1) {
    return NaN;
  }

  return (m % p + p) % p;
});

/* harmony default export */ __webpack_exports__["default"] = (mathMod);

/***/ }),

/***/ "./node_modules/ramda/es/max.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/max.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns the larger of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.maxBy, R.min
 * @example
 *
 *      R.max(789, 123); //=> 789
 *      R.max('a', 'b'); //=> 'b'
 */

var max =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function max(a, b) {
  return b > a ? b : a;
});

/* harmony default export */ __webpack_exports__["default"] = (max);

/***/ }),

/***/ "./node_modules/ramda/es/maxBy.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/maxBy.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Takes a function and two values, and returns whichever value produces the
 * larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      //  square :: Number -> Number
 *      const square = n => n * n;
 *
 *      R.maxBy(square, -3, 2); //=> -3
 *
 *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
 *      R.reduce(R.maxBy(square), 0, []); //=> 0
 */

var maxBy =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});

/* harmony default export */ __webpack_exports__["default"] = (maxBy);

/***/ }),

/***/ "./node_modules/ramda/es/mean.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/mean.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _sum_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sum.js */ "./node_modules/ramda/es/sum.js");


/**
 * Returns the mean of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.median
 * @example
 *
 *      R.mean([2, 7, 9]); //=> 6
 *      R.mean([]); //=> NaN
 */

var mean =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mean(list) {
  return Object(_sum_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list) / list.length;
});

/* harmony default export */ __webpack_exports__["default"] = (mean);

/***/ }),

/***/ "./node_modules/ramda/es/median.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/median.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _mean_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mean.js */ "./node_modules/ramda/es/mean.js");


/**
 * Returns the median of the given list of numbers.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list
 * @return {Number}
 * @see R.mean
 * @example
 *
 *      R.median([2, 9, 7]); //=> 7
 *      R.median([7, 2, 10, 9]); //=> 8
 *      R.median([]); //=> NaN
 */

var median =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function median(list) {
  var len = list.length;

  if (len === 0) {
    return NaN;
  }

  var width = 2 - len % 2;
  var idx = (len - width) / 2;
  return Object(_mean_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Array.prototype.slice.call(list, 0).sort(function (a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }).slice(idx, idx + width));
});

/* harmony default export */ __webpack_exports__["default"] = (median);

/***/ }),

/***/ "./node_modules/ramda/es/memoizeWith.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/memoizeWith.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");



/**
 * Creates a new function that, when invoked, caches the result of calling `fn`
 * for a given argument set and returns the result. Subsequent calls to the
 * memoized `fn` with the same argument set will not result in an additional
 * call to `fn`; instead, the cached result for that set of arguments will be
 * returned.
 *
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to generate the cache key.
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @example
 *
 *      let count = 0;
 *      const factorial = R.memoizeWith(R.identity, n => {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */

var memoizeWith =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function memoizeWith(mFn, fn) {
  var cache = {};
  return Object(_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fn.length, function () {
    var key = mFn.apply(this, arguments);

    if (!Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_2__["default"])(key, cache)) {
      cache[key] = fn.apply(this, arguments);
    }

    return cache[key];
  });
});

/* harmony default export */ __webpack_exports__["default"] = (memoizeWith);

/***/ }),

/***/ "./node_modules/ramda/es/merge.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/merge.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_objectAssign.js */ "./node_modules/ramda/es/internal/_objectAssign.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeRight, R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @deprecated since v0.26.0
 * @example
 *
 *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const withDefaults = R.merge({x: 0, y: 0});
 *      withDefaults({y: 2}); //=> {x: 0, y: 2}
 * @symb R.merge(a, b) = {...a, ...b}
 */

var merge =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function merge(l, r) {
  return Object(_internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, l, r);
});

/* harmony default export */ __webpack_exports__["default"] = (merge);

/***/ }),

/***/ "./node_modules/ramda/es/mergeAll.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/mergeAll.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_objectAssign.js */ "./node_modules/ramda/es/internal/_objectAssign.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");


/**
 * Merges a list of objects together into one object.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig [{k: v}] -> {k: v}
 * @param {Array} list An array of objects
 * @return {Object} A merged object.
 * @see R.reduce
 * @example
 *
 *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
 *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
 * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
 */

var mergeAll =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function mergeAll(list) {
  return _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__["default"].apply(null, [{}].concat(list));
});

/* harmony default export */ __webpack_exports__["default"] = (mergeAll);

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepLeft.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepLeft.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeDeepWithKey.js */ "./node_modules/ramda/es/mergeDeepWithKey.js");


/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                      { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
 */

var mergeDeepLeft =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeDeepLeft(lObj, rObj) {
  return Object(_mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (k, lVal, rVal) {
    return lVal;
  }, lObj, rObj);
});

/* harmony default export */ __webpack_exports__["default"] = (mergeDeepLeft);

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepRight.js":
/*!*************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepRight.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeDeepWithKey.js */ "./node_modules/ramda/es/mergeDeepWithKey.js");


/**
 * Creates a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects:
 * - and both values are objects, the two values will be recursively merged
 * - otherwise the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig {a} -> {a} -> {a}
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
 *                       { age: 40, contact: { email: 'baa@example.com' }});
 *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
 */

var mergeDeepRight =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeDeepRight(lObj, rObj) {
  return Object(_mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (k, lVal, rVal) {
    return rVal;
  }, lObj, rObj);
});

/* harmony default export */ __webpack_exports__["default"] = (mergeDeepRight);

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepWith.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepWith.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeDeepWithKey.js */ "./node_modules/ramda/es/mergeDeepWithKey.js");


/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to associated values using the
 *   resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWith, R.mergeDeepWithKey
 * @example
 *
 *      R.mergeDeepWith(R.concat,
 *                      { a: true, c: { values: [10, 20] }},
 *                      { b: true, c: { values: [15, 35] }});
 *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
 */

var mergeDeepWith =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeDeepWith(fn, lObj, rObj) {
  return Object(_mergeDeepWithKey_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (k, lVal, rVal) {
    return fn(lVal, rVal);
  }, lObj, rObj);
});

/* harmony default export */ __webpack_exports__["default"] = (mergeDeepWith);

/***/ }),

/***/ "./node_modules/ramda/es/mergeDeepWithKey.js":
/*!***************************************************!*\
  !*** ./node_modules/ramda/es/mergeDeepWithKey.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_isObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isObject.js */ "./node_modules/ramda/es/internal/_isObject.js");
/* harmony import */ var _mergeWithKey_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mergeWithKey.js */ "./node_modules/ramda/es/mergeWithKey.js");



/**
 * Creates a new object with the own properties of the two provided objects.
 * If a key exists in both objects:
 * - and both associated values are also objects then the values will be
 *   recursively merged.
 * - otherwise the provided function is applied to the key and associated values
 *   using the resulting value as the new value associated with the key.
 * If a key only exists in one object, the value will be associated with the key
 * of the resulting object.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} lObj
 * @param {Object} rObj
 * @return {Object}
 * @see R.mergeWithKey, R.mergeDeepWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeDeepWithKey(concatValues,
 *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
 *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
 *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
 */

var mergeDeepWithKey =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeDeepWithKey(fn, lObj, rObj) {
  return Object(_mergeWithKey_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function (k, lVal, rVal) {
    if (Object(_internal_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(lVal) && Object(_internal_isObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rVal)) {
      return mergeDeepWithKey(fn, lVal, rVal);
    } else {
      return fn(k, lVal, rVal);
    }
  }, lObj, rObj);
});

/* harmony default export */ __webpack_exports__["default"] = (mergeDeepWithKey);

/***/ }),

/***/ "./node_modules/ramda/es/mergeLeft.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/mergeLeft.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_objectAssign.js */ "./node_modules/ramda/es/internal/_objectAssign.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the first object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeRight, R.mergeDeepLeft, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const resetToDefault = R.mergeLeft({x: 0});
 *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeLeft(a, b) = {...b, ...a}
 */

var mergeLeft =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function mergeLeft(l, r) {
  return Object(_internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, r, l);
});

/* harmony default export */ __webpack_exports__["default"] = (mergeLeft);

/***/ }),

/***/ "./node_modules/ramda/es/mergeRight.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/mergeRight.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_objectAssign.js */ "./node_modules/ramda/es/internal/_objectAssign.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Create a new object with the own properties of the first object merged with
 * the own properties of the second object. If a key exists in both objects,
 * the value from the second object will be used.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeLeft, R.mergeDeepRight, R.mergeWith, R.mergeWithKey
 * @example
 *
 *      R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
 *      //=> { 'name': 'fred', 'age': 40 }
 *
 *      const withDefaults = R.mergeRight({x: 0, y: 0});
 *      withDefaults({y: 2}); //=> {x: 0, y: 2}
 * @symb R.mergeRight(a, b) = {...a, ...b}
 */

var mergeRight =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function mergeRight(l, r) {
  return Object(_internal_objectAssign_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, l, r);
});

/* harmony default export */ __webpack_exports__["default"] = (mergeRight);

/***/ }),

/***/ "./node_modules/ramda/es/mergeWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/mergeWith.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _mergeWithKey_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergeWithKey.js */ "./node_modules/ramda/es/mergeWithKey.js");


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the values
 * associated with the key in each object, with the result being used as the
 * value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWith, R.merge, R.mergeWithKey
 * @example
 *
 *      R.mergeWith(R.concat,
 *                  { a: true, values: [10, 20] },
 *                  { b: true, values: [15, 35] });
 *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
 */

var mergeWith =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeWith(fn, l, r) {
  return Object(_mergeWithKey_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_, _l, _r) {
    return fn(_l, _r);
  }, l, r);
});

/* harmony default export */ __webpack_exports__["default"] = (mergeWith);

/***/ }),

/***/ "./node_modules/ramda/es/mergeWithKey.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/mergeWithKey.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");


/**
 * Creates a new object with the own properties of the two provided objects. If
 * a key exists in both objects, the provided function is applied to the key
 * and the values associated with the key in each object, with the result being
 * used as the value associated with the key in the returned object.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Object
 * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
 * @param {Function} fn
 * @param {Object} l
 * @param {Object} r
 * @return {Object}
 * @see R.mergeDeepWithKey, R.merge, R.mergeWith
 * @example
 *
 *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
 *      R.mergeWithKey(concatValues,
 *                     { a: true, thing: 'foo', values: [10, 20] },
 *                     { b: true, thing: 'bar', values: [15, 35] });
 *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
 * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
 */

var mergeWithKey =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function mergeWithKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if (Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k, l)) {
      result[k] = Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k, r) ? fn(k, l[k], r[k]) : l[k];
    }
  }

  for (k in r) {
    if (Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k, r) && !Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(k, result)) {
      result[k] = r[k];
    }
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (mergeWithKey);

/***/ }),

/***/ "./node_modules/ramda/es/min.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/min.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns the smaller of its two arguments.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord a => a -> a -> a
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.minBy, R.max
 * @example
 *
 *      R.min(789, 123); //=> 123
 *      R.min('a', 'b'); //=> 'a'
 */

var min =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function min(a, b) {
  return b < a ? b : a;
});

/* harmony default export */ __webpack_exports__["default"] = (min);

/***/ }),

/***/ "./node_modules/ramda/es/minBy.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/minBy.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Takes a function and two values, and returns whichever value produces the
 * smaller result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.min, R.maxBy
 * @example
 *
 *      //  square :: Number -> Number
 *      const square = n => n * n;
 *
 *      R.minBy(square, -3, 2); //=> 2
 *
 *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
 *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
 */

var minBy =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function minBy(f, a, b) {
  return f(b) < f(a) ? b : a;
});

/* harmony default export */ __webpack_exports__["default"] = (minBy);

/***/ }),

/***/ "./node_modules/ramda/es/modulo.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/modulo.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Divides the first parameter by the second and returns the remainder. Note
 * that this function preserves the JavaScript-style behavior for modulo. For
 * mathematical modulo see [`mathMod`](#mathMod).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The value to the divide.
 * @param {Number} b The pseudo-modulus
 * @return {Number} The result of `b % a`.
 * @see R.mathMod
 * @example
 *
 *      R.modulo(17, 3); //=> 2
 *      // JS behavior:
 *      R.modulo(-17, 3); //=> -2
 *      R.modulo(17, -3); //=> 2
 *
 *      const isOdd = R.modulo(R.__, 2);
 *      isOdd(42); //=> 0
 *      isOdd(21); //=> 1
 */

var modulo =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function modulo(a, b) {
  return a % b;
});

/* harmony default export */ __webpack_exports__["default"] = (modulo);

/***/ }),

/***/ "./node_modules/ramda/es/move.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/move.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Move an item, at index `from`, to index `to`, in a list of elements.
 * A new list will be created containing the new elements order.
 *
 * @func
 * @memberOf R
 * @since v0.27.0
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} from The source index
 * @param {Number} to The destination index
 * @param {Array} list The list which will serve to realise the move
 * @return {Array} The new list reordered
 * @example
 *
 *      R.move(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['b', 'c', 'a', 'd', 'e', 'f']
 *      R.move(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'a', 'b', 'c', 'd', 'e'] list rotation
 */

var move =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (from, to, list) {
  var length = list.length;
  var result = list.slice();
  var positiveFrom = from < 0 ? length + from : from;
  var positiveTo = to < 0 ? length + to : to;
  var item = result.splice(positiveFrom, 1);
  return positiveFrom < 0 || positiveFrom >= list.length || positiveTo < 0 || positiveTo >= list.length ? list : [].concat(result.slice(0, positiveTo)).concat(item).concat(result.slice(positiveTo, list.length));
});

/* harmony default export */ __webpack_exports__["default"] = (move);

/***/ }),

/***/ "./node_modules/ramda/es/multiply.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/multiply.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Multiplies two numbers. Equivalent to `a * b` but curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a * b`.
 * @see R.divide
 * @example
 *
 *      const double = R.multiply(2);
 *      const triple = R.multiply(3);
 *      double(3);       //=>  6
 *      triple(4);       //=> 12
 *      R.multiply(2, 5);  //=> 10
 */

var multiply =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function multiply(a, b) {
  return a * b;
});

/* harmony default export */ __webpack_exports__["default"] = (multiply);

/***/ }),

/***/ "./node_modules/ramda/es/nAry.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/nAry.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly `n` parameters. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired arity of the new function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity `n`.
 * @see R.binary, R.unary
 * @example
 *
 *      const takesTwoArgs = (a, b) => [a, b];
 *
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      const takesOneArg = R.nAry(1, takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only `n` arguments are passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.nAry(0, f)(a, b) = f()
 * @symb R.nAry(1, f)(a, b) = f(a)
 * @symb R.nAry(2, f)(a, b) = f(a, b)
 */

var nAry =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function nAry(n, fn) {
  switch (n) {
    case 0:
      return function () {
        return fn.call(this);
      };

    case 1:
      return function (a0) {
        return fn.call(this, a0);
      };

    case 2:
      return function (a0, a1) {
        return fn.call(this, a0, a1);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.call(this, a0, a1, a2);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.call(this, a0, a1, a2, a3);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.call(this, a0, a1, a2, a3, a4);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.call(this, a0, a1, a2, a3, a4, a5);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
      };

    default:
      throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
  }
});

/* harmony default export */ __webpack_exports__["default"] = (nAry);

/***/ }),

/***/ "./node_modules/ramda/es/negate.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/negate.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Negates its argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Math
 * @sig Number -> Number
 * @param {Number} n
 * @return {Number}
 * @example
 *
 *      R.negate(42); //=> -42
 */

var negate =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function negate(n) {
  return -n;
});

/* harmony default export */ __webpack_exports__["default"] = (negate);

/***/ }),

/***/ "./node_modules/ramda/es/none.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/none.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_complement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_complement.js */ "./node_modules/ramda/es/internal/_complement.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _all_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./all.js */ "./node_modules/ramda/es/all.js");



/**
 * Returns `true` if no elements of the list match the predicate, `false`
 * otherwise.
 *
 * Dispatches to the `all` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
 * @see R.all, R.any
 * @example
 *
 *      const isEven = n => n % 2 === 0;
 *      const isOdd = n => n % 2 === 1;
 *
 *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
 *      R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
 */

var none =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function none(fn, input) {
  return Object(_all_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_internal_complement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fn), input);
});

/* harmony default export */ __webpack_exports__["default"] = (none);

/***/ }),

/***/ "./node_modules/ramda/es/not.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/not.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */

var not =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function not(a) {
  return !a;
});

/* harmony default export */ __webpack_exports__["default"] = (not);

/***/ }),

/***/ "./node_modules/ramda/es/nth.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/nth.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isString.js */ "./node_modules/ramda/es/internal/_isString.js");


/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      const list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */

var nth =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return Object(_internal_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list) ? list.charAt(idx) : list[idx];
});

/* harmony default export */ __webpack_exports__["default"] = (nth);

/***/ }),

/***/ "./node_modules/ramda/es/nthArg.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/nthArg.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");



/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Function
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
 *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
 * @symb R.nthArg(-1)(a, b, c) = c
 * @symb R.nthArg(0)(a, b, c) = a
 * @symb R.nthArg(1)(a, b, c) = b
 */

var nthArg =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function nthArg(n) {
  var arity = n < 0 ? 1 : n + 1;
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arity, function () {
    return Object(_nth_js__WEBPACK_IMPORTED_MODULE_2__["default"])(n, arguments);
  });
});

/* harmony default export */ __webpack_exports__["default"] = (nthArg);

/***/ }),

/***/ "./node_modules/ramda/es/o.js":
/*!************************************!*\
  !*** ./node_modules/ramda/es/o.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * `o` is a curried composition function that returns a unary function.
 * Like [`compose`](#compose), `o` performs right-to-left function composition.
 * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
 * invoked with only one argument. Also, unlike [`compose`](#compose), `o` is
 * limited to accepting only 2 unary functions. The name o was chosen because
 * of its similarity to the mathematical composition operator ∘.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @sig (b -> c) -> (a -> b) -> a -> c
 * @param {Function} f
 * @param {Function} g
 * @return {Function}
 * @see R.compose, R.pipe
 * @example
 *
 *      const classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
 *      const yellGreeting = R.o(R.toUpper, classyGreeting);
 *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
 *
 * @symb R.o(f, g, x) = f(g(x))
 */

var o =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function o(f, g, x) {
  return f(g(x));
});

/* harmony default export */ __webpack_exports__["default"] = (o);

/***/ }),

/***/ "./node_modules/ramda/es/objOf.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/objOf.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Creates an object containing a single key:value pair.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @sig String -> a -> {String:a}
 * @param {String} key
 * @param {*} val
 * @return {Object}
 * @see R.pair
 * @example
 *
 *      const matchPhrases = R.compose(
 *        R.objOf('must'),
 *        R.map(R.objOf('match_phrase'))
 *      );
 *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
 */

var objOf =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function objOf(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
});

/* harmony default export */ __webpack_exports__["default"] = (objOf);

/***/ }),

/***/ "./node_modules/ramda/es/of.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/of.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_of_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_of.js */ "./node_modules/ramda/es/internal/_of.js");


/**
 * Returns a singleton array containing the value provided.
 *
 * Note this `of` is different from the ES6 `of`; See
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> [a]
 * @param {*} x any value
 * @return {Array} An array wrapping `x`.
 * @example
 *
 *      R.of(null); //=> [null]
 *      R.of([42]); //=> [[42]]
 */

var of =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_of_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (of);

/***/ }),

/***/ "./node_modules/ramda/es/omit.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/omit.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @see R.pick
 * @example
 *
 *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */

var omit =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function omit(names, obj) {
  var result = {};
  var index = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    index[names[idx]] = 1;
    idx += 1;
  }

  for (var prop in obj) {
    if (!index.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (omit);

/***/ }),

/***/ "./node_modules/ramda/es/once.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/once.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");


/**
 * Accepts a function `fn` and returns a function that guards invocation of
 * `fn` such that `fn` can only ever be called once, no matter how many times
 * the returned function is invoked. The first value calculated is returned in
 * subsequent invocations.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      const addOneOnce = R.once(x => x + 1);
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */

var once =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function once(fn) {
  var called = false;
  var result;
  return Object(_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fn.length, function () {
    if (called) {
      return result;
    }

    called = true;
    result = fn.apply(this, arguments);
    return result;
  });
});

/* harmony default export */ __webpack_exports__["default"] = (once);

/***/ }),

/***/ "./node_modules/ramda/es/or.js":
/*!*************************************!*\
  !*** ./node_modules/ramda/es/or.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either, R.xor
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */

var or =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function or(a, b) {
  return a || b;
});

/* harmony default export */ __webpack_exports__["default"] = (or);

/***/ }),

/***/ "./node_modules/ramda/es/otherwise.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/otherwise.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_assertPromise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_assertPromise.js */ "./node_modules/ramda/es/internal/_assertPromise.js");


/**
 * Returns the result of applying the onFailure function to the value inside
 * a failed promise. This is useful for handling rejected promises
 * inside function compositions.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig (e -> b) -> (Promise e a) -> (Promise e b)
 * @sig (e -> (Promise f b)) -> (Promise e a) -> (Promise f b)
 * @param {Function} onFailure The function to apply. Can return a value or a promise of a value.
 * @param {Promise} p
 * @return {Promise} The result of calling `p.then(null, onFailure)`
 * @see R.then
 * @example
 *
 *      var failedFetch = (id) => Promise.reject('bad ID');
 *      var useDefault = () => ({ firstName: 'Bob', lastName: 'Loblaw' })
 *
 *      //recoverFromFailure :: String -> Promise ({firstName, lastName})
 *      var recoverFromFailure = R.pipe(
 *        failedFetch,
 *        R.otherwise(useDefault),
 *        R.then(R.pick(['firstName', 'lastName'])),
 *      );
 *      recoverFromFailure(12345).then(console.log)
 */

var otherwise =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function otherwise(f, p) {
  Object(_internal_assertPromise_js__WEBPACK_IMPORTED_MODULE_1__["default"])('otherwise', p);

  return p.then(null, f);
});

/* harmony default export */ __webpack_exports__["default"] = (otherwise);

/***/ }),

/***/ "./node_modules/ramda/es/over.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/over.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
 // `Identity` is a functor that holds a single value, where `map` simply
// transforms the held value with the provided function.

var Identity = function (x) {
  return {
    value: x,
    map: function (f) {
      return Identity(f(x));
    }
  };
};
/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the result of applying the given function to
 * the focused value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> (a -> a) -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      const headLens = R.lensIndex(0);
 *
 *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
 */


var over =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function over(lens, f, x) {
  // The value returned by the getter function is first transformed with `f`,
  // then set as the value of an `Identity`. This is then mapped over with the
  // setter function of the lens.
  return lens(function (y) {
    return Identity(f(y));
  })(x).value;
});

/* harmony default export */ __webpack_exports__["default"] = (over);

/***/ }),

/***/ "./node_modules/ramda/es/pair.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/pair.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category List
 * @sig a -> b -> (a,b)
 * @param {*} fst
 * @param {*} snd
 * @return {Array}
 * @see R.objOf, R.of
 * @example
 *
 *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
 */

var pair =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pair(fst, snd) {
  return [fst, snd];
});

/* harmony default export */ __webpack_exports__["default"] = (pair);

/***/ }),

/***/ "./node_modules/ramda/es/partial.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/partial.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_createPartialApplicator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_createPartialApplicator.js */ "./node_modules/ramda/es/internal/_createPartialApplicator.js");


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight, R.curry
 * @example
 *
 *      const multiply2 = (a, b) => a * b;
 *      const double = R.partial(multiply2, [2]);
 *      double(2); //=> 4
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const sayHello = R.partial(greet, ['Hello']);
 *      const sayHelloToMs = R.partial(sayHello, ['Ms.']);
 *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
 */

var partial =
/*#__PURE__*/
Object(_internal_createPartialApplicator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (partial);

/***/ }),

/***/ "./node_modules/ramda/es/partialRight.js":
/*!***********************************************!*\
  !*** ./node_modules/ramda/es/partialRight.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_createPartialApplicator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_createPartialApplicator.js */ "./node_modules/ramda/es/internal/_createPartialApplicator.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flip.js */ "./node_modules/ramda/es/flip.js");



/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided to `g` followed by the arguments provided initially.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partial
 * @example
 *
 *      const greet = (salutation, title, firstName, lastName) =>
 *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
 *
 *      const greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
 *
 *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
 * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
 */

var partialRight =
/*#__PURE__*/
Object(_internal_createPartialApplicator_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
Object(_flip_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"]));

/* harmony default export */ __webpack_exports__["default"] = (partialRight);

/***/ }),

/***/ "./node_modules/ramda/es/partition.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/partition.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filter.js */ "./node_modules/ramda/es/filter.js");
/* harmony import */ var _juxt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./juxt.js */ "./node_modules/ramda/es/juxt.js");
/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reject.js */ "./node_modules/ramda/es/reject.js");



/**
 * Takes a predicate and a list or other `Filterable` object and returns the
 * pair of filterable objects of the same type of elements which do and do not
 * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
 * @param {Function} pred A predicate to determine which side the element belongs to.
 * @param {Array} filterable the list (or other filterable) to partition.
 * @return {Array} An array, containing first the subset of elements that satisfy the
 *         predicate, and second the subset of elements that do not satisfy.
 * @see R.filter, R.reject
 * @example
 *
 *      R.partition(R.includes('s'), ['sss', 'ttt', 'foo', 'bars']);
 *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
 *
 *      R.partition(R.includes('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
 *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
 */

var partition =
/*#__PURE__*/
Object(_juxt_js__WEBPACK_IMPORTED_MODULE_1__["default"])([_filter_js__WEBPACK_IMPORTED_MODULE_0__["default"], _reject_js__WEBPACK_IMPORTED_MODULE_2__["default"]]);
/* harmony default export */ __webpack_exports__["default"] = (partition);

/***/ }),

/***/ "./node_modules/ramda/es/path.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/path.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _paths_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./paths.js */ "./node_modules/ramda/es/paths.js");


/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop, R.nth
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 *      R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
 *      R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
 */

var path =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function path(pathAr, obj) {
  return Object(_paths_js__WEBPACK_IMPORTED_MODULE_1__["default"])([pathAr], obj)[0];
});

/* harmony default export */ __webpack_exports__["default"] = (path);

/***/ }),

/***/ "./node_modules/ramda/es/pathEq.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/pathEq.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");



/**
 * Determines whether a nested path on an object has a specific value, in
 * [`R.equals`](#equals) terms. Most likely used to filter a list.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category Relation
 * @typedefn Idx = String | Int
 * @sig [Idx] -> a -> {a} -> Boolean
 * @param {Array} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *      const user1 = { address: { zipCode: 90210 } };
 *      const user2 = { address: { zipCode: 55555 } };
 *      const user3 = { name: 'Bob' };
 *      const users = [ user1, user2, user3 ];
 *      const isFamous = R.pathEq(['address', 'zipCode'], 90210);
 *      R.filter(isFamous, users); //=> [ user1 ]
 */

var pathEq =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pathEq(_path, val, obj) {
  return Object(_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_path_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_path, obj), val);
});

/* harmony default export */ __webpack_exports__["default"] = (pathEq);

/***/ }),

/***/ "./node_modules/ramda/es/pathOr.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/pathOr.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _defaultTo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultTo.js */ "./node_modules/ramda/es/defaultTo.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");



/**
 * If the given, non-null object has a value at the given path, returns the
 * value at that path. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig a -> [Idx] -> {a} -> a
 * @param {*} d The default value.
 * @param {Array} p The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */

var pathOr =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pathOr(d, p, obj) {
  return Object(_defaultTo_js__WEBPACK_IMPORTED_MODULE_1__["default"])(d, Object(_path_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p, obj));
});

/* harmony default export */ __webpack_exports__["default"] = (pathOr);

/***/ }),

/***/ "./node_modules/ramda/es/pathSatisfies.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/pathSatisfies.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");


/**
 * Returns `true` if the specified object property at given path satisfies the
 * given predicate; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Logic
 * @typedefn Idx = String | Int
 * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
 * @param {Function} pred
 * @param {Array} propPath
 * @param {*} obj
 * @return {Boolean}
 * @see R.propSatisfies, R.path
 * @example
 *
 *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
 *      R.pathSatisfies(R.is(Object), [], {x: {y: 2}}); //=> true
 */

var pathSatisfies =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pathSatisfies(pred, propPath, obj) {
  return pred(Object(_path_js__WEBPACK_IMPORTED_MODULE_1__["default"])(propPath, obj));
});

/* harmony default export */ __webpack_exports__["default"] = (pathSatisfies);

/***/ }),

/***/ "./node_modules/ramda/es/paths.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/paths.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isInteger.js */ "./node_modules/ramda/es/internal/_isInteger.js");
/* harmony import */ var _nth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nth.js */ "./node_modules/ramda/es/nth.js");



/**
 * Retrieves the values at given paths of an object.
 *
 * @func
 * @memberOf R
 * @since v0.27.0
 * @category Object
 * @typedefn Idx = [String | Int]
 * @sig [Idx] -> {a} -> [a | Undefined]
 * @param {Array} pathsArray The array of paths to be fetched.
 * @param {Object} obj The object to retrieve the nested properties from.
 * @return {Array} A list consisting of values at paths specified by "pathsArray".
 * @see R.path
 * @example
 *
 *      R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]
 *      R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]
 */

var paths =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function paths(pathsArray, obj) {
  return pathsArray.map(function (paths) {
    var val = obj;
    var idx = 0;
    var p;

    while (idx < paths.length) {
      if (val == null) {
        return;
      }

      p = paths[idx];
      val = Object(_internal_isInteger_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p) ? Object(_nth_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p, val) : val[p];
      idx += 1;
    }

    return val;
  });
});

/* harmony default export */ __webpack_exports__["default"] = (paths);

/***/ }),

/***/ "./node_modules/ramda/es/pick.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/pick.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns a partial copy of an object containing only the keys specified. If
 * the key does not exist, the property is ignored.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.omit, R.props
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */

var pick =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pick(names, obj) {
  var result = {};
  var idx = 0;

  while (idx < names.length) {
    if (names[idx] in obj) {
      result[names[idx]] = obj[names[idx]];
    }

    idx += 1;
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (pick);

/***/ }),

/***/ "./node_modules/ramda/es/pickAll.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/pickAll.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Similar to `pick` except that this one includes a `key: undefined` pair for
 * properties that don't exist.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
 */

var pickAll =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pickAll(names, obj) {
  var result = {};
  var idx = 0;
  var len = names.length;

  while (idx < len) {
    var name = names[idx];
    result[name] = obj[name];
    idx += 1;
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (pickAll);

/***/ }),

/***/ "./node_modules/ramda/es/pickBy.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/pickBy.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns a partial copy of an object containing only the keys that satisfy
 * the supplied predicate.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be included on the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties that satisfy `pred`
 *         on it.
 * @see R.pick, R.filter
 * @example
 *
 *      const isUpperCase = (val, key) => key.toUpperCase() === key;
 *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */

var pickBy =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pickBy(test, obj) {
  var result = {};

  for (var prop in obj) {
    if (test(obj[prop], prop, obj)) {
      result[prop] = obj[prop];
    }
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (pickBy);

/***/ }),

/***/ "./node_modules/ramda/es/pipe.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/pipe.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pipe; });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_pipe_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_pipe.js */ "./node_modules/ramda/es/internal/_pipe.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");
/* harmony import */ var _tail_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tail.js */ "./node_modules/ramda/es/tail.js");




/**
 * Performs left-to-right function composition. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      const f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */

function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }

  return Object(_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arguments[0].length, Object(_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_internal_pipe_js__WEBPACK_IMPORTED_MODULE_1__["default"], arguments[0], Object(_tail_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arguments)));
}

/***/ }),

/***/ "./node_modules/ramda/es/pipeK.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/pipeK.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pipeK; });
/* harmony import */ var _composeK_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./composeK.js */ "./node_modules/ramda/es/composeK.js");
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/ramda/es/reverse.js");


/**
 * Returns the left-to-right Kleisli composition of the provided functions,
 * each of which must return a value of a type supported by [`chain`](#chain).
 *
 * `R.pipeK(f, g, h)` is equivalent to `R.pipe(f, R.chain(g), R.chain(h))`.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Function
 * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (a -> m z)
 * @param {...Function}
 * @return {Function}
 * @see R.composeK
 * @deprecated since v0.26.0
 * @example
 *
 *      //  parseJson :: String -> Maybe *
 *      //  get :: String -> Object -> Maybe *
 *
 *      //  getStateCode :: Maybe String -> Maybe String
 *      const getStateCode = R.pipeK(
 *        parseJson,
 *        get('user'),
 *        get('address'),
 *        get('state'),
 *        R.compose(Maybe.of, R.toUpper)
 *      );
 *
 *      getStateCode('{"user":{"address":{"state":"ny"}}}');
 *      //=> Just('NY')
 *      getStateCode('[Invalid JSON]');
 *      //=> Nothing()
 * @symb R.pipeK(f, g, h)(a) = R.chain(h, R.chain(g, f(a)))
 */

function pipeK() {
  if (arguments.length === 0) {
    throw new Error('pipeK requires at least one argument');
  }

  return _composeK_js__WEBPACK_IMPORTED_MODULE_0__["default"].apply(this, Object(_reverse_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arguments));
}

/***/ }),

/***/ "./node_modules/ramda/es/pipeP.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/pipeP.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pipeP; });
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_pipeP_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_pipeP.js */ "./node_modules/ramda/es/internal/_pipeP.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");
/* harmony import */ var _tail_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tail.js */ "./node_modules/ramda/es/tail.js");




/**
 * Performs left-to-right composition of one or more Promise-returning
 * functions. The first argument may have any arity; the remaining arguments
 * must be unary.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeP
 * @deprecated since v0.26.0
 * @example
 *
 *      //  followersForUser :: String -> Promise [User]
 *      const followersForUser = R.pipeP(db.getUserById, db.getFollowers);
 */

function pipeP() {
  if (arguments.length === 0) {
    throw new Error('pipeP requires at least one argument');
  }

  return Object(_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arguments[0].length, Object(_reduce_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_internal_pipeP_js__WEBPACK_IMPORTED_MODULE_1__["default"], arguments[0], Object(_tail_js__WEBPACK_IMPORTED_MODULE_3__["default"])(arguments)));
}

/***/ }),

/***/ "./node_modules/ramda/es/pipeWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/pipeWith.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _head_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./head.js */ "./node_modules/ramda/es/head.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _tail_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tail.js */ "./node_modules/ramda/es/tail.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./identity.js */ "./node_modules/ramda/es/identity.js");






/**
 * Performs left-to-right function composition using transforming function. The first argument may have
 * any arity; the remaining arguments must be unary.
 *
 * **Note:** The result of pipeWith is not automatically curried. Transforming function is not used on the
 * first argument.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((* -> *), [((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)]) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.composeWith, R.pipe
 * @example
 *
 *      const pipeWhileNotNil = R.pipeWith((f, res) => R.isNil(res) ? res : f(res));
 *      const f = pipeWhileNotNil([Math.pow, R.negate, R.inc])
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipeWith(f)([g, h, i])(...args) = f(i, f(h, g(...args)))
 */

var pipeWith =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function pipeWith(xf, list) {
  if (list.length <= 0) {
    return _identity_js__WEBPACK_IMPORTED_MODULE_5__["default"];
  }

  var headList = Object(_head_js__WEBPACK_IMPORTED_MODULE_2__["default"])(list);
  var tailList = Object(_tail_js__WEBPACK_IMPORTED_MODULE_4__["default"])(list);
  return Object(_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(headList.length, function () {
    return Object(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_3__["default"])(function (result, f) {
      return xf.call(this, f, result);
    }, headList.apply(this, arguments), tailList);
  });
});

/* harmony default export */ __webpack_exports__["default"] = (pipeWith);

/***/ }),

/***/ "./node_modules/ramda/es/pluck.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/pluck.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _prop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prop.js */ "./node_modules/ramda/es/prop.js");



/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 * `pluck` will work on
 * any [functor](https://github.com/fantasyland/fantasy-land#functor) in
 * addition to arrays, as it is equivalent to `R.map(R.prop(k), f)`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => k -> f {k: v} -> f v
 * @param {Number|String} key The key name to pluck off of each object.
 * @param {Array} f The array or functor to consider.
 * @return {Array} The list of values for the given key.
 * @see R.props
 * @example
 *
 *      var getAges = R.pluck('age');
 *      getAges([{name: 'fred', age: 29}, {name: 'wilma', age: 27}]); //=> [29, 27]
 *
 *      R.pluck(0, [[1, 2], [3, 4]]);               //=> [1, 3]
 *      R.pluck('val', {a: {val: 3}, b: {val: 5}}); //=> {a: 3, b: 5}
 * @symb R.pluck('x', [{x: 1, y: 2}, {x: 3, y: 4}, {x: 5, y: 6}]) = [1, 3, 5]
 * @symb R.pluck(0, [[1, 2], [3, 4], [5, 6]]) = [1, 3, 5]
 */

var pluck =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function pluck(p, list) {
  return Object(_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_prop_js__WEBPACK_IMPORTED_MODULE_2__["default"])(p), list);
});

/* harmony default export */ __webpack_exports__["default"] = (pluck);

/***/ }),

/***/ "./node_modules/ramda/es/prepend.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/prepend.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns a new list with the given element at the front, followed by the
 * contents of the list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} el The item to add to the head of the output list.
 * @param {Array} list The array to add to the tail of the output list.
 * @return {Array} A new array.
 * @see R.append
 * @example
 *
 *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
 */

var prepend =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function prepend(el, list) {
  return Object(_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])([el], list);
});

/* harmony default export */ __webpack_exports__["default"] = (prepend);

/***/ }),

/***/ "./node_modules/ramda/es/product.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/product.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _multiply_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./multiply.js */ "./node_modules/ramda/es/multiply.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");


/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */

var product =
/*#__PURE__*/
Object(_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_multiply_js__WEBPACK_IMPORTED_MODULE_0__["default"], 1);
/* harmony default export */ __webpack_exports__["default"] = (product);

/***/ }),

/***/ "./node_modules/ramda/es/project.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/project.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_map_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_map.js */ "./node_modules/ramda/es/internal/_map.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./identity.js */ "./node_modules/ramda/es/identity.js");
/* harmony import */ var _pickAll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pickAll.js */ "./node_modules/ramda/es/pickAll.js");
/* harmony import */ var _useWith_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useWith.js */ "./node_modules/ramda/es/useWith.js");




/**
 * Reasonable analog to SQL `select` statement.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @category Relation
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array} props The property names to project
 * @param {Array} objs The objects to query
 * @return {Array} An array of objects with just the `props` properties.
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
 *      const fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
 *      const kids = [abby, fred];
 *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
 */

var project =
/*#__PURE__*/
Object(_useWith_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_internal_map_js__WEBPACK_IMPORTED_MODULE_0__["default"], [_pickAll_js__WEBPACK_IMPORTED_MODULE_2__["default"], _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]]); // passing `identity` gives correct arity

/* harmony default export */ __webpack_exports__["default"] = (project);

/***/ }),

/***/ "./node_modules/ramda/es/prop.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/prop.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");


/**
 * Returns a function that when supplied an object returns the indicated
 * property of that object, if it exists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig Idx -> {s: a} -> a | Undefined
 * @param {String|Number} p The property name or array index
 * @param {Object} obj The object to query
 * @return {*} The value at `obj.p`.
 * @see R.path, R.nth
 * @example
 *
 *      R.prop('x', {x: 100}); //=> 100
 *      R.prop('x', {}); //=> undefined
 *      R.prop(0, [100]); //=> 100
 *      R.compose(R.inc, R.prop('x'))({ x: 3 }) //=> 4
 */

var prop =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function prop(p, obj) {
  return Object(_path_js__WEBPACK_IMPORTED_MODULE_1__["default"])([p], obj);
});

/* harmony default export */ __webpack_exports__["default"] = (prop);

/***/ }),

/***/ "./node_modules/ramda/es/propEq.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/propEq.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");


/**
 * Returns `true` if the specified object property is equal, in
 * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
 * You can test multiple properties with [`R.whereEq`](#whereEq).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig String -> a -> Object -> Boolean
 * @param {String} name
 * @param {*} val
 * @param {*} obj
 * @return {Boolean}
 * @see R.whereEq, R.propSatisfies, R.equals
 * @example
 *
 *      const abby = {name: 'Abby', age: 7, hair: 'blond'};
 *      const fred = {name: 'Fred', age: 12, hair: 'brown'};
 *      const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
 *      const alois = {name: 'Alois', age: 15, disposition: 'surly'};
 *      const kids = [abby, fred, rusty, alois];
 *      const hasBrownHair = R.propEq('hair', 'brown');
 *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
 */

var propEq =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function propEq(name, val, obj) {
  return Object(_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val, obj[name]);
});

/* harmony default export */ __webpack_exports__["default"] = (propEq);

/***/ }),

/***/ "./node_modules/ramda/es/propIs.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/propIs.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _is_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is.js */ "./node_modules/ramda/es/is.js");


/**
 * Returns `true` if the specified object property is of the given type;
 * `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Type
 * @sig Type -> String -> Object -> Boolean
 * @param {Function} type
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.is, R.propSatisfies
 * @example
 *
 *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
 *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
 *      R.propIs(Number, 'x', {});            //=> false
 */

var propIs =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function propIs(type, name, obj) {
  return Object(_is_js__WEBPACK_IMPORTED_MODULE_1__["default"])(type, obj[name]);
});

/* harmony default export */ __webpack_exports__["default"] = (propIs);

/***/ }),

/***/ "./node_modules/ramda/es/propOr.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/propOr.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _pathOr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pathOr.js */ "./node_modules/ramda/es/pathOr.js");


/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property. Otherwise returns the provided default
 * value.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const favorite = R.prop('favoriteLibrary');
 *      const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */

var propOr =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function propOr(val, p, obj) {
  return Object(_pathOr_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val, [p], obj);
});

/* harmony default export */ __webpack_exports__["default"] = (propOr);

/***/ }),

/***/ "./node_modules/ramda/es/propSatisfies.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/propSatisfies.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Returns `true` if the specified object property satisfies the given
 * predicate; `false` otherwise. You can test multiple properties with
 * [`R.where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Logic
 * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
 * @param {Function} pred
 * @param {String} name
 * @param {*} obj
 * @return {Boolean}
 * @see R.where, R.propEq, R.propIs
 * @example
 *
 *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
 */

var propSatisfies =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function propSatisfies(pred, name, obj) {
  return pred(obj[name]);
});

/* harmony default export */ __webpack_exports__["default"] = (propSatisfies);

/***/ }),

/***/ "./node_modules/ramda/es/props.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/props.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _path_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./path.js */ "./node_modules/ramda/es/path.js");


/**
 * Acts as multiple `prop`: array of keys in, array of values out. Preserves
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} ps The property names to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function.
 * @example
 *
 *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
 *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
 *
 *      const fullName = R.compose(R.join(' '), R.props(['first', 'last']));
 *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
 */

var props =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function props(ps, obj) {
  return ps.map(function (p) {
    return Object(_path_js__WEBPACK_IMPORTED_MODULE_1__["default"])([p], obj);
  });
});

/* harmony default export */ __webpack_exports__["default"] = (props);

/***/ }),

/***/ "./node_modules/ramda/es/range.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/range.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isNumber.js */ "./node_modules/ramda/es/internal/_isNumber.js");


/**
 * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> Number -> [Number]
 * @param {Number} from The first number in the list.
 * @param {Number} to One more than the last number in the list.
 * @return {Array} The list of numbers in the set `[a, b)`.
 * @example
 *
 *      R.range(1, 5);    //=> [1, 2, 3, 4]
 *      R.range(50, 53);  //=> [50, 51, 52]
 */

var range =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function range(from, to) {
  if (!(Object(_internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"])(from) && Object(_internal_isNumber_js__WEBPACK_IMPORTED_MODULE_1__["default"])(to))) {
    throw new TypeError('Both arguments to range must be numbers');
  }

  var result = [];
  var n = from;

  while (n < to) {
    result.push(n);
    n += 1;
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (range);

/***/ }),

/***/ "./node_modules/ramda/es/reduce.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/reduce.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");


/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *      //          -               -10
 *      //         / \              / \
 *      //        -   4           -6   4
 *      //       / \              / \
 *      //      -   3   ==>     -3   3
 *      //     / \              / \
 *      //    -   2           -1   2
 *      //   / \              / \
 *      //  0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */

var reduce =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (reduce);

/***/ }),

/***/ "./node_modules/ramda/es/reduceBy.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/reduceBy.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_clone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_clone.js */ "./node_modules/ramda/es/internal/_clone.js");
/* harmony import */ var _internal_curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curryN.js */ "./node_modules/ramda/es/internal/_curryN.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_xreduceBy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./internal/_xreduceBy.js */ "./node_modules/ramda/es/internal/_xreduceBy.js");






/**
 * Groups the elements of the list according to the result of calling
 * the String-returning function `keyFn` on each element and reduces the elements
 * of each group to a single value via the reducer function `valueFn`.
 *
 * This function is basically a more general [`groupBy`](#groupBy) function.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category List
 * @sig ((a, b) -> a) -> a -> (b -> String) -> [b] -> {String: a}
 * @param {Function} valueFn The function that reduces the elements of each group to a single
 *        value. Receives two values, accumulator for a particular group and the current element.
 * @param {*} acc The (initial) accumulator value for each group.
 * @param {Function} keyFn The function that maps the list's element into a key.
 * @param {Array} list The array to group.
 * @return {Object} An object with the output of `keyFn` for keys, mapped to the output of
 *         `valueFn` for elements which produced that key when passed to `keyFn`.
 * @see R.groupBy, R.reduce
 * @example
 *
 *      const groupNames = (acc, {name}) => acc.concat(name)
 *      const toGrade = ({score}) =>
 *        score < 65 ? 'F' :
 *        score < 70 ? 'D' :
 *        score < 80 ? 'C' :
 *        score < 90 ? 'B' : 'A'
 *
 *      var students = [
 *        {name: 'Abby', score: 83},
 *        {name: 'Bart', score: 62},
 *        {name: 'Curt', score: 88},
 *        {name: 'Dora', score: 92},
 *      ]
 *
 *      reduceBy(groupNames, [], toGrade, students)
 *      //=> {"A": ["Dora"], "B": ["Abby", "Curt"], "F": ["Bart"]}
 */

var reduceBy =
/*#__PURE__*/
Object(_internal_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(4, [],
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_2__["default"])([], _internal_xreduceBy_js__WEBPACK_IMPORTED_MODULE_5__["default"], function reduceBy(valueFn, valueAcc, keyFn, list) {
  return Object(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_4__["default"])(function (acc, elt) {
    var key = keyFn(elt);
    acc[key] = valueFn(Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_3__["default"])(key, acc) ? acc[key] : Object(_internal_clone_js__WEBPACK_IMPORTED_MODULE_0__["default"])(valueAcc, [], [], false), elt);
    return acc;
  }, {}, list);
}));

/* harmony default export */ __webpack_exports__["default"] = (reduceBy);

/***/ }),

/***/ "./node_modules/ramda/es/reduceRight.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/reduceRight.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * Similar to [`reduce`](#reduce), except moves through the input list from the
 * right to the left.
 *
 * The iterator function receives two values: *(value, acc)*, while the arguments'
 * order of `reduce`'s iterator function is *(acc, value)*.
 *
 * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> b) -> b -> [a] -> b
 * @param {Function} fn The iterator function. Receives two values, the current element from the array
 *        and the accumulator.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.addIndex
 * @example
 *
 *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
 *      //    -               -2
 *      //   / \              / \
 *      //  1   -            1   3
 *      //     / \              / \
 *      //    2   -     ==>    2  -1
 *      //       / \              / \
 *      //      3   -            3   4
 *      //         / \              / \
 *      //        4   0            4   0
 *
 * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
 */

var reduceRight =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function reduceRight(fn, acc, list) {
  var idx = list.length - 1;

  while (idx >= 0) {
    acc = fn(list[idx], acc);
    idx -= 1;
  }

  return acc;
});

/* harmony default export */ __webpack_exports__["default"] = (reduceRight);

/***/ }),

/***/ "./node_modules/ramda/es/reduceWhile.js":
/*!**********************************************!*\
  !*** ./node_modules/ramda/es/reduceWhile.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curryN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curryN.js */ "./node_modules/ramda/es/internal/_curryN.js");
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_reduced_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");



/**
 * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
 * through the list, successively calling the iterator function. `reduceWhile`
 * also takes a predicate that is evaluated before each step. If the predicate
 * returns `false`, it "short-circuits" the iteration and returns the current
 * value of the accumulator.
 *
 * @func
 * @memberOf R
 * @since v0.22.0
 * @category List
 * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} pred The predicate. It is passed the accumulator and the
 *        current element.
 * @param {Function} fn The iterator function. Receives two values, the
 *        accumulator and the current element.
 * @param {*} a The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced
 * @example
 *
 *      const isOdd = (acc, x) => x % 2 === 1;
 *      const xs = [1, 3, 5, 60, 777, 800];
 *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
 *
 *      const ys = [2, 4, 6]
 *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
 */

var reduceWhile =
/*#__PURE__*/
Object(_internal_curryN_js__WEBPACK_IMPORTED_MODULE_0__["default"])(4, [], function _reduceWhile(pred, fn, a, list) {
  return Object(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (acc, x) {
    return pred(acc, x) ? fn(acc, x) : Object(_internal_reduced_js__WEBPACK_IMPORTED_MODULE_2__["default"])(acc);
  }, a, list);
});

/* harmony default export */ __webpack_exports__["default"] = (reduceWhile);

/***/ }),

/***/ "./node_modules/ramda/es/reduced.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/reduced.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_reduced_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_reduced.js */ "./node_modules/ramda/es/internal/_reduced.js");


/**
 * Returns a value wrapped to indicate that it is the final value of the reduce
 * and transduce functions. The returned value should be considered a black
 * box: the internal structure is not guaranteed to be stable.
 *
 * Note: this optimization is only available to the below functions:
 * - [`reduce`](#reduce)
 * - [`reduceWhile`](#reduceWhile)
 * - [`transduce`](#transduce)
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category List
 * @sig a -> *
 * @param {*} x The final value of the reduce.
 * @return {*} The wrapped value.
 * @see R.reduce, R.reduceWhile, R.transduce
 * @example
 *
 *     R.reduce(
 *       (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
 *       [],
 *       [1, 2, 3, 4, 5]) // [1, 2, 3]
 */

var reduced =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(_internal_reduced_js__WEBPACK_IMPORTED_MODULE_1__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (reduced);

/***/ }),

/***/ "./node_modules/ramda/es/reject.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/reject.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_complement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_complement.js */ "./node_modules/ramda/es/internal/_complement.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filter.js */ "./node_modules/ramda/es/filter.js");



/**
 * The complement of [`filter`](#filter).
 *
 * Acts as a transducer if a transformer is given in list position. Filterable
 * objects include plain objects or any object that has a filter method such
 * as `Array`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array}
 * @see R.filter, R.transduce, R.addIndex
 * @example
 *
 *      const isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.reject(isOdd, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */

var reject =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function reject(pred, filterable) {
  return Object(_filter_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_internal_complement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(pred), filterable);
});

/* harmony default export */ __webpack_exports__["default"] = (reject);

/***/ }),

/***/ "./node_modules/ramda/es/remove.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/remove.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Removes the sub-list of `list` starting at index `start` and containing
 * `count` elements. _Note that this is not destructive_: it returns a copy of
 * the list with the changes.
 * <small>No lists have been harmed in the application of this function.</small>
 *
 * @func
 * @memberOf R
 * @since v0.2.2
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} start The position to start removing elements
 * @param {Number} count The number of elements to remove
 * @param {Array} list The list to remove from
 * @return {Array} A new Array with `count` elements from `start` removed.
 * @see R.without
 * @example
 *
 *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
 */

var remove =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function remove(start, count, list) {
  var result = Array.prototype.slice.call(list, 0);
  result.splice(start, count);
  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (remove);

/***/ }),

/***/ "./node_modules/ramda/es/repeat.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/repeat.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _always_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./always.js */ "./node_modules/ramda/es/always.js");
/* harmony import */ var _times_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./times.js */ "./node_modules/ramda/es/times.js");



/**
 * Returns a fixed list of size `n` containing a specified identical value.
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category List
 * @sig a -> n -> [a]
 * @param {*} value The value to repeat.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing `n` `value`s.
 * @see R.times
 * @example
 *
 *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
 *
 *      const obj = {};
 *      const repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
 *      repeatedObjs[0] === repeatedObjs[1]; //=> true
 * @symb R.repeat(a, 0) = []
 * @symb R.repeat(a, 1) = [a]
 * @symb R.repeat(a, 2) = [a, a]
 */

var repeat =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function repeat(value, n) {
  return Object(_times_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_always_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value), n);
});

/* harmony default export */ __webpack_exports__["default"] = (repeat);

/***/ }),

/***/ "./node_modules/ramda/es/replace.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/replace.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Replace a substring or regex match in a string with a replacement.
 *
 * The first two parameters correspond to the parameters of the
 * `String.prototype.replace()` function, so the second parameter can also be a
 * function.
 *
 * @func
 * @memberOf R
 * @since v0.7.0
 * @category String
 * @sig RegExp|String -> String -> String -> String
 * @param {RegExp|String} pattern A regular expression or a substring to match.
 * @param {String} replacement The string to replace the matches with.
 * @param {String} str The String to do the search and replacement in.
 * @return {String} The result.
 * @example
 *
 *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
 *
 *      // Use the "g" (global) flag to replace all occurrences:
 *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
 */

var replace =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function replace(regex, replacement, str) {
  return str.replace(regex, replacement);
});

/* harmony default export */ __webpack_exports__["default"] = (replace);

/***/ }),

/***/ "./node_modules/ramda/es/reverse.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/reverse.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_isString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_isString.js */ "./node_modules/ramda/es/internal/_isString.js");


/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */

var reverse =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function reverse(list) {
  return Object(_internal_isString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});

/* harmony default export */ __webpack_exports__["default"] = (reverse);

/***/ }),

/***/ "./node_modules/ramda/es/scan.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/scan.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @see R.reduce, R.mapAccum
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */

var scan =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = [acc];

  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (scan);

/***/ }),

/***/ "./node_modules/ramda/es/sequence.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/sequence.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _ap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ap.js */ "./node_modules/ramda/es/ap.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _prepend_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prepend.js */ "./node_modules/ramda/es/prepend.js");
/* harmony import */ var _reduceRight_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reduceRight.js */ "./node_modules/ramda/es/reduceRight.js");





/**
 * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
 * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
 * Applicative of Traversable.
 *
 * Dispatches to the `sequence` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
 * @param {Function} of
 * @param {*} traversable
 * @return {*}
 * @see R.traverse
 * @example
 *
 *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
 *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
 *
 *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
 *      R.sequence(R.of, Nothing());       //=> [Nothing()]
 */

var sequence =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function sequence(of, traversable) {
  return typeof traversable.sequence === 'function' ? traversable.sequence(of) : Object(_reduceRight_js__WEBPACK_IMPORTED_MODULE_4__["default"])(function (x, acc) {
    return Object(_ap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_prepend_js__WEBPACK_IMPORTED_MODULE_3__["default"], x), acc);
  }, of([]), traversable);
});

/* harmony default export */ __webpack_exports__["default"] = (sequence);

/***/ }),

/***/ "./node_modules/ramda/es/set.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/set.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _always_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./always.js */ "./node_modules/ramda/es/always.js");
/* harmony import */ var _over_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./over.js */ "./node_modules/ramda/es/over.js");



/**
 * Returns the result of "setting" the portion of the given data structure
 * focused by the given lens to the given value.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> a -> s -> s
 * @param {Lens} lens
 * @param {*} v
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
 *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
 */

var set =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function set(lens, v, x) {
  return Object(_over_js__WEBPACK_IMPORTED_MODULE_2__["default"])(lens, Object(_always_js__WEBPACK_IMPORTED_MODULE_1__["default"])(v), x);
});

/* harmony default export */ __webpack_exports__["default"] = (set);

/***/ }),

/***/ "./node_modules/ramda/es/slice.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/slice.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");


/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */

var slice =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
Object(_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__["default"])('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

/* harmony default export */ __webpack_exports__["default"] = (slice);

/***/ }),

/***/ "./node_modules/ramda/es/sort.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/sort.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Returns a copy of the list, sorted according to the comparator function,
 * which should accept two values at a time and return a negative number if the
 * first value is smaller, a positive number if it's larger, and zero if they
 * are equal. Please note that this is a **copy** of the list. It does not
 * modify the original.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, a) -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      const diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */

var sort =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function sort(comparator, list) {
  return Array.prototype.slice.call(list, 0).sort(comparator);
});

/* harmony default export */ __webpack_exports__["default"] = (sort);

/***/ }),

/***/ "./node_modules/ramda/es/sortBy.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/sortBy.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Sorts the list according to the supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig Ord b => (a -> b) -> [a] -> [a]
 * @param {Function} fn
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted by the keys generated by `fn`.
 * @example
 *
 *      const sortByFirstItem = R.sortBy(R.prop(0));
 *      const pairs = [[-1, 1], [-2, 2], [-3, 3]];
 *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
 *
 *      const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const bob = {
 *        name: 'Bob',
 *        age: -10
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 314.159
 *      };
 *      const people = [clara, bob, alice];
 *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
 */

var sortBy =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function sortBy(fn, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var aa = fn(a);
    var bb = fn(b);
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });
});

/* harmony default export */ __webpack_exports__["default"] = (sortBy);

/***/ }),

/***/ "./node_modules/ramda/es/sortWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/sortWith.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Sorts a list according to a list of comparators.
 *
 * @func
 * @memberOf R
 * @since v0.23.0
 * @category Relation
 * @sig [(a, a) -> Number] -> [a] -> [a]
 * @param {Array} functions A list of comparator functions.
 * @param {Array} list The list to sort.
 * @return {Array} A new list sorted according to the comarator functions.
 * @example
 *
 *      const alice = {
 *        name: 'alice',
 *        age: 40
 *      };
 *      const bob = {
 *        name: 'bob',
 *        age: 30
 *      };
 *      const clara = {
 *        name: 'clara',
 *        age: 40
 *      };
 *      const people = [clara, bob, alice];
 *      const ageNameSort = R.sortWith([
 *        R.descend(R.prop('age')),
 *        R.ascend(R.prop('name'))
 *      ]);
 *      ageNameSort(people); //=> [alice, clara, bob]
 */

var sortWith =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function sortWith(fns, list) {
  return Array.prototype.slice.call(list, 0).sort(function (a, b) {
    var result = 0;
    var i = 0;

    while (result === 0 && i < fns.length) {
      result = fns[i](a, b);
      i += 1;
    }

    return result;
  });
});

/* harmony default export */ __webpack_exports__["default"] = (sortWith);

/***/ }),

/***/ "./node_modules/ramda/es/split.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/split.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker.js */ "./node_modules/ramda/es/invoker.js");

/**
 * Splits a string into an array of strings based on the given
 * separator.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig (String | RegExp) -> String -> [String]
 * @param {String|RegExp} sep The pattern.
 * @param {String} str The string to separate into an array.
 * @return {Array} The array of strings from `str` separated by `sep`.
 * @see R.join
 * @example
 *
 *      const pathComponents = R.split('/');
 *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
 *
 *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
 */

var split =
/*#__PURE__*/
Object(_invoker_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, 'split');
/* harmony default export */ __webpack_exports__["default"] = (split);

/***/ }),

/***/ "./node_modules/ramda/es/splitAt.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/splitAt.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _length_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./length.js */ "./node_modules/ramda/es/length.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");



/**
 * Splits a given list or string at a given index.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig Number -> [a] -> [[a], [a]]
 * @sig Number -> String -> [String, String]
 * @param {Number} index The index where the array/string is split.
 * @param {Array|String} array The array/string to be split.
 * @return {Array}
 * @example
 *
 *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
 *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
 *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
 */

var splitAt =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function splitAt(index, array) {
  return [Object(_slice_js__WEBPACK_IMPORTED_MODULE_2__["default"])(0, index, array), Object(_slice_js__WEBPACK_IMPORTED_MODULE_2__["default"])(index, Object(_length_js__WEBPACK_IMPORTED_MODULE_1__["default"])(array), array)];
});

/* harmony default export */ __webpack_exports__["default"] = (splitAt);

/***/ }),

/***/ "./node_modules/ramda/es/splitEvery.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/splitEvery.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");


/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */

var splitEvery =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function splitEvery(n, list) {
  if (n <= 0) {
    throw new Error('First argument to splitEvery must be a positive integer');
  }

  var result = [];
  var idx = 0;

  while (idx < list.length) {
    result.push(Object(_slice_js__WEBPACK_IMPORTED_MODULE_1__["default"])(idx, idx += n, list));
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (splitEvery);

/***/ }),

/***/ "./node_modules/ramda/es/splitWhen.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/splitWhen.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Takes a list and a predicate and returns a pair of lists with the following properties:
 *
 *  - the result of concatenating the two output lists is equivalent to the input list;
 *  - none of the elements of the first output list satisfies the predicate; and
 *  - if the second output list is non-empty, its first element satisfies the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [[a], [a]]
 * @param {Function} pred The predicate that determines where the array is split.
 * @param {Array} list The array to be split.
 * @return {Array}
 * @example
 *
 *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
 */

var splitWhen =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function splitWhen(pred, list) {
  var idx = 0;
  var len = list.length;
  var prefix = [];

  while (idx < len && !pred(list[idx])) {
    prefix.push(list[idx]);
    idx += 1;
  }

  return [prefix, Array.prototype.slice.call(list, idx)];
});

/* harmony default export */ __webpack_exports__["default"] = (splitWhen);

/***/ }),

/***/ "./node_modules/ramda/es/startsWith.js":
/*!*********************************************!*\
  !*** ./node_modules/ramda/es/startsWith.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");
/* harmony import */ var _take_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./take.js */ "./node_modules/ramda/es/take.js");



/**
 * Checks if a list starts with the provided sublist.
 *
 * Similarly, checks if a string starts with the provided substring.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> [a] -> Boolean
 * @sig String -> String -> Boolean
 * @param {*} prefix
 * @param {*} list
 * @return {Boolean}
 * @see R.endsWith
 * @example
 *
 *      R.startsWith('a', 'abc')                //=> true
 *      R.startsWith('b', 'abc')                //=> false
 *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 */

var startsWith =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function (prefix, list) {
  return Object(_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_take_js__WEBPACK_IMPORTED_MODULE_2__["default"])(prefix.length, list), prefix);
});

/* harmony default export */ __webpack_exports__["default"] = (startsWith);

/***/ }),

/***/ "./node_modules/ramda/es/subtract.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/subtract.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Subtracts its second argument from its first argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a The first value.
 * @param {Number} b The second value.
 * @return {Number} The result of `a - b`.
 * @see R.add
 * @example
 *
 *      R.subtract(10, 8); //=> 2
 *
 *      const minus5 = R.subtract(R.__, 5);
 *      minus5(17); //=> 12
 *
 *      const complementaryAngle = R.subtract(90);
 *      complementaryAngle(30); //=> 60
 *      complementaryAngle(72); //=> 18
 */

var subtract =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function subtract(a, b) {
  return Number(a) - Number(b);
});

/* harmony default export */ __webpack_exports__["default"] = (subtract);

/***/ }),

/***/ "./node_modules/ramda/es/sum.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/sum.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add.js */ "./node_modules/ramda/es/add.js");
/* harmony import */ var _reduce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reduce.js */ "./node_modules/ramda/es/reduce.js");


/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */

var sum =
/*#__PURE__*/
Object(_reduce_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_add_js__WEBPACK_IMPORTED_MODULE_0__["default"], 0);
/* harmony default export */ __webpack_exports__["default"] = (sum);

/***/ }),

/***/ "./node_modules/ramda/es/symmetricDifference.js":
/*!******************************************************!*\
  !*** ./node_modules/ramda/es/symmetricDifference.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./concat.js */ "./node_modules/ramda/es/concat.js");
/* harmony import */ var _difference_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./difference.js */ "./node_modules/ramda/es/difference.js");



/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
 * @example
 *
 *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
 *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
 */

var symmetricDifference =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function symmetricDifference(list1, list2) {
  return Object(_concat_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_difference_js__WEBPACK_IMPORTED_MODULE_2__["default"])(list1, list2), Object(_difference_js__WEBPACK_IMPORTED_MODULE_2__["default"])(list2, list1));
});

/* harmony default export */ __webpack_exports__["default"] = (symmetricDifference);

/***/ }),

/***/ "./node_modules/ramda/es/symmetricDifferenceWith.js":
/*!**********************************************************!*\
  !*** ./node_modules/ramda/es/symmetricDifferenceWith.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./concat.js */ "./node_modules/ramda/es/concat.js");
/* harmony import */ var _differenceWith_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./differenceWith.js */ "./node_modules/ramda/es/differenceWith.js");



/**
 * Finds the set (i.e. no duplicates) of all elements contained in the first or
 * second list, but not both. Duplication is determined according to the value
 * returned by applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The elements in `list1` or `list2`, but not both.
 * @see R.symmetricDifference, R.difference, R.differenceWith
 * @example
 *
 *      const eqA = R.eqBy(R.prop('a'));
 *      const l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
 *      const l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
 *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
 */

var symmetricDifferenceWith =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function symmetricDifferenceWith(pred, list1, list2) {
  return Object(_concat_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_differenceWith_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pred, list1, list2), Object(_differenceWith_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pred, list2, list1));
});

/* harmony default export */ __webpack_exports__["default"] = (symmetricDifferenceWith);

/***/ }),

/***/ "./node_modules/ramda/es/tail.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/tail.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_checkForMethod.js */ "./node_modules/ramda/es/internal/_checkForMethod.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");



/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */

var tail =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
Object(_internal_checkForMethod_js__WEBPACK_IMPORTED_MODULE_0__["default"])('tail',
/*#__PURE__*/
Object(_slice_js__WEBPACK_IMPORTED_MODULE_2__["default"])(1, Infinity)));

/* harmony default export */ __webpack_exports__["default"] = (tail);

/***/ }),

/***/ "./node_modules/ramda/es/take.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/take.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xtake_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xtake.js */ "./node_modules/ramda/es/internal/_xtake.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");




/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      const personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      const takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */

var take =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['take'], _internal_xtake_js__WEBPACK_IMPORTED_MODULE_2__["default"], function take(n, xs) {
  return Object(_slice_js__WEBPACK_IMPORTED_MODULE_3__["default"])(0, n < 0 ? Infinity : n, xs);
}));

/* harmony default export */ __webpack_exports__["default"] = (take);

/***/ }),

/***/ "./node_modules/ramda/es/takeLast.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/takeLast.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _drop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drop.js */ "./node_modules/ramda/es/drop.js");


/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */

var takeLast =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function takeLast(n, xs) {
  return Object(_drop_js__WEBPACK_IMPORTED_MODULE_1__["default"])(n >= 0 ? xs.length - n : 0, xs);
});

/* harmony default export */ __webpack_exports__["default"] = (takeLast);

/***/ }),

/***/ "./node_modules/ramda/es/takeLastWhile.js":
/*!************************************************!*\
  !*** ./node_modules/ramda/es/takeLastWhile.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");


/**
 * Returns a new list containing the last `n` elements of a given list, passing
 * each value to the supplied predicate function, and terminating when the
 * predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropLastWhile, R.addIndex
 * @example
 *
 *      const isNotOne = x => x !== 1;
 *
 *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
 *
 *      R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
 */

var takeLastWhile =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function takeLastWhile(fn, xs) {
  var idx = xs.length - 1;

  while (idx >= 0 && fn(xs[idx])) {
    idx -= 1;
  }

  return Object(_slice_js__WEBPACK_IMPORTED_MODULE_1__["default"])(idx + 1, Infinity, xs);
});

/* harmony default export */ __webpack_exports__["default"] = (takeLastWhile);

/***/ }),

/***/ "./node_modules/ramda/es/takeWhile.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/takeWhile.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xtakeWhile_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xtakeWhile.js */ "./node_modules/ramda/es/internal/_xtakeWhile.js");
/* harmony import */ var _slice_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice.js */ "./node_modules/ramda/es/slice.js");




/**
 * Returns a new list containing the first `n` elements of a given list,
 * passing each value to the supplied predicate function, and terminating when
 * the predicate function returns `false`. Excludes the element that caused the
 * predicate function to fail. The predicate function is passed one argument:
 * *(value)*.
 *
 * Dispatches to the `takeWhile` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @sig (a -> Boolean) -> String -> String
 * @param {Function} fn The function called per iteration.
 * @param {Array} xs The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile, R.transduce, R.addIndex
 * @example
 *
 *      const isNotFour = x => x !== 4;
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
 *
 *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
 */

var takeWhile =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])(['takeWhile'], _internal_xtakeWhile_js__WEBPACK_IMPORTED_MODULE_2__["default"], function takeWhile(fn, xs) {
  var idx = 0;
  var len = xs.length;

  while (idx < len && fn(xs[idx])) {
    idx += 1;
  }

  return Object(_slice_js__WEBPACK_IMPORTED_MODULE_3__["default"])(0, idx, xs);
}));

/* harmony default export */ __webpack_exports__["default"] = (takeWhile);

/***/ }),

/***/ "./node_modules/ramda/es/tap.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/tap.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_dispatchable.js */ "./node_modules/ramda/es/internal/_dispatchable.js");
/* harmony import */ var _internal_xtap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_xtap.js */ "./node_modules/ramda/es/internal/_xtap.js");



/**
 * Runs the given function with the supplied object, then returns the object.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (a -> *) -> a -> a
 * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
 * @param {*} x
 * @return {*} `x`.
 * @example
 *
 *      const sayX = x => console.log('x is ' + x);
 *      R.tap(sayX, 100); //=> 100
 *      // logs 'x is 100'
 * @symb R.tap(f, a) = a
 */

var tap =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
/*#__PURE__*/
Object(_internal_dispatchable_js__WEBPACK_IMPORTED_MODULE_1__["default"])([], _internal_xtap_js__WEBPACK_IMPORTED_MODULE_2__["default"], function tap(fn, x) {
  fn(x);
  return x;
}));

/* harmony default export */ __webpack_exports__["default"] = (tap);

/***/ }),

/***/ "./node_modules/ramda/es/test.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/test.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_cloneRegExp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_cloneRegExp.js */ "./node_modules/ramda/es/internal/_cloneRegExp.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_isRegExp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_isRegExp.js */ "./node_modules/ramda/es/internal/_isRegExp.js");
/* harmony import */ var _toString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toString.js */ "./node_modules/ramda/es/toString.js");




/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */

var test =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function test(pattern, str) {
  if (!Object(_internal_isRegExp_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pattern)) {
    throw new TypeError('‘test’ requires a value of type RegExp as its first argument; received ' + Object(_toString_js__WEBPACK_IMPORTED_MODULE_3__["default"])(pattern));
  }

  return Object(_internal_cloneRegExp_js__WEBPACK_IMPORTED_MODULE_0__["default"])(pattern).test(str);
});

/* harmony default export */ __webpack_exports__["default"] = (test);

/***/ }),

/***/ "./node_modules/ramda/es/thunkify.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/thunkify.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");


/**
 * Creates a thunk out of a function. A thunk delays a calculation until
 * its result is needed, providing lazy evaluation of arguments.
 *
 * @func
 * @memberOf R
 * @since v0.26.0
 * @category Function
 * @sig ((a, b, ..., j) -> k) -> (a, b, ..., j) -> (() -> k)
 * @param {Function} fn A function to wrap in a thunk
 * @return {Function} Expects arguments for `fn` and returns a new function
 *  that, when called, applies those arguments to `fn`.
 * @see R.partial, R.partialRight
 * @example
 *
 *      R.thunkify(R.identity)(42)(); //=> 42
 *      R.thunkify((a, b) => a + b)(25, 17)(); //=> 42
 */

var thunkify =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function thunkify(fn) {
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_0__["default"])(fn.length, function createThunk() {
    var fnArgs = arguments;
    return function invokeThunk() {
      return fn.apply(this, fnArgs);
    };
  });
});

/* harmony default export */ __webpack_exports__["default"] = (thunkify);

/***/ }),

/***/ "./node_modules/ramda/es/times.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/times.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @see R.repeat
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */

var times =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }

  list = new Array(len);

  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }

  return list;
});

/* harmony default export */ __webpack_exports__["default"] = (times);

/***/ }),

/***/ "./node_modules/ramda/es/toLower.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/toLower.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker.js */ "./node_modules/ramda/es/invoker.js");

/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */

var toLower =
/*#__PURE__*/
Object(_invoker_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0, 'toLowerCase');
/* harmony default export */ __webpack_exports__["default"] = (toLower);

/***/ }),

/***/ "./node_modules/ramda/es/toPairs.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/toPairs.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");


/**
 * Converts an object into an array of key, value arrays. Only the object's
 * own properties are used.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own properties.
 * @see R.fromPairs
 * @example
 *
 *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
 */

var toPairs =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function toPairs(obj) {
  var pairs = [];

  for (var prop in obj) {
    if (Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop, obj)) {
      pairs[pairs.length] = [prop, obj[prop]];
    }
  }

  return pairs;
});

/* harmony default export */ __webpack_exports__["default"] = (toPairs);

/***/ }),

/***/ "./node_modules/ramda/es/toPairsIn.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/toPairsIn.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Converts an object into an array of key, value arrays. The object's own
 * properties and prototype properties are used. Note that the order of the
 * output array is not guaranteed to be consistent across different JS
 * platforms.
 *
 * @func
 * @memberOf R
 * @since v0.4.0
 * @category Object
 * @sig {String: *} -> [[String,*]]
 * @param {Object} obj The object to extract from
 * @return {Array} An array of key, value arrays from the object's own
 *         and prototype properties.
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
 */

var toPairsIn =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function toPairsIn(obj) {
  var pairs = [];

  for (var prop in obj) {
    pairs[pairs.length] = [prop, obj[prop]];
  }

  return pairs;
});

/* harmony default export */ __webpack_exports__["default"] = (toPairsIn);

/***/ }),

/***/ "./node_modules/ramda/es/toString.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/toString.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _internal_toString_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_toString.js */ "./node_modules/ramda/es/internal/_toString.js");


/**
 * Returns the string representation of the given value. `eval`'ing the output
 * should result in a value equivalent to the input value. Many of the built-in
 * `toString` methods do not satisfy this requirement.
 *
 * If the given value is an `[object Object]` with a `toString` method other
 * than `Object.prototype.toString`, this method is invoked with no arguments
 * to produce the return value. This means user-defined constructor functions
 * can provide a suitable `toString` method. For example:
 *
 *     function Point(x, y) {
 *       this.x = x;
 *       this.y = y;
 *     }
 *
 *     Point.prototype.toString = function() {
 *       return 'new Point(' + this.x + ', ' + this.y + ')';
 *     };
 *
 *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category String
 * @sig * -> String
 * @param {*} val
 * @return {String}
 * @example
 *
 *      R.toString(42); //=> '42'
 *      R.toString('abc'); //=> '"abc"'
 *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
 *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
 *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
 */

var toString =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function toString(val) {
  return Object(_internal_toString_js__WEBPACK_IMPORTED_MODULE_1__["default"])(val, []);
});

/* harmony default export */ __webpack_exports__["default"] = (toString);

/***/ }),

/***/ "./node_modules/ramda/es/toUpper.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/toUpper.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _invoker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./invoker.js */ "./node_modules/ramda/es/invoker.js");

/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @see R.toLower
 * @example
 *
 *      R.toUpper('abc'); //=> 'ABC'
 */

var toUpper =
/*#__PURE__*/
Object(_invoker_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0, 'toUpperCase');
/* harmony default export */ __webpack_exports__["default"] = (toUpper);

/***/ }),

/***/ "./node_modules/ramda/es/transduce.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/transduce.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_reduce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_reduce.js */ "./node_modules/ramda/es/internal/_reduce.js");
/* harmony import */ var _internal_xwrap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_xwrap.js */ "./node_modules/ramda/es/internal/_xwrap.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");



/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly.
 *
 * A transformer is an an object that provides a 2-arity reducing iterator
 * function, step, 0-arity initial value function, init, and 1-arity result
 * extraction function, result. The step function is used as the iterator
 * function in reduce. The result function is used to convert the final
 * accumulator into the return type and in most cases is
 * [`R.identity`](#identity). The init function can be used to provide an
 * initial accumulator, but is ignored by transduce.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array. Wrapped as transformer, if necessary, and used to
 *        initialize the transducer
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 *      const isOdd = (x) => x % 2 === 1;
 *      const firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 */

var transduce =
/*#__PURE__*/
Object(_curryN_js__WEBPACK_IMPORTED_MODULE_2__["default"])(4, function transduce(xf, fn, acc, list) {
  return Object(_internal_reduce_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xf(typeof fn === 'function' ? Object(_internal_xwrap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(fn) : fn), acc, list);
});
/* harmony default export */ __webpack_exports__["default"] = (transduce);

/***/ }),

/***/ "./node_modules/ramda/es/transpose.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/transpose.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Transposes the rows and columns of a 2D list.
 * When passed a list of `n` lists of length `x`,
 * returns a list of `x` lists of length `n`.
 *
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [[a]] -> [[a]]
 * @param {Array} list A 2D list
 * @return {Array} A 2D list
 * @example
 *
 *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
 *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 *
 *      // If some of the rows are shorter than the following rows, their elements are skipped:
 *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
 * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
 * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
 * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
 */

var transpose =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function transpose(outerlist) {
  var i = 0;
  var result = [];

  while (i < outerlist.length) {
    var innerlist = outerlist[i];
    var j = 0;

    while (j < innerlist.length) {
      if (typeof result[j] === 'undefined') {
        result[j] = [];
      }

      result[j].push(innerlist[j]);
      j += 1;
    }

    i += 1;
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (transpose);

/***/ }),

/***/ "./node_modules/ramda/es/traverse.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/traverse.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _sequence_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sequence.js */ "./node_modules/ramda/es/sequence.js");



/**
 * Maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig (Applicative f, Traversable t) => (a -> f a) -> (a -> f b) -> t a -> f (t b)
 * @param {Function} of
 * @param {Function} f
 * @param {*} traversable
 * @return {*}
 * @see R.sequence
 * @example
 *
 *      // Returns `Maybe.Nothing` if the given divisor is `0`
 *      const safeDiv = n => d => d === 0 ? Maybe.Nothing() : Maybe.Just(n / d)
 *
 *      R.traverse(Maybe.of, safeDiv(10), [2, 4, 5]); //=> Maybe.Just([5, 2.5, 2])
 *      R.traverse(Maybe.of, safeDiv(10), [2, 0, 5]); //=> Maybe.Nothing
 */

var traverse =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function traverse(of, f, traversable) {
  return typeof traversable['fantasy-land/traverse'] === 'function' ? traversable['fantasy-land/traverse'](f, of) : Object(_sequence_js__WEBPACK_IMPORTED_MODULE_2__["default"])(of, Object(_map_js__WEBPACK_IMPORTED_MODULE_1__["default"])(f, traversable));
});

/* harmony default export */ __webpack_exports__["default"] = (traverse);

/***/ }),

/***/ "./node_modules/ramda/es/trim.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/trim.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
var zeroWidth = '\u200b';
var hasProtoTrim = typeof String.prototype.trim === 'function';
/**
 * Removes (strips) whitespace from both ends of the string.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category String
 * @sig String -> String
 * @param {String} str The string to trim.
 * @return {String} Trimmed version of `str`.
 * @example
 *
 *      R.trim('   xyz  '); //=> 'xyz'
 *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
 */

var trim = !hasProtoTrim ||
/*#__PURE__*/
ws.trim() || !
/*#__PURE__*/
zeroWidth.trim() ?
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function trim(str) {
  var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
  var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
  return str.replace(beginRx, '').replace(endRx, '');
}) :
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function trim(str) {
  return str.trim();
});
/* harmony default export */ __webpack_exports__["default"] = (trim);

/***/ }),

/***/ "./node_modules/ramda/es/tryCatch.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/tryCatch.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_arity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_arity.js */ "./node_modules/ramda/es/internal/_arity.js");
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");



/**
 * `tryCatch` takes two functions, a `tryer` and a `catcher`. The returned
 * function evaluates the `tryer`; if it does not throw, it simply returns the
 * result. If the `tryer` *does* throw, the returned function evaluates the
 * `catcher` function and returns its result. Note that for effective
 * composition with this function, both the `tryer` and `catcher` functions
 * must return the same type of results.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Function
 * @sig (...x -> a) -> ((e, ...x) -> a) -> (...x -> a)
 * @param {Function} tryer The function that may throw.
 * @param {Function} catcher The function that will be evaluated if `tryer` throws.
 * @return {Function} A new function that will catch exceptions and send then to the catcher.
 * @example
 *
 *      R.tryCatch(R.prop('x'), R.F)({x: true}); //=> true
 *      R.tryCatch(() => { throw 'foo'}, R.always('catched'))('bar') // => 'catched'
 *      R.tryCatch(R.times(R.identity), R.always([]))('s') // => []
 *      R.tryCatch(() => { throw 'this is not a valid value'}, (err, value)=>({error : err,  value }))('bar') // => {'error': 'this is not a valid value', 'value': 'bar'}
 */

var tryCatch =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_2__["default"])(function _tryCatch(tryer, catcher) {
  return Object(_internal_arity_js__WEBPACK_IMPORTED_MODULE_0__["default"])(tryer.length, function () {
    try {
      return tryer.apply(this, arguments);
    } catch (e) {
      return catcher.apply(this, Object(_internal_concat_js__WEBPACK_IMPORTED_MODULE_1__["default"])([e], arguments));
    }
  });
});

/* harmony default export */ __webpack_exports__["default"] = (tryCatch);

/***/ }),

/***/ "./node_modules/ramda/es/type.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/type.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 *      R.type(undefined); //=> "Undefined"
 */

var type =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});

/* harmony default export */ __webpack_exports__["default"] = (type);

/***/ }),

/***/ "./node_modules/ramda/es/unapply.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/unapply.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Takes a function `fn`, which takes a single array argument, and returns a
 * function which:
 *
 *   - takes any number of positional arguments;
 *   - passes these arguments to `fn` as an array; and
 *   - returns the result.
 *
 * In other words, `R.unapply` derives a variadic function from a function which
 * takes an array. `R.unapply` is the inverse of [`R.apply`](#apply).
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Function
 * @sig ([*...] -> a) -> (*... -> a)
 * @param {Function} fn
 * @return {Function}
 * @see R.apply
 * @example
 *
 *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
 * @symb R.unapply(f)(a, b) = f([a, b])
 */

var unapply =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function unapply(fn) {
  return function () {
    return fn(Array.prototype.slice.call(arguments, 0));
  };
});

/* harmony default export */ __webpack_exports__["default"] = (unapply);

/***/ }),

/***/ "./node_modules/ramda/es/unary.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/unary.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _nAry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nAry.js */ "./node_modules/ramda/es/nAry.js");


/**
 * Wraps a function of any arity (including nullary) in a function that accepts
 * exactly 1 parameter. Any extraneous parameters will not be passed to the
 * supplied function.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Function
 * @sig (* -> b) -> (a -> b)
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
 *         arity 1.
 * @see R.binary, R.nAry
 * @example
 *
 *      const takesTwoArgs = function(a, b) {
 *        return [a, b];
 *      };
 *      takesTwoArgs.length; //=> 2
 *      takesTwoArgs(1, 2); //=> [1, 2]
 *
 *      const takesOneArg = R.unary(takesTwoArgs);
 *      takesOneArg.length; //=> 1
 *      // Only 1 argument is passed to the wrapped function
 *      takesOneArg(1, 2); //=> [1, undefined]
 * @symb R.unary(f)(a, b, c) = f(a)
 */

var unary =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function unary(fn) {
  return Object(_nAry_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1, fn);
});

/* harmony default export */ __webpack_exports__["default"] = (unary);

/***/ }),

/***/ "./node_modules/ramda/es/uncurryN.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/uncurryN.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");


/**
 * Returns a function of arity `n` from a (manually) curried function.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Function
 * @sig Number -> (a -> b) -> (a -> c)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to uncurry.
 * @return {Function} A new function.
 * @see R.curry
 * @example
 *
 *      const addFour = a => b => c => d => a + b + c + d;
 *
 *      const uncurriedAddFour = R.uncurryN(4, addFour);
 *      uncurriedAddFour(1, 2, 3, 4); //=> 10
 */

var uncurryN =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function uncurryN(depth, fn) {
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(depth, function () {
    var currentDepth = 1;
    var value = fn;
    var idx = 0;
    var endIdx;

    while (currentDepth <= depth && typeof value === 'function') {
      endIdx = currentDepth === depth ? arguments.length : idx + value.length;
      value = value.apply(this, Array.prototype.slice.call(arguments, idx, endIdx));
      currentDepth += 1;
      idx = endIdx;
    }

    return value;
  });
});

/* harmony default export */ __webpack_exports__["default"] = (uncurryN);

/***/ }),

/***/ "./node_modules/ramda/es/unfold.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/unfold.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Builds a list from a seed value. Accepts an iterator function, which returns
 * either false to stop iteration or an array of length 2 containing the value
 * to add to the resulting list and the seed to be used in the next call to the
 * iterator function.
 *
 * The iterator function receives one argument: *(seed)*.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig (a -> [b]) -> * -> [b]
 * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
 *        either false to quit iteration or an array of length two to proceed. The element
 *        at index 0 of this array will be added to the resulting array, and the element
 *        at index 1 will be passed to the next call to `fn`.
 * @param {*} seed The seed value.
 * @return {Array} The final list.
 * @example
 *
 *      const f = n => n > 50 ? false : [-n, n + 10];
 *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
 * @symb R.unfold(f, x) = [f(x)[0], f(f(x)[1])[0], f(f(f(x)[1])[1])[0], ...]
 */

var unfold =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function unfold(fn, seed) {
  var pair = fn(seed);
  var result = [];

  while (pair && pair.length) {
    result[result.length] = pair[0];
    pair = fn(pair[1]);
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (unfold);

/***/ }),

/***/ "./node_modules/ramda/es/union.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/union.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./compose.js */ "./node_modules/ramda/es/compose.js");
/* harmony import */ var _uniq_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uniq.js */ "./node_modules/ramda/es/uniq.js");




/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig [*] -> [*] -> [*]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */

var union =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
/*#__PURE__*/
Object(_compose_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_uniq_js__WEBPACK_IMPORTED_MODULE_3__["default"], _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"]));

/* harmony default export */ __webpack_exports__["default"] = (union);

/***/ }),

/***/ "./node_modules/ramda/es/unionWith.js":
/*!********************************************!*\
  !*** ./node_modules/ramda/es/unionWith.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_concat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_concat.js */ "./node_modules/ramda/es/internal/_concat.js");
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _uniqWith_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uniqWith.js */ "./node_modules/ramda/es/uniqWith.js");



/**
 * Combines two lists into a set (i.e. no duplicates) composed of the elements
 * of each list. Duplication is determined according to the value returned by
 * applying the supplied predicate to two list elements.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Relation
 * @sig ((a, a) -> Boolean) -> [*] -> [*] -> [*]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list1 The first list.
 * @param {Array} list2 The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @see R.union
 * @example
 *
 *      const l1 = [{a: 1}, {a: 2}];
 *      const l2 = [{a: 1}, {a: 4}];
 *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
 */

var unionWith =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function unionWith(pred, list1, list2) {
  return Object(_uniqWith_js__WEBPACK_IMPORTED_MODULE_2__["default"])(pred, Object(_internal_concat_js__WEBPACK_IMPORTED_MODULE_0__["default"])(list1, list2));
});

/* harmony default export */ __webpack_exports__["default"] = (unionWith);

/***/ }),

/***/ "./node_modules/ramda/es/uniq.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/uniq.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity.js */ "./node_modules/ramda/es/identity.js");
/* harmony import */ var _uniqBy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uniqBy.js */ "./node_modules/ramda/es/uniqBy.js");


/**
 * Returns a new list containing only one copy of each element in the original
 * list. [`R.equals`](#equals) is used to determine equality.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([1, '1']);     //=> [1, '1']
 *      R.uniq([[42], [42]]); //=> [[42]]
 */

var uniq =
/*#__PURE__*/
Object(_uniqBy_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_identity_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (uniq);

/***/ }),

/***/ "./node_modules/ramda/es/uniqBy.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/uniqBy.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_Set_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_Set.js */ "./node_modules/ramda/es/internal/_Set.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied function to
 * each list element. Prefers the first item if the supplied function produces
 * the same value on two items. [`R.equals`](#equals) is used for comparison.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig (a -> b) -> [a] -> [a]
 * @param {Function} fn A function used to produce a value to use during comparisons.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
 */

var uniqBy =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function uniqBy(fn, list) {
  var set = new _internal_Set_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  var result = [];
  var idx = 0;
  var appliedItem, item;

  while (idx < list.length) {
    item = list[idx];
    appliedItem = fn(item);

    if (set.add(appliedItem)) {
      result.push(item);
    }

    idx += 1;
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (uniqBy);

/***/ }),

/***/ "./node_modules/ramda/es/uniqWith.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/uniqWith.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includesWith.js */ "./node_modules/ramda/es/internal/_includesWith.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");


/**
 * Returns a new list containing only one copy of each element in the original
 * list, based upon the value returned by applying the supplied predicate to
 * two list elements. Prefers the first item if two items compare equal based
 * on the predicate.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category List
 * @sig ((a, a) -> Boolean) -> [a] -> [a]
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      const strEq = R.eqBy(String);
 *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
 *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
 *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
 *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
 */

var uniqWith =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function uniqWith(pred, list) {
  var idx = 0;
  var len = list.length;
  var result = [];
  var item;

  while (idx < len) {
    item = list[idx];

    if (!Object(_internal_includesWith_js__WEBPACK_IMPORTED_MODULE_0__["default"])(pred, item, result)) {
      result[result.length] = item;
    }

    idx += 1;
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (uniqWith);

/***/ }),

/***/ "./node_modules/ramda/es/unless.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/unless.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is not satisfied, the function will return the result of
 * calling the `whenFalseFn` function with the same argument. If the predicate
 * is satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred        A predicate function
 * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
 *                               to a falsy value.
 * @param {*}        x           An object to test with the `pred` function and
 *                               pass to `whenFalseFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
 * @see R.ifElse, R.when, R.cond
 * @example
 *
 *      let safeInc = R.unless(R.isNil, R.inc);
 *      safeInc(null); //=> null
 *      safeInc(1); //=> 2
 */

var unless =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function unless(pred, whenFalseFn, x) {
  return pred(x) ? x : whenFalseFn(x);
});

/* harmony default export */ __webpack_exports__["default"] = (unless);

/***/ }),

/***/ "./node_modules/ramda/es/unnest.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/unnest.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_identity.js */ "./node_modules/ramda/es/internal/_identity.js");
/* harmony import */ var _chain_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chain.js */ "./node_modules/ramda/es/chain.js");


/**
 * Shorthand for `R.chain(R.identity)`, which removes one level of nesting from
 * any [Chain](https://github.com/fantasyland/fantasy-land#chain).
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain c => c (c a) -> c a
 * @param {*} list
 * @return {*}
 * @see R.flatten, R.chain
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */

var unnest =
/*#__PURE__*/
Object(_chain_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_internal_identity_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (unnest);

/***/ }),

/***/ "./node_modules/ramda/es/until.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/until.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Takes a predicate, a transformation function, and an initial value,
 * and returns a value of the same type as the initial value.
 * It does so by applying the transformation until the predicate is satisfied,
 * at which point it returns the satisfactory value.
 *
 * @func
 * @memberOf R
 * @since v0.20.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred A predicate function
 * @param {Function} fn The iterator function
 * @param {*} init Initial value
 * @return {*} Final value that satisfies predicate
 * @example
 *
 *      R.until(R.gt(R.__, 100), R.multiply(2))(1) // => 128
 */

var until =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function until(pred, fn, init) {
  var val = init;

  while (!pred(val)) {
    val = fn(val);
  }

  return val;
});

/* harmony default export */ __webpack_exports__["default"] = (until);

/***/ }),

/***/ "./node_modules/ramda/es/update.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/update.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");
/* harmony import */ var _adjust_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./adjust.js */ "./node_modules/ramda/es/adjust.js");
/* harmony import */ var _always_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./always.js */ "./node_modules/ramda/es/always.js");



/**
 * Returns a new copy of the array with the element at the provided index
 * replaced with the given value.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig Number -> a -> [a] -> [a]
 * @param {Number} idx The index to update.
 * @param {*} x The value to exist at the given index of the returned array.
 * @param {Array|Arguments} list The source array-like object to be updated.
 * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
 * @see R.adjust
 * @example
 *
 *      R.update(1, '_', ['a', 'b', 'c']);      //=> ['a', '_', 'c']
 *      R.update(-1, '_', ['a', 'b', 'c']);     //=> ['a', 'b', '_']
 * @symb R.update(-1, a, [b, c]) = [b, a]
 * @symb R.update(0, a, [b, c]) = [a, c]
 * @symb R.update(1, a, [b, c]) = [b, a]
 */

var update =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function update(idx, x, list) {
  return Object(_adjust_js__WEBPACK_IMPORTED_MODULE_1__["default"])(idx, Object(_always_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x), list);
});

/* harmony default export */ __webpack_exports__["default"] = (update);

/***/ }),

/***/ "./node_modules/ramda/es/useWith.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/useWith.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _curryN_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curryN.js */ "./node_modules/ramda/es/curryN.js");


/**
 * Accepts a function `fn` and a list of transformer functions and returns a
 * new curried function. When the new function is invoked, it calls the
 * function `fn` with parameters consisting of the result of calling each
 * supplied handler on successive arguments to the new function.
 *
 * If more arguments are passed to the returned function than transformer
 * functions, those arguments are passed directly to `fn` as additional
 * parameters. If you expect additional arguments that don't need to be
 * transformed, although you can ignore them, it's best to pass an identity
 * function so that the new function reports the correct arity.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
 * @param {Function} fn The function to wrap.
 * @param {Array} transformers A list of transformer functions
 * @return {Function} The wrapped function.
 * @see R.converge
 * @example
 *
 *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
 *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
 *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
 *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
 * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
 */

var useWith =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function useWith(fn, transformers) {
  return Object(_curryN_js__WEBPACK_IMPORTED_MODULE_1__["default"])(transformers.length, function () {
    var args = [];
    var idx = 0;

    while (idx < transformers.length) {
      args.push(transformers[idx].call(this, arguments[idx]));
      idx += 1;
    }

    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments, transformers.length)));
  });
});

/* harmony default export */ __webpack_exports__["default"] = (useWith);

/***/ }),

/***/ "./node_modules/ramda/es/values.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/values.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");
/* harmony import */ var _keys_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keys.js */ "./node_modules/ramda/es/keys.js");


/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across different
 * JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @see R.valuesIn, R.keys
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */

var values =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function values(obj) {
  var props = Object(_keys_js__WEBPACK_IMPORTED_MODULE_1__["default"])(obj);
  var len = props.length;
  var vals = [];
  var idx = 0;

  while (idx < len) {
    vals[idx] = obj[props[idx]];
    idx += 1;
  }

  return vals;
});

/* harmony default export */ __webpack_exports__["default"] = (values);

/***/ }),

/***/ "./node_modules/ramda/es/valuesIn.js":
/*!*******************************************!*\
  !*** ./node_modules/ramda/es/valuesIn.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry1.js */ "./node_modules/ramda/es/internal/_curry1.js");

/**
 * Returns a list of all the properties, including prototype properties, of the
 * supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own and prototype properties.
 * @see R.values, R.keysIn
 * @example
 *
 *      const F = function() { this.x = 'X'; };
 *      F.prototype.y = 'Y';
 *      const f = new F();
 *      R.valuesIn(f); //=> ['X', 'Y']
 */

var valuesIn =
/*#__PURE__*/
Object(_internal_curry1_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function valuesIn(obj) {
  var prop;
  var vs = [];

  for (prop in obj) {
    vs[vs.length] = obj[prop];
  }

  return vs;
});

/* harmony default export */ __webpack_exports__["default"] = (valuesIn);

/***/ }),

/***/ "./node_modules/ramda/es/view.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/view.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
 // `Const` is a functor that effectively ignores the function given to `map`.

var Const = function (x) {
  return {
    value: x,
    'fantasy-land/map': function () {
      return this;
    }
  };
};
/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category Object
 * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> s -> a
 * @param {Lens} lens
 * @param {*} x
 * @return {*}
 * @see R.prop, R.lensIndex, R.lensProp
 * @example
 *
 *      const xLens = R.lensProp('x');
 *
 *      R.view(xLens, {x: 1, y: 2});  //=> 1
 *      R.view(xLens, {x: 4, y: 2});  //=> 4
 */


var view =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function view(lens, x) {
  // Using `Const` effectively ignores the setter function of the `lens`,
  // leaving the value returned by the getter function unmodified.
  return lens(Const)(x).value;
});

/* harmony default export */ __webpack_exports__["default"] = (view);

/***/ }),

/***/ "./node_modules/ramda/es/when.js":
/*!***************************************!*\
  !*** ./node_modules/ramda/es/when.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Tests the final argument by passing it to the given predicate function. If
 * the predicate is satisfied, the function will return the result of calling
 * the `whenTrueFn` function with the same argument. If the predicate is not
 * satisfied, the argument is returned as is.
 *
 * @func
 * @memberOf R
 * @since v0.18.0
 * @category Logic
 * @sig (a -> Boolean) -> (a -> a) -> a -> a
 * @param {Function} pred       A predicate function
 * @param {Function} whenTrueFn A function to invoke when the `condition`
 *                              evaluates to a truthy value.
 * @param {*}        x          An object to test with the `pred` function and
 *                              pass to `whenTrueFn` if necessary.
 * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
 * @see R.ifElse, R.unless, R.cond
 * @example
 *
 *      // truncate :: String -> String
 *      const truncate = R.when(
 *        R.propSatisfies(R.gt(R.__, 10), 'length'),
 *        R.pipe(R.take(10), R.append('…'), R.join(''))
 *      );
 *      truncate('12345');         //=> '12345'
 *      truncate('0123456789ABC'); //=> '0123456789…'
 */

var when =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function when(pred, whenTrueFn, x) {
  return pred(x) ? whenTrueFn(x) : x;
});

/* harmony default export */ __webpack_exports__["default"] = (when);

/***/ }),

/***/ "./node_modules/ramda/es/where.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/where.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _internal_has_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_has.js */ "./node_modules/ramda/es/internal/_has.js");


/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec. Each of the spec's own properties must be a predicate function.
 * Each predicate is applied to the value of the corresponding property of the
 * test object. `where` returns true if all the predicates return true, false
 * otherwise.
 *
 * `where` is well suited to declaratively expressing constraints for other
 * functions such as [`filter`](#filter) and [`find`](#find).
 *
 * @func
 * @memberOf R
 * @since v0.1.1
 * @category Object
 * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propSatisfies, R.whereEq
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.where({
 *        a: R.equals('foo'),
 *        b: R.complement(R.equals('bar')),
 *        x: R.gt(R.__, 10),
 *        y: R.lt(R.__, 20)
 *      });
 *
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
 *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
 *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
 */

var where =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function where(spec, testObj) {
  for (var prop in spec) {
    if (Object(_internal_has_js__WEBPACK_IMPORTED_MODULE_1__["default"])(prop, spec) && !spec[prop](testObj[prop])) {
      return false;
    }
  }

  return true;
});

/* harmony default export */ __webpack_exports__["default"] = (where);

/***/ }),

/***/ "./node_modules/ramda/es/whereEq.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/whereEq.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _equals_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./equals.js */ "./node_modules/ramda/es/equals.js");
/* harmony import */ var _map_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.js */ "./node_modules/ramda/es/map.js");
/* harmony import */ var _where_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./where.js */ "./node_modules/ramda/es/where.js");




/**
 * Takes a spec object and a test object; returns true if the test satisfies
 * the spec, false otherwise. An object satisfies the spec if, for each of the
 * spec's own properties, accessing that property of the object gives the same
 * value (in [`R.equals`](#equals) terms) as accessing that property of the
 * spec.
 *
 * `whereEq` is a specialization of [`where`](#where).
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category Object
 * @sig {String: *} -> {String: *} -> Boolean
 * @param {Object} spec
 * @param {Object} testObj
 * @return {Boolean}
 * @see R.propEq, R.where
 * @example
 *
 *      // pred :: Object -> Boolean
 *      const pred = R.whereEq({a: 1, b: 2});
 *
 *      pred({a: 1});              //=> false
 *      pred({a: 1, b: 2});        //=> true
 *      pred({a: 1, b: 2, c: 3});  //=> true
 *      pred({a: 1, b: 1});        //=> false
 */

var whereEq =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function whereEq(spec, testObj) {
  return Object(_where_js__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_map_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_equals_js__WEBPACK_IMPORTED_MODULE_1__["default"], spec), testObj);
});

/* harmony default export */ __webpack_exports__["default"] = (whereEq);

/***/ }),

/***/ "./node_modules/ramda/es/without.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/without.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_includes.js */ "./node_modules/ramda/es/internal/_includes.js");
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flip.js */ "./node_modules/ramda/es/flip.js");
/* harmony import */ var _reject_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reject.js */ "./node_modules/ramda/es/reject.js");




/**
 * Returns a new list without values in the first argument.
 * [`R.equals`](#equals) is used to determine equality.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.19.0
 * @category List
 * @sig [a] -> [a] -> [a]
 * @param {Array} list1 The values to be removed from `list2`.
 * @param {Array} list2 The array to remove values from.
 * @return {Array} The new array without values in `list1`.
 * @see R.transduce, R.difference, R.remove
 * @example
 *
 *      R.without([1, 2], [1, 2, 1, 3, 4]); //=> [3, 4]
 */

var without =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_1__["default"])(function (xs, list) {
  return Object(_reject_js__WEBPACK_IMPORTED_MODULE_3__["default"])(Object(_flip_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_internal_includes_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xs), list);
});

/* harmony default export */ __webpack_exports__["default"] = (without);

/***/ }),

/***/ "./node_modules/ramda/es/xor.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/xor.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Exclusive disjunction logical operation.
 * Returns `true` if one of the arguments is truthy and the other is falsy.
 * Otherwise, it returns `false`.
 *
 * @func
 * @memberOf R
 * @since v0.27.0
 * @category Logic
 * @sig a -> b -> Boolean
 * @param {Any} a
 * @param {Any} b
 * @return {Boolean} true if one of the arguments is truthy and the other is falsy
 * @see R.or, R.and
 * @example
 *
 *      R.xor(true, true); //=> false
 *      R.xor(true, false); //=> true
 *      R.xor(false, true); //=> true
 *      R.xor(false, false); //=> false
 */

var xor =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function xor(a, b) {
  return Boolean(!a ^ !b);
});

/* harmony default export */ __webpack_exports__["default"] = (xor);

/***/ }),

/***/ "./node_modules/ramda/es/xprod.js":
/*!****************************************!*\
  !*** ./node_modules/ramda/es/xprod.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Creates a new list out of the two supplied by creating each possible pair
 * from the lists.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The list made by combining each possible pair from
 *         `as` and `bs` into pairs (`[a, b]`).
 * @example
 *
 *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 * @symb R.xprod([a, b], [c, d]) = [[a, c], [a, d], [b, c], [b, d]]
 */

var xprod =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function xprod(a, b) {
  // = xprodWith(prepend); (takes about 3 times as long...)
  var idx = 0;
  var ilen = a.length;
  var j;
  var jlen = b.length;
  var result = [];

  while (idx < ilen) {
    j = 0;

    while (j < jlen) {
      result[result.length] = [a[idx], b[j]];
      j += 1;
    }

    idx += 1;
  }

  return result;
});

/* harmony default export */ __webpack_exports__["default"] = (xprod);

/***/ }),

/***/ "./node_modules/ramda/es/zip.js":
/*!**************************************!*\
  !*** ./node_modules/ramda/es/zip.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 * @symb R.zip([a, b, c], [d, e, f]) = [[a, d], [b, e], [c, f]]
 */

var zip =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function zip(a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);

  while (idx < len) {
    rv[idx] = [a[idx], b[idx]];
    idx += 1;
  }

  return rv;
});

/* harmony default export */ __webpack_exports__["default"] = (zip);

/***/ }),

/***/ "./node_modules/ramda/es/zipObj.js":
/*!*****************************************!*\
  !*** ./node_modules/ramda/es/zipObj.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry2.js */ "./node_modules/ramda/es/internal/_curry2.js");

/**
 * Creates a new object out of a list of keys and a list of values.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 * Note: `zipObj` is equivalent to `pipe(zip, fromPairs)`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */

var zipObj =
/*#__PURE__*/
Object(_internal_curry2_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function zipObj(keys, values) {
  var idx = 0;
  var len = Math.min(keys.length, values.length);
  var out = {};

  while (idx < len) {
    out[keys[idx]] = values[idx];
    idx += 1;
  }

  return out;
});

/* harmony default export */ __webpack_exports__["default"] = (zipObj);

/***/ }),

/***/ "./node_modules/ramda/es/zipWith.js":
/*!******************************************!*\
  !*** ./node_modules/ramda/es/zipWith.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/_curry3.js */ "./node_modules/ramda/es/internal/_curry3.js");

/**
 * Creates a new list out of the two supplied by applying the function to each
 * equally-positioned pair in the lists. The returned list is truncated to the
 * length of the shorter of the two input lists.
 *
 * @function
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> c) -> [a] -> [b] -> [c]
 * @param {Function} fn The function used to combine the two elements into one value.
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
 *         using `fn`.
 * @example
 *
 *      const f = (x, y) => {
 *        // ...
 *      };
 *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
 *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
 * @symb R.zipWith(fn, [a, b, c], [d, e, f]) = [fn(a, d), fn(b, e), fn(c, f)]
 */

var zipWith =
/*#__PURE__*/
Object(_internal_curry3_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function zipWith(fn, a, b) {
  var rv = [];
  var idx = 0;
  var len = Math.min(a.length, b.length);

  while (idx < len) {
    rv[idx] = fn(a[idx], b[idx]);
    idx += 1;
  }

  return rv;
});

/* harmony default export */ __webpack_exports__["default"] = (zipWith);

/***/ }),

/***/ "./node_modules/ringcentral-js-concise/src/ringcentral.js":
/*!****************************************************************!*\
  !*** ./node_modules/ringcentral-js-concise/src/ringcentral.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var js_base64__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! js-base64 */ "./node_modules/js-base64/base64.js");
/* harmony import */ var js_base64__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(js_base64__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! querystring */ "./node_modules/querystring-es3/index.js");
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(querystring__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! urijs */ "./node_modules/urijs/src/URI.js");
/* harmony import */ var urijs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(urijs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var multipart_mixed_parser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! multipart-mixed-parser */ "./node_modules/multipart-mixed-parser/index.js");







class HTTPError extends Error {
  constructor(status, statusText, data, config) {
    super(`status: ${status}
statusText: ${statusText}
data: ${JSON.stringify(data, null, 2)}
config: ${JSON.stringify(config, null, 2)}`);
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.config = config;
  }

}

class RingCentral extends events__WEBPACK_IMPORTED_MODULE_4___default.a {
  constructor(clientId, clientSecret, server, axiosInstance) {
    super();
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.server = server;
    this._token = undefined;
    this._axios = axiosInstance || axios__WEBPACK_IMPORTED_MODULE_0___default.a.create();

    const request = this._axios.request.bind(this._axios);

    this._axios._request = async config => {
      // do not try to refresh token
      try {
        return await request(config);
      } catch (e) {
        if (e.response) {
          throw new HTTPError(e.response.status, e.response.statusText, e.response.data, e.response.config);
        }

        throw e;
      }
    };

    this._axios.request = async config => {
      // try to refresh token if necessary
      try {
        return await request(config);
      } catch (e) {
        if (e.response) {
          if ((e.response.data.errors || []).some(error => /\btoken\b/i.test(error.message))) {
            // access token expired
            try {
              console.log(JSON.stringify(e.response.data));
              await this.refresh();
              config.headers = { ...config.headers,
                ...this._bearerAuthorizationHeader()
              };
              return await request(config);
            } catch (e) {
              if (e.response) {
                throw new HTTPError(e.response.status, e.response.statusText, e.response.data, e.response.config);
              }

              throw e;
            }
          }

          throw new HTTPError(e.response.status, e.response.statusText, e.response.data, e.response.config);
        }

        throw e;
      }
    };
  }

  token(_token) {
    if (arguments.length === 0) {
      // get
      return this._token;
    }

    const tokenChanged = this._token !== _token;
    this._token = _token;

    if (tokenChanged) {
      this.emit('tokenChanged', _token);
    }
  }

  async authorize({
    username,
    extension,
    password,
    code,
    redirectUri
  }, options = {}) {
    let data;

    if (code) {
      data = querystring__WEBPACK_IMPORTED_MODULE_2___default.a.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        ...options
      });
    } else {
      data = querystring__WEBPACK_IMPORTED_MODULE_2___default.a.stringify({
        grant_type: 'password',
        username,
        extension,
        password,
        ...options
      });
    }

    const r = await this._axios.request({
      method: 'post',
      url: urijs__WEBPACK_IMPORTED_MODULE_3___default()(this.server).path('/restapi/oauth/token').toString(),
      data,
      headers: this._basicAuthorizationHeader()
    });
    this.token(r.data);
  }

  async refresh() {
    if (this._token === undefined) {
      return;
    }

    if (!this.refreshRequest) {
      this.refreshRequest = this._axios._request({
        method: 'post',
        url: urijs__WEBPACK_IMPORTED_MODULE_3___default()(this.server).path('/restapi/oauth/token').toString(),
        data: querystring__WEBPACK_IMPORTED_MODULE_2___default.a.stringify({
          grant_type: 'refresh_token',
          refresh_token: this._token.refresh_token
        }),
        headers: this._basicAuthorizationHeader()
      });
    }

    const r = await this.refreshRequest;
    this.token(r.data);
    this.refreshRequest = undefined;
  }

  async revoke() {
    if (this._token === undefined) {
      return;
    }

    await this._axios.request({
      method: 'post',
      url: urijs__WEBPACK_IMPORTED_MODULE_3___default()(this.server).path('/restapi/oauth/revoke').toString(),
      data: querystring__WEBPACK_IMPORTED_MODULE_2___default.a.stringify({
        token: this._token.access_token
      }),
      headers: this._basicAuthorizationHeader()
    });
    this.token(undefined);
  }

  authorizeUri(redirectUri, options = {
    responseType: 'code',
    state: '',
    brandId: '',
    display: '',
    prompt: ''
  }) {
    return urijs__WEBPACK_IMPORTED_MODULE_3___default()(this.server).path('/restapi/oauth/authorize').search({
      redirect_uri: redirectUri,
      client_id: this.clientId,
      response_type: options.responseType || 'code',
      state: options.state || '',
      brand_id: options.brandId || '',
      display: options.display || '',
      prompt: options.prompt || ''
    }).toString();
  }

  request(config) {
    let uri = urijs__WEBPACK_IMPORTED_MODULE_3___default()(config.url);

    if (uri.hostname() === '') {
      uri = urijs__WEBPACK_IMPORTED_MODULE_3___default()(this.server).path(config.url);
    }

    return this._axios.request({ ...config,
      url: uri.toString(),
      headers: this._patchHeaders(config.headers)
    });
  }

  get(url, config = {}) {
    return this.request({ ...config,
      method: 'get',
      url
    });
  }

  delete(url, config = {}) {
    return this.request({ ...config,
      method: 'delete',
      url
    });
  }

  post(url, data = undefined, config = {}) {
    return this.request({ ...config,
      method: 'post',
      url,
      data
    });
  }

  put(url, data = undefined, config = {}) {
    return this.request({ ...config,
      method: 'put',
      url,
      data
    });
  }

  patch(url, data = undefined, config = {}) {
    return this.request({ ...config,
      method: 'patch',
      url,
      data
    });
  }

  async batchGet(url, ids, batchSize, config = {}) {
    const cache = {};
    const result = [];

    for (let i = 0; i < ids.length; i += batchSize) {
      let someIds = ids.slice(i, i + batchSize);

      if (someIds.length <= 1) {
        someIds = [...someIds, ids[0]]; // turn single record fetch to batch fetch
      }

      const r = await this.get(`${url}/${someIds.join(',')}`, config);

      for (const item of multipart_mixed_parser__WEBPACK_IMPORTED_MODULE_5__["default"].parse(r.data).slice(1).filter(p => 'id' in p)) {
        if (!cache[item.id]) {
          cache[item.id] = true;
          result.push(item);
        }
      }
    }

    return result;
  }

  _patchHeaders(headers) {
    const userAgentHeader = 'tylerlong/ringcentral-js-concise';
    return { ...headers,
      ...this._bearerAuthorizationHeader(),
      'X-User-Agent': userAgentHeader,
      'RC-User-Agent': userAgentHeader
    };
  }

  _basicAuthorizationHeader() {
    return {
      Authorization: `Basic ${js_base64__WEBPACK_IMPORTED_MODULE_1__["Base64"].encode(`${this.clientId}:${this.clientSecret}`)}`
    };
  }

  _bearerAuthorizationHeader() {
    let accessToken = '';

    if (this._token) {
      accessToken = this._token.access_token;
    }

    return {
      Authorization: `Bearer ${accessToken}`
    };
  }

}

RingCentral.SANDBOX_SERVER = 'https://platform.devtest.ringcentral.com';
RingCentral.PRODUCTION_SERVER = 'https://platform.ringcentral.com';
/* harmony default export */ __webpack_exports__["default"] = (RingCentral);

/***/ }),

/***/ "./node_modules/urijs/src/IPv6.js":
/*!****************************************!*\
  !*** ./node_modules/urijs/src/IPv6.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.19.2
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function (root, factory) {
  'use strict'; // https://github.com/umdjs/umd/blob/master/returnExports.js

  if ( true && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (root) {
  'use strict';
  /*
  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
  var _out = IPv6.best(_in);
  var _expected = "fe80::204:61ff:fe9d:f156";
   console.log(_in, _out, _expected, _out === _expected);
  */
  // save current IPv6 variable, if any

  var _IPv6 = root && root.IPv6;

  function bestPresentation(address) {
    // based on:
    // Javascript to test an IPv6 address for proper format, and to
    // present the "best text representation" according to IETF Draft RFC at
    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
    // 8 Feb 2010 Rich Brown, Dartware, LLC
    // Please feel free to use this code as long as you provide a link to
    // http://www.intermapper.com
    // http://intermapper.com/support/tools/IPV6-Validator.aspx
    // http://download.dartware.com/thirdparty/ipv6validator.js
    var _address = address.toLowerCase();

    var segments = _address.split(':');

    var length = segments.length;
    var total = 8; // trim colons (:: or ::a:b:c… or …a:b:c::)

    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
      // must have been ::
      // remove first two items
      segments.shift();
      segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
      // must have been ::xxxx
      // remove the first item
      segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
      // must have been xxxx::
      segments.pop();
    }

    length = segments.length; // adjust total segments for IPv4 trailer

    if (segments[length - 1].indexOf('.') !== -1) {
      // found a "." which means IPv4
      total = 7;
    } // fill empty segments them with "0000"


    var pos;

    for (pos = 0; pos < length; pos++) {
      if (segments[pos] === '') {
        break;
      }
    }

    if (pos < total) {
      segments.splice(pos, 1, '0000');

      while (segments.length < total) {
        segments.splice(pos, 0, '0000');
      }
    } // strip leading zeros


    var _segments;

    for (var i = 0; i < total; i++) {
      _segments = segments[i].split('');

      for (var j = 0; j < 3; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0, 1);
        } else {
          break;
        }
      }

      segments[i] = _segments.join('');
    } // find longest sequence of zeroes and coalesce them into one segment


    var best = -1;
    var _best = 0;
    var _current = 0;
    var current = -1;
    var inzeroes = false; // i; already declared

    for (i = 0; i < total; i++) {
      if (inzeroes) {
        if (segments[i] === '0') {
          _current += 1;
        } else {
          inzeroes = false;

          if (_current > _best) {
            best = current;
            _best = _current;
          }
        }
      } else {
        if (segments[i] === '0') {
          inzeroes = true;
          current = i;
          _current = 1;
        }
      }
    }

    if (_current > _best) {
      best = current;
      _best = _current;
    }

    if (_best > 1) {
      segments.splice(best, _best, '');
    }

    length = segments.length; // assemble remaining segments

    var result = '';

    if (segments[0] === '') {
      result = ':';
    }

    for (i = 0; i < length; i++) {
      result += segments[i];

      if (i === length - 1) {
        break;
      }

      result += ':';
    }

    if (segments[length - 1] === '') {
      result += ':';
    }

    return result;
  }

  function noConflict() {
    /*jshint validthis: true */
    if (root.IPv6 === this) {
      root.IPv6 = _IPv6;
    }

    return this;
  }

  return {
    best: bestPresentation,
    noConflict: noConflict
  };
});

/***/ }),

/***/ "./node_modules/urijs/src/SecondLevelDomains.js":
/*!******************************************************!*\
  !*** ./node_modules/urijs/src/SecondLevelDomains.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.19.2
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function (root, factory) {
  'use strict'; // https://github.com/umdjs/umd/blob/master/returnExports.js

  if ( true && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (root) {
  'use strict'; // save current SecondLevelDomains variable, if any

  var _SecondLevelDomains = root && root.SecondLevelDomains;

  var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
      'ac': ' com gov mil net org ',
      'ae': ' ac co gov mil name net org pro sch ',
      'af': ' com edu gov net org ',
      'al': ' com edu gov mil net org ',
      'ao': ' co ed gv it og pb ',
      'ar': ' com edu gob gov int mil net org tur ',
      'at': ' ac co gv or ',
      'au': ' asn com csiro edu gov id net org ',
      'ba': ' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb': ' biz co com edu gov info net org store tv ',
      'bh': ' biz cc com edu gov info net org ',
      'bn': ' com edu gov net org ',
      'bo': ' com edu gob gov int mil net org tv ',
      'br': ' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs': ' com edu gov net org ',
      'bz': ' du et om ov rg ',
      'ca': ' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck': ' biz co edu gen gov info net org ',
      'cn': ' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co': ' com edu gov mil net nom org ',
      'cr': ' ac c co ed fi go or sa ',
      'cy': ' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do': ' art com edu gob gov mil net org sld web ',
      'dz': ' art asso com edu gov net org pol ',
      'ec': ' com edu fin gov info med mil net org pro ',
      'eg': ' com edu eun gov mil name net org sci ',
      'er': ' com edu gov ind mil net org rochest w ',
      'es': ' com edu gob nom org ',
      'et': ' biz com edu gov info name net org ',
      'fj': ' ac biz com info mil name net org pro ',
      'fk': ' ac co gov net nom org ',
      'fr': ' asso com f gouv nom prd presse tm ',
      'gg': ' co net org ',
      'gh': ' com edu gov mil org ',
      'gn': ' ac com gov net org ',
      'gr': ' com edu gov mil net org ',
      'gt': ' com edu gob ind mil net org ',
      'gu': ' com edu gov net org ',
      'hk': ' com edu gov idv net org ',
      'hu': ' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id': ' ac co go mil net or sch web ',
      'il': ' ac co gov idf k12 muni net org ',
      'in': ' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq': ' com edu gov i mil net org ',
      'ir': ' ac co dnssec gov i id net org sch ',
      'it': ' edu gov ',
      'je': ' co net org ',
      'jo': ' com edu gov mil name net org sch ',
      'jp': ' ac ad co ed go gr lg ne or ',
      'ke': ' ac co go info me mobi ne or sc ',
      'kh': ' com edu gov mil net org per ',
      'ki': ' biz com de edu gov info mob net org tel ',
      'km': ' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn': ' edu gov net org ',
      'kr': ' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw': ' com edu gov net org ',
      'ky': ' com edu gov net org ',
      'kz': ' com edu gov mil net org ',
      'lb': ' com edu gov net org ',
      'lk': ' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr': ' com edu gov net org ',
      'lv': ' asn com conf edu gov id mil net org ',
      'ly': ' com edu gov id med net org plc sch ',
      'ma': ' ac co gov m net org press ',
      'mc': ' asso tm ',
      'me': ' ac co edu gov its net org priv ',
      'mg': ' com edu gov mil nom org prd tm ',
      'mk': ' com edu gov inf name net org pro ',
      'ml': ' com edu gov net org presse ',
      'mn': ' edu gov org ',
      'mo': ' com edu gov net org ',
      'mt': ' com edu gov net org ',
      'mv': ' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw': ' ac co com coop edu gov int museum net org ',
      'mx': ' com edu gob net org ',
      'my': ' com edu gov mil name net org sch ',
      'nf': ' arts com firm info net other per rec store web ',
      'ng': ' biz com edu gov mil mobi name net org sch ',
      'ni': ' ac co com edu gob mil net nom org ',
      'np': ' com edu gov mil net org ',
      'nr': ' biz com edu gov info net org ',
      'om': ' ac biz co com edu gov med mil museum net org pro sch ',
      'pe': ' com edu gob mil net nom org sld ',
      'ph': ' com edu gov i mil net ngo org ',
      'pk': ' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl': ' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr': ' ac biz com edu est gov info isla name net org pro prof ',
      'ps': ' com edu gov net org plo sec ',
      'pw': ' belau co ed go ne or ',
      'ro': ' arts com firm info nom nt org rec store tm www ',
      'rs': ' ac co edu gov in org ',
      'sb': ' com edu gov net org ',
      'sc': ' com edu gov net org ',
      'sh': ' co com edu gov net nom org ',
      'sl': ' com edu gov net org ',
      'st': ' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv': ' com edu gob org red ',
      'sz': ' ac co org ',
      'tr': ' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt': ' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw': ' club com ebiz edu game gov idv mil net org ',
      'mu': ' ac co com gov net or org ',
      'mz': ' ac co edu gov org ',
      'na': ' co com ',
      'nz': ' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa': ' abo ac com edu gob ing med net nom org sld ',
      'pt': ' com edu gov int net nome org publ ',
      'py': ' com edu gov mil net org ',
      'qa': ' com edu gov mil net org ',
      're': ' asso com nom ',
      'ru': ' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw': ' ac co com edu gouv gov int mil net ',
      'sa': ' com edu gov med net org pub sch ',
      'sd': ' com edu gov info med net org tv ',
      'se': ' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg': ' com edu gov idn net org per ',
      'sn': ' art com edu gouv org perso univ ',
      'sy': ' com edu gov mil net news org ',
      'th': ' ac co go in mi net or ',
      'tj': ' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn': ' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz': ' ac co go ne or ',
      'ua': ' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug': ' ac co go ne or org sc ',
      'uk': ' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us': ' dni fed isa kids nsn ',
      'uy': ' com edu gub mil net org ',
      've': ' co com edu gob info mil net org web ',
      'vi': ' co com k12 net org ',
      'vn': ' ac biz com edu gov health info int name net org pro ',
      'ye': ' co com gov ltd me net org plc ',
      'yu': ' ac co edu gov org ',
      'za': ' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm': ' ac co com edu gov net org sch ',
      // https://en.wikipedia.org/wiki/CentralNic#Second-level_domains
      'com': 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
      'net': 'gb jp se uk ',
      'org': 'ae',
      'de': 'com '
    },
    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
    // in both performance and memory footprint. No initialization required.
    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
    // Following methods use lastIndexOf() rather than array.split() in order
    // to avoid any memory allocations.
    has: function (domain) {
      var tldOffset = domain.lastIndexOf('.');

      if (tldOffset <= 0 || tldOffset >= domain.length - 1) {
        return false;
      }

      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);

      if (sldOffset <= 0 || sldOffset >= tldOffset - 1) {
        return false;
      }

      var sldList = SLD.list[domain.slice(tldOffset + 1)];

      if (!sldList) {
        return false;
      }

      return sldList.indexOf(' ' + domain.slice(sldOffset + 1, tldOffset) + ' ') >= 0;
    },
    is: function (domain) {
      var tldOffset = domain.lastIndexOf('.');

      if (tldOffset <= 0 || tldOffset >= domain.length - 1) {
        return false;
      }

      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);

      if (sldOffset >= 0) {
        return false;
      }

      var sldList = SLD.list[domain.slice(tldOffset + 1)];

      if (!sldList) {
        return false;
      }

      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function (domain) {
      var tldOffset = domain.lastIndexOf('.');

      if (tldOffset <= 0 || tldOffset >= domain.length - 1) {
        return null;
      }

      var sldOffset = domain.lastIndexOf('.', tldOffset - 1);

      if (sldOffset <= 0 || sldOffset >= tldOffset - 1) {
        return null;
      }

      var sldList = SLD.list[domain.slice(tldOffset + 1)];

      if (!sldList) {
        return null;
      }

      if (sldList.indexOf(' ' + domain.slice(sldOffset + 1, tldOffset) + ' ') < 0) {
        return null;
      }

      return domain.slice(sldOffset + 1);
    },
    noConflict: function () {
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }

      return this;
    }
  };
  return SLD;
});

/***/ }),

/***/ "./node_modules/urijs/src/URI.js":
/*!***************************************!*\
  !*** ./node_modules/urijs/src/URI.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.19.2
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function (root, factory) {
  'use strict'; // https://github.com/umdjs/umd/blob/master/returnExports.js

  if ( true && module.exports) {
    // Node
    module.exports = factory(__webpack_require__(/*! ./punycode */ "./node_modules/urijs/src/punycode.js"), __webpack_require__(/*! ./IPv6 */ "./node_modules/urijs/src/IPv6.js"), __webpack_require__(/*! ./SecondLevelDomains */ "./node_modules/urijs/src/SecondLevelDomains.js"));
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ./punycode */ "./node_modules/urijs/src/punycode.js"), __webpack_require__(/*! ./IPv6 */ "./node_modules/urijs/src/IPv6.js"), __webpack_require__(/*! ./SecondLevelDomains */ "./node_modules/urijs/src/SecondLevelDomains.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function (punycode, IPv6, SLD, root) {
  'use strict';
  /*global location, escape, unescape */
  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase

  /*jshint camelcase: false */
  // save current URI variable, if any

  var _URI = root && root.URI;

  function URI(url, base) {
    var _urlSupplied = arguments.length >= 1;

    var _baseSupplied = arguments.length >= 2; // Allow instantiation without the 'new' keyword


    if (!(this instanceof URI)) {
      if (_urlSupplied) {
        if (_baseSupplied) {
          return new URI(url, base);
        }

        return new URI(url);
      }

      return new URI();
    }

    if (url === undefined) {
      if (_urlSupplied) {
        throw new TypeError('undefined is not a valid argument for URI');
      }

      if (typeof location !== 'undefined') {
        url = location.href + '';
      } else {
        url = '';
      }
    }

    if (url === null) {
      if (_urlSupplied) {
        throw new TypeError('null is not a valid argument for URI');
      }
    }

    this.href(url); // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor

    if (base !== undefined) {
      return this.absoluteTo(base);
    }

    return this;
  }

  function isInteger(value) {
    return /^[0-9]+$/.test(value);
  }

  URI.version = '1.19.2';
  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;

  function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }

  function getType(value) {
    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
    if (value === undefined) {
      return 'Undefined';
    }

    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }

  function isArray(obj) {
    return getType(obj) === 'Array';
  }

  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;

    if (getType(value) === 'RegExp') {
      lookup = null;
    } else if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }

    for (i = 0, length = data.length; i < length; i++) {
      /*jshint laxbreak: true */
      var _match = lookup && lookup[data[i]] !== undefined || !lookup && value.test(data[i]);
      /*jshint laxbreak: false */


      if (_match) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }

    return data;
  }

  function arrayContains(list, value) {
    var i, length; // value may be string, number, array, regexp

    if (isArray(value)) {
      // Note: this can be optimized to O(n) (instead of current O(m * n))
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }

      return true;
    }

    var _type = getType(value);

    for (i = 0, length = list.length; i < length; i++) {
      if (_type === 'RegExp') {
        if (typeof list[i] === 'string' && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }

    return false;
  }

  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    } // arrays can't be equal if they have different amount of content


    if (one.length !== two.length) {
      return false;
    }

    one.sort();
    two.sort();

    for (var i = 0, l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }

    return true;
  }

  function trimSlashes(text) {
    var trim_expression = /^\/+|\/+$/g;
    return text.replace(trim_expression, '');
  }

  URI._parts = function () {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      preventInvalidHostname: URI.preventInvalidHostname,
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace
    };
  }; // state: throw on invalid hostname
  // see https://github.com/medialize/URI.js/pull/345
  // and https://github.com/medialize/URI.js/issues/354


  URI.preventInvalidHostname = false; // state: allow duplicate query parameters (a=1&a=1)

  URI.duplicateQueryParameters = false; // state: replaces + with %20 (space in query strings)

  URI.escapeQuerySpace = true; // static properties

  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\._-]/i;
  URI.punycode_expression = /(xn--)/i; // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?

  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt

  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/; // expression used is "gruber revised" (@gruber v2) determined to be the
  // best solution in a regex-golf we did a couple of ages ago at
  // * http://mathiasbynens.be/demo/url-regex
  // * http://rodneyrehm.de/t/url-regex.html

  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  URI.findUri = {
    // valid "scheme://" or "www."
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    // everything up to the next whitespace
    end: /[\s\r\n]|$/,
    // trim trailing punctuation captured by end RegExp
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
    // balanced parens inclusion (), [], {}, <>
    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g
  }; // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports

  URI.defaultPorts = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
  }; // list of protocols which always require a hostname

  URI.hostProtocols = ['http', 'https']; // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . - _

  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/; // map DOM Elements to their URI attribute

  URI.domAttributes = {
    'a': 'href',
    'blockquote': 'cite',
    'link': 'href',
    'base': 'href',
    'script': 'src',
    'form': 'action',
    'img': 'src',
    'area': 'href',
    'iframe': 'src',
    'embed': 'src',
    'source': 'src',
    'track': 'src',
    'input': 'src',
    // but only if type="image"
    'audio': 'src',
    'video': 'src'
  };

  URI.getDomAttribute = function (node) {
    if (!node || !node.nodeName) {
      return undefined;
    }

    var nodeName = node.nodeName.toLowerCase(); // <input> should only expose src for type="image"

    if (nodeName === 'input' && node.type !== 'image') {
      return undefined;
    }

    return URI.domAttributes[nodeName];
  };

  function escapeForDumbFirefox36(value) {
    // https://github.com/medialize/URI.js/issues/91
    return escape(value);
  } // encoding / decoding according to RFC3986


  function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string).replace(/[!'()*]/g, escapeForDumbFirefox36).replace(/\*/g, '%2A');
  }

  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;

  URI.iso8859 = function () {
    URI.encode = escape;
    URI.decode = unescape;
  };

  URI.unicode = function () {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };

  URI.characters = {
    pathname: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          // -._~!'()*
          '%24': '$',
          '%26': '&',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%3A': ':',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23'
        }
      }
    },
    reserved: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          // gen-delims
          '%3A': ':',
          '%2F': '/',
          '%3F': '?',
          '%23': '#',
          '%5B': '[',
          '%5D': ']',
          '%40': '@',
          // sub-delims
          '%21': '!',
          '%24': '$',
          '%26': '&',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '='
        }
      }
    },
    urnpath: {
      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
      // note that the colon character is not featured in the encoding map; this is because URI.js
      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
      // should not appear unencoded in a segment itself.
      // See also the note above about RFC3986 and capitalalized hex digits.
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
        map: {
          '%21': '!',
          '%24': '$',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%40': '@'
        }
      },
      // These characters are the characters called out by RFC2141 as "reserved" characters that
      // should never appear in a URN, plus the colon character (see note above).
      decode: {
        expression: /[\/\?#:]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23',
          ':': '%3A'
        }
      }
    }
  };

  URI.encodeQuery = function (string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');

    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };

  URI.decodeQuery = function (string, escapeQuerySpace) {
    string += '';

    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch (e) {
      // we're not going to mess with weird encodings,
      // give up and return the undecoded original string
      // see https://github.com/medialize/URI.js/issues/87
      // see https://github.com/medialize/URI.js/issues/92
      return string;
    }
  }; // generate encode/decode path functions


  var _parts = {
    'encode': 'encode',
    'decode': 'decode'
  };

  var _part;

  var generateAccessor = function (_group, _part) {
    return function (string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function (c) {
          return URI.characters[_group][_part].map[c];
        });
      } catch (e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    };
  };

  for (_part in _parts) {
    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
  }

  var generateSegmentedPathFunction = function (_sep, _codingFuncName, _innerCodingFuncName) {
    return function (string) {
      // Why pass in names of functions, rather than the function objects themselves? The
      // definitions of some functions (but in particular, URI.decode) will occasionally change due
      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
      // that the functions we use here are "fresh".
      var actualCodingFunc;

      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function (string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }

      var segments = (string + '').split(_sep);

      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }

      return segments.join(_sep);
    };
  }; // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.


  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');
  URI.encodeReserved = generateAccessor('reserved', 'encode');

  URI.parse = function (string, parts) {
    var pos;

    if (!parts) {
      parts = {
        preventInvalidHostname: URI.preventInvalidHostname
      };
    } // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]
    // extract fragment


    pos = string.indexOf('#');

    if (pos > -1) {
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    } // extract query


    pos = string.indexOf('?');

    if (pos > -1) {
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    } // extract protocol


    if (string.substring(0, 2) === '//') {
      // relative-scheme
      parts.protocol = null;
      string = string.substring(2); // extract "user:pass@host:port"

      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');

      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;

        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          // : may be within the path
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3) === '//') {
          string = string.substring(pos + 3); // extract "user:pass@host:port"

          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    } // what's left must be the path


    parts.path = string; // and we're done

    return parts;
  };

  URI.parseHost = function (string, parts) {
    if (!string) {
      string = '';
    } // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    // https://github.com/medialize/URI.js/pull/233


    string = string.replace(/\\/g, '/'); // extract host:port

    var pos = string.indexOf('/');
    var bracketPos;
    var t;

    if (pos === -1) {
      pos = string.length;
    }

    if (string.charAt(0) === '[') {
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;

      if (parts.port === '/') {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(':');
      var firstSlash = string.indexOf('/');
      var nextColon = string.indexOf(':', firstColon + 1);

      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        // IPv6 host contains multiple colons - but no port
        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }

    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
      pos++;
      string = '/' + string;
    }

    if (parts.preventInvalidHostname) {
      URI.ensureValidHostname(parts.hostname, parts.protocol);
    }

    if (parts.port) {
      URI.ensureValidPort(parts.port);
    }

    return string.substring(pos) || '/';
  };

  URI.parseAuthority = function (string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };

  URI.parseUserinfo = function (string, parts) {
    // extract username:password
    var firstSlash = string.indexOf('/');
    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
    var t; // authority@ must come before /path

    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }

    return string;
  };

  URI.parseQuery = function (string, escapeQuerySpace) {
    if (!string) {
      return {};
    } // throw out the funky business - "?"[name"="value"&"]+


    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

    if (!string) {
      return {};
    }

    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;

    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift(), escapeQuerySpace); // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters

      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

      if (hasOwn.call(items, name)) {
        if (typeof items[name] === 'string' || items[name] === null) {
          items[name] = [items[name]];
        }

        items[name].push(value);
      } else {
        items[name] = value;
      }
    }

    return items;
  };

  URI.build = function (parts) {
    var t = '';
    var requireAbsolutePath = false;

    if (parts.protocol) {
      t += parts.protocol + ':';
    }

    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
      requireAbsolutePath = true;
    }

    t += URI.buildAuthority(parts) || '';

    if (typeof parts.path === 'string') {
      if (parts.path.charAt(0) !== '/' && requireAbsolutePath) {
        t += '/';
      }

      t += parts.path;
    }

    if (typeof parts.query === 'string' && parts.query) {
      t += '?' + parts.query;
    }

    if (typeof parts.fragment === 'string' && parts.fragment) {
      t += '#' + parts.fragment;
    }

    return t;
  };

  URI.buildHost = function (parts) {
    var t = '';

    if (!parts.hostname) {
      return '';
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += '[' + parts.hostname + ']';
    } else {
      t += parts.hostname;
    }

    if (parts.port) {
      t += ':' + parts.port;
    }

    return t;
  };

  URI.buildAuthority = function (parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };

  URI.buildUserinfo = function (parts) {
    var t = '';

    if (parts.username) {
      t += URI.encode(parts.username);
    }

    if (parts.password) {
      t += ':' + URI.encode(parts.password);
    }

    if (t) {
      t += '@';
    }

    return t;
  };

  URI.buildQuery = function (data, duplicateQueryParameters, escapeQuerySpace) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type
    var t = '';
    var unique, key, i, length;

    for (key in data) {
      if (hasOwn.call(data, key)) {
        if (isArray(data[key])) {
          unique = {};

          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);

              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ''] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }

    return t.substring(1);
  };

  URI.buildQueryParameter = function (name, value, escapeQuerySpace) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };

  URI.addQuery = function (data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === 'string') {
        data[name] = [data[name]];
      }

      if (!isArray(value)) {
        value = [value];
      }

      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
  };

  URI.setQuery = function (data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.setQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      data[name] = value === undefined ? null : value;
    } else {
      throw new TypeError('URI.setQuery() accepts an object, string as the name parameter');
    }
  };

  URI.removeQuery = function (data, name, value) {
    var i, length, key;

    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (getType(name) === 'RegExp') {
      for (key in data) {
        if (name.test(key)) {
          data[key] = undefined;
        }
      }
    } else if (typeof name === 'object') {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (value !== undefined) {
        if (getType(value) === 'RegExp') {
          if (!isArray(data[name]) && value.test(data[name])) {
            data[name] = undefined;
          } else {
            data[name] = filterArrayValues(data[name], value);
          }
        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
    }
  };

  URI.hasQuery = function (data, name, value, withinArray) {
    switch (getType(name)) {
      case 'String':
        // Nothing to do here
        break;

      case 'RegExp':
        for (var key in data) {
          if (hasOwn.call(data, key)) {
            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
              return true;
            }
          }
        }

        return false;

      case 'Object':
        for (var _key in name) {
          if (hasOwn.call(name, _key)) {
            if (!URI.hasQuery(data, _key, name[_key])) {
              return false;
            }
          }
        }

        return true;

      default:
        throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
    }

    switch (getType(value)) {
      case 'Undefined':
        // true if exists (but may be empty)
        return name in data;
      // data[name] !== undefined;

      case 'Boolean':
        // true if exists and non-empty
        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);

        return value === _booly;

      case 'Function':
        // allow complex comparison
        return !!value(data[name], name, data);

      case 'Array':
        if (!isArray(data[name])) {
          return false;
        }

        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);

      case 'RegExp':
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      case 'Number':
        value = String(value);

      /* falls through */

      case 'String':
        if (!isArray(data[name])) {
          return data[name] === value;
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      default:
        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
    }
  };

  URI.joinPaths = function () {
    var input = [];
    var segments = [];
    var nonEmptySegments = 0;

    for (var i = 0; i < arguments.length; i++) {
      var url = new URI(arguments[i]);
      input.push(url);

      var _segments = url.segment();

      for (var s = 0; s < _segments.length; s++) {
        if (typeof _segments[s] === 'string') {
          segments.push(_segments[s]);
        }

        if (_segments[s]) {
          nonEmptySegments++;
        }
      }
    }

    if (!segments.length || !nonEmptySegments) {
      return new URI('');
    }

    var uri = new URI('').segment(segments);

    if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
      uri.path('/' + uri.path());
    }

    return uri.normalize();
  };

  URI.commonPath = function (one, two) {
    var length = Math.min(one.length, two.length);
    var pos; // find first non-matching character

    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }

    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
    } // revert to last /


    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }

    return one.substring(0, pos + 1);
  };

  URI.withinString = function (string, callback, options) {
    options || (options = {});

    var _start = options.start || URI.findUri.start;

    var _end = options.end || URI.findUri.end;

    var _trim = options.trim || URI.findUri.trim;

    var _parens = options.parens || URI.findUri.parens;

    var _attributeOpen = /[a-z0-9-]=["']?$/i;
    _start.lastIndex = 0;

    while (true) {
      var match = _start.exec(string);

      if (!match) {
        break;
      }

      var start = match.index;

      if (options.ignoreHtml) {
        // attribut(e=["']?$)
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);

        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }

      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end); // make sure we include well balanced parens

      var parensEnd = -1;

      while (true) {
        var parensMatch = _parens.exec(slice);

        if (!parensMatch) {
          break;
        }

        var parensMatchEnd = parensMatch.index + parensMatch[0].length;
        parensEnd = Math.max(parensEnd, parensMatchEnd);
      }

      if (parensEnd > -1) {
        slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
      } else {
        slice = slice.replace(_trim, '');
      }

      if (slice.length <= match[0].length) {
        // the extract only contains the starting marker of a URI,
        // e.g. "www" or "http://"
        continue;
      }

      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }

      end = start + slice.length;
      var result = callback(slice, start, end, string);

      if (result === undefined) {
        _start.lastIndex = end;
        continue;
      }

      result = String(result);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }

    _start.lastIndex = 0;
    return string;
  };

  URI.ensureValidHostname = function (v, protocol) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js
    var hasHostname = !!v; // not null and not an empty string

    var hasProtocol = !!protocol;
    var rejectEmptyHostname = false;

    if (hasProtocol) {
      rejectEmptyHostname = arrayContains(URI.hostProtocols, protocol);
    }

    if (rejectEmptyHostname && !hasHostname) {
      throw new TypeError('Hostname cannot be empty, if protocol is ' + protocol);
    } else if (v && v.match(URI.invalid_hostname_characters)) {
      // test punycode
      if (!punycode) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available');
      }

      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_]');
      }
    }
  };

  URI.ensureValidPort = function (v) {
    if (!v) {
      return;
    }

    var port = Number(v);

    if (isInteger(port) && port > 0 && port < 65536) {
      return;
    }

    throw new TypeError('Port "' + v + '" is not a valid port');
  }; // noConflict


  URI.noConflict = function (removeAll) {
    if (removeAll) {
      var unconflicted = {
        URI: this.noConflict()
      };

      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }

      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }

      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }

      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }

    return this;
  };

  p.build = function (deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }

    return this;
  };

  p.clone = function () {
    return new URI(this);
  };

  p.valueOf = p.toString = function () {
    return this.build(false)._string;
  };

  function generateSimpleAccessor(_part) {
    return function (v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }

  function generatePrefixAccessor(_part, _key) {
    return function (v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        if (v !== null) {
          v = v + '';

          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }

        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }

  p.protocol = generateSimpleAccessor('protocol');
  p.username = generateSimpleAccessor('username');
  p.password = generateSimpleAccessor('password');
  p.hostname = generateSimpleAccessor('hostname');
  p.port = generateSimpleAccessor('port');
  p.query = generatePrefixAccessor('query', '?');
  p.fragment = generatePrefixAccessor('fragment', '#');

  p.search = function (v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? '?' + t : t;
  };

  p.hash = function (v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? '#' + t : t;
  };

  p.pathname = function (v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? '/' : '');
      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : '';
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
      }

      this.build(!build);
      return this;
    }
  };

  p.path = p.pathname;

  p.href = function (href, build) {
    var key;

    if (href === undefined) {
      return this.toString();
    }

    this._string = '';
    this._parts = URI._parts();

    var _URI = href instanceof URI;

    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);

    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || '';
      _object = false;
    } // window.location is reported to be an object, but it's not the sort
    // of object we're looking for:
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick
    // (for location, not for everything...)


    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }

    if (typeof href === 'string' || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;

      for (key in src) {
        if (key === 'query') {
          continue;
        }

        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }

      if (src.query) {
        this.query(src.query, false);
      }
    } else {
      throw new TypeError('invalid input');
    }

    this.build(!build);
    return this;
  }; // identification accessors


  p.is = function (what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;

    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }

    switch (what.toLowerCase()) {
      case 'relative':
        return relative;

      case 'absolute':
        return !relative;
      // hostname identification

      case 'domain':
      case 'name':
        return name;

      case 'sld':
        return sld;

      case 'ip':
        return ip;

      case 'ip4':
      case 'ipv4':
      case 'inet4':
        return ip4;

      case 'ip6':
      case 'ipv6':
      case 'inet6':
        return ip6;

      case 'idn':
        return idn;

      case 'url':
        return !this._parts.urn;

      case 'urn':
        return !!this._parts.urn;

      case 'punycode':
        return punycode;
    }

    return null;
  }; // component specific input validation


  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;

  p.protocol = function (v, build) {
    if (v) {
      // accept trailing ://
      v = v.replace(/:(\/\/)?$/, '');

      if (!v.match(URI.protocol_expression)) {
        throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
      }
    }

    return _protocol.call(this, v, build);
  };

  p.scheme = p.protocol;

  p.port = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }

      if (v) {
        v += '';

        if (v.charAt(0) === ':') {
          v = v.substring(1);
        }

        URI.ensureValidPort(v);
      }
    }

    return _port.call(this, v, build);
  };

  p.hostname = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      var x = {
        preventInvalidHostname: this._parts.preventInvalidHostname
      };
      var res = URI.parseHost(v, x);

      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      v = x.hostname;

      if (this._parts.preventInvalidHostname) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }
    }

    return _hostname.call(this, v, build);
  }; // compound accessors


  p.origin = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var protocol = this.protocol();
      var authority = this.authority();

      if (!authority) {
        return '';
      }

      return (protocol ? protocol + '://' : '') + this.authority();
    } else {
      var origin = URI(v);
      this.protocol(origin.protocol()).authority(origin.authority()).build(!build);
      return this;
    }
  };

  p.host = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : '';
    } else {
      var res = URI.parseHost(v, this._parts);

      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };

  p.authority = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
    } else {
      var res = URI.parseAuthority(v, this._parts);

      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };

  p.userinfo = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var t = URI.buildUserinfo(this._parts);
      return t ? t.substring(0, t.length - 1) : t;
    } else {
      if (v[v.length - 1] !== '@') {
        v += '@';
      }

      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };

  p.resource = function (v, build) {
    var parts;

    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }

    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  }; // fraction accessors


  p.subdomain = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    } // convenience, return "www" from "www.example.org"


    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      } // grab domain and add another segment


      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || '';
    } else {
      var e = this._parts.hostname.length - this.domain().length;

      var sub = this._parts.hostname.substring(0, e);

      var replace = new RegExp('^' + escapeRegEx(sub));

      if (v && v.charAt(v.length - 1) !== '.') {
        v += '.';
      }

      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }

      if (v) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }

      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };

  p.domain = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    } // convenience, return "example.org" from "www.example.org"


    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      } // if hostname consists of 1 or 2 segments, it must be the domain


      var t = this._parts.hostname.match(/\./g);

      if (t && t.length < 2) {
        return this._parts.hostname;
      } // grab tld and add another segment


      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end - 1) + 1;
      return this._parts.hostname.substring(end) || '';
    } else {
      if (!v) {
        throw new TypeError('cannot set domain empty');
      }

      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }

      URI.ensureValidHostname(v, this._parts.protocol);

      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };

  p.tld = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    } // return "org" from "www.example.org"


    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      var pos = this._parts.hostname.lastIndexOf('.');

      var tld = this._parts.hostname.substring(pos + 1);

      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }

      return tld;
    } else {
      var replace;

      if (!v) {
        throw new TypeError('cannot set TLD empty');
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError('cannot set TLD on non-domain host');
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };

  p.directory = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }

      if (this._parts.path === '/') {
        return '/';
      }

      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');
      return v ? URI.decodePath(res) : res;
    } else {
      var e = this._parts.path.length - this.filename().length;

      var directory = this._parts.path.substring(0, e);

      var replace = new RegExp('^' + escapeRegEx(directory)); // fully qualifier directories begin with a slash

      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }

        if (v.charAt(0) !== '/') {
          v = '/' + v;
        }
      } // directories always end with a slash


      if (v && v.charAt(v.length - 1) !== '/') {
        v += '/';
      }

      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };

  p.filename = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v !== 'string') {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var pos = this._parts.path.lastIndexOf('/');

      var res = this._parts.path.substring(pos + 1);

      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;

      if (v.charAt(0) === '/') {
        v = v.substring(1);
      }

      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }

      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);

      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }

      return this;
    }
  };

  p.suffix = function (v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;

      if (pos === -1) {
        return '';
      } // suffix may only contain alnum characters (yup, I made this up.)


      s = filename.substring(pos + 1);
      res = /^[a-z0-9%]+$/i.test(s) ? s : '';
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === '.') {
        v = v.substring(1);
      }

      var suffix = this.suffix();
      var replace;

      if (!suffix) {
        if (!v) {
          return this;
        }

        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
      } else {
        replace = new RegExp(escapeRegEx(suffix) + '$');
      }

      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };

  p.segment = function (segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);

    if (segment !== undefined && typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }

    if (absolute) {
      segments.shift();
    }

    if (segment < 0) {
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    }

    if (v === undefined) {
      /*jshint laxbreak: true */
      return segment === undefined ? segments : segments[segment];
      /*jshint laxbreak: false */
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = []; // collapse empty elements within array

        for (var i = 0, l = v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length - 1].length)) {
            continue;
          }

          if (segments.length && !segments[segments.length - 1].length) {
            segments.pop();
          }

          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);

        if (segments[segments.length - 1] === '') {
          // empty trailing elements have to be overwritten
          // to prevent results such as /foo//bar
          segments[segments.length - 1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = trimSlashes(v);
      } else {
        segments.splice(segment, 1);
      }
    }

    if (absolute) {
      segments.unshift('');
    }

    return this.path(segments.join(separator), build);
  };

  p.segmentCoded = function (segment, v, build) {
    var segments, i, l;

    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (v === undefined) {
      segments = this.segment(segment, v, build);

      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }

      return segments;
    }

    if (!isArray(v)) {
      v = typeof v === 'string' || v instanceof String ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }

    return this.segment(segment, v, build);
  }; // mutating query string


  var q = p.query;

  p.query = function (v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === 'function') {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== 'string') {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };

  p.setQuery = function (name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }

    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);

    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };

  p.addQuery = function (name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);

    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };

  p.removeQuery = function (name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);

    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };

  p.hasQuery = function (name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };

  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery; // sanitizing URLs

  p.normalize = function () {
    if (this._parts.urn) {
      return this.normalizeProtocol(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();
    }

    return this.normalizeProtocol(false).normalizeHostname(false).normalizePort(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();
  };

  p.normalizeProtocol = function (build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }

    return this;
  };

  p.normalizeHostname = function (build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }

      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }

    return this;
  };

  p.normalizePort = function (build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }

    return this;
  };

  p.normalizePath = function (build) {
    var _path = this._parts.path;

    if (!_path) {
      return this;
    }

    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }

    if (this._parts.path === '/') {
      return this;
    }

    _path = URI.recodePath(_path);

    var _was_relative;

    var _leadingParents = '';

    var _parent, _pos; // handle relative paths


    if (_path.charAt(0) !== '/') {
      _was_relative = true;
      _path = '/' + _path;
    } // handle relative files (as opposed to directories)


    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
      _path += '/';
    } // resolve simples


    _path = _path.replace(/(\/(\.\/)+)|(\/\.$)/g, '/').replace(/\/{2,}/g, '/'); // remember leading parents

    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';

      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    } // resolve parents


    while (true) {
      _parent = _path.search(/\/\.\.(\/|$)/);

      if (_parent === -1) {
        // no more ../ to resolve
        break;
      } else if (_parent === 0) {
        // top level cannot be relative, skip it
        _path = _path.substring(3);
        continue;
      }

      _pos = _path.substring(0, _parent).lastIndexOf('/');

      if (_pos === -1) {
        _pos = _parent;
      }

      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    } // revert to relative


    if (_was_relative && this.is('relative')) {
      _path = _leadingParents + _path.substring(1);
    }

    this._parts.path = _path;
    this.build(!build);
    return this;
  };

  p.normalizePathname = p.normalizePath;

  p.normalizeQuery = function (build) {
    if (typeof this._parts.query === 'string') {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
      }

      this.build(!build);
    }

    return this;
  };

  p.normalizeFragment = function (build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }

    return this;
  };

  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;

  p.iso8859 = function () {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;
    URI.encode = escape;
    URI.decode = decodeURIComponent;

    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }

    return this;
  };

  p.unicode = function () {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;
    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;

    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }

    return this;
  };

  p.readable = function () {
    var uri = this.clone(); // removing username, password, because they shouldn't be displayed according to RFC 3986

    uri.username('').password('').normalize();
    var t = '';

    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }

    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);

        if (uri._parts.port) {
          t += ':' + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }

    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
      t += '/';
    }

    t += uri.path(true);

    if (uri._parts.query) {
      var q = '';

      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
        var kv = (qp[i] || '').split('=');
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace).replace(/&/g, '%26');

        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace).replace(/&/g, '%26');
        }
      }

      t += '?' + q.substring(1);
    }

    t += URI.decodeQuery(uri.hash(), true);
    return t;
  }; // resolving relative and absolute URLs


  p.absoluteTo = function (base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;

    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    if (!(base instanceof URI)) {
      base = new URI(base);
    }

    if (resolved._parts.protocol) {
      // Directly returns even if this._parts.hostname is empty.
      return resolved;
    } else {
      resolved._parts.protocol = base._parts.protocol;
    }

    if (this._parts.hostname) {
      return resolved;
    }

    for (i = 0; p = properties[i]; i++) {
      resolved._parts[p] = base._parts[p];
    }

    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;

      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else {
      if (resolved._parts.path.substring(-2) === '..') {
        resolved._parts.path += '/';
      }

      if (resolved.path().charAt(0) !== '/') {
        basedir = base.directory();
        basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
        resolved._parts.path = (basedir ? basedir + '/' : '') + resolved._parts.path;
        resolved.normalizePath();
      }
    }

    resolved.build();
    return resolved;
  };

  p.relativeTo = function (base) {
    var relative = this.clone().normalize();
    var relativeParts, baseParts, common, relativePath, basePath;

    if (relative._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();

    if (relativePath.charAt(0) !== '/') {
      throw new Error('URI is already relative');
    }

    if (basePath.charAt(0) !== '/') {
      throw new Error('Cannot calculate a URI relative to another relative URI');
    }

    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }

    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
      return relative.build();
    }

    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
      return relative.build();
    }

    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }

    if (relativePath === basePath) {
      relativeParts.path = '';
      return relative.build();
    } // determine common sub path


    common = URI.commonPath(relativePath, basePath); // If the paths have nothing in common, return a relative URL with the absolute path.

    if (!common) {
      return relative.build();
    }

    var parents = baseParts.path.substring(common.length).replace(/[^\/]*$/, '').replace(/.*?\//g, '../');
    relativeParts.path = parents + relativeParts.path.substring(common.length) || './';
    return relative.build();
  }; // comparing URIs


  p.equals = function (uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;
    one.normalize();
    two.normalize(); // exact match

    if (one.toString() === two.toString()) {
      return true;
    } // extract query string


    one_query = one.query();
    two_query = two.query();
    one.query('');
    two.query(''); // definitely not equal if not even non-query parts match

    if (one.toString() !== two.toString()) {
      return false;
    } // query parameters have the same length, even if they're permuted


    if (one_query.length !== two_query.length) {
      return false;
    }

    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }

        checked[key] = true;
      }
    }

    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          // two contains a parameter not present in one
          return false;
        }
      }
    }

    return true;
  }; // state


  p.preventInvalidHostname = function (v) {
    this._parts.preventInvalidHostname = !!v;
    return this;
  };

  p.duplicateQueryParameters = function (v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };

  p.escapeQuerySpace = function (v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };

  return URI;
});

/***/ }),

/***/ "./node_modules/urijs/src/punycode.js":
/*!********************************************!*\
  !*** ./node_modules/urijs/src/punycode.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.0 by @mathias */
;

(function (root) {
  /** Detect free variables */
  var freeExports =  true && exports && !exports.nodeType && exports;
  var freeModule =  true && module && !module.nodeType && module;
  var freeGlobal = typeof global == 'object' && global;

  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
    root = freeGlobal;
  }
  /**
   * The `punycode` object.
   * @name punycode
   * @type Object
   */


  var punycode,

  /** Highest positive signed 32-bit float value */
  maxInt = 2147483647,
      // aka. 0x7FFFFFFF or 2^31-1

  /** Bootstring parameters */
  base = 36,
      tMin = 1,
      tMax = 26,
      skew = 38,
      damp = 700,
      initialBias = 72,
      initialN = 128,
      // 0x80
  delimiter = '-',
      // '\x2D'

  /** Regular expressions */
  regexPunycode = /^xn--/,
      regexNonASCII = /[^\x20-\x7E]/,
      // unprintable ASCII chars + non-ASCII chars
  regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g,
      // RFC 3490 separators

  /** Error messages */
  errors = {
    'overflow': 'Overflow: input needs wider integers to process',
    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
    'invalid-input': 'Invalid input'
  },

  /** Convenience shortcuts */
  baseMinusTMin = base - tMin,
      floor = Math.floor,
      stringFromCharCode = String.fromCharCode,

  /** Temporary variable */
  key;
  /*--------------------------------------------------------------------------*/

  /**
   * A generic error utility function.
   * @private
   * @param {String} type The error type.
   * @returns {Error} Throws a `RangeError` with the applicable error message.
   */

  function error(type) {
    throw new RangeError(errors[type]);
  }
  /**
   * A generic `Array#map` utility function.
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function that gets called for every array
   * item.
   * @returns {Array} A new array of values returned by the callback function.
   */


  function map(array, fn) {
    var length = array.length;
    var result = [];

    while (length--) {
      result[length] = fn(array[length]);
    }

    return result;
  }
  /**
   * A simple `Array#map`-like wrapper to work with domain name strings or email
   * addresses.
   * @private
   * @param {String} domain The domain name or email address.
   * @param {Function} callback The function that gets called for every
   * character.
   * @returns {Array} A new string of characters returned by the callback
   * function.
   */


  function mapDomain(string, fn) {
    var parts = string.split('@');
    var result = '';

    if (parts.length > 1) {
      // In email addresses, only the domain name should be punycoded. Leave
      // the local part (i.e. everything up to `@`) intact.
      result = parts[0] + '@';
      string = parts[1];
    } // Avoid `split(regex)` for IE8 compatibility. See #17.


    string = string.replace(regexSeparators, '\x2E');
    var labels = string.split('.');
    var encoded = map(labels, fn).join('.');
    return result + encoded;
  }
  /**
   * Creates an array containing the numeric code points of each Unicode
   * character in the string. While JavaScript uses UCS-2 internally,
   * this function will convert a pair of surrogate halves (each of which
   * UCS-2 exposes as separate characters) into a single code point,
   * matching UTF-16.
   * @see `punycode.ucs2.encode`
   * @see <https://mathiasbynens.be/notes/javascript-encoding>
   * @memberOf punycode.ucs2
   * @name decode
   * @param {String} string The Unicode input string (UCS-2).
   * @returns {Array} The new array of code points.
   */


  function ucs2decode(string) {
    var output = [],
        counter = 0,
        length = string.length,
        value,
        extra;

    while (counter < length) {
      value = string.charCodeAt(counter++);

      if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
        // high surrogate, and there is a next character
        extra = string.charCodeAt(counter++);

        if ((extra & 0xFC00) == 0xDC00) {
          // low surrogate
          output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
        } else {
          // unmatched surrogate; only append this code unit, in case the next
          // code unit is the high surrogate of a surrogate pair
          output.push(value);
          counter--;
        }
      } else {
        output.push(value);
      }
    }

    return output;
  }
  /**
   * Creates a string based on an array of numeric code points.
   * @see `punycode.ucs2.decode`
   * @memberOf punycode.ucs2
   * @name encode
   * @param {Array} codePoints The array of numeric code points.
   * @returns {String} The new Unicode string (UCS-2).
   */


  function ucs2encode(array) {
    return map(array, function (value) {
      var output = '';

      if (value > 0xFFFF) {
        value -= 0x10000;
        output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
        value = 0xDC00 | value & 0x3FF;
      }

      output += stringFromCharCode(value);
      return output;
    }).join('');
  }
  /**
   * Converts a basic code point into a digit/integer.
   * @see `digitToBasic()`
   * @private
   * @param {Number} codePoint The basic numeric code point value.
   * @returns {Number} The numeric value of a basic code point (for use in
   * representing integers) in the range `0` to `base - 1`, or `base` if
   * the code point does not represent a value.
   */


  function basicToDigit(codePoint) {
    if (codePoint - 48 < 10) {
      return codePoint - 22;
    }

    if (codePoint - 65 < 26) {
      return codePoint - 65;
    }

    if (codePoint - 97 < 26) {
      return codePoint - 97;
    }

    return base;
  }
  /**
   * Converts a digit/integer into a basic code point.
   * @see `basicToDigit()`
   * @private
   * @param {Number} digit The numeric value of a basic code point.
   * @returns {Number} The basic code point whose value (when used for
   * representing integers) is `digit`, which needs to be in the range
   * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
   * used; else, the lowercase form is used. The behavior is undefined
   * if `flag` is non-zero and `digit` has no uppercase form.
   */


  function digitToBasic(digit, flag) {
    //  0..25 map to ASCII a..z or A..Z
    // 26..35 map to ASCII 0..9
    return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
  }
  /**
   * Bias adaptation function as per section 3.4 of RFC 3492.
   * https://tools.ietf.org/html/rfc3492#section-3.4
   * @private
   */


  function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor(delta / damp) : delta >> 1;
    delta += floor(delta / numPoints);

    for (;
    /* no initialization */
    delta > baseMinusTMin * tMax >> 1; k += base) {
      delta = floor(delta / baseMinusTMin);
    }

    return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  }
  /**
   * Converts a Punycode string of ASCII-only symbols to a string of Unicode
   * symbols.
   * @memberOf punycode
   * @param {String} input The Punycode string of ASCII-only symbols.
   * @returns {String} The resulting string of Unicode symbols.
   */


  function decode(input) {
    // Don't use UCS-2
    var output = [],
        inputLength = input.length,
        out,
        i = 0,
        n = initialN,
        bias = initialBias,
        basic,
        j,
        index,
        oldi,
        w,
        k,
        digit,
        t,

    /** Cached calculation results */
    baseMinusT; // Handle the basic code points: let `basic` be the number of input code
    // points before the last delimiter, or `0` if there is none, then copy
    // the first basic code points to the output.

    basic = input.lastIndexOf(delimiter);

    if (basic < 0) {
      basic = 0;
    }

    for (j = 0; j < basic; ++j) {
      // if it's not a basic code point
      if (input.charCodeAt(j) >= 0x80) {
        error('not-basic');
      }

      output.push(input.charCodeAt(j));
    } // Main decoding loop: start just after the last delimiter if any basic code
    // points were copied; start at the beginning otherwise.


    for (index = basic > 0 ? basic + 1 : 0; index < inputLength;)
    /* no final expression */
    {
      // `index` is the index of the next character to be consumed.
      // Decode a generalized variable-length integer into `delta`,
      // which gets added to `i`. The overflow checking is easier
      // if we increase `i` as we go, then subtract off its starting
      // value at the end to obtain `delta`.
      for (oldi = i, w = 1, k = base;;
      /* no condition */
      k += base) {
        if (index >= inputLength) {
          error('invalid-input');
        }

        digit = basicToDigit(input.charCodeAt(index++));

        if (digit >= base || digit > floor((maxInt - i) / w)) {
          error('overflow');
        }

        i += digit * w;
        t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

        if (digit < t) {
          break;
        }

        baseMinusT = base - t;

        if (w > floor(maxInt / baseMinusT)) {
          error('overflow');
        }

        w *= baseMinusT;
      }

      out = output.length + 1;
      bias = adapt(i - oldi, out, oldi == 0); // `i` was supposed to wrap around from `out` to `0`,
      // incrementing `n` each time, so we'll fix that now:

      if (floor(i / out) > maxInt - n) {
        error('overflow');
      }

      n += floor(i / out);
      i %= out; // Insert `n` at position `i` of the output

      output.splice(i++, 0, n);
    }

    return ucs2encode(output);
  }
  /**
   * Converts a string of Unicode symbols (e.g. a domain name label) to a
   * Punycode string of ASCII-only symbols.
   * @memberOf punycode
   * @param {String} input The string of Unicode symbols.
   * @returns {String} The resulting Punycode string of ASCII-only symbols.
   */


  function encode(input) {
    var n,
        delta,
        handledCPCount,
        basicLength,
        bias,
        j,
        m,
        q,
        k,
        t,
        currentValue,
        output = [],

    /** `inputLength` will hold the number of code points in `input`. */
    inputLength,

    /** Cached calculation results */
    handledCPCountPlusOne,
        baseMinusT,
        qMinusT; // Convert the input in UCS-2 to Unicode

    input = ucs2decode(input); // Cache the length

    inputLength = input.length; // Initialize the state

    n = initialN;
    delta = 0;
    bias = initialBias; // Handle the basic code points

    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];

      if (currentValue < 0x80) {
        output.push(stringFromCharCode(currentValue));
      }
    }

    handledCPCount = basicLength = output.length; // `handledCPCount` is the number of code points that have been handled;
    // `basicLength` is the number of basic code points.
    // Finish the basic string - if it is not empty - with a delimiter

    if (basicLength) {
      output.push(delimiter);
    } // Main encoding loop:


    while (handledCPCount < inputLength) {
      // All non-basic code points < n have been handled already. Find the next
      // larger one:
      for (m = maxInt, j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue >= n && currentValue < m) {
          m = currentValue;
        }
      } // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
      // but guard against overflow


      handledCPCountPlusOne = handledCPCount + 1;

      if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
        error('overflow');
      }

      delta += (m - n) * handledCPCountPlusOne;
      n = m;

      for (j = 0; j < inputLength; ++j) {
        currentValue = input[j];

        if (currentValue < n && ++delta > maxInt) {
          error('overflow');
        }

        if (currentValue == n) {
          // Represent delta as a generalized variable-length integer
          for (q = delta, k = base;;
          /* no condition */
          k += base) {
            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;

            if (q < t) {
              break;
            }

            qMinusT = q - t;
            baseMinusT = base - t;
            output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
            q = floor(qMinusT / baseMinusT);
          }

          output.push(stringFromCharCode(digitToBasic(q, 0)));
          bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
          delta = 0;
          ++handledCPCount;
        }
      }

      ++delta;
      ++n;
    }

    return output.join('');
  }
  /**
   * Converts a Punycode string representing a domain name or an email address
   * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
   * it doesn't matter if you call it on a string that has already been
   * converted to Unicode.
   * @memberOf punycode
   * @param {String} input The Punycoded domain name or email address to
   * convert to Unicode.
   * @returns {String} The Unicode representation of the given Punycode
   * string.
   */


  function toUnicode(input) {
    return mapDomain(input, function (string) {
      return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
    });
  }
  /**
   * Converts a Unicode string representing a domain name or an email address to
   * Punycode. Only the non-ASCII parts of the domain name will be converted,
   * i.e. it doesn't matter if you call it with a domain that's already in
   * ASCII.
   * @memberOf punycode
   * @param {String} input The domain name or email address to convert, as a
   * Unicode string.
   * @returns {String} The Punycode representation of the given domain name or
   * email address.
   */


  function toASCII(input) {
    return mapDomain(input, function (string) {
      return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
    });
  }
  /*--------------------------------------------------------------------------*/

  /** Define the public API */


  punycode = {
    /**
     * A string representing the current Punycode.js version number.
     * @memberOf punycode
     * @type String
     */
    'version': '1.3.2',

    /**
     * An object of methods to convert from JavaScript's internal character
     * representation (UCS-2) to Unicode code points, and back.
     * @see <https://mathiasbynens.be/notes/javascript-encoding>
     * @memberOf punycode
     * @type Object
     */
    'ucs2': {
      'decode': ucs2decode,
      'encode': ucs2encode
    },
    'decode': decode,
    'encode': encode,
    'toASCII': toASCII,
    'toUnicode': toUnicode
  };
  /** Expose `punycode` */
  // Some AMD build optimizers, like r.js, check for specific condition patterns
  // like the following:

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return punycode;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "./node_modules/ramda/es/index.js");
/* harmony import */ var ringcentral_js_concise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ringcentral-js-concise */ "./node_modules/ringcentral-js-concise/src/ringcentral.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_2__);



const redirectUri = window.location.origin + window.location.pathname;
const urlSearchParams = new URLSearchParams(new URL(window.location.href).search);
const keyword = urlSearchParams.get('keyword');
const teamName = urlSearchParams.get('accountName');
const code = urlSearchParams.get('code');
console.log('Keyword:', keyword);
console.log('Team name:', teamName);
console.log('Code:', code);
const rc = new ringcentral_js_concise__WEBPACK_IMPORTED_MODULE_1__["default"]({"RINGCENTRAL_CLIENT_ID":"iGSkeZuCSmOwA6YdZvdNIw","RINGCENTRAL_CLIENT_SECRET":"9hSGC8uxTXSWgP5yE4s26Q5qe3DBH_SRiKmoezK9tUQg"}.RINGCENTRAL_CLIENT_ID, {"RINGCENTRAL_CLIENT_ID":"iGSkeZuCSmOwA6YdZvdNIw","RINGCENTRAL_CLIENT_SECRET":"9hSGC8uxTXSWgP5yE4s26Q5qe3DBH_SRiKmoezK9tUQg"}.RINGCENTRAL_CLIENT_SECRET, ringcentral_js_concise__WEBPACK_IMPORTED_MODULE_1__["default"].PRODUCTION_SERVER);

const saveTeams = async newTeams => {
  const teams = (await localforage__WEBPACK_IMPORTED_MODULE_2___default.a.getItem('teams')) || {};

  for (const team of newTeams) {
    teams[team.id] = team;
  }

  await localforage__WEBPACK_IMPORTED_MODULE_2___default.a.setItem('teams', teams);
};

(async () => {
  const spinnerDiv = document.createElement('div');
  spinnerDiv.innerHTML = '<img src="https://chuntaoliu.com/chrome-extension-glip-salesforce/spinner.gif"/>';
  document.body.appendChild(spinnerDiv);

  if (code) {
    await rc.authorize({
      code,
      redirectUri
    });
    await localforage__WEBPACK_IMPORTED_MODULE_2___default.a.setItem('ringcentral-token', rc.token());
  }

  const token = await localforage__WEBPACK_IMPORTED_MODULE_2___default.a.getItem('ringcentral-token');

  if (ramda__WEBPACK_IMPORTED_MODULE_0__["isNil"](token)) {
    const authorizeUri = rc.authorizeUri(redirectUri);
    const div = document.createElement('div');
    div.innerHTML = `<a href="${authorizeUri}">Login Glip</a>`;
    document.body.appendChild(div);
  } else {
    const div = document.createElement('div');
    div.innerHTML = '<span>You have logged into Glip</span>';
    document.body.appendChild(div);
    rc.token(token);

    try {
      await rc.get('/restapi/v1.0/account/~/extension/~');
    } catch (e) {
      if (e.data && (e.data.errors || []).some(error => /\btoken\b/i.test(error.message))) {
        // invalid token
        await localforage__WEBPACK_IMPORTED_MODULE_2___default.a.clear();
        window.location.reload(false);
      }
    }

    const prevPageToken = await localforage__WEBPACK_IMPORTED_MODULE_2___default.a.getItem('prevPageToken');
    let r = await rc.get('/restapi/v1.0/glip/teams', {
      params: {
        recordCount: 250,
        pageToken: prevPageToken
      }
    });
    console.log(r.data);
    await saveTeams(r.data.records);

    while (r.data.navigation.prevPageToken) {
      await localforage__WEBPACK_IMPORTED_MODULE_2___default.a.setItem('prevPageToken', r.data.navigation.prevPageToken);
      r = await rc.get('/restapi/v1.0/glip/teams', {
        params: {
          recordCount: 250,
          pageToken: r.data.navigation.prevPageToken
        }
      });
      console.log(r.data);
      await saveTeams(r.data.records);
    }

    const teams = await localforage__WEBPACK_IMPORTED_MODULE_2___default.a.getItem('teams');
    console.log(teams);
    const existingTeams = [];

    if (!ramda__WEBPACK_IMPORTED_MODULE_0__["isNil"](keyword)) {
      const regex = new RegExp(`\\b${keyword}\\b`);

      for (const key of Object.keys(teams)) {
        if (regex.test(teams[key].name)) {
          console.log(teams[key]);
          existingTeams.push(teams[key]);
        }
      }
    }

    console.log(existingTeams);

    if (existingTeams.length > 0) {
      const div = document.createElement('div');
      div.innerHTML = `<span>We have found the following Glip teams:<ul>${existingTeams.map(t => `<li>${t.name}</li>`).join('')}</ul></span>`;
      document.body.appendChild(div);
    } else {}
  }

  spinnerDiv.remove();
})();

/***/ })

/******/ });
//# sourceMappingURL=main.js.map