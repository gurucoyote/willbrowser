import type { ElementHandle } from 'puppeteer';
import type { SuggestedSelector, SuggestSelectorOptions } from './suggest-selector.backend';
declare const queryHandler: {
    queryOne: (element: Element | Document, selector: string) => Element | null;
    queryAll: (element: Element | Document, selector: string) => Element[];
};
declare function suggestSelector(elementHandle: ElementHandle | Promise<ElementHandle | null> | null, options?: SuggestSelectorOptions): Promise<SuggestedSelector>;
export { queryHandler, suggestSelector };
