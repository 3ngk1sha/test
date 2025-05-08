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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_csrf_1 = require("@tekuconcept/nestjs-csrf");
const csrf_generator_1 = require("@tekuconcept/nestjs-csrf/dist/csrf.generator");
const express_session_1 = require("express-session");
const app_service_1 = require("./app.service");
const roles_decorator_1 = require("./utils/decorators/roles.decorator");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    csrf(session) {
        return {
            _csrf: session?.csrfSecret
                ? new csrf_generator_1.CsrfGenerator().create(session.csrfSecret)
                : '',
        };
    }
    cookies(req) {
        req.session.anonymous = true;
        return '';
    }
};
exports.AppController = AppController;
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Get)('csrftoken'),
    (0, nestjs_csrf_1.CsrfCheck)(false),
    (0, nestjs_csrf_1.CsrfGenAuth)(true),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [express_session_1.Session]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "csrf", null);
__decorate([
    (0, roles_decorator_1.Roles)('public'),
    (0, common_1.Get)('__getcookie'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppController.prototype, "cookies", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map