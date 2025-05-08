import { MailerService } from '@nestjs-modules/mailer';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { I18nService } from '@/i18n/services/i18n.service';
import { LanguageService } from '@/i18n/services/language.service';
import { BaseService } from '@/utils/generics/base-service';
import { InvitationCreateDto } from '../dto/invitation.dto';
import { InvitationRepository } from '../repositories/invitation.repository';
import { Invitation, InvitationFull, InvitationPopulate } from '../schemas/invitation.schema';
export declare class InvitationService extends BaseService<Invitation, InvitationPopulate, InvitationFull> {
    readonly repository: InvitationRepository;
    private readonly jwtService;
    protected readonly i18n: I18nService;
    readonly languageService: LanguageService;
    private readonly mailerService?;
    constructor(repository: InvitationRepository, jwtService: JwtService, i18n: I18nService, languageService: LanguageService, mailerService?: MailerService | undefined);
    readonly jwtSignOptions: JwtSignOptions;
    create(dto: InvitationCreateDto): Promise<Invitation>;
    sign(dto: InvitationCreateDto): Promise<string>;
    verify(token: string): Promise<InvitationCreateDto>;
    updateOne(..._: any): Promise<Invitation>;
}
