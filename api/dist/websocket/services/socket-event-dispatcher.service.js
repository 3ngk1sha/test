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
exports.SocketEventDispatcherService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const event_emitter_1 = require("@nestjs/event-emitter");
const socket_event_metadata_storage_1 = require("../storage/socket-event-metadata.storage");
let SocketEventDispatcherService = class SocketEventDispatcherService {
    constructor(eventEmitter, modulesContainer) {
        this.eventEmitter = eventEmitter;
        this.modulesContainer = modulesContainer;
        this.routeHandlers = {
            get: new Map(),
            post: new Map(),
            put: new Map(),
            patch: new Map(),
            delete: new Map(),
        };
    }
    async handleEvent(socketMethod, path, req, res) {
        try {
            const handlers = this.routeHandlers[socketMethod];
            const foundHandler = Array.from(handlers.entries()).find(([key, _]) => {
                const urlPathname = new URL(req.url, 'http://localhost').pathname;
                const keyUrlPathName = new URL(key, 'http://localhost').pathname;
                return urlPathname === keyUrlPathName;
            });
            if (!foundHandler) {
                return res.status(common_1.HttpStatus.NOT_FOUND).send({ message: 'Not Found' });
            }
            const [_, handler] = foundHandler;
            return await handler(req, res);
        }
        catch (error) {
            return this.handleException(error, res);
        }
    }
    onModuleInit() {
        const allProviders = Array.from(this.modulesContainer.values())
            .map((module) => module.providers.values())
            .reduce((prev, curr) => prev.concat(Array.from(curr)), [])
            .filter((provider) => !!provider.instance);
        for (const provider of allProviders) {
            const instance = provider.instance;
            const events = socket_event_metadata_storage_1.SocketEventMetadataStorage.getMetadataFor(instance);
            events.forEach((event) => {
                if (this.routeHandlers[event.socketMethod] === undefined) {
                    throw new Error(`Invalid event type: ${event.socketMethod}`);
                }
                if (this.routeHandlers[event.socketMethod].has(event.path)) {
                    throw new Error(`Duplicate event: ${event.socketMethod} ${event.path}`);
                }
                this.routeHandlers[event.socketMethod].set(event.path, event.method.bind(instance));
            });
        }
    }
    handleException(error, res) {
        if (error instanceof common_1.HttpException) {
            return res.status(error.getStatus()).send(error.getResponse());
        }
        else {
            return res
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'Internal Server Error' });
        }
    }
};
exports.SocketEventDispatcherService = SocketEventDispatcherService;
exports.SocketEventDispatcherService = SocketEventDispatcherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        core_1.ModulesContainer])
], SocketEventDispatcherService);
//# sourceMappingURL=socket-event-dispatcher.service.js.map