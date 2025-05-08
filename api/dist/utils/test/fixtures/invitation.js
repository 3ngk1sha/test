"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installInvitationFixtures = exports.invitationsFixtures = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const invitation_schema_1 = require("../../../user/schemas/invitation.schema");
const hash_1 = require("../../../user/utilities/hash");
const defaultValues_1 = require("../defaultValues");
const role_1 = require("./role");
const invitations = [
    {
        email: 'email@test.com',
        roles: ['0'],
        token: (0, hash_1.hash)('testtoken'),
    },
];
exports.invitationsFixtures = (0, defaultValues_1.getFixturesWithDefaultValues)({
    fixtures: invitations,
});
const installInvitationFixtures = async () => {
    const roles = await (0, role_1.installRoleFixtures)();
    const invitation = mongoose_1.default.model(invitation_schema_1.InvitationModel.name, invitation_schema_1.InvitationModel.schema);
    const invitations = await invitation.insertMany(exports.invitationsFixtures.map((invitationsFixture) => ({
        ...invitationsFixture,
        roles: roles
            .map((role) => role.id)
            .filter((_, index) => invitationsFixture.roles.includes(index.toString())),
    })));
    exports.invitationsFixtures.forEach((invitationFixture, index) => {
        invitationFixture.roles = invitations[index].roles.map((role) => role.toString());
    });
    return { roles, invitations };
};
exports.installInvitationFixtures = installInvitationFixtures;
//# sourceMappingURL=invitation.js.map