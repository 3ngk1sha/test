"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../../logger/logger.service");
class BaseController {
    constructor(service) {
        this.service = service;
        this.eventEmitter = service.eventEmitter;
    }
    canPopulate(populate) {
        return this.service.canPopulate(populate);
    }
    validate({ dto, allowedIds }) {
        const exceptions = [];
        Object.entries(dto)
            .filter(([key]) => Object.keys(allowedIds).includes(key))
            .forEach(([field]) => {
            const invalidIds = (Array.isArray(dto[field]) ? dto[field] : [dto[field]]).filter((id) => !(Array.isArray(allowedIds[field])
                ? allowedIds[field]
                : [allowedIds[field]]).includes(id));
            if (invalidIds.length) {
                exceptions.push(`${field} with ID${invalidIds.length > 1 ? 's' : ''} '${invalidIds}' not found`);
            }
        });
        if (exceptions.length)
            throw new common_1.NotFoundException(exceptions.join('; '));
    }
    async count(filters) {
        return { count: await this.service.count(filters) };
    }
}
exports.BaseController = BaseController;
__decorate([
    (0, common_1.Inject)(logger_service_1.LoggerService),
    __metadata("design:type", logger_service_1.LoggerService)
], BaseController.prototype, "logger", void 0);
//# sourceMappingURL=base-controller.js.map