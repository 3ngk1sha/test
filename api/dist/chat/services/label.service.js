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
exports.LabelService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../utils/generics/base-service");
const label_repository_1 = require("../repositories/label.repository");
let LabelService = class LabelService extends base_service_1.BaseService {
    constructor(repository) {
        super(repository);
        this.repository = repository;
    }
};
exports.LabelService = LabelService;
exports.LabelService = LabelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [label_repository_1.LabelRepository])
], LabelService);
//# sourceMappingURL=label.service.js.map