import { MailerService } from '@nestjs-modules/mailer';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { I18nService } from '@/i18n/services/i18n.service';
import { LanguageService } from '@/i18n/services/language.service';
import { LoggerService } from '@/logger/logger.service';
import { UserRequestResetDto, UserResetPasswordDto } from '../dto/user.dto';
import { UserService } from './user.service';
export declare class PasswordResetService {
    private readonly jwtService;
    private logger;
    private readonly userService;
    readonly i18n: I18nService;
    readonly languageService: LanguageService;
    private readonly mailerService?;
    constructor(jwtService: JwtService, logger: LoggerService, userService: UserService, i18n: I18nService, languageService: LanguageService, mailerService?: MailerService | undefined);
    readonly jwtSignOptions: JwtSignOptions;
    requestReset(dto: UserRequestResetDto): Promise<void>;
    reset(dto: UserResetPasswordDto, token: string): Promise<void>;
    sign(dto: UserRequestResetDto): Promise<string>;
    verify(token: string): Promise<UserRequestResetDto>;
}
