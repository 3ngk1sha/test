"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildURL = void 0;
const buildURL = (baseUrl, relativePath) => {
    try {
        return new URL(relativePath).toString();
    }
    catch {
        try {
            return new URL(relativePath.replace(/^\//, ''), baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`).toString();
        }
        catch {
            throw new Error(`Invalid base URL: ${baseUrl}`);
        }
    }
};
exports.buildURL = buildURL;
//# sourceMappingURL=URL.js.map