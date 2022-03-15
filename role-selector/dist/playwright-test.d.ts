import type { ElementHandle, Locator } from '@playwright/test';
import type { SuggestedSelector, SuggestSelectorOptions } from './suggest-selector.backend';
declare const selectorScript: {
    path: string;
};
declare function suggestSelector(elementHandle: ElementHandle | Locator | Promise<ElementHandle | null> | null, options?: SuggestSelectorOptions): Promise<SuggestedSelector>;
export { selectorScript, suggestSelector, SuggestedSelector };
