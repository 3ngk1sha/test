"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installMigrationFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const migration_schema_1 = require("../../../migration/migration.schema");
const types_1 = require("../../../migration/types");
const migrationFixtures = [
    {
        version: 'v2.1.2',
        status: types_1.MigrationAction.UP,
    },
    {
        version: 'v2.1.1',
        status: types_1.MigrationAction.DOWN,
    },
];
const installMigrationFixtures = async () => {
    const Migration = mongoose_1.default.model(migration_schema_1.MigrationModel.name, migration_schema_1.MigrationModel.schema);
    return await Migration.insertMany(migrationFixtures);
};
exports.installMigrationFixtures = installMigrationFixtures;
//# sourceMappingURL=migration.js.map