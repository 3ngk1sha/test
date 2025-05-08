"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installMetadataFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const metadata_schema_1 = require("../../../setting/schemas/metadata.schema");
const metadataFixtures = [
    {
        name: 'app-version',
        value: '2.2.0',
    },
];
const installMetadataFixtures = async () => {
    const Metadata = mongoose_1.default.model(metadata_schema_1.MetadataModel.name, metadata_schema_1.MetadataModel.schema);
    return await Metadata.insertMany(metadataFixtures);
};
exports.installMetadataFixtures = installMetadataFixtures;
//# sourceMappingURL=metadata.js.map