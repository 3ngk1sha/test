"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installUserFixtures = exports.userFixtures = exports.getUserFixtures = exports.userDefaultValues = exports.users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_schema_1 = require("../../../user/schemas/user.schema");
const bcryptjs_1 = require("../../../user/utilities/bcryptjs");
const defaultValues_1 = require("../defaultValues");
const role_1 = require("./role");
exports.users = [
    {
        username: 'admin',
        first_name: 'admin',
        last_name: 'admin',
        email: 'admin@admin.admin',
        password: 'adminadmin',
        roles: ['0', '1'],
        avatar: null,
    },
];
exports.userDefaultValues = {
    state: true,
    language: 'en',
    timezone: 'Europe/Berlin',
    sendEmail: false,
    resetCount: 0,
};
const getUserFixtures = (users) => (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: users,
    defaultValues: exports.userDefaultValues,
});
exports.getUserFixtures = getUserFixtures;
exports.userFixtures = (0, exports.getUserFixtures)(exports.users);
const installUserFixtures = async () => {
    const roles = await (0, role_1.installRoleFixtures)();
    const User = mongoose_1.default.model(user_schema_1.UserModel.name, user_schema_1.UserModel.schema);
    const users = await User.create(exports.userFixtures.map((userFixture) => ({
        ...userFixture,
        roles: roles
            .map((role) => role.id)
            .filter((_, index) => userFixture.roles.includes(index.toString())),
        password: (0, bcryptjs_1.hash)(userFixture.password),
    })));
    return { roles, users };
};
exports.installUserFixtures = installUserFixtures;
//# sourceMappingURL=user.js.map