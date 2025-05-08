import { HelperService } from '@/helper/helper.service';
import { LoggerService } from '@/logger/logger.service';
import { NlpEntity, NlpEntityDocument } from '../schemas/nlp-entity.schema';
import { NlpValue, NlpValueDocument } from '../schemas/nlp-value.schema';
import { NlpEntityService } from './nlp-entity.service';
import { NlpSampleService } from './nlp-sample.service';
import { NlpValueService } from './nlp-value.service';
export declare class NlpService {
    private readonly logger;
    protected readonly nlpSampleService: NlpSampleService;
    protected readonly nlpEntityService: NlpEntityService;
    protected readonly nlpValueService: NlpValueService;
    protected readonly helperService: HelperService;
    constructor(logger: LoggerService, nlpSampleService: NlpSampleService, nlpEntityService: NlpEntityService, nlpValueService: NlpValueService, helperService: HelperService);
    handleEntityCreate(entity: NlpEntityDocument): Promise<NlpEntity | NlpEntityDocument>;
    handleEntityUpdate(entity: NlpEntity): Promise<void>;
    handleEntityDelete(entity: NlpEntity): Promise<void>;
    handleValueCreate(value: NlpValueDocument): Promise<NlpValue | NlpValueDocument>;
    handleValueUpdate(value: NlpValue): Promise<void>;
    handleValueDelete(value: NlpValue): Promise<void>;
}
