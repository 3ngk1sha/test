"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDelayedDate = void 0;
const getDelayedDate = (delay) => {
    const date = new Date();
    return new Date(date.setSeconds(date.getSeconds() + delay));
};
exports.getDelayedDate = getDelayedDate;
//# sourceMappingURL=date.js.map