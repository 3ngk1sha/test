"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aMonthAgo = void 0;
const aMonthAgo = () => new Date(new Date().setMonth(new Date().getMonth() - 1));
exports.aMonthAgo = aMonthAgo;
//# sourceMappingURL=index.js.map