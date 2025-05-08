"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installPermissionFixtures = exports.permissionFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const permission_schema_1 = require("../../../user/schemas/permission.schema");
const action_type_1 = require("../../../user/types/action.type");
const model_1 = require("./model");
const user_1 = require("./user");
exports.permissionFixtures = [
    {
        model: '0',
        action: action_type_1.Action.CREATE,
        role: '0',
        relation: 'role',
    },
    {
        model: '0',
        action: action_type_1.Action.DELETE,
        role: '0',
        relation: 'role',
    },
    {
        model: '0',
        action: action_type_1.Action.READ,
        role: '1',
        relation: 'role',
    },
    {
        model: '0',
        action: action_type_1.Action.UPDATE,
        role: '0',
        relation: 'role',
    },
];
const installPermissionFixtures = async () => {
    const { users, roles } = await (0, user_1.installUserFixtures)();
    const models = await (0, model_1.installModelFixtures)();
    const Permission = mongoose_1.default.model(permission_schema_1.PermissionModel.name, permission_schema_1.PermissionModel.schema);
    const permissions = await Permission.insertMany(exports.permissionFixtures.map((permissionFixture) => ({
        ...permissionFixture,
        model: models[parseInt(permissionFixture.model)].id,
        role: roles[parseInt(permissionFixture.role)].id,
    })));
    return { roles, users, permissions };
};
exports.installPermissionFixtures = installPermissionFixtures;
//# sourceMappingURL=permission.js.map