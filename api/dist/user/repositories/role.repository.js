"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const invitation_schema_1 = require("../schemas/invitation.schema");
const permission_schema_1 = require("../schemas/permission.schema");
const role_schema_1 = require("../schemas/role.schema");
let RoleRepository = class RoleRepository extends base_repository_1.BaseRepository {
    constructor(model, permissionModel, invitationModel) {
        super(model, role_schema_1.Role, role_schema_1.ROLE_POPULATE, role_schema_1.RoleFull);
        this.model = model;
        this.permissionModel = permissionModel;
        this.invitationModel = invitationModel;
    }
    async deleteOne(id) {
        const result = await this.model.deleteOne({ _id: id }).exec();
        if (result.deletedCount > 0) {
            await this.permissionModel.deleteMany({ role: id });
            await this.invitationModel.deleteMany({ roles: id });
        }
        return result;
    }
};
exports.RoleRepository = RoleRepository;
exports.RoleRepository = RoleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(role_schema_1.Role.name)),
    __param(1, (0, mongoose_1.InjectModel)(permission_schema_1.Permission.name)),
    __param(2, (0, mongoose_1.InjectModel)(invitation_schema_1.Invitation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], RoleRepository);
//# sourceMappingURL=role.repository.js.map