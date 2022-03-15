/**
 * This file is heavily based on Playwright's `parseComponentSelector`, altered for this library's usage.
 * @see https://github.com/microsoft/playwright/blob/585807b3bea6a998019200c16b06683115011d87/src/server/common/componentUtils.ts
 *
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
interface ParsedAttribute {
    name: string;
    value: string | number | boolean | RegExp;
    caseSensitive?: boolean;
}
interface ParsedSelector {
    role: string;
    attributes: ParsedAttribute[];
}
declare function parseSelector(selector: string): ParsedSelector;
export default parseSelector;
