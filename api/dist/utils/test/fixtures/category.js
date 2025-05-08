"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installCategoryFixtures = exports.categoryFixtures = exports.categories = exports.categoryDefaultValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const category_schema_1 = require("../../../chat/schemas/category.schema");
const defaultValues_1 = require("../defaultValues");
exports.categoryDefaultValues = {
    builtin: false,
    zoom: 100,
    offset: [0, 0],
};
exports.categories = [
    {
        label: 'test category 1',
    },
    {
        label: 'test category 2',
    },
];
exports.categoryFixtures = (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: exports.categories,
    defaultValues: exports.categoryDefaultValues,
});
const installCategoryFixtures = async () => {
    const Category = mongoose_1.default.model(category_schema_1.CategoryModel.name, category_schema_1.CategoryModel.schema);
    return await Category.insertMany(exports.categoryFixtures);
};
exports.installCategoryFixtures = installCategoryFixtures;
//# sourceMappingURL=category.js.map