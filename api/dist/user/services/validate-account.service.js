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
exports.ValidateAccountService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../../config");
const i18n_service_1 = require("../../i18n/services/i18n.service");
const language_service_1 = require("../../i18n/services/language.service");
const logger_service_1 = require("../../logger/logger.service");
const user_service_1 = require("./user.service");
let ValidateAccountService = class ValidateAccountService {
    constructor(jwtService, userService, logger, i18n, languageService, mailerService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.logger = logger;
        this.i18n = i18n;
        this.languageService = languageService;
        this.mailerService = mailerService;
        this.jwtSignOptions = {
            secret: config_1.config.confirm_account.jwtOptions.secret,
            expiresIn: config_1.config.confirm_account.jwtOptions.expiresIn,
            encoding: 'utf-8',
        };
    }
    async sign(dto) {
        return await this.jwtService.signAsync(dto, this.jwtSignOptions);
    }
    async verify(token) {
        return await this.jwtService.verifyAsync(token, this.jwtSignOptions);
    }
    async sendConfirmationEmail(dto) {
        const confirmationToken = await this.sign({ email: dto.email });
        if (this.mailerService) {
            try {
                const defaultLanguage = await this.languageService.getDefaultLanguage();
                await this.mailerService.sendMail({
                    to: dto.email,
                    template: 'account_confirmation.mjml',
                    context: {
                        appName: config_1.config.parameters.appName,
                        appUrl: config_1.config.uiBaseUrl,
                        token: confirmationToken,
                        first_name: dto.first_name,
                        t: (key) => this.i18n.t(key, { lang: defaultLanguage.code }),
                    },
                    subject: this.i18n.t('account_confirmation_subject'),
                });
            }
            catch (e) {
                this.logger.error('Could not send email', e.message, e.stack, 'ValidateAccount');
                throw new common_1.InternalServerErrorException('Could not send email');
            }
        }
    }
    async confirmAccount(dto) {
        const decodedToken = await this.verify(dto.token).catch((e) => {
            throw new common_1.UnauthorizedException(e.message);
        });
        await this.userService.updateOne({ email: decodedToken.email }, { state: true });
        try {
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('Could confirm email');
        }
        return {};
    }
};
exports.ValidateAccountService = ValidateAccountService;
exports.ValidateAccountService = ValidateAccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(jwt_1.JwtService)),
    __param(5, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        logger_service_1.LoggerService,
        i18n_service_1.I18nService,
        language_service_1.LanguageService,
        mailer_1.MailerService])
], ValidateAccountService);
//# sourceMappingURL=validate-account.service.js.map