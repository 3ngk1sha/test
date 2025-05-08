"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IOMessagePipe = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../config");
let IOMessagePipe = class IOMessagePipe {
    transform(value, _metadata) {
        let message;
        try {
            message =
                typeof value === 'string'
                    ? JSON.parse(value)
                    : value;
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid JSON format');
        }
        if (!message.method || !message.url) {
            throw new common_1.BadRequestException('Missing required fields: method, url');
        }
        const url = message.url.startsWith('http')
            ? message.url
            : `${config_1.config.apiBaseUrl}${message.url}`;
        if (!URL.canParse(url)) {
            throw new common_1.BadRequestException('Cannot parse url');
        }
        if (!['get', 'post', 'put', 'delete', 'patch', 'options', 'head'].includes(message.method)) {
            throw new common_1.BadRequestException('Invalid method!');
        }
        return message;
    }
};
exports.IOMessagePipe = IOMessagePipe;
exports.IOMessagePipe = IOMessagePipe = __decorate([
    (0, common_1.Injectable)()
], IOMessagePipe);
//# sourceMappingURL=io-message.pipe.js.map