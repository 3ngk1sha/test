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
exports.LocalAuthController = exports.BaseAuthController = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const express_session_1 = require("express-session");
const config_1 = require("../../config");
const csrf_interceptor_1 = require("../../interceptors/csrf.interceptor");
const logger_service_1 = require("../../logger/logger.service");
const roles_decorator_1 = require("../../utils/decorators/roles.decorator");
const user_dto_1 = require("../dto/user.dto");
const local_auth_guard_1 = require("../guards/local-auth.guard");
const invitation_service_1 = require("../services/invitation.service");
const user_service_1 = require("../services/user.service");
const validate_account_service_1 = require("../services/validate-account.service");
class BaseAuthController {
    constructor(logger) {
        this.logger = logger;
    }
    me(req) {
        return req.user;
    }
    logout(session, res) {
        this.eventEmitter.emit('hook:user:logout', session);
        res.clearCookie(config_1.config.session.name);
        session.destroy((error) => {
            if (error) {
                this.logger.error(error);
                throw new common_1.BadRequestException();
            }
        });
        return { status: 'ok' };
    }
}
exports.BaseAuthController = BaseAuthController;
__decorate([
    (0, common_1.Inject)(event_emitter_1.EventEmitter2),
    __metadata("design:type", event_emitter_1.EventEmitter2)
], BaseAuthController.prototype, "eventEmitter", void 0);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BaseAuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, nestjs_csrf_1.CsrfCheck)(false),
    (0, nestjs_csrf_1.CsrfGen)(false),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [express_session_1.Session, Object]),
    __metadata("design:returntype", void 0)
], BaseAuthController.prototype, "logout", null);
let LocalAuthController = class LocalAuthController extends BaseAuthController {
    constructor(logger, userService, validateAccountService, invitationService) {
        super(logger);
        this.userService = userService;
        this.validateAccountService = validateAccountService;
        this.invitationService = invitationService;
    }
    login(req) {
        return req.user;
    }
    async signup(userCreateDto) {
        try {
            await this.userService.create(userCreateDto);
            return { success: true };
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.BadRequestException();
        }
    }
    async acceptInvite(userCreateDto, token) {
        let decodedToken;
        try {
            decodedToken = await this.invitationService.verify(token);
        }
        catch (error) {
            if (error.name === 'TokenExpiredError')
                throw new common_1.UnauthorizedException('Token expired');
            else
                throw new common_1.BadRequestException(error.name, error.message);
        }
        if (decodedToken.email !== userCreateDto.email)
            throw new common_1.BadRequestException("Email doesn't match invitation email");
        if (decodedToken.roles.some((item) => !userCreateDto.roles.includes(item)))
            throw new common_1.BadRequestException('invitation roles do not match user roles');
        try {
            await this.userService.create({ ...userCreateDto, state: false });
            await this.validateAccountService.sendConfirmationEmail({
                email: userCreateDto.email,
                first_name: userCreateDto.first_name,
            });
            await this.invitationService.deleteOne({ email: decodedToken.email });
        }
        catch (e) {
            this.logger.error('Could not send email', e.message, e.stack, 'AcceptInvite');
            throw new common_1.InternalServerErrorException('Could not send email');
        }
    }
};
exports.LocalAuthController = LocalAuthController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Post)('local'),
    (0, nestjs_csrf_1.CsrfCheck)(false),
    (0, nestjs_csrf_1.CsrfGenAuth)(true),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LocalAuthController.prototype, "login", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserCreateDto]),
    __metadata("design:returntype", Promise)
], LocalAuthController.prototype, "signup", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Post)('accept-invite/:token'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserCreateDto, String]),
    __metadata("design:returntype", Promise)
], LocalAuthController.prototype, "acceptInvite", null);
exports.LocalAuthController = LocalAuthController = __decorate([
    (0, common_1.UseInterceptors)(csrf_interceptor_1.CsrfInterceptor),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        user_service_1.UserService,
        validate_account_service_1.ValidateAccountService,
        invitation_service_1.InvitationService])
], LocalAuthController);
//# sourceMappingURL=auth.controller.js.map