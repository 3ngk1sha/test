import { I18nService } from './i18n/services/i18n.service';
export declare class AppService {
    private readonly i18n;
    constructor(i18n: I18nService);
    getHello(): string;
}
