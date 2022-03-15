'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var module$1 = require('module');
var fs = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);

const suggestSelectorScript = fs__default['default'].readFileSync(new URL('../dist/suggest-selector.eval.js', (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('playwright.cjs', document.baseURI).href))));
const suggestSelectorFunction = new Function('element', 'options', `return ${suggestSelectorScript}(element, options);`);

const require$1 = module$1.createRequire((typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('playwright.cjs', document.baseURI).href)));
const selectorScript = {
    path: require$1.resolve('../eval'),
};
async function suggestSelector(elementHandle, options) {
    const handle = await elementHandle;
    if (!handle) {
        throw new Error("Element doesn't exist");
    }
    return await handle.evaluate(suggestSelectorFunction, options);
}

exports.selectorScript = selectorScript;
exports.suggestSelector = suggestSelector;
