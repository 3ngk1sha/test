"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const base_helper_1 = __importDefault(require("./base-helper"));
class BaseLlmHelper extends base_helper_1.default {
    constructor(name, settingService, helperService, logger) {
        super(name, settingService, helperService, logger);
        this.type = types_1.HelperType.LLM;
    }
}
exports.default = BaseLlmHelper;
//# sourceMappingURL=base-llm-helper.js.map