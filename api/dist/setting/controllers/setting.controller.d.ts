import { BaseController } from '@/utils/generics/base-controller';
import { PageQueryDto } from '@/utils/pagination/pagination-query.dto';
import { TFilterQuery } from '@/utils/types/filter.types';
import { Setting } from '../schemas/setting.schema';
import { SettingService } from '../services/setting.service';
export declare class SettingController extends BaseController<Setting> {
    private readonly settingService;
    constructor(settingService: SettingService);
    find(filters: TFilterQuery<Setting>, pageQuery: PageQueryDto<Setting>): Promise<Setting[]>;
    updateOne(id: string, settingUpdateDto: {
        value: any;
    }): Promise<Setting>;
}
