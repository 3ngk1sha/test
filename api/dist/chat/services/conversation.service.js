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
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../utils/generics/base-service");
const constants_1 = require("../helpers/constants");
const conversation_repository_1 = require("../repositories/conversation.repository");
const message_1 = require("../schemas/types/message");
const context_var_service_1 = require("./context-var.service");
const subscriber_service_1 = require("./subscriber.service");
let ConversationService = class ConversationService extends base_service_1.BaseService {
    constructor(repository, contextVarService, subscriberService) {
        super(repository);
        this.repository = repository;
        this.contextVarService = contextVarService;
        this.subscriberService = subscriberService;
    }
    async end(convo) {
        return await this.repository.end(convo);
    }
    async storeContextData(convo, next, event, captureVars = false) {
        const msgType = event.getMessageType();
        const profile = event.getSender();
        convo.context.channel = event.getHandler().getName();
        convo.context.text = event.getText();
        convo.context.payload = event.getPayload();
        convo.context.nlp = event.getNLP();
        convo.context.vars = convo.context.vars || {};
        const contextVars = await this.contextVarService.getContextVarsByBlock(next);
        if (captureVars && next.capture_vars && next.capture_vars.length > 0) {
            next.capture_vars.forEach((capture) => {
                let contextValue;
                const nlp = event.getNLP();
                if (nlp && nlp.entities && nlp.entities.length) {
                    const nlpIndex = nlp.entities
                        .map((n) => {
                        return n.entity;
                    })
                        .indexOf(capture.entity.toString());
                    if (capture.entity && nlpIndex !== -1) {
                        contextValue = nlp.entities[nlpIndex].value;
                    }
                }
                if (capture.entity === -1) {
                    contextValue =
                        msgType && ['message', 'quick_reply'].indexOf(msgType) !== -1
                            ? event.getText()
                            : event.getPayload();
                }
                else if (capture.entity === -2) {
                    contextValue = event.getPayload();
                }
                contextValue =
                    typeof contextValue === 'string' ? contextValue.trim() : contextValue;
                if (profile.context?.vars &&
                    contextVars[capture.context_var]?.permanent) {
                    common_1.Logger.debug(`Adding context var to subscriber: ${capture.context_var} = ${contextValue}`);
                    profile.context.vars[capture.context_var] = contextValue;
                }
                convo.context.vars[capture.context_var] = contextValue;
            });
        }
        if (profile) {
            convo.context.user.id = profile.id;
            convo.context.user.first_name = profile.first_name || '';
            convo.context.user.last_name = profile.last_name || '';
            if (profile.language) {
                convo.context.user.language = profile.language;
            }
        }
        const msg = event.getMessage();
        if (msgType === 'location' && 'coordinates' in msg) {
            const coordinates = msg.coordinates;
            convo.context.user_location = {
                lat: parseFloat(coordinates.lat.toString()),
                lon: parseFloat(coordinates.lon.toString()),
            };
        }
        if (next.options &&
            next.options.content &&
            (next.options.content.display === message_1.OutgoingMessageFormat.list ||
                next.options.content.display === message_1.OutgoingMessageFormat.carousel)) {
            if (event.getPayload() === constants_1.VIEW_MORE_PAYLOAD) {
                convo.context.skip[next.id] += next.options.content.limit;
            }
            else {
                convo.context.skip = convo.context.skip ? convo.context.skip : {};
                convo.context.skip[next.id] = 0;
            }
        }
        try {
            const updatedConversation = await this.updateOne(convo.id, {
                context: convo.context,
            });
            const criteria = typeof convo.sender === 'object' ? convo.sender.id : convo.sender;
            await this.subscriberService.updateOne(criteria, {
                context: profile.context,
            });
            return updatedConversation;
        }
        catch (err) {
            this.logger.error('Conversation Model : Unable to store context', err);
            throw err;
        }
    }
};
exports.ConversationService = ConversationService;
exports.ConversationService = ConversationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [conversation_repository_1.ConversationRepository,
        context_var_service_1.ContextVarService,
        subscriber_service_1.SubscriberService])
], ConversationService);
//# sourceMappingURL=conversation.service.js.map