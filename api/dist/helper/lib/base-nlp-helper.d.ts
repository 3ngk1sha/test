import { LoggerService } from '@/logger/logger.service';
import { NlpEntity, NlpEntityDocument, NlpEntityFull } from '@/nlp/schemas/nlp-entity.schema';
import { NlpSample, NlpSampleFull } from '@/nlp/schemas/nlp-sample.schema';
import { NlpValue, NlpValueDocument, NlpValueFull } from '@/nlp/schemas/nlp-value.schema';
import { SettingService } from '@/setting/services/setting.service';
import { HelperService } from '../helper.service';
import { HelperName, HelperType, NLU } from '../types';
import BaseHelper from './base-helper';
export default abstract class BaseNlpHelper<N extends HelperName = HelperName> extends BaseHelper<N> {
    protected readonly type: HelperType;
    constructor(name: N, settingService: SettingService, helperService: HelperService, logger: LoggerService);
    updateEntity(entity: NlpEntity): Promise<NlpEntity>;
    addEntity(_entity: NlpEntityDocument): Promise<string>;
    deleteEntity(entityId: string): Promise<any>;
    updateValue(value: NlpValue): Promise<NlpValue>;
    addValue(_value: NlpValueDocument): Promise<string>;
    deleteValue(value: NlpValueFull): Promise<NlpValueFull>;
    format(samples: NlpSampleFull[], entities: NlpEntityFull[]): Promise<Record<string, any>[] | Record<string, any>>;
    train?(samples: NlpSampleFull[], entities: NlpEntityFull[]): Promise<any>;
    evaluate?(samples: NlpSampleFull[], entities: NlpEntityFull[]): Promise<any>;
    forget?(sample: NlpSample): Promise<NlpSample>;
    filterEntitiesByConfidence?(nlp: any, threshold: boolean): Promise<NLU.ParseEntities>;
    abstract predict(text: string, threshold?: boolean, project?: string): Promise<NLU.ParseEntities>;
}
