"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("@nestjs/mongoose");
const logger_service_1 = require("../../../logger/logger.service");
const dummy_1 = require("../fixtures/dummy");
const test_1 = require("../test");
const dummy_repository_1 = require("./repositories/dummy.repository");
const dummy_schema_1 = require("./schemas/dummy.schema");
const dummy_service_1 = require("./services/dummy.service");
let DummyModule = class DummyModule {
};
exports.DummyModule = DummyModule;
exports.DummyModule = DummyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            (0, test_1.rootMongooseTestModule)(dummy_1.installDummyFixtures),
            mongoose_1.MongooseModule.forFeature([dummy_schema_1.DummyModel]),
        ],
        providers: [dummy_repository_1.DummyRepository, dummy_service_1.DummyService, event_emitter_1.EventEmitter2, logger_service_1.LoggerService],
    })
], DummyModule);
//# sourceMappingURL=dummy.module.js.map