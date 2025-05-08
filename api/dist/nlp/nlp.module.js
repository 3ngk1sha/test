"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NlpModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const attachment_module_1 = require("../attachment/attachment.module");
const nlp_entity_controller_1 = require("./controllers/nlp-entity.controller");
const nlp_sample_controller_1 = require("./controllers/nlp-sample.controller");
const nlp_value_controller_1 = require("./controllers/nlp-value.controller");
const nlp_entity_repository_1 = require("./repositories/nlp-entity.repository");
const nlp_sample_entity_repository_1 = require("./repositories/nlp-sample-entity.repository");
const nlp_sample_repository_1 = require("./repositories/nlp-sample.repository");
const nlp_value_repository_1 = require("./repositories/nlp-value.repository");
const nlp_entity_schema_1 = require("./schemas/nlp-entity.schema");
const nlp_sample_entity_schema_1 = require("./schemas/nlp-sample-entity.schema");
const nlp_sample_schema_1 = require("./schemas/nlp-sample.schema");
const nlp_value_schema_1 = require("./schemas/nlp-value.schema");
const nlp_entity_seed_1 = require("./seeds/nlp-entity.seed");
const nlp_value_seed_1 = require("./seeds/nlp-value.seed");
const nlp_entity_service_1 = require("./services/nlp-entity.service");
const nlp_sample_entity_service_1 = require("./services/nlp-sample-entity.service");
const nlp_sample_service_1 = require("./services/nlp-sample.service");
const nlp_value_service_1 = require("./services/nlp-value.service");
const nlp_service_1 = require("./services/nlp.service");
let NlpModule = class NlpModule {
};
exports.NlpModule = NlpModule;
exports.NlpModule = NlpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                nlp_entity_schema_1.NlpEntityModel,
                nlp_value_schema_1.NlpValueModel,
                nlp_sample_schema_1.NlpSampleModel,
                nlp_sample_entity_schema_1.NlpSampleEntityModel,
            ]),
            attachment_module_1.AttachmentModule,
            axios_1.HttpModule,
        ],
        controllers: [nlp_entity_controller_1.NlpEntityController, nlp_value_controller_1.NlpValueController, nlp_sample_controller_1.NlpSampleController],
        providers: [
            nlp_entity_repository_1.NlpEntityRepository,
            nlp_value_repository_1.NlpValueRepository,
            nlp_sample_repository_1.NlpSampleRepository,
            nlp_sample_entity_repository_1.NlpSampleEntityRepository,
            nlp_entity_service_1.NlpEntityService,
            nlp_value_service_1.NlpValueService,
            nlp_sample_service_1.NlpSampleService,
            nlp_sample_entity_service_1.NlpSampleEntityService,
            nlp_service_1.NlpService,
            nlp_entity_seed_1.NlpEntitySeeder,
            nlp_value_seed_1.NlpValueSeeder,
        ],
        exports: [nlp_service_1.NlpService, nlp_sample_service_1.NlpSampleService, nlp_entity_service_1.NlpEntityService, nlp_value_service_1.NlpValueService],
    })
], NlpModule);
//# sourceMappingURL=nlp.module.js.map