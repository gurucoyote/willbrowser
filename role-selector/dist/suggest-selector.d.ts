declare function suggestSelector(element: HTMLElement | null, options?: {
    strict?: boolean;
}): {
    type: string;
    selector: string;
};
export default suggestSelector;
