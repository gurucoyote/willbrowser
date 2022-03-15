import { createRequire } from 'module';
import { suggestSelectorFunction } from './suggest-selector.backend.js';
const require = createRequire(import.meta.url);
const selectorScript = {
    path: require.resolve('../eval'),
};
async function suggestSelector(elementHandle, options) {
    const handle = await elementHandle;
    if (!handle) {
        throw new Error("Element doesn't exist");
    }
    return await handle.evaluate(suggestSelectorFunction, options);
}
export { selectorScript, suggestSelector };
