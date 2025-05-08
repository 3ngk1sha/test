import { LoggerService } from '@/logger/logger.service';
import { SettingService } from '@/setting/services/setting.service';
import BaseHelper from './lib/base-helper';
import { HelperName, HelperType, TypeOfHelper } from './types';
export declare class HelperService {
    private readonly settingService;
    private readonly logger;
    private registry;
    constructor(settingService: SettingService, logger: LoggerService);
    register<H extends BaseHelper>(helper: H): void;
    get<T extends HelperType>(type: T, name: HelperName): TypeOfHelper<T>;
    getAllByType<T extends HelperType>(type: T): TypeOfHelper<T>[];
    getAll(): BaseHelper[];
    use<T extends HelperType, C extends new (...args: any[]) => TypeOfHelper<T>>(type: T, cls: C): InstanceType<C>;
    getDefaultNluHelper(): Promise<import("./lib/base-nlp-helper").default<`${string}-helper`>>;
    getDefaultLlmHelper(): Promise<import("./lib/base-llm-helper").default<`${string}-helper`>>;
    getDefaultHelper<T extends HelperType>(type: T): Promise<TypeOfHelper<T>>;
}
