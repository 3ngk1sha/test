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
exports.SettingRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const setting_schema_1 = require("../schemas/setting.schema");
const types_1 = require("../schemas/types");
let SettingRepository = class SettingRepository extends base_repository_1.BaseRepository {
    constructor(model) {
        super(model, setting_schema_1.Setting);
        this.model = model;
    }
    async preCreateValidate(doc) {
        this.validateSettingValue(doc.type, doc.value);
    }
    async preUpdateValidate(criteria, updates) {
        if (!Array.isArray(updates)) {
            const payload = updates.$set;
            if (payload && 'value' in payload) {
                const hasType = 'type' in payload;
                if (hasType) {
                    this.validateSettingValue(payload.type, payload.value);
                }
                else {
                    const setting = await this.findOne(criteria);
                    if (setting && 'type' in setting) {
                        this.validateSettingValue(setting.type, payload.value);
                    }
                    else {
                        throw new Error('Unable to find the setting to be updated');
                    }
                }
            }
        }
    }
    async postUpdate(_query, setting) {
        const group = setting.group;
        const label = setting.label;
        this.eventEmitter.emit(`hook:${group}:${label}`, setting);
    }
    validateSettingValue(type, value) {
        if ((type === types_1.SettingType.text || type === types_1.SettingType.textarea) &&
            typeof value !== 'string' &&
            value !== null) {
            throw new Error('Setting Model : Value must be a string!');
        }
        else if (type === types_1.SettingType.multiple_text) {
            if (!this.isArrayOfString(value)) {
                throw new Error('Setting Model (Multiple Text) : Value must be a string array!');
            }
        }
        else if (type === types_1.SettingType.checkbox &&
            typeof value !== 'boolean' &&
            value !== null) {
            throw new Error('Setting Model : Value must be a boolean!');
        }
        else if (type === types_1.SettingType.number &&
            typeof value !== 'number' &&
            value !== null) {
            throw new Error('Setting Model : Value must be a number!');
        }
        else if (type === types_1.SettingType.multiple_attachment) {
            if (!this.isArrayOfString(value)) {
                throw new Error('Setting Model (Multiple Attachement): Value must be a string array!');
            }
        }
        else if (type === types_1.SettingType.attachment) {
            if (typeof value !== 'string' && typeof value !== null) {
                throw new Error('Setting Model (attachement): Value must be a string or null !');
            }
        }
        else if (type === types_1.SettingType.secret && typeof value !== 'string') {
            throw new Error('Setting Model (secret) : Value must be a string');
        }
        else if (type === types_1.SettingType.select && typeof value !== 'string') {
            throw new Error('Setting Model (select): Value must be a string!');
        }
    }
    isArrayOfString(value) {
        return Array.isArray(value) && value.every((v) => typeof v === 'string');
    }
};
exports.SettingRepository = SettingRepository;
exports.SettingRepository = SettingRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(setting_schema_1.Setting.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SettingRepository);
//# sourceMappingURL=setting.repository.js.map