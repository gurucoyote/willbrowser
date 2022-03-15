import fs from 'fs';
import { createRequire } from 'module';
import { suggestSelectorFunction } from './suggest-selector.backend';
const require = createRequire(import.meta.url);
const script = fs.readFileSync(require.resolve('../eval'), 'utf-8');
const queryHandler = {
    queryOne: new Function('element', 'selector', `return (${script}).query(element, selector);`),
    queryAll: new Function('element', 'selector', `return (${script}).queryAll(element, selector);`),
};
async function suggestSelector(elementHandle, options) {
    const handle = await elementHandle;
    if (!handle) {
        throw new Error("Element doesn't exist");
    }
    if (!options) {
        return await handle.evaluate(suggestSelectorFunction);
    }
    return await handle.evaluate(suggestSelectorFunction, options);
}
export { queryHandler, suggestSelector };
