"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDummyFixtures = exports.dummyFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dummy_schema_1 = require("../dummy/schemas/dummy.schema");
exports.dummyFixtures = [
    {
        dummy: 'dummy test 1',
    },
    {
        dummy: 'dummy test 2',
    },
    {
        dummy: 'dummy test 3',
    },
    {
        dummy: 'dummy test 4',
    },
];
const installDummyFixtures = async () => {
    const Dummy = mongoose_1.default.model(dummy_schema_1.DummyModel.name, dummy_schema_1.DummyModel.schema);
    return await Dummy.insertMany(exports.dummyFixtures);
};
exports.installDummyFixtures = installDummyFixtures;
//# sourceMappingURL=dummy.js.map