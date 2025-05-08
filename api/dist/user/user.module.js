"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const attachment_module_1 = require("../attachment/attachment.module");
const attachment_schema_1 = require("../attachment/schemas/attachment.schema");
const auth_controller_1 = require("./controllers/auth.controller");
const model_controller_1 = require("./controllers/model.controller");
const permission_controller_1 = require("./controllers/permission.controller");
const role_controller_1 = require("./controllers/role.controller");
const user_controller_1 = require("./controllers/user.controller");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const local_strategy_1 = require("./passport/auth-strategy/local.strategy");
const session_serializer_1 = require("./passport/session.serializer");
const invitation_repository_1 = require("./repositories/invitation.repository");
const model_repository_1 = require("./repositories/model.repository");
const permission_repository_1 = require("./repositories/permission.repository");
const role_repository_1 = require("./repositories/role.repository");
const user_repository_1 = require("./repositories/user.repository");
const invitation_schema_1 = require("./schemas/invitation.schema");
const model_schema_1 = require("./schemas/model.schema");
const permission_schema_1 = require("./schemas/permission.schema");
const role_schema_1 = require("./schemas/role.schema");
const user_schema_1 = require("./schemas/user.schema");
const model_seed_1 = require("./seeds/model.seed");
const permission_seed_1 = require("./seeds/permission.seed");
const role_seed_1 = require("./seeds/role.seed");
const user_seed_1 = require("./seeds/user.seed");
const auth_service_1 = require("./services/auth.service");
const invitation_service_1 = require("./services/invitation.service");
const model_service_1 = require("./services/model.service");
const passwordReset_service_1 = require("./services/passwordReset.service");
const permission_service_1 = require("./services/permission.service");
const role_service_1 = require("./services/role.service");
const user_service_1 = require("./services/user.service");
const validate_account_service_1 = require("./services/validate-account.service");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                user_schema_1.UserModel,
                model_schema_1.ModelModel,
                invitation_schema_1.InvitationModel,
                role_schema_1.RoleModel,
                permission_schema_1.PermissionModel,
                attachment_schema_1.AttachmentModel,
            ]),
            passport_1.PassportModule.register({
                session: true,
            }),
            jwt_1.JwtModule,
            (0, common_1.forwardRef)(() => attachment_module_1.AttachmentModule),
        ],
        providers: [
            permission_seed_1.PermissionSeeder,
            permission_service_1.PermissionService,
            model_service_1.ModelService,
            user_service_1.UserService,
            role_service_1.RoleService,
            model_seed_1.ModelSeeder,
            role_seed_1.RoleSeeder,
            user_seed_1.UserSeeder,
            user_repository_1.UserRepository,
            role_repository_1.RoleRepository,
            model_repository_1.ModelRepository,
            permission_repository_1.PermissionRepository,
            local_strategy_1.LocalStrategy,
            auth_service_1.AuthService,
            local_auth_guard_1.LocalAuthGuard,
            session_serializer_1.AuthSerializer,
            invitation_repository_1.InvitationRepository,
            invitation_service_1.InvitationService,
            passwordReset_service_1.PasswordResetService,
            validate_account_service_1.ValidateAccountService,
        ],
        controllers: [
            auth_controller_1.LocalAuthController,
            user_controller_1.ReadWriteUserController,
            role_controller_1.RoleController,
            permission_controller_1.PermissionController,
            model_controller_1.ModelController,
        ],
        exports: [user_service_1.UserService, permission_service_1.PermissionService, model_service_1.ModelService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map