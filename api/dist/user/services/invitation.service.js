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
exports.InvitationService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../../config");
const i18n_service_1 = require("../../i18n/services/i18n.service");
const language_service_1 = require("../../i18n/services/language.service");
const base_service_1 = require("../../utils/generics/base-service");
const invitation_repository_1 = require("../repositories/invitation.repository");
let InvitationService = class InvitationService extends base_service_1.BaseService {
    constructor(repository, jwtService, i18n, languageService, mailerService) {
        super(repository);
        this.repository = repository;
        this.jwtService = jwtService;
        this.i18n = i18n;
        this.languageService = languageService;
        this.mailerService = mailerService;
        this.jwtSignOptions = {
            secret: config_1.config.invitation.jwtOptions.secret,
            expiresIn: config_1.config.invitation.jwtOptions.expiresIn,
            encoding: 'utf-8',
        };
    }
    async create(dto) {
        const jwt = await this.sign({ ...dto });
        if (this.mailerService) {
            try {
                const defaultLanguage = await this.languageService.getDefaultLanguage();
                await this.mailerService.sendMail({
                    to: dto.email,
                    template: 'invitation.mjml',
                    context: {
                        appName: config_1.config.parameters.appName,
                        appUrl: config_1.config.uiBaseUrl,
                        token: jwt,
                        t: (key) => this.i18n.t(key, { lang: defaultLanguage.code }),
                    },
                    subject: this.i18n.t('invitation_subject'),
                });
            }
            catch (e) {
                this.logger.error('Could not send email', e.message, e.stack, 'InvitationService');
                throw new common_1.InternalServerErrorException('Could not send email');
            }
        }
        const newInvitation = await super.create({ ...dto, token: jwt });
        return { ...newInvitation, token: jwt };
    }
    async sign(dto) {
        return this.jwtService.signAsync(dto, this.jwtSignOptions);
    }
    async verify(token) {
        return this.jwtService.verifyAsync(token, this.jwtSignOptions);
    }
    async updateOne(..._) {
        throw new Error('Illegal Update');
    }
};
exports.InvitationService = InvitationService;
exports.InvitationService = InvitationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(invitation_repository_1.InvitationRepository)),
    __param(1, (0, common_1.Inject)(jwt_1.JwtService)),
    __param(4, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [invitation_repository_1.InvitationRepository,
        jwt_1.JwtService,
        i18n_service_1.I18nService,
        language_service_1.LanguageService,
        mailer_1.MailerService])
], InvitationService);
//# sourceMappingURL=invitation.service.js.map