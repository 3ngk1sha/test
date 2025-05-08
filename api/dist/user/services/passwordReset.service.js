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
exports.PasswordResetService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const config_1 = require("../../config");
const i18n_service_1 = require("../../i18n/services/i18n.service");
const language_service_1 = require("../../i18n/services/language.service");
const logger_service_1 = require("../../logger/logger.service");
const user_service_1 = require("./user.service");
let PasswordResetService = class PasswordResetService {
    constructor(jwtService, logger, userService, i18n, languageService, mailerService) {
        this.jwtService = jwtService;
        this.logger = logger;
        this.userService = userService;
        this.i18n = i18n;
        this.languageService = languageService;
        this.mailerService = mailerService;
        this.jwtSignOptions = {
            secret: config_1.config.password_reset.jwtOptions.secret,
            expiresIn: config_1.config.password_reset.jwtOptions.expiresIn,
            encoding: 'utf-8',
        };
    }
    async requestReset(dto) {
        const user = await this.userService.findOne({ email: dto.email });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const jwt = await this.sign({ ...dto });
        if (this.mailerService) {
            try {
                const defaultLanguage = await this.languageService.getDefaultLanguage();
                await this.mailerService.sendMail({
                    to: dto.email,
                    template: 'password_reset.mjml',
                    context: {
                        appName: config_1.config.parameters.appName,
                        appUrl: config_1.config.uiBaseUrl,
                        token: jwt,
                        first_name: user.first_name,
                        t: (key) => this.i18n.t(key, { lang: defaultLanguage.code }),
                    },
                    subject: this.i18n.t('password_reset_subject'),
                });
            }
            catch (e) {
                this.logger.error('Could not send email', e.message, e.stack, 'InvitationService');
                throw new common_1.InternalServerErrorException('Could not send email');
            }
        }
        await this.userService.updateOne({ email: dto.email }, { resetToken: jwt });
    }
    async reset(dto, token) {
        const payload = await this.verify(token).catch((error) => {
            if (error.name === 'TokenExpiredError')
                throw new common_1.UnauthorizedException('Token expired');
            else
                throw new common_1.BadRequestException(error.name, error.message);
        });
        const user = await this.userService.findOne({ email: payload.email });
        if (!user?.resetToken || (0, bcryptjs_1.compareSync)(user.resetToken, token)) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
        await this.userService.updateOne({ _id: user.id }, {
            password: dto.password,
            resetToken: null,
        });
    }
    async sign(dto) {
        return await this.jwtService.signAsync(dto, this.jwtSignOptions);
    }
    async verify(token) {
        return await this.jwtService.verifyAsync(token, this.jwtSignOptions);
    }
};
exports.PasswordResetService = PasswordResetService;
exports.PasswordResetService = PasswordResetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(jwt_1.JwtService)),
    __param(5, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        logger_service_1.LoggerService,
        user_service_1.UserService,
        i18n_service_1.I18nService,
        language_service_1.LanguageService,
        mailer_1.MailerService])
], PasswordResetService);
//# sourceMappingURL=passwordReset.service.js.map