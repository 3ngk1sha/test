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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelController = void 0;
const common_1 = require("@nestjs/common");
const base_controller_1 = require("../../utils/generics/base-controller");
const populate_pipe_1 = require("../../utils/pipes/populate.pipe");
const model_service_1 = require("../services/model.service");
let ModelController = class ModelController extends base_controller_1.BaseController {
    constructor(modelService) {
        super(modelService);
        this.modelService = modelService;
    }
    async find(populate, filters) {
        return this.canPopulate(populate)
            ? await this.modelService.findAndPopulate(filters)
            : await this.modelService.find(filters);
    }
};
exports.ModelController = ModelController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(populate_pipe_1.PopulatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], ModelController.prototype, "find", null);
exports.ModelController = ModelController = __decorate([
    (0, common_1.Controller)('model'),
    __metadata("design:paramtypes", [model_service_1.ModelService])
], ModelController);
//# sourceMappingURL=model.controller.js.map