"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelperType = exports.LLM = void 0;
var LLM;
(function (LLM) {
    let ResponseSchemaType;
    (function (ResponseSchemaType) {
        ResponseSchemaType["STRING"] = "string";
        ResponseSchemaType["NUMBER"] = "number";
        ResponseSchemaType["INTEGER"] = "integer";
        ResponseSchemaType["BOOLEAN"] = "boolean";
        ResponseSchemaType["ARRAY"] = "array";
        ResponseSchemaType["OBJECT"] = "object";
    })(ResponseSchemaType = LLM.ResponseSchemaType || (LLM.ResponseSchemaType = {}));
})(LLM || (exports.LLM = LLM = {}));
var HelperType;
(function (HelperType) {
    HelperType["NLU"] = "nlu";
    HelperType["LLM"] = "llm";
    HelperType["STORAGE"] = "storage";
    HelperType["UTIL"] = "util";
})(HelperType || (exports.HelperType = HelperType = {}));
//# sourceMappingURL=types.js.map