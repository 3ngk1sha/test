import { BaseService } from '@/utils/generics/base-service';
import { LabelDto } from '../dto/label.dto';
import { LabelRepository } from '../repositories/label.repository';
import { Label, LabelFull, LabelPopulate } from '../schemas/label.schema';
export declare class LabelService extends BaseService<Label, LabelPopulate, LabelFull, LabelDto> {
    readonly repository: LabelRepository;
    constructor(repository: LabelRepository);
}
