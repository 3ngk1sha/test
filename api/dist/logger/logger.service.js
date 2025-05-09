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
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let LoggerService = class LoggerService extends common_1.ConsoleLogger {
    constructor(parentClass) {
        super(parentClass.constructor.name, {
            logLevels: process.env.NODE_ENV?.includes('dev')
                ? ['log', 'debug', 'error', 'verbose', 'fatal', 'warn']
                : ['log', 'warn', 'error'],
        });
        this.parentClass = parentClass;
    }
    log(message, ...args) {
        this.logArguments('log', message, args);
    }
    error(message, ...args) {
        this.logArguments('error', message, args);
    }
    warn(message, ...args) {
        this.logArguments('warn', message, args);
    }
    debug(message, ...args) {
        this.logArguments('debug', message, args);
    }
    verbose(message, ...args) {
        this.logArguments('verbose', message, args);
    }
    fatal(message, ...args) {
        this.logArguments('fatal', message, args);
    }
    logArguments(type, message, args) {
        super[type](message);
        args.forEach((arg) => {
            super[type](arg instanceof Error ? arg.stack : arg);
        });
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, common_1.Inject)(core_1.INQUIRER)),
    __metadata("design:paramtypes", [Object])
], LoggerService);
//# sourceMappingURL=logger.service.js.map