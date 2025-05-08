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
exports.ModelRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_repository_1 = require("../../utils/generics/base-repository");
const model_schema_1 = require("../schemas/model.schema");
const permission_schema_1 = require("../schemas/permission.schema");
let ModelRepository = class ModelRepository extends base_repository_1.BaseRepository {
    constructor(model, permissionModel) {
        super(model, model_schema_1.Model, model_schema_1.MODEL_POPULATE, model_schema_1.ModelFull);
        this.model = model;
        this.permissionModel = permissionModel;
    }
    async deleteOne(id) {
        const result = await this.model.deleteOne({ _id: id }).exec();
        if (result.deletedCount > 0) {
            await this.permissionModel.deleteMany({ model: id });
        }
        return result;
    }
};
exports.ModelRepository = ModelRepository;
exports.ModelRepository = ModelRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(model_schema_1.Model.name)),
    __param(1, (0, mongoose_1.InjectModel)(permission_schema_1.Permission.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ModelRepository);
//# sourceMappingURL=model.repository.js.map