import fs from 'fs';
const suggestSelectorScript = fs.readFileSync(new URL('../dist/suggest-selector.eval.js', import.meta.url));
const suggestSelectorFunction = new Function('element', 'options', `return ${suggestSelectorScript}(element, options);`);
export { suggestSelectorFunction };
