"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTestingMocks = void 0;
const event_emitter_1 = require("@nestjs/event-emitter");
const testing_1 = require("@nestjs/testing");
const logger_service_1 = require("../../logger/logger.service");
const findInstances = async (type, module, typesOrTokens) => Promise.all(typesOrTokens.map((typeOrToken) => module[type.toString()](typeOrToken)));
const extractInstances = (type, module) => async (types) => await findInstances(type, module, types);
const buildTestingMocks = async ({ providers, ...rest }) => {
    const module = await testing_1.Test.createTestingModule({
        ...rest,
        ...(providers && {
            providers: [logger_service_1.LoggerService, event_emitter_1.EventEmitter2, ...providers],
        }),
    }).compile();
    return {
        module,
        getMocks: extractInstances('get', module),
        resolveMocks: extractInstances('resolve', module),
    };
};
exports.buildTestingMocks = buildTestingMocks;
//# sourceMappingURL=utils.js.map