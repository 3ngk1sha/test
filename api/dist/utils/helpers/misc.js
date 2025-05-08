"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upperFirst = exports.camelCase = exports.kebabCase = exports.hyphenToUnderscore = exports.isEmpty = void 0;
const isEmpty = (value) => {
    return value === undefined || value === null || value === '';
};
exports.isEmpty = isEmpty;
const hyphenToUnderscore = (str) => {
    return str.replaceAll('-', '_');
};
exports.hyphenToUnderscore = hyphenToUnderscore;
const kebabCase = (input) => {
    return input
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
};
exports.kebabCase = kebabCase;
const camelCase = (input) => {
    return input
        .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
        .replace(/^./, (char) => char.toLowerCase());
};
exports.camelCase = camelCase;
const upperFirst = (input) => {
    if (!input)
        return input;
    return input.charAt(0).toUpperCase() + input.slice(1);
};
exports.upperFirst = upperFirst;
//# sourceMappingURL=misc.js.map