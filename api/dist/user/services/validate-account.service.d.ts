import { MailerService } from '@nestjs-modules/mailer';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { I18nService } from '@/i18n/services/i18n.service';
import { LanguageService } from '@/i18n/services/language.service';
import { LoggerService } from '@/logger/logger.service';
import { UserCreateDto } from '../dto/user.dto';
import { UserService } from './user.service';
export declare class ValidateAccountService {
    private readonly jwtService;
    private readonly userService;
    private logger;
    private readonly i18n;
    private readonly languageService;
    private readonly mailerService?;
    readonly jwtSignOptions: JwtSignOptions;
    constructor(jwtService: JwtService, userService: UserService, logger: LoggerService, i18n: I18nService, languageService: LanguageService, mailerService?: MailerService | undefined);
    sign(dto: {
        email: string;
    }): Promise<string>;
    verify(token: string): Promise<{
        email: string;
    }>;
    sendConfirmationEmail(dto: Pick<UserCreateDto, 'email' | 'first_name'>): Promise<void>;
    confirmAccount(dto: {
        token: string;
    }): Promise<{}>;
}
