interface SuggestedSelector {
    type: 'css' | 'role';
    selector: string;
}
interface SuggestSelectorOptions {
    strict: boolean;
}
declare const suggestSelectorFunction: (element: Element, options?: SuggestSelectorOptions | undefined) => SuggestedSelector;
export { suggestSelectorFunction, SuggestedSelector, SuggestSelectorOptions };
