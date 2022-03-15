export declare const query: (root: Element, selector: string) => HTMLElement;
export declare const queryAll: (root: Element | Document, selector: string) => HTMLElement[];
export { default as suggestSelector } from './suggest-selector';
export declare function getAll(root: Element, selector: string): HTMLElement[];
export declare function get(root: Element, selector: string): HTMLElement;
export declare function within(root: Element): {
    query: (selector: string) => HTMLElement;
    queryAll: (selector: string) => HTMLElement[];
    get: (selector: string) => HTMLElement;
    getAll: (selector: string) => HTMLElement[];
};
export declare const screen: false | {
    query: (selector: string) => HTMLElement;
    queryAll: (selector: string) => HTMLElement[];
    get: (selector: string) => HTMLElement;
    getAll: (selector: string) => HTMLElement[];
};
