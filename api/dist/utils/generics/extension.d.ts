import { OnModuleInit } from '@nestjs/common';
import { I18nTranslation } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { ExtensionName, HyphenToUnderscore } from '../types/extension';
export declare abstract class Extension implements OnModuleInit {
    readonly name: ExtensionName;
    private translations;
    constructor(name: ExtensionName);
    abstract getPath(): string;
    getName(): ExtensionName;
    getNamespace<N extends ExtensionName = ExtensionName>(): HyphenToUnderscore<N>;
    onModuleInit(): Promise<void>;
    getTranslations(): I18nTranslation | Observable<I18nTranslation>;
}
