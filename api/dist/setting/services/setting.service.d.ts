import { Cache } from 'cache-manager';
import { Config } from '@/config/types';
import { BaseService } from '@/utils/generics/base-service';
import { SettingCreateDto } from '../dto/setting.dto';
import { SettingRepository } from '../repositories/setting.repository';
import { Setting } from '../schemas/setting.schema';
import { SettingSeeder } from '../seeds/setting.seed';
export declare class SettingService extends BaseService<Setting> {
    readonly repository: SettingRepository;
    private readonly cacheManager;
    private readonly seeder;
    constructor(repository: SettingRepository, cacheManager: Cache, seeder: SettingSeeder);
    seedIfNotExist(group: string, data: SettingCreateDto[]): Promise<void>;
    load(): Promise<Record<string, Setting[]>>;
    buildTree(settings: Setting[]): Settings;
    group(settings: Setting[]): Record<string, Setting[]>;
    getConfig(): Config;
    clearCache(): Promise<void>;
    handleSettingUpdateEvent(): Promise<void>;
    getAllowedOrigins(): Promise<string[]>;
    getSettings(): Promise<Settings>;
}
