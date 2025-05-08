"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const node_crypto_1 = require("node:crypto");
const hash = (value) => (0, node_crypto_1.createHash)('sha256').update(value).digest('base64url');
exports.hash = hash;
//# sourceMappingURL=hash.js.map