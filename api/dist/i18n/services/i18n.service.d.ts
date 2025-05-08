import { I18nService as NativeI18nService, Path, PathValue, TranslateOptions } from 'nestjs-i18n';
import { IfAnyOrNever } from 'nestjs-i18n/dist/types';
import { Translation } from '@/i18n/schemas/translation.schema';
export declare class I18nService<K = Record<string, unknown>> extends NativeI18nService<K> {
    private dynamicTranslations;
    t<P extends Path<K> = any, R = PathValue<K, P>>(key: P, options?: TranslateOptions): IfAnyOrNever<R, string, R>;
    refreshDynamicTranslations(translations: Translation[]): void;
}
