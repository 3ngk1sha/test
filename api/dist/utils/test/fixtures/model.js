"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installModelFixtures = exports.modelFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const model_schema_1 = require("../../../user/schemas/model.schema");
exports.modelFixtures = [
    {
        name: 'ContentType',
        identity: 'contenttype',
        attributes: { att: 'att' },
        relation: 'role',
    },
    {
        name: 'Content',
        identity: 'content',
        attributes: { att: 'att' },
        relation: 'role',
    },
];
const installModelFixtures = async () => {
    const Model = mongoose_1.default.model(model_schema_1.ModelModel.name, model_schema_1.ModelModel.schema);
    return await Model.insertMany(exports.modelFixtures);
};
exports.installModelFixtures = installModelFixtures;
//# sourceMappingURL=model.js.map