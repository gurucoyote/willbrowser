import { configure } from '@testing-library/dom';
import roleSelector from './role-selector';
configure({
    // Not available in JSDOM
    computedStyleSupportsPseudoElements: false,
});
export const query = roleSelector.query;
export const queryAll = roleSelector.queryAll;
export { default as suggestSelector } from './suggest-selector';
export function getAll(root, selector) {
    const elements = queryAll(root, selector);
    if (elements.length === 0) {
        throw new Error(`Unable to find any elements with the selector "${selector}"`);
    }
    return elements;
}
export function get(root, selector) {
    const elements = getAll(root, selector);
    if (elements.length > 1) {
        throw new Error(`Found multiple elements with the selector "${selector}"`);
    }
    return elements[0];
}
export function within(root) {
    return {
        query: query.bind(null, root),
        queryAll: queryAll.bind(null, root),
        get: get.bind(null, root),
        getAll: getAll.bind(null, root),
    };
}
export const screen = typeof document !== 'undefined' && within(document.body);
