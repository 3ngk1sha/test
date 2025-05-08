"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installContentTypeFixtures = exports.contentTypeFixtures = exports.contentTypeDefaultValues = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const content_type_schema_1 = require("../../../cms/schemas/content-type.schema");
const types_1 = require("../../../setting/schemas/types");
const defaultValues_1 = require("../defaultValues");
exports.contentTypeDefaultValues = {
    fields: [
        {
            name: 'title',
            label: 'Title',
            type: types_1.FieldType.text,
        },
        {
            name: 'status',
            label: 'Status',
            type: types_1.FieldType.checkbox,
        },
    ],
};
const contentTypes = [
    {
        name: 'Product',
        fields: [
            {
                name: 'title',
                label: 'Title',
                type: types_1.FieldType.text,
            },
            {
                name: 'status',
                label: 'Status',
                type: types_1.FieldType.checkbox,
            },
            {
                name: 'description',
                label: 'Description',
                type: types_1.FieldType.text,
            },
            {
                name: 'image',
                label: 'Image',
                type: types_1.FieldType.file,
            },
            {
                name: 'subtitle',
                label: 'Image',
                type: types_1.FieldType.file,
            },
        ],
    },
    {
        name: 'Restaurant',
        fields: [
            {
                name: 'title',
                label: 'Title',
                type: types_1.FieldType.text,
            },
            {
                name: 'status',
                label: 'Status',
                type: types_1.FieldType.checkbox,
            },
            {
                name: 'address',
                label: 'Address',
                type: types_1.FieldType.text,
            },
            {
                name: 'image',
                label: 'Image',
                type: types_1.FieldType.file,
            },
        ],
    },
    {
        name: 'Store',
        fields: [
            {
                name: 'title',
                label: 'Title',
                type: types_1.FieldType.text,
            },
            {
                name: 'status',
                label: 'Status',
                type: types_1.FieldType.checkbox,
            },
            {
                name: 'address',
                label: 'Address',
                type: types_1.FieldType.text,
            },
            {
                name: 'image',
                label: 'Image',
                type: types_1.FieldType.file,
            },
        ],
    },
];
exports.contentTypeFixtures = (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: contentTypes,
    defaultValues: exports.contentTypeDefaultValues,
});
const installContentTypeFixtures = async () => {
    const ContentType = mongoose_1.default.model(content_type_schema_1.ContentTypeModel.name, content_type_schema_1.ContentTypeModel.schema);
    return await ContentType.insertMany(exports.contentTypeFixtures);
};
exports.installContentTypeFixtures = installContentTypeFixtures;
//# sourceMappingURL=contenttype.js.map