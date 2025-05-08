"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installContextVarFixtures = exports.contextVarFixtures = exports.contentVarDefaultValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const context_var_schema_1 = require("../../../chat/schemas/context-var.schema");
const defaultValues_1 = require("../defaultValues");
exports.contentVarDefaultValues = {
    permanent: false,
};
const contextVars = [
    {
        label: 'test context var 1',
        name: 'test1',
    },
    {
        label: 'test context var 2',
        name: 'test2',
    },
];
exports.contextVarFixtures = (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: contextVars,
    defaultValues: exports.contentVarDefaultValues,
});
const installContextVarFixtures = async () => {
    const ContextVar = mongoose_1.default.model(context_var_schema_1.ContextVarModel.name, context_var_schema_1.ContextVarModel.schema);
    return await ContextVar.insertMany(exports.contextVarFixtures);
};
exports.installContextVarFixtures = installContextVarFixtures;
//# sourceMappingURL=contextvar.js.map