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
exports.HelperController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../utils/decorators/roles.decorator");
const helper_service_1 = require("./helper.service");
const types_1 = require("./types");
let HelperController = class HelperController {
    constructor(helperService) {
        this.helperService = helperService;
    }
    getHelpers(type) {
        return this.helperService.getAllByType(type).map((helper) => {
            return {
                name: helper.getName(),
            };
        });
    }
};
exports.HelperController = HelperController;
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Get)(':type'),
    __param(0, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HelperController.prototype, "getHelpers", null);
exports.HelperController = HelperController = __decorate([
    (0, common_1.Controller)('helper'),
    __metadata("design:paramtypes", [helper_service_1.HelperService])
], HelperController);
//# sourceMappingURL=helper.controller.js.map