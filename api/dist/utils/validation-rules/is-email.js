"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = void 0;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const isEmail = (v) => EMAIL_REGEX.test(v);
exports.isEmail = isEmail;
//# sourceMappingURL=is-email.js.map