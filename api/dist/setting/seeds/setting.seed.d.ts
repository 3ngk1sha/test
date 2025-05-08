import { Cache } from 'cache-manager';
import { BaseSchema } from '@/utils/generics/base-schema';
import { BaseSeeder } from '@/utils/generics/base-seeder';
import { SettingRepository } from '../repositories/setting.repository';
import { Setting } from '../schemas/setting.schema';
export declare class SettingSeeder extends BaseSeeder<Setting> {
    private readonly settingRepository;
    private readonly cacheManager;
    constructor(settingRepository: SettingRepository, cacheManager: Cache);
    seed(models: Omit<Setting, keyof BaseSchema>[]): Promise<boolean>;
}
