declare function queryAll(root: Element | Document, selector: string): HTMLElement[];
declare function query(root: Element, selector: string): HTMLElement;
declare const _default: {
    query: typeof query;
    queryAll: typeof queryAll;
};
export default _default;
