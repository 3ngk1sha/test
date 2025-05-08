"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIdPipe = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const object_id_dto_1 = require("../dto/object-id.dto");
let ObjectIdPipe = class ObjectIdPipe {
    async getErrors(value) {
        const options = {
            id: mongoose_1.Types.ObjectId.isValid(String(value)) ? String(value) : '',
        };
        const dtoObject = (0, class_transformer_1.plainToClass)(object_id_dto_1.ObjectIdDto, options);
        const [errors] = await (0, class_validator_1.validate)(dtoObject);
        return errors;
    }
    async transform(value, { type, data }) {
        if (typeof value === 'string' && data === 'id' && type === 'param') {
            const errors = await this.getErrors(value);
            if (errors) {
                throw new common_1.BadRequestException(errors?.constraints
                    ? Object.values(errors.constraints)[0]
                    : errors.toString());
            }
        }
        else if (typeof value === 'object' &&
            Object.keys(value).length > 1 &&
            type === 'param') {
            await Promise.all(Object.entries(value).map(async ([param, paramValue]) => {
                if (param.startsWith('id')) {
                    const errors = await this.getErrors(String(paramValue));
                    if (errors) {
                        throw new common_1.BadRequestException(errors?.constraints
                            ? Object.values(errors.constraints)[0]
                            : errors.toString());
                    }
                }
            }));
        }
        return value;
    }
};
exports.ObjectIdPipe = ObjectIdPipe;
exports.ObjectIdPipe = ObjectIdPipe = __decorate([
    (0, common_1.Injectable)()
], ObjectIdPipe);
//# sourceMappingURL=object-id.pipe.js.map