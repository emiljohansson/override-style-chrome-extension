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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__file_exists__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__get_path__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_manager__ = __webpack_require__(1);




chrome.tabs.onCreated.addListener(__WEBPACK_IMPORTED_MODULE_2__tabs_manager__["a" /* create */])

chrome.tabs.onRemoved.addListener(__WEBPACK_IMPORTED_MODULE_2__tabs_manager__["b" /* remove */])

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  __WEBPACK_IMPORTED_MODULE_2__tabs_manager__["c" /* update */](tabId, changeInfo.status, callback => {
    const path = __WEBPACK_IMPORTED_MODULE_1__get_path__["a" /* default */](tab)
    __WEBPACK_IMPORTED_MODULE_0__file_exists__["a" /* default */](path, found => {
      if (!found) {
        return
      }
      callback(path)
    })
  })
})


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tab_manager__ = __webpack_require__(2);


let initialized = {}

const newTab = tabId => {
  if (initialized[tabId]) {
    return
  }
  initialized[tabId] = __WEBPACK_IMPORTED_MODULE_0__tab_manager__["a" /* default */](chrome.tabs.insertCSS)
}

const create = tab => {
  newTab(tab.id)
}
/* harmony export (immutable) */ __webpack_exports__["a"] = create;


const remove = tabId => {
  delete initialized[tabId]
}
/* harmony export (immutable) */ __webpack_exports__["b"] = remove;


const update = (tabId, state, onCssFileFound) => {
  if (state === 'loading') {
    newTab(tabId)
    return
  }
  if (state !== 'complete') {
    return
  }
  onCssFileFound(path => {
    initialized[tabId].loadCss(path)
  })
}
/* harmony export (immutable) */ __webpack_exports__["c"] = update;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (insertCSS => {
  const instance = {}

  instance.loadCss = path => {
    if (!path) {
      return
    }
    insertCSS(undefined, {
      file: path
    })
  }

  return instance
});


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let storageRootEntry

const initStorageRootEntry = callback => {
  if (storageRootEntry) {
    callback()
    return
  }
  chrome.runtime.getPackageDirectoryEntry(_storageRootEntry => {
    storageRootEntry = _storageRootEntry
    callback()
  })
}

/* harmony default export */ __webpack_exports__["a"] = ((fileName, callback) => {
  initStorageRootEntry(() => {
    storageRootEntry.getFile(fileName, {
      create: false
    }, () => {
      callback(true)
    }, () => {
      callback(false)
    })
  })
});


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__get_hostname__ = __webpack_require__(6);


/* harmony default export */ __webpack_exports__["a"] = (tab => {
  if (!tab.url) {
    return ''
  }
  const hostname = __WEBPACK_IMPORTED_MODULE_0__get_hostname__["a" /* default */](tab)
  return `styles/${hostname}.css`
});


/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (tab => tab.url.split('/')[2]);


/***/ })
/******/ ]);