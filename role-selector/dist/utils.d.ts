declare function is(value: string | number | boolean | null, attrValue: string | number | boolean | RegExp, caseSensitive?: boolean): boolean;
declare function parentElementOrShadowHost(element: Element): Element | undefined;
export { is, parentElementOrShadowHost };
