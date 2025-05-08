import { DynamicModule } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { I18nOptions, I18nTranslation, I18nModule as NativeI18nModule } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { I18nService } from './services/i18n.service';
export declare class I18nModule extends NativeI18nModule {
    constructor(i18n: I18nService, translations: Observable<I18nTranslation>, i18nOptions: I18nOptions, adapter: HttpAdapterHost);
    static forRoot(options: I18nOptions): DynamicModule;
}
