"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const bcryptjs_1 = require("bcryptjs");
const config_1 = require("../../config");
const hash = (plainPassword) => (0, bcryptjs_1.hashSync)(plainPassword, config_1.config.authentication.jwtOptions.salt);
exports.hash = hash;
//# sourceMappingURL=bcryptjs.js.map