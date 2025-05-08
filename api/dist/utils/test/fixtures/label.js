"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installLabelFixtures = exports.labelFixtures = exports.labels = exports.contentLabelDefaultValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const label_schema_1 = require("../../../chat/schemas/label.schema");
const defaultValues_1 = require("../defaultValues");
exports.contentLabelDefaultValues = {
    builtin: false,
};
exports.labels = [
    {
        description: 'test description 1',
        label_id: {
            messenger: 'messenger',
            web: 'web',
            twitter: 'twitter',
            dimelo: 'dimelo',
        },
        name: 'TEST_TITLE_1',
        title: 'test title 1',
    },
    {
        description: 'test description 2',
        label_id: {
            messenger: 'messenger',
            web: 'web',
            twitter: 'twitter',
            dimelo: 'dimelo',
        },
        name: 'TEST_TITLE_2',
        title: 'test title 2',
    },
    {
        description: 'test description 3',
        label_id: {
            messenger: 'messenger',
            web: 'web',
            twitter: 'twitter',
            dimelo: 'dimelo',
        },
        name: 'TEST_TITLE_3',
        title: 'test title 3',
    },
];
exports.labelFixtures = (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: exports.labels,
    defaultValues: exports.contentLabelDefaultValues,
});
const installLabelFixtures = async () => {
    const Label = mongoose_1.default.model(label_schema_1.LabelModel.name, label_schema_1.LabelModel.schema);
    return await Label.insertMany(exports.labelFixtures);
};
exports.installLabelFixtures = installLabelFixtures;
//# sourceMappingURL=label.js.map