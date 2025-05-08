"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installRoleFixtures = exports.roleFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const role_schema_1 = require("../../../user/schemas/role.schema");
exports.roleFixtures = [
    {
        name: 'admin',
        active: true,
    },
    {
        name: 'manager',
        active: true,
    },
    {
        name: 'public',
        active: true,
    },
];
const installRoleFixtures = async () => {
    const Role = mongoose_1.default.model(role_schema_1.RoleModel.name, role_schema_1.RoleModel.schema);
    return await Role.insertMany(exports.roleFixtures);
};
exports.installRoleFixtures = installRoleFixtures;
//# sourceMappingURL=role.js.map