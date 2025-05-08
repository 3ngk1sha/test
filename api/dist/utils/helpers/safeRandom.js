"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomElement = exports.getRandom = void 0;
const crypto_1 = __importDefault(require("crypto"));
const getRandom = () => crypto_1.default.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
exports.getRandom = getRandom;
const getRandomElement = (array) => {
    return Array.isArray(array)
        ? array[Math.floor((0, exports.getRandom)() * array.length)]
        : array;
};
exports.getRandomElement = getRandomElement;
//# sourceMappingURL=safeRandom.js.map